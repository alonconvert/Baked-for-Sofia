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

export const productInquirySchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  contactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^0[2-9]\d{8}$/, "Please enter a valid Australian phone number"),
  email: z.string().email("Please enter a valid email address"),
  selectedProducts: z
    .array(z.string())
    .min(1, "Please select at least one product"),
  notes: z.string().optional(),
});

export type ProductInquiryData = z.infer<typeof productInquirySchema>;

export const priceListSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^0[2-9]\d{8}$/, "Please enter a valid Australian phone number"),
  email: z.string().email("Please enter a valid email address"),
  venueName: z.string().min(2, "Venue name must be at least 2 characters"),
  venueType: z.string().min(1, "Please select a venue type"),
  suburb: z.string().min(1, "Please select a suburb"),
  callbackTime: z.string().min(1, "Please select a preferred callback time"),
  productInterests: z
    .array(z.string())
    .min(1, "Please select at least one product category"),
  weeklyOrderEstimate: z
    .string()
    .min(1, "Please select an estimated order value"),
  message: z.string().optional(),
});

export type PriceListData = z.infer<typeof priceListSchema>;
