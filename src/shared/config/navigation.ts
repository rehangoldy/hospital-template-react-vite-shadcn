import {
  BedDouble, BookOpen, Boxes, Building2, CalendarClock, CircleDollarSign, Droplets,
  FileCheck2, FileHeart, FlaskConical, HandCoins, Hospital, LayoutDashboard,
  ListOrdered, Network, Pill, Receipt, ScanLine, Scissors, Share2, ShieldCheck,
  ShoppingCart, Siren, Truck, UserPlus, Wallet, Wrench, type LucideIcon,
} from "lucide-react";

export type NavItem = { title: string; url: string; icon: LucideIcon };
export type NavGroup = {
  key: string;
  title: string;
  icon: LucideIcon;
  items: NavItem[];
};

export const dashboardNav: NavItem = { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard };

export const navGroups: NavGroup[] = [
  {
    key: "front-office",
    title: "Front Office & Pasien",
    icon: Hospital,
    items: [
      { title: "Pendaftaran & Admisi", url: "/front-office/pendaftaran", icon: UserPlus },
      { title: "Antrean Poli", url: "/front-office/antrean", icon: ListOrdered },
      { title: "Rawat Inap & Bed", url: "/front-office/rawat-inap", icon: BedDouble },
      { title: "Jadwal & Kuota Dokter", url: "/front-office/jadwal-dokter", icon: CalendarClock },
    ],
  },
  {
    key: "emr",
    title: "Rekam Medis & Klinis",
    icon: FileHeart,
    items: [
      { title: "Rekam Medis Elektronik", url: "/emr/rekam-medis", icon: FileHeart },
      { title: "IGD & Triase", url: "/emr/igd", icon: Siren },
      { title: "Kamar Bedah (OK)", url: "/emr/kamar-bedah", icon: Scissors },
    ],
  },
  {
    key: "penunjang",
    title: "Penunjang Medis",
    icon: FlaskConical,
    items: [
      { title: "Laboratorium (LIS)", url: "/penunjang/laboratorium", icon: FlaskConical },
      { title: "Radiologi (RIS/PACS)", url: "/penunjang/radiologi", icon: ScanLine },
      { title: "Bank Darah & CSSD", url: "/penunjang/bank-darah-cssd", icon: Droplets },
    ],
  },
  {
    key: "farmasi",
    title: "Farmasi & Logistik",
    icon: Pill,
    items: [
      { title: "E-Resep & Telaah", url: "/farmasi/resep", icon: Pill },
      { title: "Stok, Batch & FEFO", url: "/farmasi/inventori", icon: Boxes },
      { title: "Narkotika & Psikotropika", url: "/farmasi/narkotika", icon: ShieldCheck },
      { title: "Depo & Distribusi", url: "/farmasi/depo", icon: Truck },
    ],
  },
  {
    key: "billing",
    title: "Penjaminan & Billing",
    icon: Receipt,
    items: [
      { title: "Eligibilitas & SEP", url: "/billing/eligibilitas", icon: ShieldCheck },
      { title: "Tagihan Pasien", url: "/billing/tagihan", icon: Receipt },
      { title: "Klaim & INA-CBG", url: "/billing/klaim", icon: FileCheck2 },
    ],
  },
  {
    key: "pengadaan",
    title: "Pengadaan & Aset",
    icon: ShoppingCart,
    items: [
      { title: "Procurement (PR/PO)", url: "/pengadaan/procurement", icon: ShoppingCart },
      { title: "Aset Medis & Kalibrasi", url: "/pengadaan/aset", icon: Wrench },
    ],
  },
  {
    key: "keuangan",
    title: "Keuangan & Akuntansi",
    icon: Wallet,
    items: [
      { title: "GL & Cost Center", url: "/keuangan/gl", icon: BookOpen },
      { title: "Remunerasi Jasmed", url: "/keuangan/jasmed", icon: HandCoins },
      { title: "Piutang Klaim", url: "/keuangan/piutang", icon: CircleDollarSign },
    ],
  },
  {
    key: "integrasi",
    title: "Integrasi & Jaringan",
    icon: Network,
    items: [
      { title: "SatuSehat & Bridging", url: "/integrasi/satusehat", icon: Share2 },
      { title: "Multi-Branch Hub", url: "/integrasi/multi-branch", icon: Building2 },
    ],
  },
];
