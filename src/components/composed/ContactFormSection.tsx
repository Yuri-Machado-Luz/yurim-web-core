"use client";

import {
  ContactForm,
  type ContactFormLabels,
  type ContactFormValues,
} from "@/components/composed/ContactForm";

type ContactFormSectionProps = {
  labels: ContactFormLabels;
  compact?: boolean;
};

async function handleContactSubmit(values: ContactFormValues) {
  if (values._hp) return;

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email service is not configured");
    }
    console.info("[contact] EmailJS keys missing — dry-run", {
      name: values.name,
      email: values.email,
    });
    return;
  }

  const emailjs = await import("@emailjs/browser");
  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
    },
    { publicKey },
  );
}

export function ContactFormSection({
  labels,
  compact,
}: ContactFormSectionProps) {
  return (
    <ContactForm
      labels={labels}
      compact={compact}
      onSubmit={handleContactSubmit}
    />
  );
}
