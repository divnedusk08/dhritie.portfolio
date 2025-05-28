import { z } from "zod";

// BioGeneratorSchema and BioGeneratorFormValues removed as the feature is no longer used.
// export const BioGeneratorSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
//   profession: z.string().min(3, "Profession is required").max(100, "Profession is too long"),
//   achievements: z.string().min(10, "Please list some achievements (min 10 characters)").max(500, "Achievements are too long"),
//   style: z.string().min(1, "Please select a style"),
// });
// export type BioGeneratorFormValues = z.infer<typeof BioGeneratorSchema>;


export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
