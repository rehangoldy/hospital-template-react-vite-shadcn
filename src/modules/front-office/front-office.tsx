import { useState } from "react";
import {
  ArrowRightLeft, BedDouble, CalendarCheck, CalendarPlus, LogOut, Megaphone, Monitor, ScanFace, Search,
  Smartphone, UserCheck, UserPlus, Users,
} from "lucide-react";
import { Button } from "@shared-ui/button";
import { Input } from "@shared-ui/input";
import { Label } from "@shared-ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared-ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared-ui/select";
import { RadioGroup, RadioGroupItem } from "@shared-ui/radio-group";
import { Progress } from "@shared-ui/progress";
import { Calendar } from "@shared-ui/calendar";
import { Badge } from "@shared-ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared-ui/tooltip";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { GuarantorBadge, StatusBadge, type Tone } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";
import { cn } from "@lib-utils/utils";

/* ───────────────────────── Pendaftaran & Admisi ───────────────────────── */

const registrations = [
  { no: "REG-241014-0187", rm: "RM-004281", nama: "Siti Aminah", jenis: "Lama", penjamin: "BPJS", tujuan: "Poli Penyakit Dalam", jam: "08:12" },
  { no: "REG-241014-0188", rm: "RM-130442", nama: "Rudi Hartono", jenis: "Baru", penjamin: "Umum", tujuan: "Poli Bedah", jam: "08:20" },
  { no: "REG-241014-0189", rm: "RM-091233", nama: "Budi Santoso", jenis: "Lama", penjamin: "Asuransi", tujuan: "Poli Jantung", jam: "08:31" },
  { no: "REG-241014-0190", rm: "RM-112908", nama: "Agus Wijaya", jenis: "Lama", penjamin: "Perusahaan", tujuan: "Poli Ortopedi", jam: "08:44" },
  { no: "REG-241014-0191", rm: "RM-130443", nama: "Ayu Kartika", jenis: "Baru", penjamin: "BPJS", tujuan: "IGD", jam: "08:52" },
];

export function Pendaftaran() {
  return (
    <Page>
      <PageHeader
        title="Pendaftaran & Admisi"
        description="Registrasi pasien baru/lama, verifikasi identitas NIK/BPJS, dan pencatatan penjamin (ADT)."
        actions={<Button size="sm"><UserPlus className="size-4" /> Registrasi Baru</Button>}
      />
      <StatGrid>
        <StatCard label="Registrasi Hari Ini" value="187" icon={UserPlus} trend={{ value: "12%", up: true }} />
        <StatCard label="Pasien Baru" value="34" icon={Users} hint="18% dari total" />
        <StatCard label="Verifikasi NIK Berhasil" value="98,4%" icon={ScanFace} />
        <StatCard label="Rujukan Masuk" value="52" icon={UserCheck} hint="BPJS FKTP" />
      </StatGrid>

      <Tabs defaultValue="registrasi">
        <TabsList>
          <TabsTrigger value="registrasi">Registrasi Pasien</TabsTrigger>
          <TabsTrigger value="adt">Admisi · Mutasi · Pulang</TabsTrigger>
        </TabsList>

        <TabsContent value="registrasi" className="mt-4 grid gap-4 xl:grid-cols-5">
          <Card className="xl:col-span-3">
            <CardHeader>
              <CardTitle>Form Registrasi</CardTitle>
              <CardDescription>Cari pasien lama dengan NIK / No. BPJS / No. RM, atau daftarkan sebagai pasien baru.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Masukkan NIK (16 digit) / No. BPJS / No. RM" />
                </div>
                <Button variant="secondary">Verifikasi</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Nama Lengkap</Label><Input placeholder="Sesuai KTP" /></div>
                <div className="space-y-1.5"><Label>Tanggal Lahir</Label><Input type="date" /></div>
                <div className="space-y-1.5">
                  <Label>Jenis Kelamin</Label>
                  <RadioGroup defaultValue="p" className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2"><RadioGroupItem value="l" id="jk-l" /><Label htmlFor="jk-l">Laki-laki</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="p" id="jk-p" /><Label htmlFor="jk-p">Perempuan</Label></div>
                  </RadioGroup>
                </div>
                <div className="space-y-1.5"><Label>No. Telepon</Label><Input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="space-y-1.5 sm:col-span-2"><Label>Alamat</Label><Input placeholder="Alamat sesuai KTP" /></div>
                <div className="space-y-1.5">
                  <Label>Penjamin</Label>
                  <Select defaultValue="bpjs">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="umum">Umum (Bayar Pribadi)</SelectItem>
                      <SelectItem value="bpjs">BPJS Kesehatan</SelectItem>
                      <SelectItem value="asuransi">Asuransi Swasta</SelectItem>
                      <SelectItem value="pks">Perusahaan / PKS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5"><Label>No. Kartu / Polis</Label><Input placeholder="0001234567890" /></div>
                <div className="space-y-1.5">
                  <Label>Poli / Unit Tujuan</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih poli" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pd">Penyakit Dalam</SelectItem>
                      <SelectItem value="jp">Jantung</SelectItem>
                      <SelectItem value="an">Anak</SelectItem>
                      <SelectItem value="og">Obgyn</SelectItem>
                      <SelectItem value="igd">IGD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Dokter</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih dokter" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">dr. Andi, Sp.PD</SelectItem>
                      <SelectItem value="b">dr. Rina, Sp.JP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Simpan & Cetak Kartu</Button>
            </CardFooter>
          </Card>

          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Status Verifikasi</CardTitle>
              <CardDescription>Hasil pengecekan otomatis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                ["NIK (Dukcapil)", "Valid", "success"],
                ["Kepesertaan BPJS", "Aktif · Kelas 2", "success"],
                ["Rujukan FKTP", "Berlaku s.d. 12 Nov 2026", "info"],
                ["Data Ganda", "Tidak ditemukan", "success"],
                ["Tunggakan Iuran", "Tidak ada", "success"],
              ].map(([k, v, t]) => (
                <div key={k} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-muted-foreground">{k}</span>
                  <StatusBadge tone={t as Tone}>{v}</StatusBadge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adt" className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { icon: BedDouble, title: "Admisi Rawat Inap", desc: "Alokasi bed berdasarkan kelas hak & ketersediaan.", cta: "Admisi Pasien", n: "12 menunggu bed" },
            { icon: ArrowRightLeft, title: "Mutasi Kelas / Kamar", desc: "Pindah kelas (naik/turun) atau pindah kamar dengan jejak audit.", cta: "Ajukan Mutasi", n: "5 permintaan" },
            { icon: LogOut, title: "Discharge / Pemulangan", desc: "Resume medis, billing final, dan obat pulang.", cta: "Proses Pulang", n: "9 rencana pulang hari ini" },
          ].map((c) => (
            <Card key={c.title}>
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><c.icon className="size-4" /></div>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
              <CardContent><StatusBadge tone="warning">{c.n}</StatusBadge></CardContent>
              <CardFooter><Button variant="outline" className="w-full">{c.cta}</Button></CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader><CardTitle>Registrasi Terbaru</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            rows={registrations}
            searchPlaceholder="Cari nama / No. RM…"
            columns={[
              { key: "no", header: "No. Registrasi", className: "font-mono text-xs" },
              { key: "rm", header: "No. RM", className: "font-mono text-xs" },
              { key: "nama", header: "Nama Pasien", className: "font-medium" },
              { key: "jenis", header: "Jenis", render: (r) => <StatusBadge tone={r.jenis === "Baru" ? "info" : "neutral"}>{r.jenis}</StatusBadge> },
              { key: "penjamin", header: "Penjamin", render: (r) => <GuarantorBadge value={r.penjamin} /> },
              { key: "tujuan", header: "Tujuan" },
              { key: "jam", header: "Jam", className: "tabular-nums" },
            ]}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

/* ───────────────────────── Antrean Poli ───────────────────────── */

const queues = [
  { poli: "Penyakit Dalam", dokter: "dr. Andi, Sp.PD", now: "A-017", waiting: 9, done: 24, ruang: "Ruang 3" },
  { poli: "Jantung", dokter: "dr. Rina, Sp.JP", now: "B-009", waiting: 6, done: 14, ruang: "Ruang 5" },
  { poli: "Anak", dokter: "dr. Hadi, Sp.A", now: "C-022", waiting: 12, done: 31, ruang: "Ruang 1" },
  { poli: "Obgyn", dokter: "dr. Lia, Sp.OG", now: "D-011", waiting: 4, done: 16, ruang: "Ruang 7" },
  { poli: "Ortopedi", dokter: "dr. Bayu, Sp.OT", now: "E-005", waiting: 3, done: 8, ruang: "Ruang 4" },
  { poli: "Mata", dokter: "dr. Sari, Sp.M", now: "F-014", waiting: 7, done: 19, ruang: "Ruang 2" },
];
const tickets = [
  { no: "A-018", nama: "Hendra W.", poli: "Penyakit Dalam", sumber: "Mesin Antrean", est: "08:45", status: "Menunggu" },
  { no: "A-019", nama: "Lestari N.", poli: "Penyakit Dalam", sumber: "Mobile App", est: "08:55", status: "Check-in" },
  { no: "B-010", nama: "Fajar R.", poli: "Jantung", sumber: "Mobile App", est: "08:50", status: "Menunggu" },
  { no: "C-023", nama: "Putri A.", poli: "Anak", sumber: "Mesin Antrean", est: "08:48", status: "Menunggu" },
  { no: "D-012", nama: "Nanda S.", poli: "Obgyn", sumber: "Mobile App", est: "09:00", status: "Belum hadir" },
];

export function Antrean() {
  return (
    <Page>
      <PageHeader
        title="Antrean Poli / Klinik"
        description="Manajemen alur antrean terintegrasi mesin antrean fisik (kiosk) dan aplikasi mobile pasien."
        actions={<>
          <Button variant="outline" size="sm"><Monitor className="size-4" /> Layar TV Antrean</Button>
          <Button size="sm"><Megaphone className="size-4" /> Panggil Berikutnya</Button>
        </>}
      />
      <StatGrid>
        <StatCard label="Total Antrean Hari Ini" value="412" icon={Users} />
        <StatCard label="Sedang Menunggu" value="41" icon={UserCheck} />
        <StatCard label="Via Mobile App" value="38%" icon={Smartphone} trend={{ value: "5%", up: true }} />
        <StatCard label="Rata-rata Tunggu" value="17 mnt" icon={Monitor} trend={{ value: "3 mnt", up: false }} />
      </StatGrid>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {queues.map((q) => (
          <Card key={q.poli}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{q.poli}</CardTitle>
                  <CardDescription>{q.dokter} · {q.ruang}</CardDescription>
                </div>
                <StatusBadge tone="success">Buka</StatusBadge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg bg-primary/5 p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Sedang dipanggil</p>
                  <p className="text-3xl font-bold tabular-nums text-primary">{q.now}</p>
                </div>
                <div className="text-right text-sm">
                  <p><span className="font-semibold tabular-nums">{q.waiting}</span> menunggu</p>
                  <p className="text-muted-foreground"><span className="tabular-nums">{q.done}</span> selesai</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" className="flex-1">Panggil</Button>
              <Button size="sm" variant="outline" className="flex-1">Lewati</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Daftar Tiket Antrean</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            rows={tickets}
            columns={[
              { key: "no", header: "No. Antrean", className: "font-mono font-semibold" },
              { key: "nama", header: "Pasien" },
              { key: "poli", header: "Poli" },
              { key: "sumber", header: "Sumber", render: (r) => <Badge variant="secondary">{r.sumber}</Badge> },
              { key: "est", header: "Estimasi Dilayani", className: "tabular-nums" },
              { key: "status", header: "Status", render: (r) => <StatusBadge tone={r.status === "Check-in" ? "success" : r.status === "Belum hadir" ? "neutral" : "warning"}>{r.status}</StatusBadge> },
            ]}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

/* ───────────────────────── Rawat Inap & Bed ───────────────────────── */

type BedState = "kosong" | "terisi" | "bersih" | "maintenance";
const bedStyle: Record<BedState, string> = {
  kosong: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  terisi: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  bersih: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  maintenance: "border-border bg-muted text-muted-foreground",
};
const wards: { name: string; kelas: string; beds: { id: string; s: BedState; pasien?: string }[] }[] = [
  {
    name: "Melati (Kelas 1)", kelas: "Kelas 1",
    beds: [
      { id: "M-01", s: "terisi", pasien: "Sri W." }, { id: "M-02", s: "terisi", pasien: "Joko P." }, { id: "M-03", s: "kosong" },
      { id: "M-04", s: "bersih" }, { id: "M-05", s: "terisi", pasien: "Tati S." }, { id: "M-06", s: "kosong" },
      { id: "M-07", s: "terisi", pasien: "Hari K." }, { id: "M-08", s: "maintenance" },
    ],
  },
  {
    name: "Mawar (Kelas 2)", kelas: "Kelas 2",
    beds: [
      { id: "W-01", s: "terisi", pasien: "Ani R." }, { id: "W-02", s: "terisi", pasien: "Bagas T." }, { id: "W-03", s: "terisi", pasien: "Cici M." },
      { id: "W-04", s: "kosong" }, { id: "W-05", s: "terisi", pasien: "Dedi H." }, { id: "W-06", s: "terisi", pasien: "Eka L." },
      { id: "W-07", s: "bersih" }, { id: "W-08", s: "kosong" }, { id: "W-09", s: "terisi", pasien: "Feri A." },
      { id: "W-10", s: "terisi", pasien: "Gina Z." }, { id: "W-11", s: "kosong" }, { id: "W-12", s: "terisi", pasien: "Hilda N." },
    ],
  },
  {
    name: "ICU", kelas: "ICU",
    beds: [
      { id: "I-01", s: "terisi", pasien: "Imam B." }, { id: "I-02", s: "terisi", pasien: "Jaka S." }, { id: "I-03", s: "terisi", pasien: "Kiki D." },
      { id: "I-04", s: "kosong" }, { id: "I-05", s: "terisi", pasien: "Lina F." }, { id: "I-06", s: "maintenance" },
    ],
  },
];
const inpatients = [
  { rm: "RM-004281", nama: "Siti Aminah", bed: "W-03", dpjp: "dr. Andi, Sp.PD", masuk: "11 Okt", los: "3 hari", penjamin: "BPJS" },
  { rm: "RM-091233", nama: "Budi Santoso", bed: "M-02", dpjp: "dr. Rina, Sp.JP", masuk: "12 Okt", los: "2 hari", penjamin: "Asuransi" },
  { rm: "RM-077120", nama: "Dewi Lestari", bed: "I-01", dpjp: "dr. Hadi, Sp.A", masuk: "13 Okt", los: "1 hari", penjamin: "Umum" },
  { rm: "RM-112908", nama: "Agus Wijaya", bed: "W-06", dpjp: "dr. Bayu, Sp.OT", masuk: "09 Okt", los: "5 hari", penjamin: "Perusahaan" },
];

export function RawatInap() {
  return (
    <Page>
      <PageHeader
        title="Rawat Inap & Manajemen Bed"
        description="Peta bed real-time, alokasi bed, mutasi kelas/kamar, dan proses pemulangan."
        actions={<Button size="sm"><BedDouble className="size-4" /> Admisi Rawat Inap</Button>}
      />
      <StatGrid>
        <StatCard label="BOR" value="78,4%" icon={BedDouble} hint="Ideal 60–85%" />
        <StatCard label="Bed Tersedia" value="48" icon={BedDouble} hint="dari 250" />
        <StatCard label="ALOS" value="4,2 hari" icon={CalendarCheck} />
        <StatCard label="Rencana Pulang Hari Ini" value="9" icon={LogOut} />
      </StatGrid>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div><CardTitle>Peta Bed</CardTitle><CardDescription>Klik bed kosong untuk alokasi pasien</CardDescription></div>
            <div className="flex flex-wrap gap-3 text-xs">
              {(Object.keys(bedStyle) as BedState[]).map((s) => (
                <span key={s} className="flex items-center gap-1.5 capitalize">
                  <span className={cn("size-3 rounded border", bedStyle[s])} />{s === "bersih" ? "Perlu dibersihkan" : s}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {wards.map((w) => (
            <div key={w.name}>
              <p className="mb-2 text-sm font-semibold">{w.name}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {w.beds.map((b) => (
                  <Tooltip key={b.id}>
                    <TooltipTrigger asChild>
                      <button className={cn("rounded-lg border p-3 text-left transition hover:shadow-sm", bedStyle[b.s])}>
                        <BedDouble className="mb-1 size-4" />
                        <p className="text-sm font-semibold">{b.id}</p>
                        <p className="truncate text-xs opacity-80">{b.pasien ?? (b.s === "kosong" ? "Tersedia" : b.s === "bersih" ? "Housekeeping" : "Perbaikan")}</p>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{w.kelas} · {b.s}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Pasien Rawat Inap</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            rows={inpatients}
            columns={[
              { key: "rm", header: "No. RM", className: "font-mono text-xs" },
              { key: "nama", header: "Pasien", className: "font-medium" },
              { key: "bed", header: "Bed", className: "font-mono" },
              { key: "dpjp", header: "DPJP" },
              { key: "masuk", header: "Masuk" },
              { key: "los", header: "LOS" },
              { key: "penjamin", header: "Penjamin", render: (r) => <GuarantorBadge value={r.penjamin} /> },
              { key: "aksi", header: "", render: () => (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost"><ArrowRightLeft className="size-4" /> Mutasi</Button>
                  <Button size="sm" variant="ghost"><LogOut className="size-4" /> Pulang</Button>
                </div>
              ) },
            ]}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

/* ───────────────────────── Jadwal & Kuota Dokter ───────────────────────── */

const schedule = [
  { dokter: "dr. Andi, Sp.PD", spes: "Penyakit Dalam", hari: ["08–12 · 24/30", "", "08–12 · 18/30", "", "13–17 · 10/25", ""] },
  { dokter: "dr. Rina, Sp.JP", spes: "Jantung", hari: ["", "09–13 · 20/20", "", "09–13 · 14/20", "", "09–12 · 6/15"] },
  { dokter: "dr. Hadi, Sp.A", spes: "Anak", hari: ["08–14 · 31/35", "08–14 · 28/35", "08–14 · 22/35", "08–14 · 30/35", "08–14 · 12/35", ""] },
  { dokter: "dr. Lia, Sp.OG", spes: "Obgyn", hari: ["", "13–17 · 9/20", "", "13–17 · 16/20", "13–17 · 4/20", ""] },
  { dokter: "dr. Bayu, Sp.OT", spes: "Ortopedi", hari: ["10–14 · 8/15", "", "", "10–14 · 15/15", "", "09–12 · 3/10"] },
];
const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const appointments = [
  { kode: "APT-0912", pasien: "Nina Marlina", dokter: "dr. Andi, Sp.PD", waktu: "15 Okt · 09:00", kanal: "Mobile App", status: "Terkonfirmasi" },
  { kode: "APT-0913", pasien: "Rio Pratama", dokter: "dr. Rina, Sp.JP", waktu: "15 Okt · 10:30", kanal: "Call Center", status: "Menunggu Konfirmasi" },
  { kode: "APT-0914", pasien: "Tika Rahma", dokter: "dr. Hadi, Sp.A", waktu: "15 Okt · 08:30", kanal: "Mobile App", status: "Terkonfirmasi" },
  { kode: "APT-0915", pasien: "Yusuf Ali", dokter: "dr. Bayu, Sp.OT", waktu: "16 Okt · 10:00", kanal: "Walk-in", status: "Dibatalkan" },
];

export function JadwalDokter() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 14));
  return (
    <Page>
      <PageHeader
        title="Jadwal & Kuota Dokter"
        description="Kalender praktik dokter spesialis, batas kuota pasien per sesi, dan booking janji temu."
        actions={<Button size="sm"><CalendarPlus className="size-4" /> Buat Janji Temu</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="xl:col-span-1">
          <CardHeader><CardTitle>Kalender</CardTitle></CardHeader>
          <CardContent className="flex justify-center">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Jadwal Praktik Mingguan</CardTitle>
            <CardDescription>Format: jam praktik · terisi / kuota</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-3">Dokter</th>
                  {days.map((d) => <th key={d} className="pb-2 pr-2">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {schedule.map((s) => (
                  <tr key={s.dokter} className="border-t">
                    <td className="py-2 pr-3">
                      <p className="font-medium">{s.dokter}</p>
                      <p className="text-xs text-muted-foreground">{s.spes}</p>
                    </td>
                    {s.hari.map((h, i) => {
                      if (!h) return <td key={i} className="py-2 pr-2 text-muted-foreground">—</td>;
                      const [jam, q] = h.split(" · ");
                      const [u, t] = q.split("/").map(Number);
                      const full = u >= t;
                      const pct = (u / t) * 100;
                      return (
                        <td key={i} className="py-2 pr-2">
                          <div className={cn("rounded-md border p-2", full ? "border-rose-500/30 bg-rose-500/5" : "bg-card")}>
                            <p className="text-xs font-medium">{jam}</p>
                            <Progress value={pct} className="my-1 h-1" />
                            <p className={cn("text-xs tabular-nums", full ? "font-semibold text-rose-600 dark:text-rose-400" : "text-muted-foreground")}>
                              {full ? "Penuh" : `${u}/${t}`}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Janji Temu (Appointment)</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            rows={appointments}
            columns={[
              { key: "kode", header: "Kode", className: "font-mono text-xs" },
              { key: "pasien", header: "Pasien", className: "font-medium" },
              { key: "dokter", header: "Dokter" },
              { key: "waktu", header: "Waktu" },
              { key: "kanal", header: "Kanal" },
              { key: "status", header: "Status", render: (r) => <StatusBadge tone={r.status === "Terkonfirmasi" ? "success" : r.status === "Dibatalkan" ? "danger" : "warning"}>{r.status}</StatusBadge> },
            ]}
          />
        </CardContent>
      </Card>
    </Page>
  );
}
