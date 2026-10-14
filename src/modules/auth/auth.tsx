import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Eye, EyeOff, HeartPulse, ShieldCheck } from "lucide-react";
import { Button } from "@shared-ui/button";
import { Input } from "@shared-ui/input";
import { Label } from "@shared-ui/label";
import { Checkbox } from "@shared-ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared-ui/select";
import { cn } from "@lib-utils/utils";
import { modulePath } from "@shared-constants/path-module";

type Mode = "login" | "register";

const loginSchema = z.object({
  email: z.string().min(1, "Email / NIP wajib diisi"),
  password: z.string().min(6, "Minimal 6 karakter"),
});
const registerSchema = z
  .object({
    nama: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
    peran: z.string({ error: "Pilih peran" }).min(1, "Pilih peran"),
    password: z.string().min(8, "Minimal 8 karakter"),
    konfirmasi: z.string(),
  })
  .refine((v) => v.password === v.konfirmasi, { path: ["konfirmasi"], message: "Password tidak sama" });

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs text-destructive">{message}</p> : null;
}

function PasswordInput(props: React.ComponentProps<typeof Input>) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} className="pr-10" {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
        aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

function LoginForm({ onSwitch, notice }: { onSwitch: () => void; notice: boolean }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit(() => navigate("/dashboard"))} className="flex h-full flex-col justify-center gap-4 px-6 py-8 sm:px-10" noValidate>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Masuk</h2>
        <p className="mt-1 text-sm text-muted-foreground">Gunakan akun SIMRS Anda untuk melanjutkan.</p>
      </div>
      {notice && (
        <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-700 dark:text-emerald-300">
          Registrasi berhasil. Akun menunggu persetujuan admin, silakan masuk setelah disetujui.
        </p>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="l-email">Email / NIP</Label>
        <Input id="l-email" placeholder="nama@rsmedika.id" autoComplete="username" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="l-pass">Password</Label>
          <button type="button" className="text-xs text-primary hover:underline">Lupa password?</button>
        </div>
        <PasswordInput id="l-pass" autoComplete="current-password" placeholder="••••••••" {...register("password")} />
        <FieldError message={errors.password?.message} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="font-normal">Ingat saya di perangkat ini</Label>
      </div>
      <Button type="submit" className="w-full">Masuk <ArrowRight className="size-4" /></Button>
      <p className="text-center text-sm text-muted-foreground md:hidden">
        Belum punya akun?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-primary hover:underline">Daftar</button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch, onDone }: { onSwitch: () => void; onDone: () => void }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  return (
    <form onSubmit={handleSubmit(onDone)} className="flex h-full flex-col justify-center gap-3 px-6 py-8 sm:px-10" noValidate>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Buat Akun</h2>
        <p className="mt-1 text-sm text-muted-foreground">Akun baru perlu disetujui administrator rumah sakit.</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="r-nama">Nama Lengkap</Label>
        <Input id="r-nama" placeholder="dr. / Ns. / Apt. ..." {...register("nama")} />
        <FieldError message={errors.nama?.message} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="r-email">Email</Label>
          <Input id="r-email" type="email" placeholder="nama@rsmedika.id" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Peran</Label>
          <Select onValueChange={(v) => setValue("peran", v, { shouldValidate: true })}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Pilih peran" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="dokter">Dokter</SelectItem>
              <SelectItem value="perawat">Perawat</SelectItem>
              <SelectItem value="apoteker">Apoteker</SelectItem>
              <SelectItem value="admisi">Petugas Admisi</SelectItem>
              <SelectItem value="kasir">Kasir / Billing</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.peran?.message} />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="r-pass">Password</Label>
          <PasswordInput id="r-pass" autoComplete="new-password" {...register("password")} />
          <FieldError message={errors.password?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-conf">Konfirmasi</Label>
          <PasswordInput id="r-conf" autoComplete="new-password" {...register("konfirmasi")} />
          <FieldError message={errors.konfirmasi?.message} />
        </div>
      </div>
      <Button type="submit" className="mt-1 w-full">Daftar <ArrowRight className="size-4" /></Button>
      <p className="text-center text-sm text-muted-foreground md:hidden">
        Sudah punya akun?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-primary hover:underline">Masuk</button>
      </p>
    </form>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>(() => (window.location.pathname.endsWith(modulePath.auth.register) ? "register" : "login"));
  const [registered, setRegistered] = useState(false);

  const go = (m: Mode) => {
    setMode(m);
    window.history.replaceState(null, "", `${import.meta.env.BASE_URL.replace(/\/$/, "")}${modulePath.auth[m]}`);
  };
  const isLogin = mode === "login";

  return (
    <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4">
      <div className="relative h-[640px] w-full max-w-4xl overflow-hidden rounded-2xl border bg-card shadow-xl md:h-[600px]">
        {/* Form login (kiri) */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-full transition-all duration-700 ease-in-out md:w-1/2",
            isLogin ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0 md:translate-x-full",
          )}
        >
          <LoginForm notice={registered} onSwitch={() => go("register")} />
        </div>
        {/* Form register (kanan) */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-full transition-all duration-700 ease-in-out md:w-1/2",
            !isLogin ? "z-10 opacity-100 md:translate-x-full" : "pointer-events-none z-0 opacity-0",
          )}
        >
          <RegisterForm
            onSwitch={() => go("login")}
            onDone={() => {
              setRegistered(true);
              go("login");
            }}
          />
        </div>

        {/* Panel geser */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 z-20 hidden w-1/2 transition-transform duration-700 ease-in-out md:block",
            isLogin ? "translate-x-full" : "translate-x-0",
          )}
        >
          <div className="relative flex h-full flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground">
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-white/10" />
            <div className="relative flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-white/20"><HeartPulse className="size-5" /></div>
              <div className="leading-tight">
                <p className="font-semibold">SIMRS Medika</p>
                <p className="text-xs opacity-80">Hospital ERP</p>
              </div>
            </div>
            <div className="relative space-y-3">
              <h3 className="text-3xl font-semibold leading-tight">{isLogin ? "Belum punya akun?" : "Sudah terdaftar?"}</h3>
              <p className="max-w-xs text-sm opacity-90">
                {isLogin
                  ? "Daftarkan diri Anda untuk mengakses pendaftaran pasien, rekam medis, farmasi, hingga billing dalam satu sistem."
                  : "Masuk dengan akun Anda dan lanjutkan pekerjaan di seluruh modul rumah sakit."}
              </p>
              <Button
                variant="outline"
                onClick={() => go(isLogin ? "register" : "login")}
                className="border-white/60 bg-transparent text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
              >
                {!isLogin && <ArrowLeft className="size-4" />}
                {isLogin ? "Daftar Sekarang" : "Masuk"}
                {isLogin && <ArrowRight className="size-4" />}
              </Button>
            </div>
            <p className="relative flex items-center gap-1.5 text-xs opacity-80">
              <ShieldCheck className="size-4" /> Data terenkripsi · sesuai standar keamanan RME
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
