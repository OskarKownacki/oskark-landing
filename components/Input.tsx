import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, className = "", ...props }: Props) {
  return (
    <label className="flex flex-col gap-c2">
      <span className="text-sm font-semibold text-text-secondary">{label}</span>
      <input
        id={id}
        className={`font-body text-base text-text-primary bg-bg border border-border-base rounded-md px-c4 py-c3 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:border-accent ${className}`}
        {...props}
      />
    </label>
  );
}
