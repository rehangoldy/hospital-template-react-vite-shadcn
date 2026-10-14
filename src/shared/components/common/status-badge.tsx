import { Badge } from "@shared-ui/badge";
import { cn } from "@lib-utils/utils";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "purple";

const toneClass: Record<Tone, string> = {
  success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  danger: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
  info: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
  purple: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20",
  neutral: "bg-muted text-muted-foreground border-transparent",
};

export function StatusBadge({ tone = "neutral", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <Badge variant="outline" className={cn("font-medium", toneClass[tone], className)}>
      {children}
    </Badge>
  );
}

const guarantorTone: Record<string, Tone> = {
  BPJS: "success", Umum: "neutral", Asuransi: "info", Perusahaan: "purple",
};

export const GuarantorBadge = ({ value }: { value: string }) => (
  <StatusBadge tone={guarantorTone[value] ?? "neutral"}>{value}</StatusBadge>
);
