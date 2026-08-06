"use client";

import {
  ContactForm,
  type ContactFormLabels,
  type ContactFormValues,
} from "@/components/contact-form";

type ContactFormSectionProps = {
  labels: ContactFormLabels;
};

async function handleContactSubmit(values: ContactFormValues) {
  if (values._hp) return;

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.info("[contact]", values);
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

export function ContactFormSection({ labels }: ContactFormSectionProps) {
  return <ContactForm labels={labels} onSubmit={handleContactSubmit} />;
}
