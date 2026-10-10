import * as React from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "highlight" | "muted";
type CardPadding = "none" | "sm" | "md" | "lg";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Efek naik dan bayangan saat hover. */
  interactive?: boolean;
};

const variants: Record<CardVariant, string> = {
  default: "bg-surface border border-line text-gray-900",
  highlight: "bg-primary text-white shadow-xl shadow-primary/20",
  muted: "bg-surface-alt text-gray-900",
};

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6 md:p-8",
  lg: "p-8 lg:p-10",
};

export function Card({
  variant = "default",
  padding = "md",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-sm transition-all duration-300",
        variants[variant],
        paddings[padding],
        interactive && "hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      {...props}
    />
  );
}

export default Card;
