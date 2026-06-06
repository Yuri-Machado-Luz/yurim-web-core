import * as motion from "motion/react-client";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "muted";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-700 text-white hover:bg-primary-600 active:bg-primary-700/90",
  muted:
    "bg-neutral-200/10 text-white border border-neutral-200/20 hover:bg-neutral-200/12 active:bg-neutral-200/8",
};

const sizes: Record<ButtonSize, string> = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-2.5",
  xl: "text-xl px-6 py-3",
  "2xl": "text-2xl px-7 py-3.5",
  "3xl": "text-3xl px-8 py-4 ",
  "4xl": "text-4xl px-10 py-5",
};

const Button = ({
  children,
  variant = "muted",
  size = "lg",
  href,
  ...props
}: ButtonProps) => {
  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", bounce: 0.4 }}
      className={`cursor-pointer rounded-full transition-colors duration-300 select-none ${variants[variant]} ${sizes[size]}`}
      href={href}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export default Button;
