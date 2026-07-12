"use client";

import emailjs from "@emailjs/browser";
import { useMemo, useState } from "react";
import { z } from "zod";

import { Alert, AlertDescription, Button, Input, Textarea } from "@/components";
import { useMessages } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const messages = useMessages();
  const form = messages.contact.form;

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, form.errors.nameRequired),
        email: z.string().email(form.errors.emailInvalid),
        message: z.string().min(10, form.errors.messageMin),
        _hp: z.string().optional(),
      }),
    [form],
  );

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _hp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (formData._hp) return;
    if (cooldownSeconds > 0) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "yurimachadoluz@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );

      setSuccess(true);
      setFormData({ name: "", email: "", message: "", _hp: "" });
      setCooldownSeconds(60);

      const interval = setInterval(() => {
        setCooldownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(form.errorSend);
      console.error("EmailJS error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const busy = isLoading || cooldownSeconds > 0;

  return (
    <div className="flex flex-col gap-6">
      {success && (
        <Alert className="border-border bg-card">
          <AlertDescription className="text-foreground">
            {form.success}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="_hp"
          value={formData._hp}
          onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <div
          className="flex flex-col gap-2"
          data-invalid={errors.name ? true : undefined}
        >
          <label htmlFor="contact-name" className="text-sm font-medium">
            {form.nameLabel}
          </label>
          <Input
            id="contact-name"
            placeholder={form.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={busy}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div
          className="flex flex-col gap-2"
          data-invalid={errors.email ? true : undefined}
        >
          <label htmlFor="contact-email" className="text-sm font-medium">
            {form.emailLabel}
          </label>
          <Input
            id="contact-email"
            type="email"
            placeholder={form.emailPlaceholder}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={busy}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div
          className="flex flex-col gap-2"
          data-invalid={errors.message ? true : undefined}
        >
          <label htmlFor="contact-message" className="text-sm font-medium">
            {form.messageLabel}
          </label>
          <Textarea
            id="contact-message"
            placeholder={form.messagePlaceholder}
            className="resize-none"
            rows={5}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            disabled={busy}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
          />
          {errors.message && (
            <p id="contact-message-error" className="text-sm text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={busy}
          className={cn("w-full")}
          size="lg"
        >
          {isLoading && form.submitting}
          {!isLoading &&
            cooldownSeconds > 0 &&
            form.cooldown.replace("{seconds}", String(cooldownSeconds))}
          {!isLoading && cooldownSeconds === 0 && form.submit}
        </Button>
      </form>
    </div>
  );
}
