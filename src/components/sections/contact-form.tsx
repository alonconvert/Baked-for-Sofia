"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { wholesaleInquirySchema, type WholesaleInquiryData } from "@/lib/validations";
import { submitLead } from "@/app/actions/submit-lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WholesaleInquiryData>({
    resolver: zodResolver(wholesaleInquirySchema),
  });

  const onSubmit = async (data: WholesaleInquiryData) => {
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await submitLead(formData);

    if (result.success) {
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#c2703e", "#d4a574", "#7a9e7e"],
      });
    } else {
      setServerError(
        typeof result.error === "string"
          ? result.error
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <CheckCircle2 className="h-16 w-16 text-sage mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Thank You!
          </h3>
          <p className="text-muted-foreground">
            We&apos;ve received your inquiry and will get back to you shortly.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Your business name"
                {...register("businessName")}
              />
              {errors.businessName && (
                <p className="text-sm text-destructive">
                  {errors.businessName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                placeholder="Your name"
                {...register("contactName")}
              />
              {errors.contactName && (
                <p className="text-sm text-destructive">
                  {errors.contactName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0412 345 678"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@business.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your business needs, products you're interested in, delivery requirements..."
              rows={5}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-destructive text-center">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Inquiry
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
