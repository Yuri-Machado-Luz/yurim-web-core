"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import { cn } from "@/lib/utils";

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
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
  onSubmit: (values: ContactFormValues) => Promise<void> | void;
  compact?: boolean;
};

export function ContactForm({
  labels,
  onSubmit,
  compact = false,
}: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", _hp: "" },
  });

  async function handleSubmit(values: ContactFormValues) {
    try {
      await onSubmit(values);
      toast.success(labels.success);
      form.reset();
    } catch {
      toast.error(labels.error);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          "surface-glass card-glow-subtle border-border/60 flex w-full flex-col rounded-2xl border",
          compact ? "gap-2.5 p-4 sm:p-5" : "gap-4 p-6 sm:p-8",
        )}
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
      >
        <FormField
          control={form.control}
          name="_hp"
          render={({ field }) => (
            <FormItem className="hidden" aria-hidden="true">
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input tabIndex={-1} autoComplete="off" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={compact ? "gap-1.5" : "pb-2"}>
              <FormLabel>{labels.name}</FormLabel>
              <FormControl>
                <Input
                  autoComplete="name"
                  className="w-full"
                  placeholder={labels.namePlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className={compact ? "gap-1.5" : "pb-2"}>
              <FormLabel>{labels.email}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  className="w-full"
                  placeholder={labels.emailPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className={compact ? "gap-1.5" : "pb-2"}>
              <FormLabel>{labels.message}</FormLabel>
              <FormControl>
                <Textarea
                  rows={compact ? 3 : 5}
                  className={cn("w-full", compact && "min-h-20")}
                  placeholder={labels.messagePlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full self-center sm:w-auto"
        >
          {labels.submit}
        </Button>
      </form>
    </Form>
  );
}
