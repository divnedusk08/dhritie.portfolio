"use server";

import { z } from "zod";
import { ContactFormSchema } from "./schemas";

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState, // prevState is not directly used for mutation here, but good practice for action signature
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = ContactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach(issue => {
      if (issue.path.length > 0) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
    });
    return {
      message: "Invalid form data. Please check the fields below.",
      fields: formData as Record<string, string>, // Return submitted data to repopulate
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
  //     fields: parsed.data, // Return parsed data in case of server error after validation
  //     success: false,
  //   };
  // }

  return {
    message: `Thank you, ${parsed.data.name}! Your message has been received. I'll get back to you soon.`,
    success: true,
    fields: undefined, // Clear fields on success
    issues: undefined, // Clear issues on success
  };
}
