"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../supabase";
import { formatDateTime, parseStringify } from "../utils";
import { sendSMSNotification } from "./sms.actions";

// CREATE APPOINTMENT
export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const { data: newAppointment, error } = await supabaseAdmin
      .from('appointments')
      .insert({
        user_id: appointment.userId,
        patient_id: appointment.patient,
        primary_physician: appointment.primaryPhysician,
        schedule: appointment.schedule.toISOString(),
        reason: appointment.reason,
        note: appointment.note,
        status: appointment.status
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
    throw error;
  }
};

// GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const { data: appointments, error } = await supabaseAdmin
      .from('appointments')
      .select(`
        *,
        patient:patients(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "scheduled":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "cancelled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while retrieving the recent appointments:", error);
    throw error;
  }
};

// UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const { data: updatedAppointment, error } = await supabaseAdmin
      .from('appointments')
      .update({
        primary_physician: appointment.primaryPhysician,
        schedule: appointment.schedule.toISOString(),
        status: appointment.status,
        cancellation_reason: appointment.cancellationReason
      })
      .eq('id', appointmentId)
      .select(`
        *,
        patient:patients(*)
      `)
      .single();

    if (error) throw error;

    // Send SMS notification
    const smsMessage = `Greetings from CarePulse. ${
      type === "schedule" 
        ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` 
        : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule, timeZone).dateTime} is cancelled. Reason: ${appointment.cancellationReason}`
    }.`;
    
    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while updating an appointment:", error);
    throw error;
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const { data: appointment, error } = await supabaseAdmin
      .from('appointments')
      .select(`
        *,
        patient:patients(*)
      `)
      .eq('id', appointmentId)
      .single();

    if (error) throw error;

    return parseStringify(appointment);
  } catch (error) {
    console.error("An error occurred while retrieving the appointment:", error);
    throw error;
  }
};
