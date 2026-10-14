import { lazy, type ComponentType } from "react";
import { Navigate, Route } from "react-router-dom";
import AppLayout from "@shared-component/layout/app-layout";

type Loader = () => Promise<Record<string, ComponentType>>;
// Lazy-load a named export of a module file as a route component.
const page = (load: Loader, name: string) =>
  lazy(() => load().then((m) => ({ default: m[name] })));

const Dashboard = lazy(() => import("@modules/dashboard/dashboard"));

const fo = () => import("@modules/front-office/front-office") as unknown as Promise<Record<string, ComponentType>>;
const emr = () => import("@modules/emr/emr") as unknown as Promise<Record<string, ComponentType>>;
const pn = () => import("@modules/penunjang/penunjang") as unknown as Promise<Record<string, ComponentType>>;
const fm = () => import("@modules/farmasi/farmasi") as unknown as Promise<Record<string, ComponentType>>;
const bl = () => import("@modules/billing/billing") as unknown as Promise<Record<string, ComponentType>>;
const pg = () => import("@modules/pengadaan/pengadaan") as unknown as Promise<Record<string, ComponentType>>;
const kn = () => import("@modules/keuangan/keuangan") as unknown as Promise<Record<string, ComponentType>>;
const ig = () => import("@modules/integrasi/integrasi") as unknown as Promise<Record<string, ComponentType>>;

const routes: { path: string; Component: ComponentType }[] = [
  { path: "front-office/pendaftaran", Component: page(fo, "Pendaftaran") },
  { path: "front-office/antrean", Component: page(fo, "Antrean") },
  { path: "front-office/rawat-inap", Component: page(fo, "RawatInap") },
  { path: "front-office/jadwal-dokter", Component: page(fo, "JadwalDokter") },
  { path: "emr/rekam-medis", Component: page(emr, "RekamMedis") },
  { path: "emr/igd", Component: page(emr, "Igd") },
  { path: "emr/kamar-bedah", Component: page(emr, "KamarBedah") },
  { path: "penunjang/laboratorium", Component: page(pn, "Laboratorium") },
  { path: "penunjang/radiologi", Component: page(pn, "Radiologi") },
  { path: "penunjang/bank-darah-cssd", Component: page(pn, "BankDarahCssd") },
  { path: "farmasi/resep", Component: page(fm, "Resep") },
  { path: "farmasi/inventori", Component: page(fm, "Inventori") },
  { path: "farmasi/narkotika", Component: page(fm, "Narkotika") },
  { path: "farmasi/depo", Component: page(fm, "Depo") },
  { path: "billing/eligibilitas", Component: page(bl, "Eligibilitas") },
  { path: "billing/tagihan", Component: page(bl, "Tagihan") },
  { path: "billing/klaim", Component: page(bl, "Klaim") },
  { path: "pengadaan/procurement", Component: page(pg, "Procurement") },
  { path: "pengadaan/aset", Component: page(pg, "Aset") },
  { path: "keuangan/gl", Component: page(kn, "GL") },
  { path: "keuangan/jasmed", Component: page(kn, "Jasmed") },
  { path: "keuangan/piutang", Component: page(kn, "Piutang") },
  { path: "integrasi/satusehat", Component: page(ig, "SatuSehat") },
  { path: "integrasi/multi-branch", Component: page(ig, "MultiBranch") },
];

export default function RouteManagement() {
  return (
    <Route element={<AppLayout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {routes.map(({ path, Component }) => (
        <Route key={path} path={`/${path}`} element={<Component />} />
      ))}
    </Route>
  );
}
