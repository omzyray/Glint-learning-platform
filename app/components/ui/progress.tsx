import * as React from "react";
import { cn } from "@/app/lib/cn";

export function Progress({
  value = 35,
  className,
}: {
  value?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 w-full", className)}>
      <div className="h-2 flex-1 rounded-full bg-[#F1F5F9] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#F97316] transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[12px] font-medium text-[#0F172A] whitespace-nowrap font-sans">
        {value}% complete
      </span>
    </div>
  );
}
