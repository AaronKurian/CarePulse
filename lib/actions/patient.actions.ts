"use server";

import { supabaseAdmin } from "../supabase";
import { parseStringify } from "../utils";

// CREATE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // First check if user already exists in our app_users table
    const { data: existingUser } = await supabaseAdmin
      .from('app_users')
      .select()
      .eq('email', user.email)
      .single();

    if (existingUser) {
      return parseStringify(existingUser);
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      phone: user.phone,
      user_metadata: {
        name: user.name
      }
    });

    if (authError) throw authError;

    // Create app user record
    const { data: userData, error: userError } = await supabaseAdmin
      .from('app_users')
      .insert({
        id: authData.user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      })
      .select()
      .single();

    if (userError) throw userError;

    return parseStringify(userData);
  } catch (error: any) {
    // Handle Supabase auth errors
    if (error?.code === 'email_exists' || error?.message?.includes('email address has already been registered')) {
      // Get existing user from our app_users table
      const { data: existingUser } = await supabaseAdmin
        .from('app_users')
        .select()
        .eq('email', user.email)
        .single();
      
      if (existingUser) {
        return parseStringify(existingUser);
      }
    }
    
    console.error("An error occurred while creating a new user:", error);
    throw error;
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const { data: user, error } = await supabaseAdmin
      .from('app_users')
      .select()
      .eq('id', userId)
      .single();

    if (error) throw error;

    return parseStringify(user);
  } catch (error) {
    console.error("An error occurred while retrieving the user details:", error);
    throw error;
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let fileUrl = null;
    let fileId = null;

    // Upload file if provided
    if (identificationDocument) {
      const file = identificationDocument.get("blobFile") as File;
      const fileName = identificationDocument.get("fileName") as string;
      
      const fileExt = fileName.split('.').pop();
      const filePath = `${patient.userId}-${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('identification-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabaseAdmin.storage
        .from('identification-documents')
        .getPublicUrl(filePath);

      fileUrl = urlData.publicUrl;
      fileId = uploadData.path;
    }

    // Create patient record
    const { data: newPatient, error } = await supabaseAdmin
      .from('patients')
      .insert({
        user_id: patient.userId,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        birth_date: patient.birthDate.toISOString().split('T')[0],
        gender: patient.gender,
        address: patient.address,
        occupation: patient.occupation,
        emergency_contact_name: patient.emergencyContactName,
        emergency_contact_number: patient.emergencyContactNumber,
        primary_physician: patient.primaryPhysician,
        insurance_provider: patient.insuranceProvider,
        insurance_policy_number: patient.insurancePolicyNumber,
        allergies: patient.allergies,
        current_medication: patient.currentMedication,
        family_medical_history: patient.familyMedicalHistory,
        past_medical_history: patient.pastMedicalHistory,
        identification_type: patient.identificationType,
        identification_number: patient.identificationNumber,
        identification_document_id: fileId,
        identification_document_url: fileUrl,
        privacy_consent: patient.privacyConsent
      })
      .select()
      .single();

    if (error) throw error;

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
    throw error;
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const { data: patient, error } = await supabaseAdmin
      .from('patients')
      .select()
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"

    return parseStringify(patient);
  } catch (error) {
    console.error("An error occurred while retrieving the patient details:", error);
    throw error;
  }
};
