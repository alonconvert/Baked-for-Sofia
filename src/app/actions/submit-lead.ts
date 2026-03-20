"use server";

import {
  wholesaleInquirySchema,
  productInquirySchema,
  priceListSchema,
  type PriceListData,
} from "@/lib/validations";

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

export async function submitProductInquiry(data: {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  selectedProducts: string[];
  notes?: string;
}) {
  const parsed = productInquirySchema.safeParse(data);

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
        source: "baked-for-sofia-product-inquiry",
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

export async function submitPriceListRequest(data: PriceListData) {
  const parsed = priceListSchema.safeParse(data);

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
        source: "baked-for-sofia-price-list-request",
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
