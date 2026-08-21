import * as React from "react";
import { cn } from "@/app/lib/cn";

type BadgeVariant = "video" | "lesson" | "popular";

const variantMap: Record<BadgeVariant, string> = {
  video: "bg-[#FFEEE5] text-[#F97316] border-[#FFEEE5]",
  lesson: "bg-[#EEF2FF] text-[#6366F1] border-[#E0E7FF]",
  popular: "bg-[#FFF7ED] text-[#F97316] border-[#FFEDD5]",
};

export function Badge({
  variant = "video",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] border px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase font-sans",
        variantMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
