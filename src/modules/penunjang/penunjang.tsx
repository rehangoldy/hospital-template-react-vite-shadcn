import { Activity, CheckCircle2, Cpu, Droplets, FlaskConical, Flame, Maximize2, Plus, Printer, ScanLine, ShieldCheck, Sparkles, TestTube2, Timer, Waves, Wind } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Input } from "@shared-ui/input";
import { Label } from "@shared-ui/label";
import { Textarea } from "@shared-ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared-ui/tabs";
import { Badge } from "@shared-ui/badge";
import { Progress } from "@shared-ui/progress";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { StatusBadge, type Tone } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";
import { cn } from "@lib-utils/utils";

/* ───────────────────────── Laboratorium ───────────────────────── */

const samples = [
  { barcode: "LAB-241014-0231", pasien: "Siti Aminah", asal: "Rawat Inap W-03", tes: "Darah Lengkap, SGOT/SGPT", sampel: "Darah EDTA + Serum", status: "Diterima", cito: true },
  { barcode: "LAB-241014-0232", pasien: "Budi Santoso", asal: "Poli Jantung", tes: "Profil Lipid, HbA1c", sampel: "Serum", status: "Di Analyzer", cito: false },
  { barcode: "LAB-241014-0233", pasien: "Ayu Kartika", asal: "IGD", tes: "Troponin I, D-Dimer", sampel: "Serum", status: "Menunggu Verifikasi", cito: true },
  { barcode: "LAB-241014-0234", pasien: "Agus Wijaya", asal: "Poli Ortopedi", tes: "Asam Urat, Kreatinin", sampel: "Serum", status: "Selesai", cito: false },
  { barcode: "LAB-241014-0235", pasien: "Maya Putri", asal: "Poli Obgyn", tes: "Urinalisis", sampel: "Urin", status: "Menunggu Sampel", cito: false },
];
const labTone: Record<string, Tone> = { Diterima: "info", "Di Analyzer": "purple", "Menunggu Verifikasi": "warning", Selesai: "success", "Menunggu Sampel": "neutral" };
const results = [
  { p: "Hemoglobin", v: "10,8", u: "g/dL", r: "12,0 – 15,5", f: "L" },
  { p: "Leukosit", v: "11.800", u: "/µL", r: "4.000 – 11.000", f: "H" },
  { p: "Trombosit", v: "265.000", u: "/µL", r: "150.000 – 400.000", f: "N" },
  { p: "Hematokrit", v: "34", u: "%", r: "36 – 46", f: "L" },
  { p: "SGOT", v: "28", u: "U/L", r: "< 35", f: "N" },
  { p: "SGPT", v: "31", u: "U/L", r: "< 45", f: "N" },
];
const analyzers = [
  { n: "Sysmex XN-1000", t: "Hematologi", s: "Online", tone: "success" as const, q: 4 },
  { n: "Cobas c311", t: "Kimia Klinik", s: "Online", tone: "success" as const, q: 11 },
  { n: "Cobas e411", t: "Imunologi", s: "Running QC", tone: "warning" as const, q: 3 },
  { n: "Urisys 1100", t: "Urinalisis", s: "Offline", tone: "danger" as const, q: 0 },
];

export function Laboratorium() {
  return (
    <Page>
      <PageHeader
        title="Laboratorium (LIS)"
        description="Penerimaan sampel, integrasi analyzer otomatis, input nilai hasil, dan verifikasi dokter patologi."
        actions={<><Button variant="outline" size="sm"><Printer className="size-4" /> Cetak Barcode</Button><Button size="sm"><Plus className="size-4" /> Order Manual</Button></>}
      />
      <StatGrid>
        <StatCard label="Order Hari Ini" value="326" icon={FlaskConical} />
        <StatCard label="Menunggu Verifikasi" value="14" icon={ShieldCheck} />
        <StatCard label="TAT Rata-rata" value="48 mnt" icon={Timer} hint="Target < 60" />
        <StatCard label="Nilai Kritis" value="3" icon={Activity} hint="Perlu dilaporkan" />
      </StatGrid>

      <Tabs defaultValue="sampel">
        <TabsList>
          <TabsTrigger value="sampel">Penerimaan Sampel</TabsTrigger>
          <TabsTrigger value="hasil">Input & Verifikasi Hasil</TabsTrigger>
          <TabsTrigger value="analyzer">Analyzer</TabsTrigger>
        </TabsList>

        <TabsContent value="sampel" className="mt-4">
          <Card><CardContent>
            <DataTable
              rows={samples}
              searchPlaceholder="Scan / cari barcode…"
              columns={[
                { key: "barcode", header: "Barcode", className: "font-mono text-xs" },
                { key: "pasien", header: "Pasien", render: (r) => <span className="font-medium">{r.pasien} {r.cito && <Badge className="ml-1 bg-rose-600 text-white hover:bg-rose-600">CITO</Badge>}</span> },
                { key: "asal", header: "Asal" },
                { key: "tes", header: "Pemeriksaan" },
                { key: "sampel", header: "Sampel" },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={labTone[r.status]}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="hasil" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><CardTitle>Hasil: Darah Lengkap & Fungsi Hati</CardTitle><CardDescription>LAB-241014-0231 · Siti Aminah · Auto-import dari analyzer</CardDescription></div>
                <div className="flex gap-2"><Button variant="outline" size="sm">Simpan Draft</Button><Button size="sm"><CheckCircle2 className="size-4" /> Verifikasi dr. Patologi</Button></div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                searchable={false}
                rows={results}
                columns={[
                  { key: "p", header: "Parameter", className: "font-medium" },
                  { key: "v", header: "Hasil", render: (r) => <Input defaultValue={r.v} className={cn("h-8 w-28 tabular-nums", r.f !== "N" && "border-rose-500/50 font-semibold text-rose-600 dark:text-rose-400")} /> },
                  { key: "u", header: "Satuan" },
                  { key: "r", header: "Nilai Rujukan", className: "tabular-nums text-muted-foreground" },
                  { key: "f", header: "Flag", render: (r) => r.f === "N" ? <StatusBadge tone="success">Normal</StatusBadge> : <StatusBadge tone="danger">{r.f === "H" ? "Tinggi ▲" : "Rendah ▼"}</StatusBadge> },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyzer" className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {analyzers.map((a) => (
            <Card key={a.n}>
              <CardHeader className="pb-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Cpu className="size-4" /></div>
                <CardTitle className="pt-2 text-base">{a.n}</CardTitle><CardDescription>{a.t}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between"><StatusBadge tone={a.tone}>{a.s}</StatusBadge><span className="text-xs text-muted-foreground">{a.q} antre</span></CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </Page>
  );
}

/* ───────────────────────── Radiologi ───────────────────────── */

const radOrders = [
  { acc: "RAD-0871", pasien: "Ayu Kartika", modalitas: "CT Scan", pemeriksaan: "CT Thorax kontras", dokter: "dr. Andi, Sp.PD", status: "Menunggu Ekspertise", cito: true },
  { acc: "RAD-0872", pasien: "Agus Wijaya", modalitas: "X-Ray", pemeriksaan: "Rontgen Femur AP/Lat", dokter: "dr. Bayu, Sp.OT", status: "Selesai", cito: false },
  { acc: "RAD-0873", pasien: "Maya Putri", modalitas: "USG", pemeriksaan: "USG Obstetri", dokter: "dr. Lia, Sp.OG", status: "Dalam Pemeriksaan", cito: false },
  { acc: "RAD-0874", pasien: "Budi Santoso", modalitas: "MRI", pemeriksaan: "MRI Lumbal", dokter: "dr. Rina, Sp.JP", status: "Terjadwal", cito: false },
  { acc: "RAD-0875", pasien: "Hendra W.", modalitas: "X-Ray", pemeriksaan: "Rontgen Thorax PA", dokter: "dr. Andi, Sp.PD", status: "Menunggu Ekspertise", cito: false },
];
const radTone: Record<string, Tone> = { "Menunggu Ekspertise": "warning", Selesai: "success", "Dalam Pemeriksaan": "purple", Terjadwal: "neutral" };

export function Radiologi() {
  return (
    <Page>
      <PageHeader
        title="Radiologi (RIS / PACS)"
        description="Order pemeriksaan Rontgen, USG, CT Scan, MRI; integrasi viewer PACS/DICOM; dan laporan ekspertise radiolog."
        actions={<Button size="sm"><Plus className="size-4" /> Order Pemeriksaan</Button>}
      />
      <StatGrid>
        <StatCard label="Order Hari Ini" value="94" icon={ScanLine} />
        <StatCard label="Menunggu Ekspertise" value="12" icon={Timer} />
        <StatCard label="CT Scan" value="14" icon={Waves} hint="Utilisasi 82%" />
        <StatCard label="Koneksi PACS" value="Online" icon={Activity} hint="DICOM · Orthanc" />
      </StatGrid>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader><CardTitle>Worklist Radiologi</CardTitle></CardHeader>
          <CardContent>
            <DataTable
              rows={radOrders}
              columns={[
                { key: "acc", header: "Accession", className: "font-mono text-xs" },
                { key: "pasien", header: "Pasien", render: (r) => <span className="font-medium">{r.pasien} {r.cito && <Badge className="ml-1 bg-rose-600 text-white hover:bg-rose-600">CITO</Badge>}</span> },
                { key: "modalitas", header: "Modalitas", render: (r) => <Badge variant="secondary">{r.modalitas}</Badge> },
                { key: "pemeriksaan", header: "Pemeriksaan" },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={radTone[r.status]}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between"><div><CardTitle>Viewer PACS</CardTitle><CardDescription>RAD-0871 · CT Thorax kontras</CardDescription></div><Button size="icon" variant="ghost"><Maximize2 className="size-4" /></Button></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-40 rounded-full bg-gradient-to-b from-zinc-300/20 to-zinc-600/10 blur-sm" />
                <div className="absolute size-24 rounded-full bg-zinc-200/10 blur-md" />
              </div>
              <div className="absolute left-2 top-2 font-mono text-[10px] leading-tight text-emerald-400">AYU KARTIKA<br />F · 34Y<br />CT THORAX</div>
              <div className="absolute right-2 top-2 text-right font-mono text-[10px] leading-tight text-emerald-400">WL 40 WW 400<br />Im 112/240</div>
              <div className="absolute bottom-2 left-2 font-mono text-[10px] text-emerald-400">Axial · 5.0mm</div>
              <p className="absolute inset-x-0 bottom-2 text-center text-[10px] text-zinc-500">Viewer DICOM terintegrasi (mockup)</p>
            </div>
            <div className="space-y-2">
              <Label>Ekspertise Radiolog</Label>
              <Textarea rows={4} placeholder="Temuan & kesan…" defaultValue="Tampak infiltrat pada lobus inferior paru kanan. Tidak tampak efusi pleura. Jantung dalam batas normal." />
              <div className="flex gap-2"><Button size="sm">Simpan & Validasi</Button><Button size="sm" variant="outline">Gunakan Template</Button></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}

/* ───────────────────────── Bank Darah & CSSD ───────────────────────── */

const bloodStock = [
  { g: "A+", w: 18, p: 9, t: 6 }, { g: "B+", w: 22, p: 11, t: 8 }, { g: "O+", w: 31, p: 14, t: 10 }, { g: "AB+", w: 7, p: 4, t: 2 },
  { g: "A−", w: 3, p: 1, t: 0 }, { g: "B−", w: 2, p: 2, t: 1 }, { g: "O−", w: 4, p: 2, t: 1 }, { g: "AB−", w: 1, p: 0, t: 0 },
];
const bloodBags = [
  { kantong: "BB-24-10231", gol: "O+", komponen: "Whole Blood", exp: "11 Nov 2026", lokasi: "Kulkas 1 / Rak B", status: "Tersedia" },
  { kantong: "BB-24-10232", gol: "A+", komponen: "PRC", exp: "02 Nov 2026", lokasi: "Kulkas 1 / Rak A", status: "Crossmatch" },
  { kantong: "BB-24-10198", gol: "B+", komponen: "PRC", exp: "20 Okt 2026", lokasi: "Kulkas 2 / Rak A", status: "Mendekati Kedaluwarsa" },
  { kantong: "BB-24-10240", gol: "O+", komponen: "Trombosit (TC)", exp: "17 Okt 2026", lokasi: "Agitator 1", status: "Dikeluarkan" },
];
const bloodTone: Record<string, Tone> = { Tersedia: "success", Crossmatch: "purple", "Mendekati Kedaluwarsa": "warning", Dikeluarkan: "info" };
const crossmatch = [
  { pasien: "Siti Aminah", gol: "A+", kantong: "BB-24-10232", mayor: "Kompatibel", minor: "Kompatibel", hasil: "Cocok" },
  { pasien: "Rudi Hartono", gol: "O+", kantong: "BB-24-10231", mayor: "Kompatibel", minor: "Dalam proses", hasil: "Proses" },
];

const cssdFlow = [
  { n: "Dekontaminasi", icon: Droplets, c: 6 }, { n: "Pencucian", icon: Waves, c: 4 }, { n: "Pengemasan", icon: Sparkles, c: 5 },
  { n: "Sterilisasi", icon: Flame, c: 3 }, { n: "Penyimpanan", icon: ShieldCheck, c: 22 }, { n: "Distribusi", icon: Wind, c: 2 },
];
const cssdBatches = [
  { batch: "STR-20241014-07", mesin: "Autoclave 1", metode: "Steam 134°C", set: "Set Laparoskopi Dasar (3)", indikator: "Lulus", mulai: "06:10" },
  { batch: "STR-20241014-08", mesin: "Autoclave 2", metode: "Steam 121°C", set: "Set Sectio Caesarea (2)", indikator: "Berjalan", mulai: "09:05" },
  { batch: "STR-20241014-09", mesin: "Plasma H₂O₂", metode: "Low-temp", set: "Endoskopi (2)", indikator: "Menunggu", mulai: "—" },
];

export function BankDarahCssd() {
  return (
    <Page>
      <PageHeader
        title="Bank Darah & CSSD"
        description="Pelacakan kantong darah, uji crossmatch, serta alur dekontaminasi dan sterilisasi instrumen bedah."
      />
      <Tabs defaultValue="darah">
        <TabsList>
          <TabsTrigger value="darah"><Droplets className="size-4" /> Bank Darah</TabsTrigger>
          <TabsTrigger value="cssd"><Flame className="size-4" /> CSSD</TabsTrigger>
        </TabsList>

        <TabsContent value="darah" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {bloodStock.map((b) => {
              const total = b.w + b.p + b.t;
              const low = total < 6;
              return (
                <Card key={b.g} className={cn("py-3 text-center", low && "border-rose-500/40")}>
                  <CardContent className="px-3">
                    <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{b.g}</p>
                    <p className="text-lg font-semibold tabular-nums">{total}</p>
                    <p className="text-[10px] text-muted-foreground">WB {b.w} · PRC {b.p} · TC {b.t}</p>
                    {low && <p className="mt-1 text-[10px] font-semibold text-rose-600 dark:text-rose-400">Stok rendah</p>}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="grid gap-4 xl:grid-cols-5">
            <Card className="xl:col-span-3">
              <CardHeader><CardTitle>Pelacakan Kantong Darah</CardTitle></CardHeader>
              <CardContent>
                <DataTable
                  rows={bloodBags}
                  columns={[
                    { key: "kantong", header: "No. Kantong", className: "font-mono text-xs" },
                    { key: "gol", header: "Gol.", className: "font-bold text-rose-600 dark:text-rose-400" },
                    { key: "komponen", header: "Komponen" },
                    { key: "exp", header: "Kedaluwarsa" },
                    { key: "lokasi", header: "Lokasi" },
                    { key: "status", header: "Status", render: (r) => <StatusBadge tone={bloodTone[r.status]}>{r.status}</StatusBadge> },
                  ]}
                />
              </CardContent>
            </Card>
            <Card className="xl:col-span-2">
              <CardHeader><CardTitle>Uji Crossmatch</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {crossmatch.map((c) => (
                  <div key={c.pasien} className="space-y-2 rounded-lg border p-3 text-sm">
                    <div className="flex items-center justify-between"><p className="font-medium">{c.pasien} <span className="text-muted-foreground">({c.gol})</span></p><StatusBadge tone={c.hasil === "Cocok" ? "success" : "purple"}>{c.hasil}</StatusBadge></div>
                    <p className="font-mono text-xs text-muted-foreground">{c.kantong}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs"><div className="rounded bg-muted/60 p-2">Mayor<br /><b>{c.mayor}</b></div><div className="rounded bg-muted/60 p-2">Minor<br /><b>{c.minor}</b></div></div>
                  </div>
                ))}
                <Button variant="outline" className="w-full"><TestTube2 className="size-4" /> Mulai Uji Baru</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cssd" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle>Alur Dekontaminasi → Distribusi</CardTitle><CardDescription>Jumlah set instrumen pada setiap tahap</CardDescription></CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
              {cssdFlow.map((s, i) => (
                <div key={s.n} className="relative rounded-lg border p-3">
                  <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary"><s.icon className="size-4" /></div>
                  <p className="text-xs text-muted-foreground">Tahap {i + 1}</p>
                  <p className="text-sm font-medium">{s.n}</p>
                  <p className="text-xl font-bold tabular-nums">{s.c}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Batch Sterilisasi</CardTitle></CardHeader>
            <CardContent>
              <DataTable
                searchable={false}
                rows={cssdBatches}
                columns={[
                  { key: "batch", header: "No. Batch", className: "font-mono text-xs" },
                  { key: "mesin", header: "Mesin" },
                  { key: "metode", header: "Metode" },
                  { key: "set", header: "Isi Batch" },
                  { key: "mulai", header: "Mulai", className: "tabular-nums" },
                  { key: "indikator", header: "Indikator Biologis", render: (r) => <StatusBadge tone={r.indikator === "Lulus" ? "success" : r.indikator === "Berjalan" ? "info" : "neutral"}>{r.indikator}</StatusBadge> },
                ]}
              />
              <div className="mt-4 max-w-sm space-y-1"><div className="flex justify-between text-xs"><span>Autoclave 2 · siklus berjalan</span><span>62%</span></div><Progress value={62} /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Page>
  );
}
