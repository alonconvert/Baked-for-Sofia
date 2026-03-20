"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  UtensilsCrossed,
  Coffee,
  CupSoda,
  Sandwich,
  Store,
  ChefHat,
  ShoppingBag,
  Truck,
  MoreHorizontal,
  Sunrise,
  Sun,
  Sunset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitPriceListRequest } from "@/app/actions/submit-lead";
import type { PriceListData } from "@/lib/validations";

interface PriceListFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 5;

const VENUE_TYPES = [
  { value: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { value: "coffee-shop", label: "Coffee Shop", icon: Coffee },
  { value: "cafe", label: "Cafe", icon: CupSoda },
  { value: "burger-shop", label: "Burger Shop", icon: Sandwich },
  { value: "deli", label: "Deli", icon: Store },
  { value: "catering", label: "Catering", icon: ChefHat },
  { value: "market-stall", label: "Market Stall", icon: ShoppingBag },
  { value: "food-truck", label: "Food Truck", icon: Truck },
  { value: "other", label: "Other", icon: MoreHorizontal },
];

const CALLBACK_TIMES = [
  { value: "morning", label: "Morning", icon: Sunrise },
  { value: "noon", label: "Noon", icon: Sun },
  { value: "evening", label: "Evening", icon: Sunset },
];

const SUBURBS = [
  "Albert Park",
  "Altona North",
  "Balwyn",
  "Berwick",
  "Blackburn",
  "Brighton",
  "Carlton",
  "Caroline Springs",
  "Croydon",
  "Dandenong",
  "Docklands",
  "Doncaster",
  "East Melbourne",
  "Elwood",
  "Fitzroy",
  "Footscray",
  "Frankston",
  "Geelong",
  "Glen Waverley",
  "Hawthorn East",
  "Hoppers Crossing",
  "Kensington",
  "Langwarrin",
  "Lynbrook",
  "Melbourne (CBD)",
  "Mill Park",
  "Mount Eliza",
  "Noble Park",
  "North Melbourne",
  "Pakenham",
  "Patterson Lakes",
  "Peninsula",
  "Point Cook",
  "Port Melbourne",
  "Reservoir",
  "Richmond",
  "Rowville",
  "Rye",
  "Southbank",
  "St Kilda",
  "Sunbury",
  "Templestowe",
  "Werribee",
  "West Melbourne",
  "Yarraville",
  "Other",
];

const PRODUCTS = [
  { value: "sourdough", label: "Sourdough", image: "/images/products/white-sourdough.webp" },
  { value: "burger-buns", label: "Burger Buns", image: "/images/products/brioche-bun.webp" },
  { value: "turkish-rolls", label: "Turkish Rolls", image: "/images/products/turkish-roll.webp" },
  { value: "sandwich-rolls", label: "Sandwich Rolls", image: "/images/products/panini-roll.webp" },
  { value: "pastries", label: "Pastries", image: "/images/products/croissant.webp" },
  { value: "vegan", label: "Vegan", image: "/images/products/vegan-bun.webp" },
  { value: "gluten-free", label: "Gluten Free", image: "/images/products/gf-roll.webp" },
  { value: "other", label: "Other", image: null },
];

const ORDER_ESTIMATES = [
  { value: "under-150", label: "Under $150" },
  { value: "150-300", label: "$150\u2013300" },
  { value: "300-600", label: "$300\u2013600" },
  { value: "over-600", label: "Over $600" },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  venueName: string;
  venueType: string;
  suburb: string;
  callbackTime: string;
  productInterests: string[];
  weeklyOrderEstimate: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  venueName: "",
  venueType: "",
  suburb: "",
  callbackTime: "",
  productInterests: [],
  weeklyOrderEstimate: "",
  message: "",
};

export function PriceListForm({ isOpen, onClose }: PriceListFormProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Suburb search state
  const [suburbQuery, setSuburbQuery] = useState("");
  const [showSuburbDropdown, setShowSuburbDropdown] = useState(false);
  const suburbRef = useRef<HTMLDivElement>(null);

  const filteredSuburbs = suburbQuery
    ? SUBURBS.filter((s) =>
        s.toLowerCase().includes(suburbQuery.toLowerCase())
      )
    : SUBURBS;

  // Close suburb dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suburbRef.current && !suburbRef.current.contains(e.target as Node)) {
        setShowSuburbDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setDirection(1);
        setFormData(initialFormData);
        setErrors({});
        setIsSuccess(false);
        setServerError(null);
        setSuburbQuery("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const validateStep = useCallback(
    (currentStep: number): boolean => {
      const newErrors: Record<string, string> = {};

      if (currentStep === 1) {
        if (formData.name.trim().length < 2)
          newErrors.name = "Name must be at least 2 characters";
        if (!/^0[2-9]\d{8}$/.test(formData.phone))
          newErrors.phone = "Please enter a valid Australian phone number";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          newErrors.email = "Please enter a valid email address";
      } else if (currentStep === 2) {
        if (formData.venueName.trim().length < 2)
          newErrors.venueName = "Venue name must be at least 2 characters";
        if (!formData.venueType)
          newErrors.venueType = "Please select a venue type";
      } else if (currentStep === 3) {
        if (!formData.suburb) newErrors.suburb = "Please select a suburb";
        if (!formData.callbackTime)
          newErrors.callbackTime = "Please select a preferred callback time";
      } else if (currentStep === 4) {
        if (formData.productInterests.length === 0)
          newErrors.productInterests =
            "Please select at least one product category";
      } else if (currentStep === 5) {
        if (!formData.weeklyOrderEstimate)
          newErrors.weeklyOrderEstimate =
            "Please select an estimated order value";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const goNext = useCallback(() => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(5)) return;
    setIsSubmitting(true);
    setServerError(null);

    const payload: PriceListData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      venueName: formData.venueName.trim(),
      venueType: formData.venueType,
      suburb: formData.suburb,
      callbackTime: formData.callbackTime,
      productInterests: formData.productInterests,
      weeklyOrderEstimate: formData.weeklyOrderEstimate,
      message: formData.message.trim() || undefined,
    };

    const result = await submitPriceListRequest(payload);

    if (result.success) {
      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#c2703e", "#d4a574", "#7a9e7e", "#e8d5b7"],
      });
    } else {
      setServerError(
        typeof result.error === "string"
          ? result.error
          : "Something went wrong. Please try again."
      );
    }

    setIsSubmitting(false);
  }, [formData, validateStep]);

  const toggleProduct = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      productInterests: prev.productInterests.includes(value)
        ? prev.productInterests.filter((p) => p !== value)
        : [...prev.productInterests, value],
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.productInterests;
      return next;
    });
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden max-md:fixed max-md:inset-0 max-md:rounded-none max-md:max-w-none"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close form"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content area */}
            <div className="flex flex-col max-md:h-full">
              {!isSuccess && (
                /* Progress indicator */
                <div className="px-8 pt-8 pb-4">
                  <div className="flex items-center justify-center gap-0">
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div
                          className={`rounded-full transition-all duration-300 ${
                            i + 1 < step
                              ? "h-2.5 w-2.5 bg-gold"
                              : i + 1 === step
                                ? "h-3.5 w-3.5 bg-gold shadow-md shadow-gold/30"
                                : "h-2.5 w-2.5 border-2 border-muted-foreground/30 bg-transparent"
                          }`}
                        />
                        {i < TOTAL_STEPS - 1 && (
                          <div
                            className={`h-0.5 w-8 transition-colors duration-300 ${
                              i + 1 < step ? "bg-gold" : "bg-muted-foreground/20"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form steps */}
              <div className="flex-1 overflow-y-auto px-8 pb-8 max-md:pb-24">
                <AnimatePresence mode="wait" custom={direction}>
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-sage/20 mb-6">
                        <CheckCircle2 className="h-10 w-10 text-gold" />
                      </div>
                      <h3 className="text-3xl font-serif text-foreground mb-3">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto mb-8">
                        A member of our team will call you at your preferred
                        time to walk you through our pricing and arrange
                        samples.
                      </p>
                      <Button
                        onClick={onClose}
                        size="lg"
                        className="h-12 px-8 rounded-xl text-base"
                      >
                        Close
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {step === 1 && (
                        <Step1
                          formData={formData}
                          errors={errors}
                          updateField={updateField}
                        />
                      )}
                      {step === 2 && (
                        <Step2
                          formData={formData}
                          errors={errors}
                          updateField={updateField}
                        />
                      )}
                      {step === 3 && (
                        <Step3
                          formData={formData}
                          errors={errors}
                          updateField={updateField}
                          suburbQuery={suburbQuery}
                          setSuburbQuery={setSuburbQuery}
                          showSuburbDropdown={showSuburbDropdown}
                          setShowSuburbDropdown={setShowSuburbDropdown}
                          filteredSuburbs={filteredSuburbs}
                          suburbRef={suburbRef}
                        />
                      )}
                      {step === 4 && (
                        <Step4
                          formData={formData}
                          errors={errors}
                          toggleProduct={toggleProduct}
                        />
                      )}
                      {step === 5 && (
                        <Step5
                          formData={formData}
                          errors={errors}
                          updateField={updateField}
                          serverError={serverError}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation buttons (fixed at bottom on mobile) */}
              {!isSuccess && (
                <div className="px-8 pb-8 pt-2 flex gap-3 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:bg-card max-md:border-t max-md:border-border/50 max-md:px-6 max-md:py-4">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 rounded-xl text-base"
                      onClick={goBack}
                    >
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Back
                    </Button>
                  )}
                  {step < TOTAL_STEPS ? (
                    <Button
                      size="lg"
                      className="h-12 flex-1 rounded-xl text-base shadow-lg shadow-primary/15"
                      onClick={goNext}
                    >
                      Next
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="h-12 flex-1 rounded-xl text-base shadow-lg shadow-gold/20 bg-gradient-to-r from-primary to-gold/80 hover:from-primary/90 hover:to-gold/70"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : "Request Price List"}
                      {!isSubmitting && (
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Step components
// ---------------------------------------------------------------------------

interface StepProps {
  formData: FormData;
  errors: Record<string, string>;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

function Step1({ formData, errors, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-serif text-foreground mb-1">
          Let&apos;s get to know you
        </h2>
        <p className="text-muted-foreground text-sm">
          We&apos;d love to learn about you and your business
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pl-name">Name</Label>
          <Input
            id="pl-name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="h-11 rounded-xl focus-visible:border-gold focus-visible:ring-gold/30"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pl-phone">Phone</Label>
          <Input
            id="pl-phone"
            type="tel"
            placeholder="0412 345 678"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="h-11 rounded-xl focus-visible:border-gold focus-visible:ring-gold/30"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pl-email">Email</Label>
          <Input
            id="pl-email"
            type="email"
            placeholder="you@business.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="h-11 rounded-xl focus-visible:border-gold focus-visible:ring-gold/30"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Step2({ formData, errors, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-serif text-foreground mb-1">
          Tell us about your venue
        </h2>
        <p className="text-muted-foreground text-sm">
          Help us understand your business
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pl-venue">Venue Name</Label>
          <Input
            id="pl-venue"
            placeholder="Your venue name"
            value={formData.venueName}
            onChange={(e) => updateField("venueName", e.target.value)}
            className="h-11 rounded-xl focus-visible:border-gold focus-visible:ring-gold/30"
          />
          {errors.venueName && (
            <p className="text-sm text-destructive">{errors.venueName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Venue Type</Label>
          <div className="grid grid-cols-3 gap-2">
            {VENUE_TYPES.map((venue) => {
              const Icon = venue.icon;
              const selected = formData.venueType === venue.value;
              return (
                <button
                  key={venue.value}
                  type="button"
                  onClick={() => updateField("venueType", venue.value)}
                  className={`relative flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all text-center ${
                    selected
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border hover:border-gold/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {selected && (
                    <div className="absolute top-1.5 right-1.5">
                      <Check className="h-3.5 w-3.5 text-gold" />
                    </div>
                  )}
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium leading-tight">
                    {venue.label}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.venueType && (
            <p className="text-sm text-destructive">{errors.venueType}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface Step3Props extends StepProps {
  suburbQuery: string;
  setSuburbQuery: (q: string) => void;
  showSuburbDropdown: boolean;
  setShowSuburbDropdown: (v: boolean) => void;
  filteredSuburbs: string[];
  suburbRef: React.RefObject<HTMLDivElement | null>;
}

function Step3({
  formData,
  errors,
  updateField,
  suburbQuery,
  setSuburbQuery,
  showSuburbDropdown,
  setShowSuburbDropdown,
  filteredSuburbs,
  suburbRef,
}: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-serif text-foreground mb-1">
          Where are you located?
        </h2>
        <p className="text-muted-foreground text-sm">
          So we can arrange delivery
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pl-suburb">Suburb</Label>
          <div className="relative" ref={suburbRef}>
            <Input
              id="pl-suburb"
              placeholder="Search suburb..."
              value={formData.suburb ? formData.suburb : suburbQuery}
              onChange={(e) => {
                setSuburbQuery(e.target.value);
                updateField("suburb", "");
                setShowSuburbDropdown(true);
              }}
              onFocus={() => setShowSuburbDropdown(true)}
              className="h-11 rounded-xl focus-visible:border-gold focus-visible:ring-gold/30"
            />
            {showSuburbDropdown && filteredSuburbs.length > 0 && (
              <div className="absolute z-30 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
                {filteredSuburbs.map((suburb) => (
                  <button
                    key={suburb}
                    type="button"
                    onClick={() => {
                      updateField("suburb", suburb);
                      setSuburbQuery(suburb);
                      setShowSuburbDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gold/5 ${
                      formData.suburb === suburb
                        ? "text-gold font-medium bg-gold/5"
                        : "text-foreground"
                    }`}
                  >
                    {suburb}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.suburb && (
            <p className="text-sm text-destructive">{errors.suburb}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Preferred Callback Time</Label>
          <div className="grid grid-cols-3 gap-3">
            {CALLBACK_TIMES.map((time) => {
              const Icon = time.icon;
              const selected = formData.callbackTime === time.value;
              return (
                <button
                  key={time.value}
                  type="button"
                  onClick={() => updateField("callbackTime", time.value)}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    selected
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border hover:border-gold/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {selected && (
                    <div className="absolute top-1.5 right-1.5">
                      <Check className="h-3.5 w-3.5 text-gold" />
                    </div>
                  )}
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{time.label}</span>
                </button>
              );
            })}
          </div>
          {errors.callbackTime && (
            <p className="text-sm text-destructive">{errors.callbackTime}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface Step4Props {
  formData: FormData;
  errors: Record<string, string>;
  toggleProduct: (value: string) => void;
}

function Step4({ formData, errors, toggleProduct }: Step4Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-serif text-foreground mb-1">
          What products interest you?
        </h2>
        <p className="text-muted-foreground text-sm">
          Select all that apply
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {PRODUCTS.map((product) => {
          const selected = formData.productInterests.includes(product.value);
          return (
            <button
              key={product.value}
              type="button"
              onClick={() => toggleProduct(product.value)}
              className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                selected
                  ? "border-gold bg-gold/5 text-foreground"
                  : "border-border hover:border-gold/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {selected && (
                <div className="absolute top-1.5 right-1.5">
                  <Check className="h-3.5 w-3.5 text-gold" />
                </div>
              )}
              {product.image ? (
                <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.label}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <MoreHorizontal className="h-5 w-5" />
                </div>
              )}
              <span className="text-xs font-medium leading-tight text-center">
                {product.label}
              </span>
            </button>
          );
        })}
      </div>
      {errors.productInterests && (
        <p className="text-sm text-destructive text-center">
          {errors.productInterests}
        </p>
      )}
    </div>
  );
}

function Step5({ formData, errors, updateField, serverError }: StepProps & { serverError: string | null }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-serif text-foreground mb-1">
          Almost there!
        </h2>
        <p className="text-muted-foreground text-sm">
          One last thing before we prepare your price list
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Weekly Order Estimate</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {ORDER_ESTIMATES.map((estimate) => {
              const selected =
                formData.weeklyOrderEstimate === estimate.value;
              return (
                <button
                  key={estimate.value}
                  type="button"
                  onClick={() =>
                    updateField("weeklyOrderEstimate", estimate.value)
                  }
                  className={`rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                    selected
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border hover:border-gold/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {estimate.label}
                </button>
              );
            })}
          </div>
          {errors.weeklyOrderEstimate && (
            <p className="text-sm text-destructive">
              {errors.weeklyOrderEstimate}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pl-message">
            Message{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </Label>
          <Textarea
            id="pl-message"
            placeholder="Anything else you'd like us to know?"
            rows={3}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="rounded-xl focus-visible:border-gold focus-visible:ring-gold/30"
          />
        </div>

        {serverError && (
          <p className="text-sm text-destructive text-center">{serverError}</p>
        )}
      </div>
    </div>
  );
}
