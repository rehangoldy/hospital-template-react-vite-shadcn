import { AlertTriangle, CheckCircle2, ClipboardList, Heart, Plus, Printer, Save, Scissors, Siren, Thermometer, Timer, UserRound } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Input } from "@shared-ui/input";
import { Label } from "@shared-ui/label";
import { Textarea } from "@shared-ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared-ui/tabs";
import { Avatar, AvatarFallback } from "@shared-ui/avatar";
import { Badge } from "@shared-ui/badge";
import { Checkbox } from "@shared-ui/checkbox";
import { Separator } from "@shared-ui/separator";
import { Page, PageHeader } from "@shared-component/common/page-header";
import { StatCard, StatGrid } from "@shared-component/common/stat-card";
import { StatusBadge } from "@shared-component/common/status-badge";
import { DataTable } from "@shared-component/common/data-table";
import { cn } from "@lib-utils/utils";

/* ───────────────────────── Rekam Medis Elektronik ───────────────────────── */

const cppt = [
  { waktu: "14 Okt 2026 · 08:30", ppa: "dr. Andi, Sp.PD", role: "DPJP", s: "Pasien mengeluh nyeri ulu hati sejak 2 hari, mual (+), muntah (-).", o: "TD 130/80, N 88x/mnt, S 36,8°C, RR 20x/mnt. Nyeri tekan epigastrium (+).", a: "Dispepsia (K30) dd/ Gastritis akut (K29.1)", p: "Omeprazole 2×20 mg, Antasida 3×1, diet lunak, observasi." },
  { waktu: "14 Okt 2026 · 07:10", ppa: "Ns. Maya, S.Kep", role: "Perawat", s: "Pasien tampak lemas, nafsu makan menurun.", o: "TD 125/80, N 84x/mnt, SpO₂ 98%.", a: "Gangguan nutrisi kurang dari kebutuhan.", p: "Edukasi diet, pantau intake, kolaborasi ahli gizi." },
  { waktu: "13 Okt 2026 · 20:00", ppa: "dr. Reza (Jaga)", role: "DPJP", s: "Nyeri perut meningkat malam hari.", o: "TD 135/85, N 92x/mnt, S 37,1°C.", a: "Dispepsia.", p: "Injeksi ranitidine 50 mg IV, lanjut terapi oral." },
];
const diagnoses = [
  { icd: "K30", nama: "Functional dyspepsia", tipe: "Utama", tanggal: "14 Okt 2026" },
  { icd: "K29.1", nama: "Other acute gastritis", tipe: "Sekunder", tanggal: "14 Okt 2026" },
  { icd: "I10", nama: "Essential (primary) hypertension", tipe: "Sekunder", tanggal: "02 Mar 2024" },
];
const procedures = [
  { icd: "89.03", nama: "Interview and evaluation, described as comprehensive", dokter: "dr. Andi, Sp.PD", tanggal: "14 Okt 2026" },
  { icd: "45.13", nama: "Esophagogastroduodenoscopy [EGD] with biopsy", dokter: "dr. Andi, Sp.PD", tanggal: "Dijadwalkan 15 Okt" },
];

export function RekamMedis() {
  return (
    <Page>
      <PageHeader
        title="Rekam Medis Elektronik"
        description="Rekam medis terintegrasi: CPPT, riwayat alergi, diagnosis ICD-10, dan tindakan ICD-9-CM."
        actions={<><Button variant="outline" size="sm"><Printer className="size-4" /> Cetak Resume</Button><Button size="sm"><Plus className="size-4" /> Catatan Baru</Button></>}
      />

      <Card>
        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <Avatar className="size-14"><AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">SA</AvatarFallback></Avatar>
            <div>
              <p className="text-lg font-semibold">Siti Aminah <span className="text-sm font-normal text-muted-foreground">· P · 54 th</span></p>
              <p className="font-mono text-xs text-muted-foreground">RM-004281 · NIK 3175•••••••0042</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <StatusBadge tone="success">BPJS Kelas 2</StatusBadge>
                <StatusBadge tone="info">Rawat Inap · Bed W-03</StatusBadge>
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden h-14 lg:block" />
          <div className="flex-1">
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400"><AlertTriangle className="size-3.5" /> Alergi</p>
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge tone="danger">Penicillin · Anafilaksis</StatusBadge>
              <StatusBadge tone="danger">Seafood · Urtikaria</StatusBadge>
              <StatusBadge tone="warning">Ibuprofen · Ruam ringan</StatusBadge>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 text-center text-xs">
            {[["TD", "130/80"], ["Nadi", "88"], ["Suhu", "36,8"], ["SpO₂", "98%"]].map(([k, v]) => (
              <div key={k} className="rounded-lg border px-3 py-2"><p className="text-muted-foreground">{k}</p><p className="text-sm font-semibold tabular-nums">{v}</p></div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cppt">
        <TabsList className="flex-wrap">
          <TabsTrigger value="cppt">CPPT</TabsTrigger>
          <TabsTrigger value="diagnosis">Diagnosis (ICD-10)</TabsTrigger>
          <TabsTrigger value="tindakan">Tindakan (ICD-9-CM)</TabsTrigger>
          <TabsTrigger value="modul">Modul Layanan</TabsTrigger>
        </TabsList>

        <TabsContent value="cppt" className="mt-4 grid gap-4 xl:grid-cols-3">
          <div className="space-y-3 xl:col-span-2">
            {cppt.map((c, i) => (
              <Card key={i} className="gap-3 py-4">
                <CardHeader className="px-4 pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm"><UserRound className="size-4 text-muted-foreground" /><span className="font-medium">{c.ppa}</span><Badge variant="secondary">{c.role}</Badge></div>
                    <span className="text-xs text-muted-foreground">{c.waktu}</span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2 px-4 text-sm sm:grid-cols-2">
                  {([["S", "Subjective", c.s], ["O", "Objective", c.o], ["A", "Assessment", c.a], ["P", "Plan", c.p]] as const).map(([k, l, v]) => (
                    <div key={k} className="rounded-md bg-muted/50 p-2.5">
                      <p className="mb-0.5 text-xs font-semibold text-primary">{k} · {l}</p>
                      <p className="text-muted-foreground">{v}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="h-fit">
            <CardHeader><CardTitle>Catatan Baru (SOAP)</CardTitle><CardDescription>Tersimpan sebagai PPA aktif</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {["Subjective", "Objective", "Assessment", "Plan"].map((l) => (
                <div key={l} className="space-y-1"><Label>{l}</Label><Textarea rows={2} /></div>
              ))}
              <Button className="w-full"><Save className="size-4" /> Simpan CPPT</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnosis" className="mt-4">
          <Card><CardContent>
            <DataTable
              rows={diagnoses}
              searchPlaceholder="Cari kode / nama ICD-10…"
              toolbar={<Button size="sm"><Plus className="size-4" /> Tambah Diagnosis</Button>}
              columns={[
                { key: "icd", header: "Kode ICD-10", className: "font-mono font-semibold" },
                { key: "nama", header: "Diagnosis" },
                { key: "tipe", header: "Tipe", render: (r) => <StatusBadge tone={r.tipe === "Utama" ? "info" : "neutral"}>{r.tipe}</StatusBadge> },
                { key: "tanggal", header: "Tanggal" },
              ]}
            />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="tindakan" className="mt-4">
          <Card><CardContent>
            <DataTable
              rows={procedures}
              searchPlaceholder="Cari kode / nama ICD-9-CM…"
              toolbar={<Button size="sm"><Plus className="size-4" /> Tambah Tindakan</Button>}
              columns={[
                { key: "icd", header: "Kode ICD-9-CM", className: "font-mono font-semibold" },
                { key: "nama", header: "Tindakan" },
                { key: "dokter", header: "Operator" },
                { key: "tanggal", header: "Tanggal" },
              ]}
            />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="modul" className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { t: "Rawat Jalan (Poliklinik)", d: "Anamnesis, pemeriksaan fisik, resep, rujukan, surat kontrol.", items: ["Asesmen awal", "Pemeriksaan fisik", "E-resep & order penunjang", "Surat kontrol / rujukan"] },
            { t: "Rawat Inap", d: "Asesmen awal, visite harian, observasi, resume pulang.", items: ["Asesmen keperawatan", "Instruksi dokter & CPPT", "Grafik tanda vital", "Resume medis pulang"] },
            { t: "IGD / Triage", d: "Triase ESI, observasi, stabilisasi, disposisi.", items: ["Triase cepat", "Primary & secondary survey", "Observasi berkala", "Disposisi (pulang/rawat/rujuk)"] },
          ].map((m) => (
            <Card key={m.t}>
              <CardHeader><CardTitle className="text-base">{m.t}</CardTitle><CardDescription>{m.d}</CardDescription></CardHeader>
              <CardContent className="space-y-2">
                {m.items.map((it) => <div key={it} className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-emerald-500" />{it}</div>)}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </Page>
  );
}

/* ───────────────────────── IGD & Triase ───────────────────────── */

type Triage = "merah" | "kuning" | "hijau" | "hitam";
const triageMeta: Record<Triage, { label: string; sub: string; head: string; card: string }> = {
  merah: { label: "Merah", sub: "Segera / Resusitasi", head: "bg-red-600 text-white", card: "border-l-red-600" },
  kuning: { label: "Kuning", sub: "Urgen < 30 menit", head: "bg-yellow-400 text-yellow-950", card: "border-l-yellow-400" },
  hijau: { label: "Hijau", sub: "Tidak urgen", head: "bg-green-600 text-white", card: "border-l-green-600" },
  hitam: { label: "Hitam", sub: "Meninggal / tidak tertolong", head: "bg-zinc-900 text-white dark:bg-zinc-700", card: "border-l-zinc-800" },
};
const igdPatients: { id: string; nama: string; usia: string; keluhan: string; t: Triage; tunggu: string; status: string; vital: string }[] = [
  { id: "IGD-0412", nama: "Tn. X (tidak dikenal)", usia: "~45 th", keluhan: "Kecelakaan lalu lintas, GCS 8", t: "merah", tunggu: "0 mnt", status: "Resusitasi", vital: "TD 80/50 · N 130 · SpO₂ 88%" },
  { id: "IGD-0409", nama: "Bpk. Ahmad", usia: "62 th", keluhan: "Nyeri dada kiri menjalar", t: "merah", tunggu: "4 mnt", status: "Stabilisasi", vital: "TD 160/100 · N 110 · SpO₂ 94%" },
  { id: "IGD-0410", nama: "Ny. Ratna", usia: "34 th", keluhan: "Demam tinggi 3 hari, kejang", t: "kuning", tunggu: "12 mnt", status: "Observasi", vital: "TD 110/70 · S 39,4 · N 104" },
  { id: "IGD-0411", nama: "An. Bima", usia: "7 th", keluhan: "Muntah & diare, dehidrasi sedang", t: "kuning", tunggu: "18 mnt", status: "Rehidrasi IV", vital: "N 118 · S 38,1" },
  { id: "IGD-0413", nama: "Sdr. Fandi", usia: "22 th", keluhan: "Luka robek lengan 5 cm", t: "hijau", tunggu: "26 mnt", status: "Menunggu dokter", vital: "TD 120/80 · N 82" },
  { id: "IGD-0414", nama: "Ny. Wati", usia: "48 th", keluhan: "Pusing, tensi tinggi", t: "hijau", tunggu: "31 mnt", status: "Menunggu dokter", vital: "TD 170/95 · N 88" },
  { id: "IGD-0398", nama: "Tn. Y", usia: "70 th", keluhan: "DOA — tiba tanpa tanda kehidupan", t: "hitam", tunggu: "—", status: "Kamar jenazah", vital: "—" },
];

export function Igd() {
  const order: Triage[] = ["merah", "kuning", "hijau", "hitam"];
  return (
    <Page>
      <PageHeader
        title="Instalasi Gawat Darurat"
        description="Penentuan kategori triase, alur observasi, dan stabilisasi pasien."
        actions={<Button size="sm" className="bg-red-600 text-white hover:bg-red-700"><Siren className="size-4" /> Triase Pasien Baru</Button>}
      />
      <StatGrid>
        <StatCard label="Pasien Aktif" value="23" icon={Siren} />
        <StatCard label="Rata-rata Door-to-Doctor" value="6 mnt" icon={Timer} trend={{ value: "1 mnt", up: false }} />
        <StatCard label="Respon Time Merah" value="< 1 mnt" icon={Heart} hint="Target 0 mnt" />
        <StatCard label="Bed IGD Tersedia" value="4 / 18" icon={ClipboardList} />
      </StatGrid>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {order.map((t) => {
          const m = triageMeta[t];
          const list = igdPatients.filter((p) => p.t === t);
          return (
            <div key={t} className="flex flex-col overflow-hidden rounded-xl border bg-card">
              <div className={cn("flex items-center justify-between px-3 py-2", m.head)}>
                <div><p className="text-sm font-semibold">{m.label}</p><p className="text-xs opacity-90">{m.sub}</p></div>
                <span className="text-2xl font-bold tabular-nums">{list.length}</span>
              </div>
              <div className="flex-1 space-y-2 bg-muted/30 p-2">
                {list.map((p) => (
                  <div key={p.id} className={cn("space-y-1.5 rounded-lg border border-l-4 bg-card p-3 text-sm shadow-xs", m.card)}>
                    <div className="flex items-start justify-between gap-2">
                      <div><p className="font-semibold leading-tight">{p.nama}</p><p className="text-xs text-muted-foreground">{p.id} · {p.usia}</p></div>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Timer className="size-3" />{p.tunggu}</span>
                    </div>
                    <p>{p.keluhan}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Thermometer className="size-3" />{p.vital}</p>
                    <Badge variant="secondary">{p.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

/* ───────────────────────── Kamar Bedah ───────────────────────── */

const surgeries = [
  { jam: "07:30–09:30", ruang: "OK-1", pasien: "Siti Aminah", tindakan: "Laparoscopic Cholecystectomy", bedah: "dr. Bayu, Sp.B", anestesi: "dr. Gita, Sp.An", status: "Berlangsung" },
  { jam: "09:45–11:00", ruang: "OK-2", pasien: "Rudi Hartono", tindakan: "Appendectomy", bedah: "dr. Arif, Sp.B", anestesi: "dr. Gita, Sp.An", status: "Persiapan" },
  { jam: "11:30–14:00", ruang: "OK-1", pasien: "Hendra W.", tindakan: "ORIF Femur", bedah: "dr. Bayu, Sp.OT", anestesi: "dr. Dimas, Sp.An", status: "Terjadwal" },
  { jam: "13:00–15:00", ruang: "OK-3", pasien: "Lestari N.", tindakan: "Sectio Caesarea", bedah: "dr. Lia, Sp.OG", anestesi: "dr. Dimas, Sp.An", status: "Terjadwal" },
  { jam: "15:30–16:30", ruang: "OK-2", pasien: "Fajar R.", tindakan: "Hernia Repair", bedah: "dr. Arif, Sp.B", anestesi: "dr. Gita, Sp.An", status: "Pre-op belum lengkap" },
];
const surgeryTone: Record<string, "info" | "purple" | "neutral" | "warning"> = { Berlangsung: "info", Persiapan: "purple", Terjadwal: "neutral", "Pre-op belum lengkap": "warning" };
const rooms = [
  { n: "OK-1", s: "Operasi berlangsung", tone: "info" as const, pct: 70 },
  { n: "OK-2", s: "Persiapan / sterilisasi ruang", tone: "purple" as const, pct: 15 },
  { n: "OK-3", s: "Tersedia", tone: "success" as const, pct: 0 },
  { n: "OK-4 (Cathlab)", s: "Maintenance", tone: "neutral" as const, pct: 0 },
];
const preop = ["Informed consent ditandatangani", "Puasa ≥ 6 jam terverifikasi", "Lab darah lengkap & koagulasi", "EKG & foto thoraks", "Penilaian anestesi (ASA)", "Penandaan sisi operasi", "Crossmatch / darah tersedia"];
const instruments = [
  { set: "Set Laparoskopi Dasar", item: 42, cssd: "STR-20241014-07", exp: "Steril s.d. 21 Okt", status: "Siap" },
  { set: "Set Bedah Minor", item: 28, cssd: "STR-20241014-03", exp: "Steril s.d. 21 Okt", status: "Siap" },
  { set: "Set Ortopedi — ORIF", item: 64, cssd: "STR-20241013-11", exp: "Steril s.d. 20 Okt", status: "Siap" },
  { set: "Set Sectio Caesarea", item: 36, cssd: "—", exp: "Dalam proses CSSD", status: "Proses" },
];

export function KamarBedah() {
  return (
    <Page>
      <PageHeader
        title="Kamar Bedah (OK)"
        description="Penjadwalan operasi, pre-op assessment, alokasi dokter bedah/anestesi, instrumen steril, dan laporan pembedahan."
        actions={<Button size="sm"><Scissors className="size-4" /> Jadwalkan Operasi</Button>}
      />
      <StatGrid>
        <StatCard label="Operasi Hari Ini" value="9" icon={Scissors} hint="2 selesai" />
        <StatCard label="Utilisasi OK" value="72%" icon={Timer} />
        <StatCard label="Pre-op Belum Lengkap" value="2" icon={AlertTriangle} />
        <StatCard label="Set Instrumen Siap" value="18" icon={CheckCircle2} />
      </StatGrid>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {rooms.map((r) => (
          <Card key={r.n} className="py-4">
            <CardContent className="space-y-2 px-4">
              <div className="flex items-center justify-between"><p className="font-semibold">{r.n}</p><StatusBadge tone={r.tone}>{r.s}</StatusBadge></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${r.pct}%` }} /></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="jadwal">
        <TabsList>
          <TabsTrigger value="jadwal">Jadwal Operasi</TabsTrigger>
          <TabsTrigger value="preop">Pre-op Assessment</TabsTrigger>
          <TabsTrigger value="instrumen">Instrumen Steril</TabsTrigger>
          <TabsTrigger value="laporan">Laporan Pembedahan</TabsTrigger>
        </TabsList>
        <TabsContent value="jadwal" className="mt-4">
          <Card><CardContent>
            <DataTable
              rows={surgeries}
              columns={[
                { key: "jam", header: "Jam", className: "tabular-nums" },
                { key: "ruang", header: "Ruang", className: "font-mono font-semibold" },
                { key: "pasien", header: "Pasien", className: "font-medium" },
                { key: "tindakan", header: "Tindakan" },
                { key: "bedah", header: "Dokter Bedah" },
                { key: "anestesi", header: "Anestesi" },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={surgeryTone[r.status]}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="preop" className="mt-4">
          <Card className="max-w-xl">
            <CardHeader><CardTitle>Checklist Pre-op</CardTitle><CardDescription>Hendra W. · ORIF Femur · OK-1 11:30</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {preop.map((p, i) => (
                <div key={p} className="flex items-center gap-3"><Checkbox id={`po-${i}`} defaultChecked={i < 5} /><Label htmlFor={`po-${i}`} className="font-normal">{p}</Label></div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="instrumen" className="mt-4">
          <Card><CardContent>
            <DataTable
              rows={instruments}
              searchable={false}
              columns={[
                { key: "set", header: "Set Instrumen", className: "font-medium" },
                { key: "item", header: "Jumlah Item" },
                { key: "cssd", header: "No. Batch Sterilisasi", className: "font-mono text-xs" },
                { key: "exp", header: "Masa Steril" },
                { key: "status", header: "Status", render: (r) => <StatusBadge tone={r.status === "Siap" ? "success" : "warning"}>{r.status}</StatusBadge> },
              ]}
            />
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="laporan" className="mt-4">
          <Card className="max-w-2xl">
            <CardHeader><CardTitle>Laporan Pembedahan</CardTitle><CardDescription>Siti Aminah · Laparoscopic Cholecystectomy</CardDescription></CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1"><Label>Diagnosis Pra-bedah</Label><Input defaultValue="Cholelithiasis (K80.2)" /></div>
              <div className="space-y-1"><Label>Diagnosis Pasca-bedah</Label><Input defaultValue="Cholelithiasis (K80.2)" /></div>
              <div className="space-y-1"><Label>Jenis Anestesi</Label><Input defaultValue="General (GA-ETT)" /></div>
              <div className="space-y-1"><Label>Perdarahan</Label><Input defaultValue="± 50 ml" /></div>
              <div className="space-y-1 sm:col-span-2"><Label>Uraian Pembedahan</Label><Textarea rows={4} placeholder="Tuliskan uraian prosedur…" /></div>
              <div className="sm:col-span-2"><Button><Save className="size-4" /> Simpan Laporan</Button></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Page>
  );
}

