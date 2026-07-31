import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const VARIANTS: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-accent text-on-accent border-accent font-semibold px-c5 py-c3 hover:bg-accent-hover hover:border-accent-hover hover:shadow-glow",
  secondary:
    "bg-surface text-text-primary border-border-base font-medium px-c5 py-c3 hover:bg-surface-subtle hover:border-accent-alt",
  ghost:
    "bg-transparent text-accent-alt border-transparent font-medium px-c4 py-c3 hover:bg-accent-alt-subtle",
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <button
      className={`font-body text-base border rounded-md cursor-pointer transition-[background,box-shadow,border-color] duration-[140ms] ease-[var(--ease-campfire)] ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
