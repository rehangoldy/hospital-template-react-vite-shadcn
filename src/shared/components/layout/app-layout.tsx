import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@shared-ui/sidebar";
import { Separator } from "@shared-ui/separator";
import { Button } from "@shared-ui/button";
import { Input } from "@shared-ui/input";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@shared-ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared-ui/select";
import { Skeleton } from "@shared-ui/skeleton";
import { AppSidebar } from "./app-sidebar";
import { navGroups } from "../../config/navigation";

function useBreadcrumb() {
  const { pathname } = useLocation();
  if (pathname === "/dashboard") return { group: null, page: "Dashboard" };
  for (const g of navGroups) {
    const item = g.items.find((i) => i.url === pathname);
    if (item) return { group: g.title, page: item.title };
  }
  return { group: null, page: "" };
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} aria-label="Ganti tema">
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

export default function AppLayout() {
  const { group, page } = useBreadcrumb();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="hidden md:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/dashboard">Beranda</Link></BreadcrumbLink>
              </BreadcrumbItem>
              {group && (<><BreadcrumbSeparator /><BreadcrumbItem><span className="text-muted-foreground">{group}</span></BreadcrumbItem></>)}
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{page}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input placeholder="Cari pasien, No. RM, NIK…" className="h-9 w-64 pl-8" />
            </div>
            <Select defaultValue="jkt">
              <SelectTrigger className="h-9 w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="jkt">RS Medika Jakarta</SelectItem>
                <SelectItem value="bdg">RS Medika Bandung</SelectItem>
                <SelectItem value="sby">RS Medika Surabaya</SelectItem>
                <SelectItem value="all">Semua Cabang</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifikasi">
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Suspense fallback={<div className="space-y-4"><Skeleton className="h-10 w-72" /><Skeleton className="h-64 w-full" /></div>}>
            <Outlet />
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
