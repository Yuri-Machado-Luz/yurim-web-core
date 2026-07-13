"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  _hp: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

type ContactFormProps = {
  onSubmit: (values: ContactFormValues) => Promise<void> | void;
};

export function ContactForm({ onSubmit }: ContactFormProps) {
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
      className="flex flex-col gap-4"
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name">Nome</Label>
        <Input id="contact-name" autoComplete="name" {...register("name")} />
        {errors.name ? (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Mensagem</Label>
        <Textarea id="contact-message" rows={5} {...register("message")} />
        {errors.message ? (
          <p className="text-destructive text-sm">{errors.message.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Enviar
      </Button>
    </form>
  );
}
