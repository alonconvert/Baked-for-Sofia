import { z } from "zod";

export const wholesaleInquirySchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  contactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^0[2-9]\d{8}$/, "Please enter a valid Australian phone number"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
});

export type WholesaleInquiryData = z.infer<typeof wholesaleInquirySchema>;
