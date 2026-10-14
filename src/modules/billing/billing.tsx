import { BadgeCheck, Banknote, CheckCircle2, CreditCard, FileCheck2, FileText, Layers, Loader2, Printer, ShieldCheck, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Input } from "@shared-ui/input";
import { Label } from "@shared-ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared-ui/tabs";
import { Badge } from "@shared-ui/badge";
import { Separator } from "@shared-ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@shared-ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared-ui/select";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { StatusBadge, type Tone } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";
import { cn } from "@lib-utils/utils";

const rp = (n: number) => "Rp " + n.toLocaleString("id-ID");

/* ───────────────────────── Eligibilitas & SEP ───────────────────────── */

const bridging = [
  { pasien: "Siti Aminah", penjamin: "BPJS Kesehatan", noKartu: "0001234567890", tipe: "SEP Rawat Inap", noSep: "0301R0010124V001234", status: "Terbit" },
  { pasien: "Ayu Kartika", penjamin: "BPJS Kesehatan", noKartu: "0009876543210", tipe: "SEP IGD", noSep: "0301R0010124V001251", status: "Terbit" },
  { pasien: "Budi Santoso", penjamin: "AdMedika", noKartu: "ADM-77120931", tipe: "Letter of Guarantee", noSep: "LOG-2410-0087", status: "Adjudikasi" },
  { pasien: "Agus Wijaya", penjamin: "PT Pertamina (PKS)", noKartu: "EMP-30912", tipe: "Surat Jaminan", noSep: "SJ-2410-0012", status: "Disetujui" },
  { pasien: "Hendra W.", penjamin: "BPJS Kesehatan", noKartu: "0005551230001", tipe: "SEP Rawat Jalan", noSep: "—", status: "Ditolak" },
];
const brTone: Record<string, Tone> = { Terbit: "success", Adjudikasi: "warning", Disetujui: "success", Ditolak: "danger" };

export function Eligibilitas() {
  return (
    <Page>
      <PageHeader
        title="Verifikasi Penjamin & Eligibilitas"
        description="Integrasi VClaim BPJS (pembuatan SEP otomatis) dan bridging asuransi swasta / korporasi (adjudication)."
      />
      <StatGrid>
        <StatCard label="SEP Terbit Hari Ini" value="164" icon={BadgeCheck} />
        <StatCard label="Eligibilitas Berhasil" value="97,6%" icon={ShieldCheck} />
        <StatCard label="LOG Asuransi Proses" value="11" icon={Loader2} />
        <StatCard label="Ditolak" value="4" icon={TrendingDown} hint="Perlu tindak lanjut" />
      </StatGrid>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Cek Eligibilitas & Buat SEP</CardTitle><CardDescription>VClaim BPJS Kesehatan</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5"><Label>No. Kartu BPJS / NIK</Label><Input defaultValue="0001234567890" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Jenis Pelayanan</Label>
                <Select defaultValue="ri"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ri">Rawat Inap</SelectItem><SelectItem value="rj">Rawat Jalan</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-1.5"><Label>No. Rujukan</Label><Input defaultValue="0301R001-1024Y000451" /></div>
            </div>
            <div className="space-y-1.5"><Label>Diagnosis Awal (ICD-10)</Label><Input defaultValue="K30 — Functional dyspepsia" /></div>
            <Button className="w-full"><ShieldCheck className="size-4" /> Cek & Terbitkan SEP</Button>
          </CardContent>
          <Separator />
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">Hasil Eligibilitas</p>
            {[["Nama Peserta", "SITI AMINAH"], ["Status Kepesertaan", "AKTIF"], ["Hak Kelas", "Kelas 2"], ["Faskes Tingkat 1", "Puskesmas Menteng"]].map(([k, v]) => (
              <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader><CardTitle>Riwayat Bridging Penjamin</CardTitle></CardHeader>
          <CardContent>
            <DataTable
              rows={bridging}
              columns={[
                { key: "pasien", header: "Pasien", className: "font-medium" },
                { key: "penjamin", header: "Penjamin" },
                { key: "tipe", header: "Dokumen" },
                { key: "noSep", header: "No. SEP / LOG", className: "font-mono text-xs" },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={brTone[r.status]}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}

/* ───────────────────────── Tagihan Pasien ───────────────────────── */

const bill = [
  { kategori: "Konsultasi Dokter", ket: "Visite DPJP × 3 hari", qty: 3, tarif: 250000 },
  { kategori: "Sewa Kamar", ket: "Kelas 2 · Bed W-03 × 3 malam", qty: 3, tarif: 450000 },
  { kategori: "Obat & BMHP", ket: "Farmasi rawat inap (akumulasi)", qty: 1, tarif: 1385000 },
  { kategori: "Jasa Keperawatan", ket: "Asuhan keperawatan × 3 hari", qty: 3, tarif: 120000 },
  { kategori: "Penunjang — Laboratorium", ket: "Darah lengkap, SGOT/SGPT, Urinalisis", qty: 1, tarif: 560000 },
  { kategori: "Penunjang — Radiologi", ket: "USG Abdomen", qty: 1, tarif: 380000 },
  { kategori: "Tindakan Medis", ket: "Laparoscopic Cholecystectomy", qty: 1, tarif: 9800000 },
];
const subtotal = bill.reduce((s, b) => s + b.qty * b.tarif, 0);
const plafon = 10000000;
const ditanggung = Math.min(subtotal, plafon);
const excess = subtotal - ditanggung;

const invoices = [
  { inv: "INV-241014-0092", pasien: "Siti Aminah", unit: "Rawat Inap", total: 14275000, penjamin: "Asuransi", status: "Belum Final" },
  { inv: "INV-241014-0091", pasien: "Rudi Hartono", unit: "Rawat Jalan", total: 485000, penjamin: "Umum", status: "Lunas" },
  { inv: "INV-241013-0088", pasien: "Agus Wijaya", unit: "Rawat Inap", total: 22340000, penjamin: "Perusahaan", status: "Menunggu Penjamin" },
  { inv: "INV-241013-0085", pasien: "Maya Putri", unit: "Rawat Jalan", total: 320000, penjamin: "BPJS", status: "Lunas" },
];
const invTone: Record<string, Tone> = { "Belum Final": "warning", Lunas: "success", "Menunggu Penjamin": "info" };

export function Tagihan() {
  return (
    <Page>
      <PageHeader
        title="Billing Pasien"
        description="Akumulasi otomatis biaya layanan dan pemisahan tagihan (split billing) antara penjamin dan selisih bayar pasien."
        actions={<><Button variant="outline" size="sm"><Printer className="size-4" /> Cetak Rincian</Button><Button size="sm"><CreditCard className="size-4" /> Proses Pembayaran</Button></>}
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><CardTitle>Rincian Tagihan · INV-241014-0092</CardTitle><CardDescription>Siti Aminah · RM-004281 · Rawat Inap 11–14 Okt 2026</CardDescription></div>
              <StatusBadge tone="info">Asuransi Swasta · Plafon {rp(plafon)}</StatusBadge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50"><TableRow><TableHead>Kategori</TableHead><TableHead>Keterangan</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Tarif</TableHead><TableHead className="text-right">Subtotal</TableHead></TableRow></TableHeader>
                <TableBody>
                  {bill.map((b) => (
                    <TableRow key={b.kategori}>
                      <TableCell className="font-medium">{b.kategori}</TableCell>
                      <TableCell className="text-muted-foreground">{b.ket}</TableCell>
                      <TableCell className="text-right tabular-nums">{b.qty}</TableCell>
                      <TableCell className="text-right tabular-nums">{rp(b.tarif)}</TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{rp(b.qty * b.tarif)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter><TableRow><TableCell colSpan={4} className="font-semibold">Total Tagihan</TableCell><TableCell className="text-right text-base font-bold tabular-nums">{rp(subtotal)}</TableCell></TableRow></TableFooter>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Layers className="size-4" /> Split Billing</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
                <p className="text-xs text-muted-foreground">Ditanggung Asuransi (plafon)</p>
                <p className="text-xl font-bold tabular-nums">{rp(ditanggung)}</p>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                <p className="text-xs text-muted-foreground">Selisih Bayar / Excess (pasien)</p>
                <p className="text-xl font-bold tabular-nums">{rp(excess)}</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-amber-500/30"><div className="h-full bg-sky-500" style={{ width: `${(ditanggung / subtotal) * 100}%` }} /></div>
              <p className="text-xs text-muted-foreground">Plafon terpakai {Math.round((ditanggung / subtotal) * 100)}% dari total tagihan.</p>
            </CardContent>
            <CardFooter className="gap-2"><Button variant="outline" className="flex-1">Kirim ke Asuransi</Button><Button className="flex-1">Bayar Excess</Button></CardFooter>
          </Card>
          <Card className="py-4"><CardContent className="space-y-2 px-4 text-xs text-muted-foreground"><p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500" /> Biaya terakumulasi otomatis dari semua modul</p><p className="flex items-center gap-2"><Wallet className="size-4" /> Deposit pasien: {rp(2000000)}</p></CardContent></Card>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Daftar Tagihan</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            rows={invoices}
            columns={[
              { key: "inv", header: "No. Invoice", className: "font-mono text-xs" },
              { key: "pasien", header: "Pasien", className: "font-medium" },
              { key: "unit", header: "Unit" },
              { key: "penjamin", header: "Penjamin", render: (r) => <Badge variant="secondary">{r.penjamin}</Badge> },
              { key: "total", header: "Total", className: "text-right tabular-nums", render: (r) => rp(r.total) },
              { key: "status", header: "Status", render: (r) => <StatusBadge tone={invTone[r.status]}>{r.status}</StatusBadge> },
            ]}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

/* ───────────────────────── Klaim & INA-CBG ───────────────────────── */

const claims = [
  { sep: "0301R0010124V001234", pasien: "Siti Aminah", dx: "K80.2", proc: "51.23", cbg: "K-1-20-II", tarif: 11250000, riil: 14275000, berkas: 4, total: 5, status: "Kelengkapan" },
  { sep: "0301R0010124V001198", pasien: "Maya Putri", dx: "O80", proc: "73.59", cbg: "O-6-10-I", tarif: 4180000, riil: 3620000, berkas: 5, total: 5, status: "Siap Kirim" },
  { sep: "0301R0010124V001151", pasien: "Hendra W.", dx: "S72.0", proc: "79.35", cbg: "I-1-10-III", tarif: 24900000, riil: 27340000, berkas: 5, total: 5, status: "Verifikasi BPJS" },
  { sep: "0301R0010124V001102", pasien: "Dewi Lestari", dx: "J18.9", proc: "—", cbg: "J-1-10-I", tarif: 5720000, riil: 4100000, berkas: 5, total: 5, status: "Disetujui" },
];
const claimTone: Record<string, Tone> = { Kelengkapan: "warning", "Siap Kirim": "info", "Verifikasi BPJS": "purple", Disetujui: "success" };
const docs = [
  ["Resume Medis & CPPT", true], ["Hasil Laboratorium", true], ["Hasil Radiologi / Ekspertise", true], ["Laporan Operasi", true], ["Surat Eligibilitas Peserta (SEP)", false],
] as const;

export function Klaim() {
  return (
    <Page>
      <PageHeader
        title="Klaim Asuransi & BPJS (Casemix)"
        description="Pengelompokan diagnosis & prosedur ke kode INA-CBG, perbandingan potensi klaim vs biaya riil, dan manajemen berkas klaim digital."
        actions={<Button size="sm"><FileCheck2 className="size-4" /> Kirim Klaim Terpilih</Button>}
      />
      <StatGrid>
        <StatCard label="Klaim Bulan Ini" value="1.284" icon={FileText} />
        <StatCard label="Nilai Klaim (INA-CBG)" value="Rp 7,1 M" icon={Banknote} />
        <StatCard label="Selisih Positif (Surplus)" value="Rp 612 jt" icon={TrendingUp} />
        <StatCard label="Klaim Merugi" value="218" icon={TrendingDown} hint="Biaya riil > tarif" />
      </StatGrid>

      <Tabs defaultValue="cbg">
        <TabsList><TabsTrigger value="cbg">Casemix INA-CBG</TabsTrigger><TabsTrigger value="berkas">Berkas Klaim Digital</TabsTrigger></TabsList>
        <TabsContent value="cbg" className="mt-4">
          <Card><CardContent>
            <DataTable
              rows={claims}
              columns={[
                { key: "pasien", header: "Pasien", render: (r) => <div><p className="font-medium">{r.pasien}</p><p className="font-mono text-[10px] text-muted-foreground">{r.sep}</p></div> },
                { key: "dx", header: "ICD-10 / ICD-9", render: (r) => <span className="font-mono text-xs">{r.dx} / {r.proc}</span> },
                { key: "cbg", header: "Kode INA-CBG", render: (r) => <Badge variant="outline" className="font-mono">{r.cbg}</Badge> },
                { key: "tarif", header: "Tarif INA-CBG", className: "text-right tabular-nums", render: (r) => rp(r.tarif) },
                { key: "riil", header: "Biaya Riil (CPC)", className: "text-right tabular-nums", render: (r) => rp(r.riil) },
                { key: "sel", header: "Selisih", className: "text-right tabular-nums", render: (r) => { const d = r.tarif - r.riil; return <span className={cn("font-semibold", d >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>{d >= 0 ? "+" : "−"}{rp(Math.abs(d))}</span>; } },
                { key: "berkas", header: "Berkas", render: (r) => <span className="tabular-nums text-xs">{r.berkas}/{r.total}</span> },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={claimTone[r.status]}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="berkas" className="mt-4">
          <Card className="max-w-xl">
            <CardHeader><CardTitle>Kelengkapan Berkas · Siti Aminah</CardTitle><CardDescription>SEP 0301R0010124V001234 · K-1-20-II</CardDescription></CardHeader>
            <CardContent className="space-y-2">
              {docs.map(([n, ok]) => (
                <div key={n} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <span className="flex items-center gap-2"><FileText className="size-4 text-muted-foreground" />{n}</span>
                  {ok ? <StatusBadge tone="success">Terlampir</StatusBadge> : <StatusBadge tone="danger">Belum ada</StatusBadge>}
                </div>
              ))}
              <Button className="mt-2 w-full" variant="outline">Generate Berkas Klaim PDF</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Page>
  );
}
