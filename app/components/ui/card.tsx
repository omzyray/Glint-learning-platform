import * as React from "react";
import { cn } from "@/app/lib/cn";
import { Badge } from "./badge";
import { Clock, FileText, BarChart3, Bookmark, ExternalLink, Play } from "lucide-react";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-[#E2E8F0] bg-white shadow-sm p-5 flex flex-col gap-3",
        className
      )}
      {...props}
    />
  );
}

export function CourseCard() {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-[8px] bg-[#0F172A] flex items-center justify-center text-white font-semibold text-[16px]">N</div>
        <div className="flex-1">
          <h3 className="text-[14px] font-semibold leading-5 text-[#0F172A] font-sans">Next.js for Production</h3>
          <p className="text-[12px] leading-4 text-[#64748B] mt-1 font-sans">Build scalable, high-performance web applications with Next.js.</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 text-[11px] text-[#64748B] font-sans border-t border-[#F1F5F9] pt-3">
        <span className="inline-flex items-center gap-1"><BarChart3 className="h-3.5 w-3.5" /> Intermediate</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 18h 24m</span>
        <span className="inline-flex items-center gap-1"><Bookmark className="h-3.5 w-3.5" /> 12 modules</span>
      </div>
    </Card>
  );
}

export function LessonVideoCard() {
  return (
    <Card>
      <Badge variant="video">VIDEO</Badge>
      <h3 className="text-[14px] font-semibold leading-5 text-[#0F172A] font-sans">Data Fetching in Server Components</h3>
      <p className="text-[12px] leading-4 text-[#64748B] font-sans">Learn how to fetch data on the server using async/await and Next.js best practices.</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-[#64748B] font-sans">Lesson 5.1 &nbsp;·&nbsp; 12:45</span>
        <a className="inline-flex items-center gap-1 text-[11px] font-medium text-[#F97316] hover:text-[#EA580C]">
          <Play className="h-3 w-3 fill-[#F97316] text-[#F97316]" /> Watch from 12:45
        </a>
      </div>
    </Card>
  );
}

export function LessonCard() {
  return (
    <Card>
      <Badge variant="lesson">LESSON</Badge>
      <h3 className="text-[14px] font-semibold leading-5 text-[#0F172A] font-sans">Data Fetching & Caching</h3>
      <p className="text-[12px] leading-4 text-[#64748B] font-sans">Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance.</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-[#64748B] font-sans">Module 5</span>
        <a className="inline-flex items-center gap-1 text-[11px] font-medium text-[#F97316] hover:text-[#EA580C]">
          View lesson <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </Card>
  );
}

export function ResourceCard() {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-[8px] bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
          <FileText className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h3 className="text-[13px] font-semibold leading-5 text-[#0F172A] font-sans">Caching and Revalidation Guide</h3>
          <p className="text-[11px] leading-4 text-[#64748B] font-sans">Deep dive into Next.js caching strategies.</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#F1F5F9]">
        <span className="text-[11px] text-[#64748B] font-sans">PDF &nbsp;·&nbsp; 1.2 MB</span>
        <span className="text-[#F97316]"><ExternalLink className="h-3.5 w-3.5" /></span>
      </div>
    </Card>
  );
}
