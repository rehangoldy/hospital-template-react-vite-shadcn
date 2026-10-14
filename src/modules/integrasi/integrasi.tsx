import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ArrowLeftRight, Boxes, Building2, CheckCircle2, CloudUpload, Database, Globe2, RefreshCw, Share2, Users, XCircle } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared-ui/tabs";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@shared-ui/chart";
import { Progress } from "@shared-ui/progress";
import { Switch } from "@shared-ui/switch";
import { Badge } from "@shared-ui/badge";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { StatusBadge, type Tone } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";

/* ───────────────────────── SatuSehat & Bridging ───────────────────────── */

const fhir = [
  { res: "Patient", desc: "Identitas pasien (IHS Number)", sent: 12480, fail: 3, tone: "success" as const },
  { res: "Encounter", desc: "Kunjungan rawat jalan/inap/IGD", sent: 11920, fail: 27, tone: "warning" as const },
  { res: "Condition", desc: "Diagnosis ICD-10", sent: 11204, fail: 8, tone: "success" as const },
  { res: "Observation", desc: "Tanda vital & hasil lab", sent: 28340, fail: 41, tone: "warning" as const },
  { res: "Procedure", desc: "Tindakan ICD-9-CM", sent: 4210, fail: 0, tone: "success" as const },
  { res: "MedicationRequest", desc: "Resep & pemberian obat", sent: 9870, fail: 12, tone: "success" as const },
  { res: "DiagnosticReport", desc: "Laporan lab & radiologi", sent: 6120, fail: 5, tone: "success" as const },
];
const bridges = [
  { n: "SatuSehat (Kemenkes)", d: "HL7 FHIR R4 · OAuth2", s: "Terhubung", tone: "success" as const, on: true, last: "2 menit lalu" },
  { n: "SIRS Online", d: "Laporan rutin RL 1–5", s: "Terhubung", tone: "success" as const, on: true, last: "Kemarin 23:00" },
  { n: "RS Online (Kemenkes)", d: "Ketersediaan bed & SDM", s: "Terhubung", tone: "success" as const, on: true, last: "10 menit lalu" },
  { n: "BPJS VClaim / Aplicares", d: "SEP & ketersediaan kamar", s: "Terhubung", tone: "success" as const, on: true, last: "1 menit lalu" },
  { n: "SIPNAP", d: "Narkotika & Psikotropika", s: "Token kedaluwarsa", tone: "danger" as const, on: false, last: "09 Okt 2026" },
];
const queue = [
  { id: "ENC-882104", res: "Encounter", pasien: "Siti Aminah", waktu: "14 Okt · 08:12", status: "Terkirim", err: "—" },
  { id: "OBS-410023", res: "Observation", pasien: "Ayu Kartika", waktu: "14 Okt · 08:50", status: "Antre", err: "—" },
  { id: "ENC-882117", res: "Encounter", pasien: "Hendra W.", waktu: "14 Okt · 08:55", status: "Gagal", err: "IHS Number tidak ditemukan" },
  { id: "CND-310009", res: "Condition", pasien: "Maya Putri", waktu: "14 Okt · 09:02", status: "Terkirim", err: "—" },
];
const qTone: Record<string, Tone> = { Terkirim: "success", Antre: "warning", Gagal: "danger" };

export function SatuSehat() {
  return (
    <Page>
      <PageHeader
        title="SatuSehat & Bridging Eksternal"
        description="Integrasi API standar HL7/FHIR untuk pelaporan rekam medis nasional ke SatuSehat, SIRS Online, dan RS Online."
        actions={<Button size="sm"><RefreshCw className="size-4" /> Sinkronkan Sekarang</Button>}
      />
      <StatGrid>
        <StatCard label="Resource Terkirim (Bulan)" value="84.144" icon={CloudUpload} />
        <StatCard label="Success Rate" value="99,8%" icon={CheckCircle2} />
        <StatCard label="Antre Kirim" value="27" icon={RefreshCw} />
        <StatCard label="Gagal / Perlu Perbaikan" value="96" icon={XCircle} />
      </StatGrid>

      <Tabs defaultValue="fhir">
        <TabsList><TabsTrigger value="fhir">FHIR Resources</TabsTrigger><TabsTrigger value="bridge">Koneksi Eksternal</TabsTrigger><TabsTrigger value="queue">Antrean Pengiriman</TabsTrigger></TabsList>
        <TabsContent value="fhir" className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {fhir.map((f) => {
            const rate = ((f.sent - f.fail) / f.sent) * 100;
            return (
              <Card key={f.res} className="py-4">
                <CardContent className="space-y-2 px-4">
                  <div className="flex items-center justify-between"><p className="font-mono text-sm font-semibold">{f.res}</p><StatusBadge tone={f.tone}>{rate.toFixed(1)}%</StatusBadge></div>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                  <Progress value={rate} className="h-1.5" />
                  <p className="text-xs tabular-nums text-muted-foreground">{f.sent.toLocaleString("id-ID")} terkirim · <span className={f.fail ? "text-rose-600 dark:text-rose-400" : ""}>{f.fail} gagal</span></p>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
        <TabsContent value="bridge" className="mt-4 space-y-3">
          {bridges.map((b) => (
            <Card key={b.n} className="py-4">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Share2 className="size-4" /></div>
                  <div><p className="font-medium">{b.n}</p><p className="text-xs text-muted-foreground">{b.d}</p></div>
                </div>
                <div className="flex items-center gap-4"><span className="text-xs text-muted-foreground">Sinkron terakhir: {b.last}</span><StatusBadge tone={b.tone}>{b.s}</StatusBadge><Switch defaultChecked={b.on} /></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="queue" className="mt-4"><Card><CardContent>
          <DataTable
            rows={queue}
            columns={[
              { key: "id", header: "ID", className: "font-mono text-xs" },
              { key: "res", header: "Resource", render: (r) => <Badge variant="outline" className="font-mono">{r.res}</Badge> },
              { key: "pasien", header: "Pasien", className: "font-medium" },
              { key: "waktu", header: "Waktu" },
              { key: "status", header: "Status", render: (r) => <StatusBadge tone={qTone[r.status]}>{r.status}</StatusBadge> },
              { key: "err", header: "Keterangan", className: "text-xs text-muted-foreground" },
              { key: "a", header: "", render: (r) => r.status === "Gagal" ? <Button size="sm" variant="outline">Kirim Ulang</Button> : null },
            ]}
          />
        </CardContent></Card></TabsContent>
      </Tabs>
    </Page>
  );
}

/* ───────────────────────── Multi-Branch Hub ───────────────────────── */

const branches = [
  { kode: "JKT", nama: "RS Medika Jakarta", kota: "Jakarta Pusat", bed: 250, bor: 78, pasien: 1248, pendapatan: 11.0, status: "Pusat" },
  { kode: "BDG", nama: "RS Medika Bandung", kota: "Bandung", bed: 180, bor: 71, pasien: 842, pendapatan: 7.4, status: "Cabang" },
  { kode: "SBY", nama: "RS Medika Surabaya", kota: "Surabaya", bed: 210, bor: 83, pasien: 1015, pendapatan: 9.2, status: "Cabang" },
  { kode: "MDN", nama: "Klinik Medika Medan", kota: "Medan", bed: 40, bor: 58, pasien: 310, pendapatan: 2.1, status: "Klinik" },
];
const consol = [
  { bulan: "Mei", jkt: 8.2, bdg: 5.9, sby: 7.1, mdn: 1.6 },
  { bulan: "Jun", jkt: 8.9, bdg: 6.2, sby: 7.6, mdn: 1.7 },
  { bulan: "Jul", jkt: 9.4, bdg: 6.6, sby: 8.0, mdn: 1.8 },
  { bulan: "Agu", jkt: 9.1, bdg: 6.9, sby: 8.4, mdn: 1.9 },
  { bulan: "Sep", jkt: 10.3, bdg: 7.1, sby: 8.8, mdn: 2.0 },
  { bulan: "Okt", jkt: 11.0, bdg: 7.4, sby: 9.2, mdn: 2.1 },
];
const consolConfig = {
  jkt: { label: "Jakarta", color: "var(--chart-1)" },
  bdg: { label: "Bandung", color: "var(--chart-2)" },
  sby: { label: "Surabaya", color: "var(--chart-4)" },
  mdn: { label: "Medan", color: "var(--chart-5)" },
} satisfies ChartConfig;

const stockConsol = [
  { obat: "Paracetamol 500 mg", jkt: 8400, bdg: 2100, sby: 5300, mdn: 900, saran: "Transfer 1.500 → Bandung" },
  { obat: "Amoxicillin 500 mg", jkt: 2120, bdg: 480, sby: 1650, mdn: 210, saran: "Transfer 600 → Bandung" },
  { obat: "Insulin Aspart", jkt: 58, bdg: 14, sby: 63, mdn: 8, saran: "Transfer 20 → Bandung & Medan" },
  { obat: "Spuit 3 cc", jkt: 4200, bdg: 3900, sby: 4100, mdn: 800, saran: "Seimbang" },
];

export function MultiBranch() {
  return (
    <Page>
      <PageHeader
        title="Multi-Branch Data Hub"
        description="Master data pasien terpusat (satu rekam medis untuk semua cabang), konsolidasi stok antar cabang, dan laporan laba rugi konsolidasian."
        actions={<Button size="sm"><ArrowLeftRight className="size-4" /> Transfer Stok Antar Cabang</Button>}
      />
      <StatGrid>
        <StatCard label="Cabang Aktif" value="4" icon={Building2} />
        <StatCard label="Master Pasien Terpusat" value="318.402" icon={Users} hint="1 RM lintas cabang" />
        <StatCard label="Pendapatan Konsolidasi" value="Rp 29,7 M" icon={Globe2} trend={{ value: "7,4%", up: true }} />
        <StatCard label="Sinkronisasi Master Data" value="Realtime" icon={Database} />
      </StatGrid>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {branches.map((b) => (
          <Card key={b.kode}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between"><div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{b.kode}</div><StatusBadge tone={b.status === "Pusat" ? "info" : "neutral"}>{b.status}</StatusBadge></div>
              <CardTitle className="pt-2 text-base">{b.nama}</CardTitle><CardDescription>{b.kota} · {b.bed} bed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-1"><div className="flex justify-between text-xs"><span className="text-muted-foreground">BOR</span><span className="tabular-nums">{b.bor}%</span></div><Progress value={b.bor} /></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Kunjungan/hari</span><span className="font-medium tabular-nums">{b.pasien.toLocaleString("id-ID")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pendapatan</span><span className="font-medium tabular-nums">Rp {b.pendapatan} M</span></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pl">
        <TabsList><TabsTrigger value="pl">Laba Rugi Konsolidasi</TabsTrigger><TabsTrigger value="stok"><Boxes className="size-4" /> Konsolidasi Stok</TabsTrigger></TabsList>
        <TabsContent value="pl" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Pendapatan per Cabang</CardTitle><CardDescription>Rp miliar · 6 bulan terakhir</CardDescription></CardHeader>
            <CardContent>
              <ChartContainer config={consolConfig} className="aspect-auto h-72 w-full">
                <BarChart data={consol}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="bulan" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={28} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="jkt" stackId="a" fill="var(--color-jkt)" />
                  <Bar dataKey="bdg" stackId="a" fill="var(--color-bdg)" />
                  <Bar dataKey="sby" stackId="a" fill="var(--color-sby)" />
                  <Bar dataKey="mdn" stackId="a" fill="var(--color-mdn)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stok" className="mt-4"><Card><CardContent>
          <DataTable
            rows={stockConsol}
            columns={[
              { key: "obat", header: "Barang", className: "font-medium" },
              { key: "jkt", header: "Jakarta", className: "tabular-nums" },
              { key: "bdg", header: "Bandung", className: "tabular-nums" },
              { key: "sby", header: "Surabaya", className: "tabular-nums" },
              { key: "mdn", header: "Medan", className: "tabular-nums" },
              { key: "saran", header: "Rekomendasi", render: (r) => <StatusBadge tone={r.saran === "Seimbang" ? "success" : "warning"}>{r.saran}</StatusBadge> },
            ]}
          />
        </CardContent></Card></TabsContent>
      </Tabs>
    </Page>
  );
}
