"use server";

import twilio from 'twilio';
import { supabaseAdmin } from '../supabase';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // Get user's phone number
    const { data: user, error } = await supabaseAdmin
      .from('app_users')
      .select('phone')
      .eq('id', userId)
      .single();

    if (error) throw error;

    const message = await client.messages.create({
      body: content,
      from: twilioNumber,
      to: user.phone,
    });

    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error("An error occurred while sending SMS:", error);
    return { success: false, error };
  }
};
