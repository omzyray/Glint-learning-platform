import * as React from "react";
import { cn } from "@/app/lib/cn";
import { ExternalLink } from "lucide-react";

type Variant = "primary" | "secondary" | "tertiary" | "text";
type Size = "default" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#F97316] text-white hover:bg-[#EA580C] disabled:bg-[#FFEEE5] disabled:text-[#FDBA74] border border-transparent shadow-sm",
  secondary:
    "bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F1F5F9] disabled:bg-white disabled:text-[#CBD5E1] disabled:border-[#F1F5F9]",
  tertiary:
    "bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F1F5F9] disabled:bg-white disabled:text-[#CBD5E1] disabled:border-[#F1F5F9]",
  text: "bg-transparent text-[#F97316] hover:text-[#EA580C] disabled:text-[#FDBA74] border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  default: "h-[44px] px-4 text-[14px] sm:text-[15px] gap-1.5",
  md: "h-[36px] px-3 text-[14px] gap-1.5",
};

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-[12px] font-medium font-sans tracking-tight transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB923C] focus-visible:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
      {variant === "tertiary" && <ExternalLink className="h-3.5 w-3.5 opacity-80" />}
      {variant === "text" && (
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-current">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      )}
    </button>
  );
}
