import { AlertOctagon, AlertTriangle, Boxes, CheckCircle2, ClipboardCheck, FileDown, FlaskConical, PackageCheck, Pill, Printer, Send, ShieldCheck, Tag, Truck, Undo2 } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared-ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@shared-ui/alert";
import { Badge } from "@shared-ui/badge";
import { Checkbox } from "@shared-ui/checkbox";
import { Label } from "@shared-ui/label";
import { Progress } from "@shared-ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared-ui/select";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { StatusBadge, type Tone } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";

/* ───────────────────────── E-Resep & Telaah ───────────────────────── */

const rxQueue = [
  { no: "RX-0452", pasien: "Siti Aminah", dokter: "dr. Andi, Sp.PD", asal: "Rawat Inap", item: 4, jenis: "Non-racik", status: "Telaah", warn: true },
  { no: "RX-0453", pasien: "Dewi Lestari", dokter: "dr. Hadi, Sp.A", asal: "Poli Anak", item: 3, jenis: "Racikan", status: "Peracikan", warn: false },
  { no: "RX-0454", pasien: "Budi Santoso", dokter: "dr. Rina, Sp.JP", asal: "Poli Jantung", item: 5, jenis: "Non-racik", status: "Siap Diserahkan", warn: false },
  { no: "RX-0455", pasien: "Agus Wijaya", dokter: "dr. Bayu, Sp.OT", asal: "Poli Ortopedi", item: 2, jenis: "Non-racik", status: "Baru", warn: false },
];
const rxTone: Record<string, Tone> = { Baru: "neutral", Telaah: "warning", Peracikan: "purple", "Siap Diserahkan": "success" };
const rxItems = [
  { obat: "Amoxicillin 500 mg", aturan: "3 × 1 tab · sesudah makan", jml: "15 tab", alert: "alergi" },
  { obat: "Omeprazole 20 mg", aturan: "2 × 1 kaps · sebelum makan", jml: "10 kaps", alert: "" },
  { obat: "Ketorolac 10 mg", aturan: "3 × 1 tab · sesudah makan", jml: "9 tab", alert: "interaksi" },
  { obat: "Paracetamol 500 mg", aturan: "3 × 1 tab · bila demam", jml: "10 tab", alert: "" },
];

export function Resep() {
  return (
    <Page>
      <PageHeader
        title="E-Prescription & Telaah Resep"
        description="Resep elektronik dari dokter langsung masuk antrean depo, dilengkapi skrining interaksi obat & alergi otomatis."
      />
      <StatGrid>
        <StatCard label="Resep Hari Ini" value="238" icon={Pill} />
        <StatCard label="Antrean Aktif" value="17" icon={ClipboardCheck} />
        <StatCard label="Waktu Tunggu Non-racik" value="14 mnt" icon={PackageCheck} hint="Target ≤ 30" />
        <StatCard label="Peringatan Interaksi" value="6" icon={AlertTriangle} />
      </StatGrid>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Antrean Resep</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {rxQueue.map((r, i) => (
              <button key={r.no} className={`w-full rounded-lg border p-3 text-left transition hover:bg-muted/50 ${i === 0 ? "border-primary bg-primary/5" : ""}`}>
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">{r.no}</span><StatusBadge tone={rxTone[r.status]}>{r.status}</StatusBadge></div>
                <p className="mt-1 font-medium">{r.pasien}</p>
                <p className="text-xs text-muted-foreground">{r.dokter} · {r.asal} · {r.item} item · {r.jenis}</p>
                {r.warn && <p className="mt-1 flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400"><AlertTriangle className="size-3" /> Ada peringatan klinis</p>}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Telaah Resep · RX-0452</CardTitle>
            <CardDescription>Siti Aminah · RM-004281 · 54 th · BB 62 kg</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertOctagon className="size-4" />
              <AlertTitle>Alergi: Amoxicillin</AlertTitle>
              <AlertDescription>Pasien memiliki riwayat alergi Penicillin (anafilaksis). Hubungi dokter penulis resep sebelum melanjutkan.</AlertDescription>
            </Alert>
            <Alert>
              <AlertTriangle className="size-4" />
              <AlertTitle>Interaksi: Ketorolac + Omeprazole (ringan)</AlertTitle>
              <AlertDescription>Pantau gejala saluran cerna. Tidak memerlukan penggantian obat.</AlertDescription>
            </Alert>
            <DataTable
              searchable={false}
              rows={rxItems}
              columns={[
                { key: "obat", header: "Obat", className: "font-medium" },
                { key: "aturan", header: "Aturan Pakai" },
                { key: "jml", header: "Jumlah" },
                { key: "alert", header: "Skrining", render: (r) => r.alert === "alergi" ? <StatusBadge tone="danger">Alergi</StatusBadge> : r.alert === "interaksi" ? <StatusBadge tone="warning">Interaksi</StatusBadge> : <StatusBadge tone="success">Aman</StatusBadge> },
              ]}
            />
            <div className="space-y-2 rounded-lg border p-3">
              <p className="text-sm font-medium">Checklist Telaah</p>
              {["Kejelasan tulisan & identitas pasien", "Kesesuaian dosis, frekuensi & rute", "Duplikasi terapi", "Ketersediaan stok & batch"].map((c, i) => (
                <div key={c} className="flex items-center gap-2"><Checkbox id={`tl-${i}`} defaultChecked={i > 1} /><Label htmlFor={`tl-${i}`} className="font-normal">{c}</Label></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="destructive" size="sm"><Undo2 className="size-4" /> Kembalikan ke Dokter</Button>
              <Button variant="outline" size="sm"><FlaskConical className="size-4" /> Modul Peracikan</Button>
              <Button variant="outline" size="sm"><Tag className="size-4" /> Cetak Etiket</Button>
              <Button size="sm"><CheckCircle2 className="size-4" /> Setujui & Siapkan</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Etiket Aturan Pakai Otomatis</CardTitle><CardDescription>Pratinjau etiket yang dicetak ke label printer</CardDescription></CardHeader>
        <CardContent>
          <div className="w-72 rounded-lg border-2 border-dashed p-3 text-sm">
            <div className="flex justify-between text-xs"><b>RS MEDIKA JAKARTA</b><span>14/10/2026</span></div>
            <hr className="my-1.5" />
            <p className="font-semibold">Siti Aminah · RM-004281</p>
            <p className="mt-1 text-lg font-bold">Omeprazole 20 mg</p>
            <p>2 × sehari 1 kapsul</p>
            <Badge variant="outline" className="mt-1">Sebelum makan</Badge>
            <p className="mt-1.5 text-xs text-muted-foreground">Exp: 08/2027 · Batch OMP2411A</p>
          </div>
        </CardContent>
      </Card>
    </Page>
  );
}

/* ───────────────────────── Inventori & Batch ───────────────────────── */

const batches = [
  { kode: "OBT-0012", nama: "Paracetamol 500 mg", batch: "PCT2401", exp: "12 Des 2026", sisa: 2400, min: 1000, gudang: "Gudang Pusat", hari: 59 },
  { kode: "OBT-0012", nama: "Paracetamol 500 mg", batch: "PCT2407", exp: "20 Jun 2027", sisa: 6000, min: 1000, gudang: "Gudang Pusat", hari: 249 },
  { kode: "OBT-0034", nama: "Amoxicillin 500 mg", batch: "AMX2312", exp: "30 Okt 2026", sisa: 320, min: 500, gudang: "Gudang Pusat", hari: 16 },
  { kode: "OBT-0034", nama: "Amoxicillin 500 mg", batch: "AMX2405", exp: "15 Mar 2027", sisa: 1800, min: 500, gudang: "Gudang Pusat", hari: 152 },
  { kode: "BMHP-0101", nama: "Spuit 3 cc", batch: "SPT2404", exp: "01 Feb 2028", sisa: 4200, min: 2000, gudang: "Gudang BMHP", hari: 475 },
  { kode: "OBT-0090", nama: "Insulin Aspart 100 IU/ml", batch: "INS2409", exp: "25 Okt 2026", sisa: 18, min: 40, gudang: "Cold Chain", hari: 11 },
];
const expTone = (d: number): Tone => (d <= 30 ? "danger" : d <= 90 ? "warning" : "success");

export function Inventori() {
  return (
    <Page>
      <PageHeader
        title="Inventory Control & Batch Management"
        description="Pengendalian stok obat & BMHP dengan aturan FIFO / FEFO, serta pelacakan nomor batch untuk drug recall."
        actions={<><Button variant="outline" size="sm"><FileDown className="size-4" /> Stock Opname</Button><Button variant="destructive" size="sm"><AlertOctagon className="size-4" /> Drug Recall</Button></>}
      />
      <StatGrid>
        <StatCard label="Total Item Aktif" value="1.842" icon={Boxes} />
        <StatCard label="Stok di Bawah Minimum" value="23" icon={AlertTriangle} />
        <StatCard label="Kedaluwarsa < 90 Hari" value="41" icon={AlertOctagon} />
        <StatCard label="Nilai Persediaan" value="Rp 4,8 M" icon={PackageCheck} />
      </StatGrid>

      <Card>
        <CardHeader><CardTitle>Stok per Batch</CardTitle><CardDescription>Urut FEFO — batch dengan kedaluwarsa terdekat dikeluarkan lebih dulu</CardDescription></CardHeader>
        <CardContent>
          <DataTable
            rows={[...batches].sort((a, b) => a.hari - b.hari)}
            searchPlaceholder="Cari obat / batch…"
            toolbar={
              <Select defaultValue="all">
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Gudang</SelectItem>
                  <SelectItem value="pusat">Gudang Pusat</SelectItem>
                  <SelectItem value="bmhp">Gudang BMHP</SelectItem>
                  <SelectItem value="cold">Cold Chain</SelectItem>
                </SelectContent>
              </Select>
            }
            columns={[
              { key: "kode", header: "Kode", className: "font-mono text-xs" },
              { key: "nama", header: "Nama Barang", className: "font-medium" },
              { key: "batch", header: "No. Batch", className: "font-mono text-xs" },
              { key: "exp", header: "Kedaluwarsa", render: (r) => <span className="flex items-center gap-2">{r.exp}<StatusBadge tone={expTone(r.hari)}>{r.hari} hr</StatusBadge></span> },
              { key: "sisa", header: "Stok", render: (r) => (
                <div className="w-32 space-y-1">
                  <span className="text-xs tabular-nums">{r.sisa.toLocaleString("id-ID")} <span className="text-muted-foreground">/ min {r.min}</span></span>
                  <Progress value={Math.min(100, (r.sisa / (r.min * 3)) * 100)} className="h-1" />
                </div>
              ) },
              { key: "gudang", header: "Lokasi" },
              { key: "ket", header: "", render: (r) => r.sisa < r.min ? <StatusBadge tone="danger">Reorder</StatusBadge> : null },
            ]}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

/* ───────────────────────── Narkotika & Psikotropika ───────────────────────── */

const narkReg = [
  { tgl: "14 Okt 2026", obat: "Morfin Inj 10 mg/ml", gol: "Narkotika", masuk: 0, keluar: 2, saldo: 38, ref: "RX-0451 · dr. Gita, Sp.An", petugas: "Apt. Dewi" },
  { tgl: "14 Okt 2026", obat: "Fentanyl Inj 50 mcg/ml", gol: "Narkotika", masuk: 0, keluar: 1, saldo: 24, ref: "OK-1 · dr. Gita, Sp.An", petugas: "Apt. Dewi" },
  { tgl: "13 Okt 2026", obat: "Diazepam 5 mg", gol: "Psikotropika", masuk: 200, keluar: 0, saldo: 460, ref: "PO-2410-017", petugas: "Apt. Rama" },
  { tgl: "13 Okt 2026", obat: "Alprazolam 0,5 mg", gol: "Psikotropika", masuk: 0, keluar: 10, saldo: 190, ref: "RX-0432 · dr. Ratih, Sp.KJ", petugas: "Apt. Rama" },
];

export function Narkotika() {
  return (
    <Page>
      <PageHeader
        title="Narkotika & Psikotropika"
        description="Buku register obat khusus dengan pencatatan ketat dan laporan regulasi ke SIPNAP (Kemenkes/BPOM)."
        actions={<Button size="sm"><Send className="size-4" /> Lapor SIPNAP</Button>}
      />
      <StatGrid>
        <StatCard label="Item Narkotika" value="9" icon={ShieldCheck} />
        <StatCard label="Item Psikotropika" value="27" icon={ShieldCheck} />
        <StatCard label="Selisih Stok Opname" value="0" icon={CheckCircle2} hint="Sesuai" />
        <StatCard label="Laporan SIPNAP Okt" value="Draft" icon={Send} hint="Tenggat 10 Nov" />
      </StatGrid>
      <Tabs defaultValue="register">
        <TabsList><TabsTrigger value="register">Buku Register</TabsTrigger><TabsTrigger value="sipnap">Laporan SIPNAP</TabsTrigger></TabsList>
        <TabsContent value="register" className="mt-4">
          <Card><CardContent>
            <DataTable
              rows={narkReg}
              columns={[
                { key: "tgl", header: "Tanggal" },
                { key: "obat", header: "Obat", className: "font-medium" },
                { key: "gol", header: "Golongan", render: (r) => <StatusBadge tone={r.gol === "Narkotika" ? "danger" : "purple"}>{r.gol}</StatusBadge> },
                { key: "masuk", header: "Masuk", className: "tabular-nums" },
                { key: "keluar", header: "Keluar", className: "tabular-nums" },
                { key: "saldo", header: "Saldo", className: "tabular-nums font-semibold" },
                { key: "ref", header: "Referensi" },
                { key: "petugas", header: "Petugas" },
              ]}
            />
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="sipnap" className="mt-4">
          <Card className="max-w-xl">
            <CardHeader><CardTitle>Pelaporan SIPNAP — Oktober 2026</CardTitle><CardDescription>Sistem Pelaporan Narkotika dan Psikotropika</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {[["Data stok awal", "Lengkap"], ["Penerimaan (PBF)", "Lengkap"], ["Penggunaan per resep", "Lengkap"], ["Validasi saldo akhir", "Menunggu"]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-lg border p-3 text-sm"><span>{k}</span><StatusBadge tone={v === "Lengkap" ? "success" : "warning"}>{v}</StatusBadge></div>
              ))}
              <Button className="w-full" disabled>Kirim ke SIPNAP</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Page>
  );
}

/* ───────────────────────── Depo & Distribusi ───────────────────────── */

const distributions = [
  { no: "DST-1014-021", dari: "Gudang Farmasi Pusat", ke: "Depo Rawat Inap Lt. 3", item: 24, tipe: "Floor Stock", status: "Dikirim" },
  { no: "DST-1014-022", dari: "Gudang Farmasi Pusat", ke: "Depo IGD", item: 12, tipe: "Replenishment", status: "Disiapkan" },
  { no: "DST-1014-023", dari: "Depo OK", ke: "Kamar Operasi OK-1", item: 9, tipe: "Paket Operasi", status: "Diterima" },
  { no: "DST-1014-024", dari: "Depo Rawat Inap Lt. 2", ke: "Bangsal Mawar", item: 58, tipe: "Unit Dose (24 jam)", status: "Diminta" },
];
const distTone: Record<string, Tone> = { Dikirim: "info", Disiapkan: "purple", Diterima: "success", Diminta: "warning" };
const depos = [
  { n: "Gudang Pusat", p: 92 }, { n: "Depo Rawat Jalan", p: 76 }, { n: "Depo Rawat Inap", p: 64 }, { n: "Depo IGD", p: 38 }, { n: "Depo Kamar Operasi", p: 81 },
];

export function Depo() {
  return (
    <Page>
      <PageHeader
        title="Depo & Distribusi Unit"
        description="Distribusi stok dari gudang farmasi pusat ke depo rawat inap, IGD, dan kamar operasi, termasuk unit dose dispensing."
        actions={<Button size="sm"><Truck className="size-4" /> Permintaan Mutasi</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Level Stok Depo</CardTitle><CardDescription>% terhadap level maksimum</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {depos.map((d) => (
              <div key={d.n} className="space-y-1.5">
                <div className="flex justify-between text-sm"><span>{d.n}</span><span className={d.p < 40 ? "font-semibold text-rose-600 dark:text-rose-400" : "text-muted-foreground"}>{d.p}%</span></div>
                <Progress value={d.p} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Mutasi & Distribusi</CardTitle></CardHeader>
          <CardContent>
            <DataTable
              rows={distributions}
              columns={[
                { key: "no", header: "No. Mutasi", className: "font-mono text-xs" },
                { key: "dari", header: "Dari" },
                { key: "ke", header: "Ke" },
                { key: "item", header: "Item", className: "tabular-nums" },
                { key: "tipe", header: "Jenis", render: (r) => <Badge variant="secondary">{r.tipe}</Badge> },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={distTone[r.status]}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Printer className="size-4" /> Unit Dose Dispensing</CardTitle><CardDescription>Obat disiapkan per pasien per dosis untuk 24 jam berikutnya</CardDescription></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[["Bangsal Mawar", 18, 14], ["Bangsal Melati", 12, 12], ["ICU", 8, 5], ["Bangsal Anggrek", 15, 3]].map(([n, t, d]) => (
            <div key={n as string} className="rounded-lg border p-3">
              <p className="font-medium">{n}</p>
              <p className="text-xs text-muted-foreground">{d} dari {t} pasien siap</p>
              <Progress className="mt-2" value={((d as number) / (t as number)) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>
    </Page>
  );
}
