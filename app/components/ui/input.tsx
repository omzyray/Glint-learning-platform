import * as React from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/cn";

export function SearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative flex items-center w-full max-w-md">
      <Search className="absolute left-3 h-4 w-4 text-[#64748B]" />
      <input
        className={cn(
          "h-[44px] w-full rounded-[12px] border border-[#E2E8F0] bg-white pl-9 pr-16 text-[14px] font-sans text-[#0F172A] placeholder:text-[#64748B] focus:border-[#FB923C] focus:outline-none focus:ring-2 focus:ring-[#FB923C]/20 transition-colors",
          className
        )}
        {...props}
      />
      <span className="absolute right-3 text-[12px] font-medium text-[#64748B] border border-[#E2E8F0] rounded-[6px] px-1.5 py-0.5 bg-[#F1F5F9]">
        36 K
      </span>
    </div>
  );
}

export function Select({
  className,
  children = "Most Relevant",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "h-[44px] w-full max-w-md rounded-[12px] border border-[#E2E8F0] bg-white px-3 flex items-center justify-between text-[14px] font-sans text-[#0F172A] hover:border-[#CBD5E1] cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="font-medium text-[13px]">{children}</span>
      <ChevronDown className="h-4 w-4 text-[#64748B]" />
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-[44px] w-full rounded-[12px] border border-[#E2E8F0] bg-white px-4 text-[14px] font-sans text-[#0F172A] placeholder:text-[#64748B] focus:border-[#FB923C] focus:outline-none focus:ring-2 focus:ring-[#FB923C]/20",
        props.className
      )}
      {...props}
    />
  );
}
