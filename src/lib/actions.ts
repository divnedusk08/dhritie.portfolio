"use server";

import { z } from "zod";
import { ContactFormSchema } from "./schemas";

type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = ContactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  // Simulate sending an email or saving to a database
  console.log("Contact form submitted:", parsed.data);
  // In a real app, you would integrate with an email service or database here.
  // For example:
  // await sendEmail({ to: "your-email@example.com", from: parsed.data.email, subject: `Contact from ${parsed.data.name}`, body: parsed.data.message });

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check for a simulated error condition (e.g. 10% chance of failure)
  // if (Math.random() < 0.1) {
  //   return {
  //     message: "Failed to send message due to a server error. Please try again later.",
  //     success: false,
  //   };
  // }

  return {
    message: `Thank you, ${parsed.data.name}! Your message has been received. I'll get back to you soon.`,
    success: true,
  };
}
