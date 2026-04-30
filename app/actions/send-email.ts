"use server";

import { FormState } from "@/components/ContactForm";
import nodemailer from "nodemailer";

export const sendEmail = async (state: FormState) => {
  const { name, email, message } = state;
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: "xavier@whiteskyweb.com", // Replace with your desired recipient
      subject: `New message from ${name} on xavie.mirmon.co.uk`,
      text: message,
      replyTo: email,
    });
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send email." };
  }
};
