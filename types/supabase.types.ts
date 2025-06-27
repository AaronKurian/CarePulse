export interface Patient {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  gender: Gender;
  address: string;
  occupation: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  primary_physician: string;
  insurance_provider: string;
  insurance_policy_number: string;
  allergies?: string;
  current_medication?: string;
  family_medical_history?: string;
  past_medical_history?: string;
  identification_type?: string;
  identification_number?: string;
  identification_document_id?: string;
  identification_document_url?: string;
  privacy_consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  patient_id: string;
  primary_physician: string;
  schedule: string;
  reason: string;
  note?: string;
  status: Status;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
  patient: Patient;
}
