import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  Check,
  Eye,
  Loader2,
  MessageCircle,
  MessagesSquare,
  RefreshCw,
  ShieldAlert,
  Trophy,
  X,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Avatar, Batik, Btn, GoogleMark, LogoMark } from "../ui";

/* ═══════════════ Splash ═══════════════ */

function StepRow({ title, sub, active }: { title: string; sub: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-paper-2 px-3 py-2">
      <div className={cn("flex h-6 w-6 items-center justify-center rounded-full", active ? "bg-brand-500" : "bg-leaf-500")}>
        <Check size={13} className="text-white" />
      </div>
      <div className="min-w-0">
        <div className="text-[12px] leading-[1.2] font-bold">{title}</div>
        <div className="truncate text-[10px] leading-[1.3] text-ink/55">{sub}</div>
      </div>
    </div>
  );
}

function InputPoinCard() {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <div className="font-display text-[17px] leading-[1.1] font-extrabold">Input poin</div>
        <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[9px] font-bold text-white">PJ KELAS</span>
      </div>
      <StepRow title="Mata kuliah" sub="Bahasa Indonesia · K1" />
      <StepRow title="Mahasiswa" sub="Rani Wulandari · NIM ••••1204" />
      <StepRow title="Kategori" sub="Bertanya · +4 poin" active />
      <div className="mt-auto flex h-10 items-center justify-between rounded-xl bg-brand-500 px-4">
        <span className="text-[13px] font-bold text-white">Simpan poin</span>
        <span className="font-display text-[15px] font-extrabold text-butter-400">+4</span>
      </div>
    </div>
  );
}

function PodiumCard() {
  const cell = (n: string, i: string, h: number, bg: string, fg: string, r: string) => (
    <div className="flex flex-1 flex-col items-center justify-end gap-1">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-2 text-[11px] font-extrabold">{i}</div>
      <div className="text-[10px] font-bold">{n}</div>
      <div className={cn("flex w-full items-start justify-center rounded-t-xl pt-1.5 font-display text-xl font-extrabold", bg, fg)} style={{ height: h }}>
        {r}
      </div>
    </div>
  );
  return (
    <div className="flex h-full flex-col p-4">
      <div className="font-display text-[17px] font-extrabold">Partisipasi teratas</div>
      <div className="text-[10px] font-semibold text-ink/60">SI-4A · 24 mahasiswa · 3 PJ</div>
      <div className="mt-auto flex items-end gap-2">
        {cell("Bagas", "BS", 56, "bg-paper-3", "text-ink-2", "2")}
        {cell("Aulia", "AR", 80, "bg-brand-500", "text-white", "1")}
        {cell("Cahya", "CN", 40, "bg-butter-100", "text-butter-700", "3")}
      </div>
    </div>
  );
}

function MateriCard() {
  const row = (t: string, tag: string, w: number) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold">{t}</span>
        <span className="rounded-md bg-paper-2 px-1.5 py-0.5 text-[9px] font-bold text-ink/70">{tag}</span>
      </div>
      <div className="h-1 rounded-full bg-paper-3">
        <div className="h-1 rounded-full bg-leaf-500" style={{ width: `${w * 100}%` }} />
      </div>
    </div>
  );
  return (
    <div className="flex h-full flex-col gap-2.5 p-4">
      <div className="flex items-center justify-between">
        <div className="font-display text-[17px] font-extrabold">Materi kelas</div>
        <span className="rounded-full bg-butter-100 px-2 py-0.5 text-[9px] font-bold text-butter-700">3 BARU</span>
      </div>
      {row("Bab 3 · Teks Eksposisi", "PDF", 1)}
      {row("Bab 4 · Kalimat Efektif", "Slide", 0.7)}
      {row("Bab 5 · Ejaan & Tanda Baca", "Video", 0.35)}
      {row("Bab 6 · Karya Ilmiah", "PDF", 0.2)}
      <div className="mt-auto rounded-xl bg-butter-100 py-2 text-center text-[11px] font-bold text-butter-700">Unduh semua materi</div>
    </div>
  );
}

function DiskusiCard() {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <div className="font-display text-[17px] font-extrabold">Diskusi kelas</div>
        <span className="flex items-center gap-1 text-[9px] font-bold text-leaf-500">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" /> LIVE
        </span>
      </div>
      <div className="flex items-start gap-1.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-plum-100 text-[9px] font-extrabold text-plum-600">DA</div>
        <div className="rounded-2xl rounded-tl-md bg-paper-2 px-3 py-2 text-[11px] font-medium">Apa beda opini dan fakta, Bu?</div>
      </div>
      <div className="self-end rounded-2xl rounded-br-md bg-brand-500 px-3 py-2 text-[11px] font-semibold text-white">Fakta bisa dibuktikan</div>
      <div className="flex items-start gap-1.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-plum-100 text-[9px] font-extrabold text-plum-600">DA</div>
        <div className="rounded-2xl rounded-tl-md bg-paper-2 px-3 py-2 text-[11px] font-medium">Baik, Bu. Saya catat.</div>
      </div>
      <div className="text-[10px] font-bold text-butter-700">+5 poin diskusi</div>
      <div className="mt-auto flex h-8 items-center rounded-full border border-line px-3 text-[11px] text-muted">Tulis balasan…</div>
    </div>
  );
}

function RekapCard() {
  const row = (t: string, p: string, bg: string, fg: string) => (
    <div className="flex items-center justify-between rounded-lg bg-paper-2 px-2.5 py-1.5">
      <span className="text-[10px] font-semibold text-ink/80">{t}</span>
      <span className={cn("rounded-md px-1.5 py-0.5 text-[9px] font-extrabold", bg, fg)}>{p}</span>
    </div>
  );
  return (
    <div className="flex h-full flex-col gap-1.5 p-4">
      <div className="flex items-center justify-between">
        <div className="font-display text-[17px] font-extrabold">Rekap poin</div>
        <span className="rounded-full bg-espresso px-2 py-0.5 text-[9px] font-bold text-white">SEMESTER 4</span>
      </div>
      <div className="mt-1 font-display text-[34px] leading-none font-extrabold tracking-[-0.01em] text-brand-600">1.240</div>
      <div className="text-[10px] text-ink/55">total poin keaktifan</div>
      <div className="mt-1 text-[10px] font-bold text-ink/60">3 aktivitas terakhir</div>
      {row("Bertanya", "+4", "bg-brand-50", "text-brand-600")}
      {row("Aktif diskusi", "+2", "bg-butter-100", "text-butter-700")}
      {row("Presentasi", "+3", "bg-leaf-100", "text-leaf-500")}
    </div>
  );
}

const SLIDES = [
  { t: "Input poin", d: "Catat kontribusi mahasiswa", C: InputPoinCard },
  { t: "Partisipasi teratas", d: "Podium & peringkat kelas", C: PodiumCard },
  { t: "Materi kelas", d: "Unggah & sinkron materi", C: MateriCard },
  { t: "Diskusi kelas", d: "Tanya jawab real-time", C: DiskusiCard },
  { t: "Rekap poin", d: "Ringkasan nilai keaktifan", C: RekapCard },
];

export function Splash({ slide: fixed }: { slide?: number }) {
  const [active, setActive] = useState(fixed ?? 0);
  const [progress, setProgress] = useState(fixed != null ? 0.45 : 0);
  useEffect(() => {
    if (fixed != null) return;
    const a = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 1800);
    const p = setInterval(() => setProgress((v) => (v >= 1 ? 0 : v + 0.02)), 80);
    return () => {
      clearInterval(a);
      clearInterval(p);
    };
  }, [fixed]);
  const S = SLIDES[active];
  const label = progress >= 1 ? "SIAP DIGUNAKAN" : progress < 0.3 ? "MENYIAPKAN KELAS" : progress < 0.6 ? "MENYINKRONKAN MATERI" : "MEMUAT POIN KEAKTIFAN";
  return (
    <div className="relative h-full bg-paper">
      <div className="absolute inset-x-0 top-0 h-[46%] overflow-hidden bg-gradient-to-b from-brand-400 via-brand-500 to-brand-600">
        <div className="ping-ring absolute top-1/2 left-1/2 -mt-24 -ml-24 h-48 w-48 rounded-full border-2 border-white/30" />
        <div className="ping-ring absolute top-1/2 left-1/2 -mt-24 -ml-24 h-48 w-48 rounded-full border-2 border-white/20" style={{ animationDelay: "1.2s" }} />
        <div className="relative flex h-full flex-col items-center justify-center px-5 pt-6">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-white/35">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <LogoMark size={48} tile="transparent" ink="#E36B0F" />
            </div>
          </div>
          <div className="mt-3 font-display text-[40px] leading-none font-extrabold tracking-[-0.02em] text-white">SiKarsa</div>
          <div className="mt-1.5 text-[12px] text-white/85">Poin keaktifan, materi, dan diskusi kelas.</div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-[59.5%] flex-col rounded-t-[40px] bg-paper px-5 pt-5 pb-5 shadow-[0_-12px_36px_-12px_rgba(42,26,16,0.28)]">
        <div className="relative h-[250px]">
          <div className="absolute inset-x-3 top-3 bottom-0 translate-y-2 rounded-[28px] bg-white/70" />
          <div key={active} className="card-in card-shadow relative h-full overflow-hidden rounded-[28px] border border-ink/5 bg-white">
            <S.C />
          </div>
        </div>
        <div key={`c${active}`} className="rise mt-3.5 text-center">
          <div className="font-display text-[13px] leading-[1.2] font-extrabold">{S.t}</div>
          <div className="text-[10px] text-muted">{S.d}</div>
        </div>
        <div className="mt-2 flex items-center justify-center">
          {SLIDES.map((_, i) => (
            <div key={i} className={cn("mx-[3px] h-[5px] rounded-full transition-all duration-300", i === active ? "w-6 bg-brand-500" : "w-[5px] bg-ink/15")} />
          ))}
        </div>
        <div className="mt-auto">
          <div className="mb-1.5 flex items-end justify-between">
            <span className="text-[9px] font-semibold tracking-[0.22em] text-ink/50">{label}</span>
            <span className="font-display text-[15px] leading-none font-extrabold">{Math.min(100, Math.round(progress * 100))}%</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-paper-3">
            <div className="relative h-full rounded-full bg-brand-500 transition-[width] duration-100" style={{ width: `${Math.min(100, progress * 100)}%` }}>
              <div className="shimmer absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ Onboarding ═══════════════ */

const PAGES = [
  { n: "01", t: "Poin akademik", d: "Setiap kontribusi punya tempat.", bg: "bg-brand-500" },
  { n: "02", t: "Grup kelas", d: "Percakapan kelas tetap dekat.", bg: "bg-tide-600" },
  { n: "03", t: "Karsa Lib", d: "Ilmu tumbuh saat dibagikan.", bg: "bg-leaf-600" },
];

function OnbArt({ page }: { page: number }) {
  if (page === 0)
    return (
      <>
        <div className="absolute top-8 left-6 flex items-center gap-2.5 rounded-[20px] bg-white p-3 pr-5 shadow-xl">
          <Avatar name="Aulia Rahmawati" size={42} />
          <div>
            <div className="text-[13px] font-bold">Aulia Rahmawati</div>
            <div className="text-[11px] text-muted">Menjawab pertanyaan · Basis Data</div>
          </div>
        </div>
        <div className="absolute top-[132px] right-6 left-12 rounded-[28px] bg-espresso p-5 shadow-xl">
          <div className="text-[10px] font-bold tracking-[0.16em] text-brand-300">TOTAL POIN KEAKTIFAN</div>
          <div className="font-display text-[56px] leading-none font-extrabold text-white">128</div>
          <div className="mt-2 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-butter-400">+12 minggu ini</div>
        </div>
        <div className="absolute right-8 bottom-10 flex items-center gap-2 rounded-2xl bg-butter-100 px-4 py-3 shadow-xl">
          <span className="text-[14px] font-bold">Presentasi</span>
          <span className="font-display text-[16px] font-extrabold text-butter-700">+3</span>
        </div>
      </>
    );
  if (page === 1)
    return (
      <>
        <div className="absolute top-8 left-6 max-w-[230px] rounded-[22px] rounded-bl-md bg-white p-3.5 shadow-xl">
          <div className="text-[11px] font-bold text-tide-600">Intan</div>
          <div className="text-[14px] leading-[1.4]">Ada yang punya catatan BCNF?</div>
        </div>
        <div className="absolute top-[128px] right-6 rounded-[22px] rounded-br-md bg-brand-500 px-4 py-3 shadow-xl">
          <div className="text-[14px] text-white">Kuunggah di drive kelas ya!</div>
        </div>
        <div className="absolute bottom-10 left-6 flex items-center gap-3 rounded-full bg-white/15 py-2 pr-4 pl-2 backdrop-blur">
          <div className="flex -space-x-2">
            {["Aulia R", "Bagas S", "Cahya N"].map((n) => (
              <Avatar key={n} name={n} size={30} className="ring-2 ring-tide-600" />
            ))}
          </div>
          <span className="text-[12px] font-semibold text-white">38 anggota</span>
        </div>
      </>
    );
  return (
    <>
      <div className="absolute top-8 right-6 left-6 rounded-[28px] bg-white p-4 shadow-xl">
        <div className="mb-2 flex items-center gap-2">
          <Avatar name="Rafi Hidayat" size={28} />
          <span className="text-[12px] font-semibold text-ink-2">Rafi Hidayat</span>
        </div>
        <div className="font-display text-[19px] leading-[1.2] font-bold">Normalisasi tanpa pusing lewat satu studi kasus</div>
        <div className="mt-3 flex gap-4 text-[12px] font-semibold text-muted">
          <span className="flex items-center gap-1"><Eye size={13} /> 214</span>
          <span className="flex items-center gap-1"><MessageCircle size={13} /> 14</span>
        </div>
      </div>
      <div className="absolute right-8 bottom-12 rounded-full bg-brand-500 px-5 py-3 text-[14px] font-bold text-white shadow-xl">+ Tulis</div>
    </>
  );
}

export function Onboarding({ page }: { page: 0 | 1 | 2 }) {
  const p = PAGES[page];
  const last = page === 2;
  return (
    <div className="flex h-full flex-col bg-paper pt-[34px]">
      <div className="flex items-center gap-3 px-5 py-3">
        <div className="flex flex-1 gap-1.5">
          {PAGES.map((_, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-paper-3">
              <div className={cn("h-full rounded-full bg-espresso", i < page ? "w-full" : i === page ? "w-full" : "w-0")} />
            </div>
          ))}
        </div>
        <span className="text-[13px] font-bold text-ink-2">Lewati</span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-6">
        <div className={cn("relative min-h-0 flex-1 overflow-hidden rounded-[40px]", p.bg)}>
          <Batik color="#fff" opacity={0.2} />
          <div className="absolute -top-8 -left-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35),transparent_70%)]" />
          <OnbArt page={page} />
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <span className="font-display text-[14px] font-extrabold text-brand-700">{p.n}</span>
            <span className="h-px w-8 bg-brand-300" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-brand-700 uppercase">{p.t}</span>
          </div>
          <div className="mt-2 font-display text-[34px] leading-[1.05] font-extrabold tracking-[-0.02em]">{p.d}</div>
        </div>
        <Btn size="lg" full iconRight={ArrowRight} className="mt-6">
          {last ? "Mulai sekarang" : "Lanjut"}
        </Btn>
      </div>
    </div>
  );
}

/* ═══════════════ Login ═══════════════ */

function FeatureRow({ icon: I, text, bg, fg }: { icon: typeof Trophy; text: string; bg: string; fg: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-[14px]", bg)}>
        <I size={18} className={fg} />
      </div>
      <span className="text-[14px] font-semibold text-ink-2">{text}</span>
    </div>
  );
}

export function Login({ variant = "idle" }: { variant?: "idle" | "terms-error" | "waiting" | "exchanging" | "error" }) {
  const waiting = variant === "waiting" || variant === "exchanging";
  const msg =
    variant === "terms-error"
      ? "Baca dan setujui Syarat Penggunaan sebelum masuk."
      : variant === "error"
        ? "Aplikasi ini hanya tersedia untuk akun mahasiswa UNTIDAR."
        : null;
  return (
    <div className="flex h-full flex-col bg-paper">
      <div className="relative h-[46%] shrink-0 overflow-hidden rounded-b-[48px] bg-brand-500">
        <Batik color="#fff" opacity={0.2} />
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,167,98,0.45),transparent_70%)]" />
        <div className="absolute inset-x-7 bottom-9">
          <LogoMark size={64} tile="#2A1A10" ink="#FFA762" radius={20} />
          <div className="mt-6 font-display text-[40px] leading-[1.02] font-extrabold tracking-[-0.02em] text-white">Masuk ke SiKarsa</div>
          <div className="mt-2 w-[290px] text-[15px] leading-[1.5] text-white/85">Poin keaktifan, materi, dan diskusi kelas.</div>
        </div>
      </div>
      <div className="no-scrollbar flex flex-1 flex-col justify-between overflow-y-auto px-7 pt-6 pb-7">
        <div>
          {waiting ? (
            <div className="rise rounded-[24px] border border-line bg-white p-5 text-center">
              <Loader2 className="mx-auto mb-3 animate-spin text-brand-500" size={28} />
              <div className="font-display text-[17px] font-bold">
                {variant === "exchanging" ? "Menyiapkan akun..." : "Menunggu login di browser..."}
              </div>
              <div className="mt-1 text-[13px] text-muted">
                {variant === "exchanging" ? "Kami sedang menyelesaikan proses masuk." : "Selesaikan masuk dengan akun Google kampusmu."}
              </div>
              <div className="mt-4 text-[13px] font-bold text-brand-700">Batalkan</div>
            </div>
          ) : (
            <div className="rise space-y-3.5">
              {msg && (
                <div className="flex items-start gap-3 rounded-[20px] border border-danger-500/20 bg-danger-100 p-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/70">
                    <ShieldAlert size={17} className="text-danger-500" />
                  </div>
                  <div className="flex-1 pt-1 text-[13px] leading-[1.5] font-medium text-danger-500">{msg}</div>
                  <X size={16} className="mt-2 text-danger-500" />
                </div>
              )}
              <div className="flex items-start gap-3 rounded-[20px] border border-line bg-white p-4">
                <div className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2", variant === "terms-error" || variant === "error" ? "border-brand-500 bg-brand-500" : "border-line")}>
                  {(variant === "terms-error" || variant === "error") && <Check size={13} className="text-white" />}
                </div>
                <div className="text-[13px] leading-[1.5]">
                  <div className="font-medium">Saya telah membaca dan menyetujui dokumen berikut.</div>
                  <div className="mt-0.5 font-bold text-brand-700 underline decoration-brand-300 underline-offset-2">
                    Syarat Penggunaan <span className="font-normal text-muted no-underline">·</span> Kebijakan Privasi
                  </div>
                  <div className="mt-1 text-[12px] text-muted">Data poin dan aktivitas digunakan untuk keperluan akademik.</div>
                </div>
              </div>
              <div className="flex h-14 items-center justify-center gap-3 rounded-[20px] border border-line bg-white shadow-sm">
                <GoogleMark />
                <span className="text-[16px] font-semibold">Masuk dengan Google</span>
              </div>
              <div className="px-3 text-center text-[13px] leading-[1.6] text-muted">
                Gunakan akun kampus berakhiran @students.untidar.ac.id agar poinmu tercatat.
              </div>
            </div>
          )}
          <div className="mt-7 space-y-3">
            <FeatureRow icon={Trophy} text="Poin keaktifan tercatat rapi" bg="bg-brand-100" fg="text-brand-600" />
            <FeatureRow icon={MessagesSquare} text="Grup kelas dalam satu tempat" bg="bg-tide-100" fg="text-tide-600" />
            <FeatureRow icon={BookOpenText} text="Materi dari teman satu prodi" bg="bg-leaf-100" fg="text-leaf-600" />
          </div>
        </div>
        <div className="mt-6 text-center text-[12px] leading-[1.5] text-muted">
          Login berlangsung melalui browser. Kata sandi Google tidak disimpan di aplikasi.
        </div>
      </div>
    </div>
  );
}

export function SessionError() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-paper px-8 text-center">
      <Batik color="#E36B0F" opacity={0.06} />
      <div className="relative flex flex-col items-center">
        <LogoMark size={72} radius={22} />
        <div className="mt-7 font-display text-[30px] leading-[1.1] font-extrabold tracking-[-0.02em]">Belum bisa memeriksa sesi</div>
        <div className="mt-3 w-[290px] text-[15px] leading-[1.6] text-ink-2">Periksa koneksi internetmu, lalu coba lagi.</div>
        <Btn size="lg" full icon={RefreshCw} className="mt-7">Coba lagi</Btn>
        <div className="mt-3.5 text-[12px] text-muted">Sesi kamu tetap tersimpan di perangkat ini.</div>
      </div>
    </div>
  );
}
