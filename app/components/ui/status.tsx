import { Clock3, CheckCircle2, Play, Lock } from "lucide-react";
import { cn } from "@/app/lib/cn";

const statuses = {
  inProgress: { icon: Clock3, label: "In Progress", color: "text-[#F97316]" },
  completed: { icon: CheckCircle2, label: "Completed", color: "text-[#22C55E]" },
  nowPlaying: { icon: Play, label: "Now Playing", color: "text-[#F97316]" },
  locked: { icon: Lock, label: "Locked", color: "text-[#64748B]" },
} as const;

type StatusKey = keyof typeof statuses;

export function Status({
  variant,
  className,
}: {
  variant: StatusKey;
  className?: string;
}) {
  const { icon: Icon, label, color } = statuses[variant];
  const isFilled = variant === "completed" || variant === "nowPlaying";
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[12px] font-medium font-sans", color, className)}>
      <Icon className={cn("h-4 w-4", isFilled && (variant==="completed" ? "fill-[#22C55E] text-white" : "fill-[#F97316] text-white rounded-full"))} />
      {label}
    </span>
  );
}

export function StatusRow() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Status variant="inProgress" />
      <Status variant="completed" />
      <Status variant="nowPlaying" />
      <Status variant="locked" />
    </div>
  );
}
