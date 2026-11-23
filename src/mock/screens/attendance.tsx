import { useState } from "react";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Plus, RotateCcw, ClipboardCheck, TriangleAlert, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { Avatar, Badge, Btn, Card, Chip, Dialog, Field, Input, SearchBox, Segmented, TopBar, type BadgeTone } from "../ui";

const STATUS: Record<string, { label: string; tone: BadgeTone; dot: string }> = {
  alpha: { label: "Tanpa keterangan", tone: "danger", dot: "bg-danger-500" },
  sakit: { label: "Sakit", tone: "tide", dot: "bg-tide-600" },
  izin: { label: "Keterangan", tone: "butter", dot: "bg-butter-400" },
};

function Dots({ alpha, limit = 2 }: { alpha: number; limit?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: limit }).map((_, i) => (
        <span key={i} className={cn("h-2.5 w-2.5 rounded-full", i < alpha ? "bg-danger-500" : "bg-paper-3")} />
      ))}
      <span className="ml-1 text-[11px] font-bold text-ink-2">{alpha}/{limit}</span>
    </div>
  );
}

const COURSES = [
  { n: "Basis Data", pj: "Bagas Saputra", alpha: 1, total: 3, hist: [["alpha", "12 Mar 2026", "—"], ["sakit", "5 Mar 2026", "Surat dokter"], ["izin", "26 Feb 2026", "Lomba nasional"]] },
  { n: "Bahasa Indonesia", pj: "Rani Wulandari", alpha: 2, total: 2, hist: [["alpha", "10 Mar 2026", "—"], ["alpha", "3 Mar 2026", "—"]] },
  { n: "Statistika Dasar", pj: "Dewi Anggraini", alpha: 0, total: 0, hist: [] },
];

export function StudentAttendanceView({ variant = "default" }: { variant?: "default" | "empty" }) {
  const [open, setOpen] = useState(0);
  if (variant === "empty") {
    return (
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <div className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-brand-50"><ClipboardCheck size={32} className="text-brand-600" /></div>
        <div className="font-display text-[18px] font-bold">Belum ada catatan absensi</div>
        <div className="mt-1.5 text-[13px] text-muted">Catatan dari PJ akan muncul di sini.</div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[32px] bg-espresso p-5 text-white">
        <div className="absolute -top-8 -right-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(227,107,15,0.5),transparent_70%)]" />
        <div className="relative">
          <div className="text-[11px] font-bold tracking-[0.16em] text-brand-300">KEHADIRAN SEMESTER INI</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-[44px] leading-none font-extrabold">3</span>
            <span className="text-[14px] text-white/70">mata kuliah</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[["3", "Tanpa ket."], ["1", "Sakit"], ["1", "Keterangan"]].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-white/10 px-3 py-2.5">
                <div className="font-display text-[22px] leading-none font-extrabold">{v}</div>
                <div className="mt-1 text-[11px] text-white/65">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-1 font-display text-[18px] font-bold">Jatah per mata kuliah</div>
      {COURSES.map((c, i) => {
        const left = 2 - c.alpha;
        return (
          <Card key={c.n}>
            <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full cursor-pointer items-center gap-3 p-4 text-left">
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-bold">{c.n}</div>
                <div className="mb-1.5 text-[11px] text-muted">PJ {c.pj}</div>
                <Dots alpha={c.alpha} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge tone={left === 0 ? "danger" : left === 1 ? "butter" : "leaf"}>{left === 0 ? "Habis" : `Sisa ${left}`}</Badge>
                <span className="text-[10px] font-medium text-muted">{c.total} catatan</span>
              </div>
              <ChevronDown size={18} className={cn("text-muted transition-transform", open === i && "rotate-180")} />
            </button>
            {open === i && (
              <div className="space-y-2 border-t border-line bg-paper-2/50 px-4 py-3">
                {c.hist.length === 0 && <div className="py-2 text-center text-[12px] text-muted">Belum ada riwayat untuk matkul ini.</div>}
                {c.hist.map(([s, d, note]) => (
                  <div key={d} className="flex items-center gap-2.5">
                    <span className={cn("h-2.5 w-2.5 rounded-full", STATUS[s].dot)} />
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold">{d}</div>
                      {note !== "—" && <div className="text-[11px] text-muted">{note}</div>}
                    </div>
                    <Badge tone={STATUS[s].tone}>{STATUS[s].label}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        );
      })}
      <div className="rounded-2xl bg-butter-100 p-3.5 text-[12px] leading-[1.6] text-butter-700">
        Kuota tanpa keterangan maksimal 2 per matkul per semester. Sakit dan keterangan tidak mengurangi kuota.
      </div>
    </div>
  );
}

export function StudentAttendancePage() {
  return (
    <div className="px-5 pt-3">
      <StudentAttendanceView />
    </div>
  );
}

/* ═══════════════ PJ ═══════════════ */

export function PjAttendanceList({ empty }: { empty?: boolean }) {
  const items = [
    { n: "Bahasa Indonesia", k: "SI-4B · Semester 4", s: 24, r: 6, a: 3 },
    { n: "Basis Data", k: "SI-4B · Semester 4", s: 24, r: 2, a: 1 },
  ];
  return (
    <>
      <TopBar title="Absensi" subtitle="Catat mahasiswa yang tidak hadir" />
      <div className="space-y-3 px-5">
        {empty ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-brand-50"><ClipboardCheck size={32} className="text-brand-600" /></div>
            <div className="font-display text-[18px] font-bold">Belum ada matkul aktif</div>
            <div className="mt-1.5 text-[13px] text-muted">Kamu belum memegang matkul di semester aktif angkatanmu.</div>
          </div>
        ) : (
          <>
            <div>
              <div className="font-display text-[18px] font-bold">Mata kuliah</div>
              <div className="text-[12px] text-muted">Pilih matkul untuk melihat mahasiswa dan mencatat absensi.</div>
            </div>
            {items.map((i) => (
              <Card key={i.n} className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={i.n} size={48} square />
                  <div className="flex-1"><div className="text-[15px] font-bold">{i.n}</div><div className="text-[12px] text-muted">{i.k}</div></div>
                  <ChevronRight size={18} className="text-muted" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  {[[i.s, "Mahasiswa"], [i.r, "Catatan"], [i.a, "Tanpa ket."]].map(([v, l]) => (
                    <div key={l as string} className="rounded-xl bg-paper-2 py-2"><div className="font-display text-[18px] font-extrabold">{v}</div><div className="text-[10px] text-muted">{l}</div></div>
                  ))}
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </>
  );
}

const ROSTER = [
  { n: "Aulia Rahmawati", nim: "2310114001", a: 0 },
  { n: "Bagas Saputra", nim: "2310114011", a: 1 },
  { n: "Intan Permata", nim: "2310114022", a: 2 },
  { n: "Rani Wulandari", nim: "2310114027", a: 1 },
];

export function PjAttendanceDetail({ tab = 0, menu }: { tab?: 0 | 1; menu?: boolean }) {
  return (
    <>
      <TopBar title="Bahasa Indonesia" right={<div className="relative"><div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white"><MoreVertical size={18} /></div>
        {menu && (
          <div className="pop-shadow absolute top-12 right-0 z-10 w-44 rounded-2xl bg-white p-1.5 text-[13px] font-semibold">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5"><RotateCcw size={15} /> Muat ulang</div>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-danger-500"><Trash2 size={15} /> Reset catatan</div>
          </div>
        )}
      </div>} />
      <div className="space-y-4 px-5">
        <div className="rounded-[28px] bg-espresso p-5 text-white">
          <div className="text-[11px] font-bold tracking-[0.16em] text-brand-300">ABSENSI KELAS</div>
          <div className="font-display text-[22px] font-bold">SI-4B · Semester 4</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[["24", "Mahasiswa"], ["3", "Tanpa ket."], ["6", "Catatan"]].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-white/10 px-3 py-2.5"><div className="font-display text-[22px] leading-none font-extrabold">{v}</div><div className="mt-1 text-[11px] text-white/65">{l}</div></div>
            ))}
          </div>
        </div>
        <Segmented value={tab} options={[{ label: "Mahasiswa" }, { label: "Riwayat" }]} />
        {tab === 0 ? (
          <div className="space-y-2">
            {ROSTER.map((r) => (
              <div key={r.n} className="flex items-center gap-3 rounded-[22px] border border-ink/5 bg-white p-3">
                <Avatar name={r.n} size={40} />
                <div className="min-w-0 flex-1"><div className="truncate text-[14px] font-bold">{r.n}</div><div className="text-[11px] text-muted">{r.nim}</div></div>
                <div className="flex flex-col items-end gap-1"><Dots alpha={r.a} />{r.a >= 2 && <Badge tone="danger">Jatah habis</Badge>}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {[["alpha", "Intan Permata", "12 Mar 2026", ""], ["sakit", "Bagas Saputra", "10 Mar 2026", "Surat dokter"], ["izin", "Rani Wulandari", "5 Mar 2026", "Lomba nasional"]].map(([s, n, d, note]) => (
              <div key={n} className="flex items-center gap-3 rounded-[22px] border border-ink/5 bg-white p-3">
                <span className={cn("h-2.5 w-2.5 rounded-full", STATUS[s].dot)} />
                <div className="min-w-0 flex-1"><div className="truncate text-[14px] font-bold">{n}</div><div className="text-[11px] text-muted">{d}{note && ` · ${note}`}</div></div>
                <Badge tone={STATUS[s].tone}>{STATUS[s].label}</Badge>
                <Trash2 size={16} className="text-muted" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sticky bottom-0 mt-4 px-5 pb-1">
        <Btn full size="lg" icon={Plus}>Catat absen</Btn>
      </div>
    </>
  );
}

export function RecordSheet({ warn }: { warn?: boolean }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end bg-espresso/45 backdrop-blur-[3px]">
      <div className="sheet-up flex h-[92%] w-full flex-col rounded-t-[32px] bg-paper pt-3">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-paper-3" />
        <div className="px-5 font-display text-[20px] font-bold">Catat absensi</div>
        <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 pt-4 pb-3">
          <Field label="Tanggal">
            <div className="flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white"><ChevronLeft size={18} /></div>
              <div className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-line bg-white text-[14px] font-bold"><CalendarDays size={15} className="text-brand-600" />Kamis, 12 Mar 2026</div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white"><ChevronRight size={18} /></div>
            </div>
            <div className="mt-2 flex gap-2"><Chip selected>Hari ini</Chip><Chip>Kemarin</Chip></div>
          </Field>
          <Field label="Status">
            <Segmented value={0} options={[{ label: "Tanpa ket." }, { label: "Sakit" }, { label: "Keterangan" }]} />
          </Field>
          <Field label="Mahasiswa">
            <SearchBox placeholder="Cari nama atau NIM" />
            <div className="mt-2 space-y-1.5">
              {[
                ["Aulia Rahmawati", "2310114001", true, ""],
                ["Bagas Saputra", "2310114011", false, "Sudah dicatat"],
                ["Intan Permata", "2310114022", false, "Jatah habis"],
                ["Rani Wulandari", "2310114027", true, ""],
              ].map(([n, nim, checked, tag]) => (
                <div key={n as string} className={cn("flex items-center gap-3 rounded-2xl border p-2.5", checked ? "border-brand-300 bg-brand-50" : "border-line bg-white", tag && "opacity-70")}>
                  <div className={cn("flex h-6 w-6 items-center justify-center rounded-lg border-2", checked ? "border-brand-500 bg-brand-500" : "border-line")}>{checked && <Check size={14} className="text-white" />}</div>
                  <div className="flex-1"><div className="text-[13px] font-bold">{n}</div><div className="text-[11px] text-muted">{nim}</div></div>
                  {tag && <Badge tone={tag === "Jatah habis" ? "danger" : "neutral"}>{tag}</Badge>}
                </div>
              ))}
            </div>
          </Field>
          <Field label="Catatan (opsional)"><Input placeholder="Mis. keterangan dokter atau alasan izin" tall /></Field>
          {warn && (
            <div className="flex items-start gap-2.5 rounded-2xl bg-butter-100 p-3.5 text-[12px] leading-[1.55] text-butter-700">
              <TriangleAlert size={16} className="mt-0.5 shrink-0" />
              Sebagian mahasiswa sudah 2/2. Catatan tetap disimpan dengan peringatan.
            </div>
          )}
        </div>
        <div className="border-t border-line px-5 pt-3 pb-6"><Btn full size="lg">Simpan absensi</Btn></div>
      </div>
    </div>
  );
}

export function ResetDialog() {
  return <Dialog danger title="Reset catatan absensi?" desc="Semua catatan di Bahasa Indonesia akan dihapus. Kuota tanpa keterangan semua mahasiswa kembali ke 2. Tindakan ini tercatat di audit log." confirm="Reset" />;
}

