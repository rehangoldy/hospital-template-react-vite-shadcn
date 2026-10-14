import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Banknote, CircleDollarSign, Clock, FileWarning, HandCoins, Landmark, Percent, Scale, TrendingUp } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared-ui/tabs";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@shared-ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared-ui/select";
import { Progress } from "@shared-ui/progress";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { StatusBadge, type Tone } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";
import { cn } from "@lib-utils/utils";

const rp = (n: number) => "Rp " + n.toLocaleString("id-ID");
const jt = (n: number) => `Rp ${(n / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;

/* ───────────────────────── GL & Cost Center ───────────────────────── */

const costCenter = [
  { unit: "Poliklinik", pendapatan: 2850, biaya: 1980 },
  { unit: "Rawat Inap", pendapatan: 4620, biaya: 3710 },
  { unit: "IGD", pendapatan: 1240, biaya: 1105 },
  { unit: "Laboratorium", pendapatan: 960, biaya: 540 },
  { unit: "Radiologi", pendapatan: 1180, biaya: 790 },
  { unit: "Kamar Bedah", pendapatan: 2380, biaya: 1650 },
];
const ccConfig = {
  pendapatan: { label: "Pendapatan (Rp jt)", color: "var(--chart-1)" },
  biaya: { label: "Biaya (Rp jt)", color: "var(--chart-4)" },
} satisfies ChartConfig;

const unitCost = [
  { unit: "Poliklinik", vol: "9.840 kunjungan", biaya: 201220, tarif: 289700 },
  { unit: "Rawat Inap", vol: "1.420 pasien-hari × LOS", biaya: 2612676, tarif: 3253521 },
  { unit: "IGD", vol: "1.980 kunjungan", biaya: 558080, tarif: 626262 },
  { unit: "Laboratorium", vol: "8.100 pemeriksaan", biaya: 66666, tarif: 118518 },
  { unit: "Radiologi", vol: "2.350 pemeriksaan", biaya: 336170, tarif: 502127 },
];
const journals = [
  { no: "JV-2410-1042", tgl: "14 Okt 2026", ket: "Pendapatan rawat inap harian", debit: "1-1200 Piutang Usaha", kredit: "4-1100 Pendapatan Rawat Inap", nilai: 482000000, cabang: "Jakarta" },
  { no: "JV-2410-1041", tgl: "14 Okt 2026", ket: "Pembelian obat — PO-2410-0045", debit: "1-1400 Persediaan Farmasi", kredit: "2-1100 Hutang Usaha", nilai: 187500000, cabang: "Jakarta" },
  { no: "JV-2410-1040", tgl: "13 Okt 2026", ket: "Penerimaan klaim BPJS Sep", debit: "1-1100 Kas & Bank", kredit: "1-1200 Piutang Usaha", nilai: 1240000000, cabang: "Bandung" },
  { no: "JV-2410-1039", tgl: "13 Okt 2026", ket: "Biaya gaji Okt", debit: "5-2100 Beban Gaji", kredit: "1-1100 Kas & Bank", nilai: 2150000000, cabang: "Surabaya" },
];

export function GL() {
  return (
    <Page>
      <PageHeader
        title="General Ledger & Cost Center"
        description="Pelaporan keuangan multi-cabang dan pencatatan biaya berbasis unit pelayanan (unit cost per poli, lab, rawat inap)."
        actions={
          <Select defaultValue="okt">
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="okt">Oktober 2026</SelectItem><SelectItem value="sep">September 2026</SelectItem><SelectItem value="agu">Agustus 2026</SelectItem></SelectContent>
          </Select>
        }
      />
      <StatGrid>
        <StatCard label="Total Pendapatan" value="Rp 13,2 M" icon={Banknote} trend={{ value: "6,8%", up: true }} />
        <StatCard label="Total Biaya" value="Rp 9,8 M" icon={Scale} trend={{ value: "3,1%", up: true }} />
        <StatCard label="Laba Operasional" value="Rp 3,4 M" icon={TrendingUp} trend={{ value: "14%", up: true }} />
        <StatCard label="Margin" value="25,8%" icon={Percent} />
      </StatGrid>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader><CardTitle>Pendapatan vs Biaya per Cost Center</CardTitle><CardDescription>Rp juta · Oktober 2026</CardDescription></CardHeader>
          <CardContent>
            <ChartContainer config={ccConfig} className="aspect-auto h-72 w-full">
              <BarChart data={costCenter}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="unit" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="pendapatan" fill="var(--color-pendapatan)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="biaya" fill="var(--color-biaya)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Unit Cost vs Tarif</CardTitle><CardDescription>Per layanan</CardDescription></CardHeader>
          <CardContent>
            <DataTable
              searchable={false}
              rows={unitCost}
              columns={[
                { key: "unit", header: "Unit", className: "font-medium" },
                { key: "biaya", header: "Unit Cost", className: "tabular-nums", render: (r) => rp(r.biaya) },
                { key: "tarif", header: "Tarif", className: "tabular-nums", render: (r) => rp(r.tarif) },
                { key: "m", header: "Margin", render: (r) => <StatusBadge tone="success">{Math.round(((r.tarif - r.biaya) / r.tarif) * 100)}%</StatusBadge> },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Jurnal Umum Terbaru</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            rows={journals}
            columns={[
              { key: "no", header: "No. Jurnal", className: "font-mono text-xs" },
              { key: "tgl", header: "Tanggal" },
              { key: "ket", header: "Keterangan", className: "font-medium" },
              { key: "debit", header: "Debit", className: "text-xs" },
              { key: "kredit", header: "Kredit", className: "text-xs" },
              { key: "nilai", header: "Nilai", className: "text-right tabular-nums", render: (r) => rp(r.nilai) },
              { key: "cabang", header: "Cabang" },
            ]}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

/* ───────────────────────── Jasmed ───────────────────────── */

const jasmed = [
  { dokter: "dr. Andi, Sp.PD", tindakan: 142, umum: 38400000, bpjs: 21600000, asuransi: 29900000, pct: "60 / 40 / 55", total: 89900000, status: "Draft" },
  { dokter: "dr. Bayu, Sp.B", tindakan: 61, umum: 52800000, bpjs: 33200000, asuransi: 41500000, pct: "50 / 35 / 50", total: 127500000, status: "Diverifikasi" },
  { dokter: "dr. Rina, Sp.JP", tindakan: 118, umum: 44100000, bpjs: 18900000, asuransi: 36200000, pct: "60 / 40 / 55", total: 99200000, status: "Draft" },
  { dokter: "dr. Lia, Sp.OG", tindakan: 87, umum: 31200000, bpjs: 27800000, asuransi: 22100000, pct: "55 / 40 / 55", total: 81100000, status: "Dibayar" },
];
const jmTone: Record<string, Tone> = { Draft: "warning", Diverifikasi: "info", Dibayar: "success" };
const jmRule = [
  { penjamin: "Umum", dasar: "Tarif RS", persen: 60 },
  { penjamin: "BPJS Kesehatan", dasar: "Tarif INA-CBG (alokasi jasa)", persen: 40 },
  { penjamin: "Asuransi Swasta", dasar: "Tarif disetujui asuransi", persen: 55 },
  { penjamin: "Perusahaan (PKS)", dasar: "Tarif kontrak PKS", persen: 55 },
];

export function Jasmed() {
  return (
    <Page>
      <PageHeader
        title="Remunerasi & Jasa Medis"
        description="Perhitungan bagi hasil jasa medis dokter/tenaga medis berdasarkan tindakan dan status penjamin."
        actions={<Button size="sm"><HandCoins className="size-4" /> Proses Periode Oktober</Button>}
      />
      <StatGrid>
        <StatCard label="Total Jasmed Periode" value={jt(397700000)} icon={HandCoins} />
        <StatCard label="Dokter Tercakup" value="86" icon={CircleDollarSign} />
        <StatCard label="Menunggu Verifikasi" value="23" icon={Clock} />
        <StatCard label="Rasio Jasmed/Pendapatan" value="31%" icon={Percent} />
      </StatGrid>
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="xl:col-span-3">
          <CardHeader><CardTitle>Rekap Jasmed Dokter</CardTitle></CardHeader>
          <CardContent>
            <DataTable
              rows={jasmed}
              columns={[
                { key: "dokter", header: "Dokter", className: "font-medium" },
                { key: "tindakan", header: "Tindakan", className: "tabular-nums" },
                { key: "umum", header: "Umum", className: "tabular-nums text-xs", render: (r) => jt(r.umum) },
                { key: "bpjs", header: "BPJS", className: "tabular-nums text-xs", render: (r) => jt(r.bpjs) },
                { key: "asuransi", header: "Asuransi", className: "tabular-nums text-xs", render: (r) => jt(r.asuransi) },
                { key: "total", header: "Total Jasmed", className: "tabular-nums font-semibold", render: (r) => jt(r.total) },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={jmTone[r.status]}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Aturan Bagi Hasil</CardTitle><CardDescription>Porsi jasa medis per penjamin</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {jmRule.map((r) => (
              <div key={r.penjamin} className="space-y-1.5">
                <div className="flex justify-between text-sm"><span className="font-medium">{r.penjamin}</span><span className="tabular-nums">{r.persen}%</span></div>
                <Progress value={r.persen} />
                <p className="text-xs text-muted-foreground">{r.dasar}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}

/* ───────────────────────── Piutang Klaim ───────────────────────── */

const aging = [
  { bucket: "0–30 hr", bpjs: 3200, asuransi: 1450, pks: 520 },
  { bucket: "31–60 hr", bpjs: 1800, asuransi: 980, pks: 340 },
  { bucket: "61–90 hr", bpjs: 720, asuransi: 610, pks: 190 },
  { bucket: "> 90 hr", bpjs: 310, asuransi: 440, pks: 120 },
];
const agingConfig = {
  bpjs: { label: "BPJS", color: "var(--chart-1)" },
  asuransi: { label: "Asuransi", color: "var(--chart-2)" },
  pks: { label: "Perusahaan", color: "var(--chart-4)" },
} satisfies ChartConfig;

const ar = [
  { id: "AR-2410-0182", penjamin: "BPJS Kesehatan", periode: "Sep 2026", tagihan: 3120000000, dibayar: 2640000000, usia: 28, status: "Sebagian Cair" },
  { id: "AR-2410-0179", penjamin: "AdMedika", periode: "Sep 2026", tagihan: 482000000, dibayar: 0, usia: 41, status: "Pending" },
  { id: "AR-2409-0151", penjamin: "Prudential", periode: "Agu 2026", tagihan: 218000000, dibayar: 150000000, usia: 66, status: "Dispute" },
  { id: "AR-2409-0140", penjamin: "PT Pertamina (PKS)", periode: "Agu 2026", tagihan: 340000000, dibayar: 340000000, usia: 0, status: "Lunas" },
  { id: "AR-2407-0098", penjamin: "BPJS Kesehatan", periode: "Jun 2026", tagihan: 96000000, dibayar: 0, usia: 104, status: "Dispute" },
];
const arTone: Record<string, Tone> = { "Sebagian Cair": "info", Pending: "warning", Dispute: "danger", Lunas: "success" };

export function Piutang() {
  return (
    <Page>
      <PageHeader
        title="Account Receivable — Piutang Klaim"
        description="Pemantauan status piutang klaim asuransi/BPJS, pencairan dana, rekonsiliasi pembayaran, dan penanganan klaim pending/dispute."
        actions={<Button size="sm"><Landmark className="size-4" /> Rekonsiliasi Bank</Button>}
      />
      <StatGrid>
        <StatCard label="Total Piutang Klaim" value="Rp 8,7 M" icon={CircleDollarSign} />
        <StatCard label="Cair Bulan Ini" value="Rp 5,9 M" icon={Banknote} trend={{ value: "9%", up: true }} />
        <StatCard label="Pending > 30 Hari" value="Rp 2,1 M" icon={Clock} />
        <StatCard label="Dispute" value="Rp 640 jt" icon={FileWarning} hint="17 klaim" />
      </StatGrid>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Umur Piutang (Aging)</CardTitle><CardDescription>Rp juta per penjamin</CardDescription></CardHeader>
          <CardContent>
            <ChartContainer config={agingConfig} className="aspect-auto h-64 w-full">
              <BarChart data={aging}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="bucket" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="bpjs" stackId="a" fill="var(--color-bpjs)" />
                <Bar dataKey="asuransi" stackId="a" fill="var(--color-asuransi)" />
                <Bar dataKey="pks" stackId="a" fill="var(--color-pks)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="xl:col-span-3">
          <CardHeader><CardTitle>Daftar Piutang</CardTitle></CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-3"><TabsTrigger value="all">Semua</TabsTrigger></TabsList>
              <TabsContent value="all">
                <DataTable
                  rows={ar}
                  columns={[
                    { key: "id", header: "No. AR", className: "font-mono text-xs" },
                    { key: "penjamin", header: "Penjamin", className: "font-medium" },
                    { key: "periode", header: "Periode" },
                    { key: "tagihan", header: "Tagihan", className: "tabular-nums text-xs", render: (r) => jt(r.tagihan) },
                    { key: "sisa", header: "Sisa", className: "tabular-nums text-xs font-semibold", render: (r) => jt(r.tagihan - r.dibayar) },
                    { key: "usia", header: "Umur", render: (r) => <span className={cn("tabular-nums", r.usia > 90 && "font-semibold text-rose-600 dark:text-rose-400")}>{r.usia} hr</span> },
                    { key: "status", header: "Status", render: (r) => <StatusBadge tone={arTone[r.status]}>{r.status}</StatusBadge> },
                  ]}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
