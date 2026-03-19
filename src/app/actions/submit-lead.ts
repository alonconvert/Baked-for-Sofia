"use server";

import { wholesaleInquirySchema } from "@/lib/validations";

export async function submitLead(formData: FormData) {
  const rawData = {
    businessName: formData.get("businessName"),
    contactName: formData.get("contactName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = wholesaleInquirySchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const webhookUrl = process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("WEBHOOK_URL environment variable is not set");
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        source: "baked-for-sofia-website",
        timestamp: new Date().toISOString(),
      }),
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
