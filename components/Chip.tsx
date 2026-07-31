import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  status?: "success" | "warning" | "error" | "neutral";
};

const STATUS: Record<NonNullable<Props["status"]>, string> = {
  success: "text-success bg-[var(--color-success-subtle)]",
  warning: "text-warning bg-[var(--color-warning-subtle)]",
  error: "text-error bg-[var(--color-error-subtle)]",
  neutral: "text-text-secondary bg-surface-subtle border border-border-subtle",
};

export function Chip({ status = "neutral", children, className = "", ...props }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-c2 font-mono text-sm tracking-[var(--tracking-mono)] rounded-pill px-c4 py-c2 ${STATUS[status]} ${className}`}
      {...props}
    >
      {status !== "neutral" && "● "}
      {children}
    </span>
  );
}
