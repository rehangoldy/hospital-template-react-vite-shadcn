import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@shared-ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared-ui/table";
import { cn } from "@lib-utils/utils";

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  searchPlaceholder?: string;
  toolbar?: ReactNode;
  searchable?: boolean;
};

export function DataTable<T extends object>({
  columns, rows, searchPlaceholder = "Cari data…", toolbar, searchable = true,
}: Props<T>) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? rows.filter((r) => Object.values(r).join(" ").toLowerCase().includes(s)) : rows;
  }, [q, rows]);

  return (
    <div className="space-y-3">
      {(searchable || toolbar) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {searchable ? (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} className="pl-8" />
            </div>
          ) : <span />}
          {toolbar}
        </div>
      )}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key} className={cn("text-xs uppercase tracking-wide", c.className)}>{c.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
            ) : filtered.map((row, i) => (
              <TableRow key={i}>
                {columns.map((c) => (
                  <TableCell key={c.key} className={c.className}>
                    {c.render ? c.render(row) : (row as Record<string, ReactNode>)[c.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">Menampilkan {filtered.length} dari {rows.length} data</p>
    </div>
  );
}
