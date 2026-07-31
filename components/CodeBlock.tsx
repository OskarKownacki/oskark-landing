import type { HTMLAttributes } from "react";

export function CodeBlock({ children, className = "", ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={`font-mono text-sm leading-[1.65] tracking-[var(--tracking-mono)] text-text-primary bg-surface-subtle border border-border-subtle rounded-lg p-c4 overflow-x-auto ${className}`}
      {...props}
    >
      {children}
    </pre>
  );
}
