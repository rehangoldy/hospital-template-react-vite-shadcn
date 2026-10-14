import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@shared-ui/card";
import { cn } from "@lib-utils/utils";

type Props = {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  trend?: { value: string; up: boolean };
};

export function StatCard({ label, value, hint, icon: Icon, trend }: Props) {
  return (
    <Card className="py-4">
      <CardContent className="flex items-start justify-between gap-3 px-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
          <div className="mt-1 flex items-center gap-2 text-xs">
            {trend && (
              <span className={cn("font-medium", trend.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
                {trend.up ? "▲" : "▼"} {trend.value}
              </span>
            )}
            {hint && <span className="text-muted-foreground">{hint}</span>}
          </div>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
      </CardContent>
    </Card>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{children}</div>;
}
