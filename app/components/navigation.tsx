import * as React from "react";
import { cn } from "@/app/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-6 w-6 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 3L12 21L15 14L12 7L3 3Z" fill="#F97316" />
          <path d="M12 7L15 14L21 3L12 7Z" fill="#FB923C" />
        </svg>
      </div>
      <span className="text-[16px] font-semibold tracking-tight text-[#0F172A] font-sans">Glint</span>
    </div>
  );
}

export function HeaderNav() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        <Logo />
        <nav className="hidden sm:flex items-center gap-6 text-[14px] font-medium font-sans">
          <a className="text-[#F97316]">Courses</a>
          <a className="text-[#64748B] hover:text-[#0F172A]">My Learning</a>
        </nav>
      </div>
      <div className="sm:hidden text-[#64748B] text-sm">☰</div>
    </div>
  );
}

export function Breadcrumbs() {
  return (
    <nav className="flex items-center gap-1.5 text-[12px] font-sans text-[#64748B] overflow-x-auto whitespace-nowrap">
      <a className="hover:text-[#0F172A]">All Courses</a>
      <span className="text-[#CBD5E1]">›</span>
      <a className="hover:text-[#0F172A]">Next.js for Production</a>
      <span className="text-[#CBD5E1]">›</span>
      <span className="text-[#0F172A] font-medium">Data Fetching & Caching</span>
    </nav>
  );
}

export function Pagination() {
  return (
    <div className="flex items-center gap-1 text-[13px] font-sans">
      <button className="h-7 w-7 flex items-center justify-center rounded-[8px] text-[#64748B] hover:bg-white border border-transparent hover:border-[#E2E8F0]">‹</button>
      <button className="h-7 w-7 flex items-center justify-center rounded-[8px] bg-white border border-[#F97316] text-[#F97316] font-medium">1</button>
      <button className="h-7 w-7 flex items-center justify-center rounded-[8px] text-[#64748B] hover:bg-white">2</button>
      <button className="h-7 w-7 flex items-center justify-center rounded-[8px] text-[#64748B] hover:bg-white">3</button>
      <span className="px-1 text-[#64748B]">…</span>
      <button className="h-7 w-7 flex items-center justify-center rounded-[8px] text-[#64748B] hover:bg-white">8</button>
      <button className="h-7 w-7 flex items-center justify-center rounded-[8px] text-[#64748B] hover:bg-white border border-transparent hover:border-[#E2E8F0]">›</button>
    </div>
  );
}
