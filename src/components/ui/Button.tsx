import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Titik merah kecil di kiri label, ciri khas tombol StackPlus. */
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-all duration-300 " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark",
  secondary: "bg-ink text-white hover:bg-ink-dark",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:bg-surface-alt",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

/** Class tombol yang bisa dipakai ulang di elemen lain (misalnya Link bawaan Next). */
export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", dot, className, children, ...rest } = props;
  const classes = buttonStyles(variant, size, className);
  const content = (
    <>
      {dot && <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-red-500" />}
      {children}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    return isExternal ? (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

export default Button;
