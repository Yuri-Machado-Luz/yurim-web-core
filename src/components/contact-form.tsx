"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Input, Label, Textarea } from "@/components/raw";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  _hp: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  submit: string;
  success: string;
  error: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
  onSubmit: (values: ContactFormValues) => Promise<void> | void;
};

export function ContactForm({ labels, onSubmit }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", _hp: "" },
  });

  return (
    <form
      className="border-border/60 bg-background/50 mx-auto w-full max-w-lg flex-col gap-4 rounded-lg border p-6 shadow-md backdrop-blur-md sm:p-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="contact-hp">Website</Label>
        <Input
          id="contact-hp"
          tabIndex={-1}
          autoComplete="off"
          {...register("_hp")}
        />
      </div>

      <div className="flex flex-col gap-2 pb-4">
        <Label htmlFor="contact-name">{labels.name}</Label>
        <Input
          id="contact-name"
          autoComplete="name"
          {...register("name")}
          className="w-full"
        />
        {errors.name ? (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 pb-4">
        <Label htmlFor="contact-email">{labels.email}</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full"
        />
        {errors.email ? (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 pb-4">
        <Label htmlFor="contact-message">{labels.message}</Label>
        <Textarea
          id="contact-message"
          rows={5}
          {...register("message")}
          className="w-full"
        />
        {errors.message ? (
          <p className="text-destructive text-sm">{errors.message.message}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full self-center sm:w-auto"
      >
        {labels.submit}
      </Button>
    </form>
  );
}
