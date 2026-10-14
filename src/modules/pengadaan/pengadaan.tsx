import { AlertTriangle, CalendarClock, ClipboardList, FilePlus2, PackageSearch, Plus, ShoppingCart, Stethoscope, Timer, Truck, Wrench } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared-ui/tabs";
import { Badge } from "@shared-ui/badge";
import { Progress } from "@shared-ui/progress";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { StatusBadge, type Tone } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";

const rp = (n: number) => "Rp " + n.toLocaleString("id-ID");

/* ───────────────────────── Procurement ───────────────────────── */

const prs = [
  { no: "PR-2410-0123", unit: "Depo IGD", pemohon: "Apt. Dewi", item: 8, est: 18500000, prioritas: "Urgent", status: "Menunggu Approval" },
  { no: "PR-2410-0122", unit: "Kamar Operasi", pemohon: "Ns. Ratna", item: 14, est: 42300000, prioritas: "Normal", status: "Disetujui" },
  { no: "PR-2410-0121", unit: "Laboratorium", pemohon: "Dr. Sinta", item: 5, est: 27800000, prioritas: "Normal", status: "Menjadi PO" },
  { no: "PR-2410-0120", unit: "Umum / Rumah Tangga", pemohon: "Pak Joko", item: 22, est: 9600000, prioritas: "Rendah", status: "Ditolak" },
];
const pos = [
  { no: "PO-2410-0045", vendor: "PT Kimia Farma Trading", kategori: "Farmasi", total: 187500000, tgl: "12 Okt 2026", eta: "18 Okt 2026", status: "Dikirim Sebagian" },
  { no: "PO-2410-0046", vendor: "PT Enseval Putera Megatrading", kategori: "Farmasi", total: 96200000, tgl: "13 Okt 2026", eta: "17 Okt 2026", status: "Dipesan" },
  { no: "PO-2410-0047", vendor: "PT Mitra Alkes Sejahtera", kategori: "Alat Kesehatan", total: 345000000, tgl: "13 Okt 2026", eta: "30 Okt 2026", status: "Dipesan" },
  { no: "PO-2410-0043", vendor: "CV Sinar Bersih", kategori: "Non-Medis", total: 14800000, tgl: "08 Okt 2026", eta: "—", status: "Diterima (GRN)" },
];
const contracts = [
  { vendor: "PT Kimia Farma Trading", ruang: "Pengadaan obat berkala", mulai: "01 Jan 2026", selesai: "31 Des 2026", nilai: 2400000000, sisa: 38 },
  { vendor: "PT Mitra Alkes Sejahtera", ruang: "BMHP rutin", mulai: "01 Mar 2026", selesai: "28 Feb 2027", nilai: 1250000000, sisa: 61 },
  { vendor: "PT Linde Gas Indonesia", ruang: "Gas medis (O₂, N₂O)", mulai: "01 Jul 2025", selesai: "30 Jun 2027", nilai: 780000000, sisa: 44 },
];
const prTone: Record<string, Tone> = { "Menunggu Approval": "warning", Disetujui: "success", "Menjadi PO": "info", Ditolak: "danger" };
const poTone: Record<string, Tone> = { "Dikirim Sebagian": "warning", Dipesan: "info", "Diterima (GRN)": "success" };

export function Procurement() {
  return (
    <Page>
      <PageHeader
        title="Pengadaan Medis & Non-Medis"
        description="Purchase Requisition dari unit/depo, Purchase Order ke distributor farmasi/alkes, dan kontrak pengadaan berkala."
        actions={<><Button variant="outline" size="sm"><FilePlus2 className="size-4" /> Buat PR</Button><Button size="sm"><ShoppingCart className="size-4" /> Buat PO</Button></>}
      />
      <StatGrid>
        <StatCard label="PR Menunggu Approval" value="7" icon={ClipboardList} />
        <StatCard label="PO Aktif" value="23" icon={ShoppingCart} />
        <StatCard label="Menunggu Pengiriman" value="9" icon={Truck} />
        <StatCard label="Nilai PO Bulan Ini" value="Rp 1,2 M" icon={PackageSearch} />
      </StatGrid>

      <Tabs defaultValue="pr">
        <TabsList><TabsTrigger value="pr">Purchase Requisition</TabsTrigger><TabsTrigger value="po">Purchase Order</TabsTrigger><TabsTrigger value="kontrak">Kontrak Berkala</TabsTrigger></TabsList>
        <TabsContent value="pr" className="mt-4"><Card><CardContent>
          <DataTable
            rows={prs}
            columns={[
              { key: "no", header: "No. PR", className: "font-mono text-xs" },
              { key: "unit", header: "Unit Pemohon" },
              { key: "pemohon", header: "Pemohon" },
              { key: "item", header: "Item", className: "tabular-nums" },
              { key: "est", header: "Estimasi", className: "tabular-nums", render: (r) => rp(r.est) },
              { key: "prioritas", header: "Prioritas", render: (r) => <Badge variant={r.prioritas === "Urgent" ? "destructive" : "secondary"}>{r.prioritas}</Badge> },
              { key: "status", header: "Status", render: (r) => <StatusBadge tone={prTone[r.status]}>{r.status}</StatusBadge> },
            ]}
          />
        </CardContent></Card></TabsContent>
        <TabsContent value="po" className="mt-4"><Card><CardContent>
          <DataTable
            rows={pos}
            columns={[
              { key: "no", header: "No. PO", className: "font-mono text-xs" },
              { key: "vendor", header: "Distributor / Vendor", className: "font-medium" },
              { key: "kategori", header: "Kategori", render: (r) => <Badge variant="outline">{r.kategori}</Badge> },
              { key: "total", header: "Total", className: "tabular-nums", render: (r) => rp(r.total) },
              { key: "tgl", header: "Tgl PO" },
              { key: "eta", header: "ETA" },
              { key: "status", header: "Status", render: (r) => <StatusBadge tone={poTone[r.status]}>{r.status}</StatusBadge> },
            ]}
          />
        </CardContent></Card></TabsContent>
        <TabsContent value="kontrak" className="mt-4 grid gap-3 md:grid-cols-3">
          {contracts.map((c) => (
            <Card key={c.vendor}>
              <CardHeader><CardTitle className="text-base">{c.vendor}</CardTitle><CardDescription>{c.ruang}</CardDescription></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Periode</span><span>{c.mulai} – {c.selesai}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Nilai kontrak</span><span className="font-medium tabular-nums">{rp(c.nilai)}</span></div>
                <div className="space-y-1"><div className="flex justify-between text-xs"><span className="text-muted-foreground">Plafon terserap</span><span>{100 - c.sisa}%</span></div><Progress value={100 - c.sisa} /></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </Page>
  );
}

/* ───────────────────────── Aset & Kalibrasi ───────────────────────── */

const assets = [
  { kode: "AST-VEN-003", nama: "Ventilator Servo-U", lokasi: "ICU", merk: "Getinge", kondisi: "Baik", kalibrasi: "20 Nov 2026", hari: 37 },
  { kode: "AST-MON-017", nama: "Patient Monitor BSM-6000", lokasi: "IGD", merk: "Nihon Kohden", kondisi: "Perlu Kalibrasi", kalibrasi: "18 Okt 2026", hari: 4 },
  { kode: "AST-ANE-002", nama: "Mesin Anestesi Aestiva", lokasi: "OK-1", merk: "GE Healthcare", kondisi: "Baik", kalibrasi: "05 Des 2026", hari: 52 },
  { kode: "AST-USG-006", nama: "USG 4D Voluson E8", lokasi: "Radiologi", merk: "GE Healthcare", kondisi: "Dalam Perbaikan", kalibrasi: "—", hari: 90 },
  { kode: "AST-DEF-004", nama: "Defibrillator LIFEPAK 15", lokasi: "IGD", merk: "Stryker", kondisi: "Baik", kalibrasi: "02 Nov 2026", hari: 19 },
  { kode: "AST-INF-021", nama: "Infusion Pump Terufusion", lokasi: "Rawat Inap Lt. 3", merk: "Terumo", kondisi: "Baik", kalibrasi: "15 Jan 2027", hari: 93 },
];
const kondTone: Record<string, Tone> = { Baik: "success", "Perlu Kalibrasi": "warning", "Dalam Perbaikan": "danger" };
const downtime = [
  { alat: "USG 4D Voluson E8", mulai: "10 Okt 2026", selesai: "Berjalan", lama: "4 hari", sebab: "Probe transducer rusak", teknisi: "Vendor GE" },
  { alat: "Ventilator Servo-U (AST-VEN-001)", mulai: "02 Sep 2026", selesai: "05 Sep 2026", lama: "3 hari", sebab: "Sensor aliran", teknisi: "Tim IPSRS" },
  { alat: "Autoclave 2", mulai: "18 Agu 2026", selesai: "19 Agu 2026", lama: "1 hari", sebab: "Gasket pintu aus", teknisi: "Tim IPSRS" },
];

export function Aset() {
  return (
    <Page>
      <PageHeader
        title="Manajemen Aset Medis & Kalibrasi"
        description="Inventarisasi alat kesehatan, jadwal servis berkala, kalibrasi tahunan sesuai standar akreditasi Kemenkes, dan riwayat downtime."
        actions={<Button size="sm"><Plus className="size-4" /> Registrasi Alat</Button>}
      />
      <StatGrid>
        <StatCard label="Total Alkes Terdata" value="1.126" icon={Stethoscope} />
        <StatCard label="Kalibrasi < 30 Hari" value="12" icon={CalendarClock} />
        <StatCard label="Sedang Perbaikan" value="5" icon={Wrench} />
        <StatCard label="Uptime Alat Kritis" value="99,2%" icon={Timer} />
      </StatGrid>

      <Tabs defaultValue="inventaris">
        <TabsList><TabsTrigger value="inventaris">Inventaris Alat</TabsTrigger><TabsTrigger value="kalibrasi">Jadwal Kalibrasi & Servis</TabsTrigger><TabsTrigger value="downtime">Downtime Log</TabsTrigger></TabsList>
        <TabsContent value="inventaris" className="mt-4"><Card><CardContent>
          <DataTable
            rows={assets}
            searchPlaceholder="Cari alat / kode / lokasi…"
            columns={[
              { key: "kode", header: "Kode Aset", className: "font-mono text-xs" },
              { key: "nama", header: "Nama Alat", className: "font-medium" },
              { key: "merk", header: "Merk" },
              { key: "lokasi", header: "Lokasi" },
              { key: "kalibrasi", header: "Kalibrasi Berikutnya" },
              { key: "kondisi", header: "Kondisi", render: (r) => <StatusBadge tone={kondTone[r.kondisi]}>{r.kondisi}</StatusBadge> },
            ]}
          />
        </CardContent></Card></TabsContent>
        <TabsContent value="kalibrasi" className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[...assets].filter((a) => a.kalibrasi !== "—").sort((a, b) => a.hari - b.hari).map((a) => (
            <Card key={a.kode} className="py-4">
              <CardContent className="space-y-2 px-4">
                <div className="flex items-start justify-between"><div><p className="font-medium">{a.nama}</p><p className="text-xs text-muted-foreground">{a.kode} · {a.lokasi}</p></div>{a.hari <= 7 && <AlertTriangle className="size-4 text-amber-500" />}</div>
                <p className="text-sm">Kalibrasi: <b>{a.kalibrasi}</b></p>
                <StatusBadge tone={a.hari <= 7 ? "danger" : a.hari <= 30 ? "warning" : "success"}>{a.hari} hari lagi</StatusBadge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="downtime" className="mt-4"><Card><CardContent>
          <DataTable
            searchable={false}
            rows={downtime}
            columns={[
              { key: "alat", header: "Alat", className: "font-medium" },
              { key: "mulai", header: "Mulai Rusak" },
              { key: "selesai", header: "Selesai", render: (r) => r.selesai === "Berjalan" ? <StatusBadge tone="danger">Berjalan</StatusBadge> : r.selesai },
              { key: "lama", header: "Downtime" },
              { key: "sebab", header: "Penyebab" },
              { key: "teknisi", header: "Penanganan" },
            ]}
          />
        </CardContent></Card></TabsContent>
      </Tabs>
    </Page>
  );
}
