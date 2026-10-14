import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { BedDouble, CircleDollarSign, Clock, Download, Plus, Siren, Stethoscope, Users } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared-ui/card";
import {
  ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@shared-ui/chart";
import { Progress } from "@shared-ui/progress";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { GuarantorBadge, StatusBadge } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";

const visits = [
  { day: "Sen", rajal: 312, ranap: 48, igd: 64 },
  { day: "Sel", rajal: 345, ranap: 52, igd: 58 },
  { day: "Rab", rajal: 298, ranap: 55, igd: 71 },
  { day: "Kam", rajal: 376, ranap: 49, igd: 66 },
  { day: "Jum", rajal: 402, ranap: 58, igd: 80 },
  { day: "Sab", rajal: 268, ranap: 61, igd: 92 },
  { day: "Min", rajal: 142, ranap: 57, igd: 77 },
];
const visitConfig = {
  rajal: { label: "Rawat Jalan", color: "var(--chart-1)" },
  ranap: { label: "Rawat Inap", color: "var(--chart-2)" },
  igd: { label: "IGD", color: "var(--chart-4)" },
} satisfies ChartConfig;

const payer = [
  { name: "BPJS", value: 58, fill: "var(--chart-1)" },
  { name: "Asuransi", value: 18, fill: "var(--chart-2)" },
  { name: "Umum", value: 16, fill: "var(--chart-4)" },
  { name: "Perusahaan", value: 8, fill: "var(--chart-5)" },
];
const payerConfig = {
  value: { label: "Persentase" },
  BPJS: { label: "BPJS", color: "var(--chart-1)" },
  Asuransi: { label: "Asuransi", color: "var(--chart-2)" },
  Umum: { label: "Umum", color: "var(--chart-4)" },
  Perusahaan: { label: "Perusahaan", color: "var(--chart-5)" },
} satisfies ChartConfig;

const revenue = [
  { bulan: "Mei", pendapatan: 8.2, klaim: 5.1 },
  { bulan: "Jun", pendapatan: 8.9, klaim: 5.6 },
  { bulan: "Jul", pendapatan: 9.4, klaim: 6.0 },
  { bulan: "Agu", pendapatan: 9.1, klaim: 6.2 },
  { bulan: "Sep", pendapatan: 10.3, klaim: 6.8 },
  { bulan: "Okt", pendapatan: 11.0, klaim: 7.1 },
];
const revConfig = {
  pendapatan: { label: "Pendapatan (Rp M)", color: "var(--chart-1)" },
  klaim: { label: "Klaim BPJS/Asuransi (Rp M)", color: "var(--chart-2)" },
} satisfies ChartConfig;

const occupancy = [
  { unit: "VIP", used: 14, total: 20 },
  { unit: "Kelas 1", used: 31, total: 40 },
  { unit: "Kelas 2", used: 52, total: 60 },
  { unit: "Kelas 3", used: 88, total: 110 },
  { unit: "ICU / NICU", used: 17, total: 20 },
];

const alerts = [
  { id: 1, tone: "danger" as const, title: "Stok Amoxicillin 500mg kritis", meta: "Depo IGD · sisa 120 tablet" },
  { id: 2, tone: "warning" as const, title: "3 alat menunggu kalibrasi", meta: "Ventilator Servo-U, Monitor BSM-6000" },
  { id: 3, tone: "warning" as const, title: "14 klaim BPJS pending > 30 hari", meta: "Total Rp 482 jt" },
  { id: 4, tone: "info" as const, title: "Sinkronisasi SatuSehat tertunda", meta: "27 encounter antre kirim" },
];

const recent = [
  { rm: "RM-004281", nama: "Siti Aminah", poli: "Penyakit Dalam", dokter: "dr. Andi, Sp.PD", penjamin: "BPJS", status: "Dipanggil" },
  { rm: "RM-091233", nama: "Budi Santoso", poli: "Jantung", dokter: "dr. Rina, Sp.JP", penjamin: "Asuransi", status: "Menunggu" },
  { rm: "RM-077120", nama: "Dewi Lestari", poli: "Anak", dokter: "dr. Hadi, Sp.A", penjamin: "Umum", status: "Dalam Pemeriksaan" },
  { rm: "RM-112908", nama: "Agus Wijaya", poli: "Ortopedi", dokter: "dr. Bayu, Sp.OT", penjamin: "Perusahaan", status: "Menunggu" },
  { rm: "RM-065544", nama: "Maya Putri", poli: "Obgyn", dokter: "dr. Lia, Sp.OG", penjamin: "BPJS", status: "Selesai" },
];
const statusTone = { Dipanggil: "info", Menunggu: "warning", "Dalam Pemeriksaan": "purple", Selesai: "success" } as const;

export default function Dashboard() {
  return (
    <Page>
      <PageHeader
        title="Dashboard Operasional"
        description="Ringkasan real-time pelayanan, okupansi, keuangan, dan peringatan lintas modul — RS Medika Jakarta."
        actions={<>
          <Button variant="outline" size="sm"><Download className="size-4" /> Ekspor</Button>
          <Button size="sm"><Plus className="size-4" /> Pasien Baru</Button>
        </>}
      />

      <StatGrid>
        <StatCard label="Kunjungan Hari Ini" value="1.248" icon={Users} trend={{ value: "8,2%", up: true }} hint="vs kemarin" />
        <StatCard label="BOR (Bed Occupancy)" value="78,4%" icon={BedDouble} trend={{ value: "2,1%", up: true }} hint="202 / 250 bed" />
        <StatCard label="Pasien IGD Aktif" value="23" icon={Siren} hint="4 merah · 9 kuning" />
        <StatCard label="Pendapatan Bulan Ini" value="Rp 11,0 M" icon={CircleDollarSign} trend={{ value: "6,8%", up: true }} hint="vs bulan lalu" />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tren Kunjungan 7 Hari</CardTitle>
            <CardDescription>Rawat jalan, rawat inap, dan IGD</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={visitConfig} className="h-64 w-full aspect-auto">
              <BarChart data={visits}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="rajal" fill="var(--color-rajal)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ranap" fill="var(--color-ranap)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="igd" fill="var(--color-igd)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Komposisi Penjamin</CardTitle>
            <CardDescription>Persentase kunjungan bulan ini</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={payerConfig} className="mx-auto h-64 w-full aspect-auto">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={payer} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} strokeWidth={2}>
                  {payer.map((p) => <Cell key={p.name} fill={p.fill} />)}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pendapatan vs Klaim</CardTitle>
            <CardDescription>6 bulan terakhir (Rp miliar)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revConfig} className="h-56 w-full aspect-auto">
              <AreaChart data={revenue}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="bulan" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={28} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area dataKey="pendapatan" type="monotone" fill="var(--color-pendapatan)" fillOpacity={0.15} stroke="var(--color-pendapatan)" strokeWidth={2} />
                <Area dataKey="klaim" type="monotone" fill="var(--color-klaim)" fillOpacity={0.15} stroke="var(--color-klaim)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Okupansi Bed</CardTitle>
            <CardDescription>Per kelas perawatan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {occupancy.map((o) => (
              <div key={o.unit} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{o.unit}</span>
                  <span className="tabular-nums text-muted-foreground">{o.used}/{o.total}</span>
                </div>
                <Progress value={(o.used / o.total) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Stethoscope className="size-4" /> Antrean Poliklinik Terkini</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              searchable={false}
              rows={recent}
              columns={[
                { key: "rm", header: "No. RM", className: "font-mono text-xs" },
                { key: "nama", header: "Pasien", className: "font-medium" },
                { key: "poli", header: "Poli" },
                { key: "dokter", header: "Dokter" },
                { key: "penjamin", header: "Penjamin", render: (r) => <GuarantorBadge value={r.penjamin} /> },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={statusTone[r.status as keyof typeof statusTone]}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="size-4" /> Peringatan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="flex gap-3 rounded-lg border p-3">
                <StatusBadge tone={a.tone} className="h-fit capitalize">{a.tone === "danger" ? "Kritis" : a.tone === "warning" ? "Perhatian" : "Info"}</StatusBadge>
                <div className="min-w-0 text-sm">
                  <p className="font-medium leading-snug">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.meta}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
