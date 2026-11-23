import { useState } from "react";
import { Check, ChevronDown, FileBarChart, History, ShieldAlert, Trash2, Trophy, Users, CheckCircle2, MoreVertical } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  Avatar,
  Badge,
  Btn,
  Card,
  Chip,
  Dialog,
  Empty,
  Eyebrow,
  Field,
  Input,
  PageHeader,
  PointBadge,
  SearchBox,
  Sheet,
  TopBar,
} from "../ui";
import { StudentAttendanceView } from "./attendance";

/* ═══════════════ Input poin ═══════════════ */

function Step({ n, title, done, active, children, summary }: { n: number; title: string; done?: boolean; active?: boolean; children?: React.ReactNode; summary?: string }) {
  return (
    <div className={cn("rounded-[26px] border bg-white p-4", active ? "border-brand-300 card-shadow" : "border-ink/5")}>
      <div className="flex items-center gap-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-full font-display text-[14px] font-extrabold", done ? "bg-leaf-500 text-white" : active ? "bg-brand-500 text-white" : "bg-paper-2 text-muted")}>
          {done ? <Check size={16} /> : n}
        </div>
        <div className="flex-1">
          <div className="font-display text-[16px] font-bold">{title}</div>
          {summary && <div className="text-[12px] text-muted">{summary}</div>}
        </div>
      </div>
      {children && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

export function InputPoin({ stage = 0 }: { stage?: 0 | 1 | 2 | 3 }) {
  // 0 = matkul dipilih · 1 = mencari mahasiswa · 2 = pilih kategori · 3 = siap
  const label = ["Langkah 2 dari 3 · Pilih mahasiswa", "Langkah 2 dari 3 · Pilih mahasiswa", "Langkah 3 dari 3 · Pilih kategori", "Siap: +4 untuk Rani Wulandari"][stage];
  return (
    <>
      <PageHeader
        title="Input poin"
        eyebrow={<Badge tone="solid">PJ KELAS</Badge>}
        subtitle="Catat kontribusi mahasiswa"
      />
      <div className="space-y-3 px-5">
        <Step n={1} title="Mata kuliah" done summary="Bahasa Indonesia · K1">
          <Input value="Bahasa Indonesia · K1" right={<ChevronDown size={16} className="text-muted" />} />
          <div className="text-[11px] text-muted">Daftar kelas mengikuti penugasan PJ.</div>
        </Step>

        <Step n={2} title="Mahasiswa" active={stage <= 1} done={stage >= 2} summary={stage >= 2 ? "Rani Wulandari · NIM ••••1204" : undefined}>
          {stage < 2 && (
            <>
              <SearchBox placeholder="Cari nama atau NIM" value={stage === 1 ? "rani" : undefined} />
              <div className="text-[11px] leading-[1.5] text-muted">Nama, NIM, atau 2-4 digit terakhir. Minimal 3 huruf atau 2 digit.</div>
              {stage === 0 && (
                <div>
                  <div className="mb-1.5 text-[12px] font-semibold text-muted">Baru-baru ini</div>
                  <div className="flex flex-wrap gap-2">
                    {["Rani W.", "Bagas S.", "Intan P."].map((n) => (
                      <span key={n} className="flex items-center gap-1.5 rounded-full border border-line bg-white py-1 pr-3 pl-1 text-[12px] font-semibold">
                        <Avatar name={n} size={24} />{n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {stage === 1 && (
                <div className="space-y-1.5">
                  {[["Rani Wulandari", "NIM ••••1204"], ["Rania Putri", "NIM ••••0877"]].map(([n, nim]) => (
                    <div key={n} className="flex items-center gap-3 rounded-2xl bg-paper-2 p-2.5">
                      <Avatar name={n} size={36} />
                      <div><div className="text-[14px] font-bold">{n}</div><div className="text-[11px] text-muted">{nim}</div></div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Step>

        <Step n={3} title="Kontribusi" active={stage >= 2} summary={stage === 3 ? "Bertanya · +4 poin" : "Kategori, poin, dan catatan"}>
          {stage >= 2 ? (
            <>
              <Field label="Kategori"><Input value={stage === 3 ? "Bertanya" : undefined} placeholder="Pilih kategori kontribusi" right={<ChevronDown size={16} className="text-muted" />} /></Field>
              <Field label="Poin">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((v) => (
                    <div key={v} className={cn("flex h-12 flex-1 items-center justify-center rounded-2xl font-display text-[18px] font-extrabold", v === (stage === 3 ? 4 : 1) ? "bg-brand-500 text-white" : "border border-line bg-white text-ink-2")}>+{v}</div>
                  ))}
                </div>
              </Field>
              <Field label="Catatan"><Input placeholder="Opsional · misalnya: presentasi kelompok 3" right={<span className="text-[11px] text-muted">0/500</span>} /></Field>
            </>
          ) : (
            <div className="text-[12px] text-muted">Pilih mahasiswa dulu untuk membuka langkah ini.</div>
          )}
        </Step>

        <div className="space-y-2 pt-1">
          <div className="text-center text-[12px] font-semibold text-muted">{label}</div>
          <Btn full size="lg" variant={stage === 3 ? "primary" : "disabled"}>Input poin</Btn>
        </div>
      </div>
    </>
  );
}

/* ═══════════════ Aktivitas (Ruang PJ) ═══════════════ */

export function ActivityHub() {
  return (
    <>
      <PageHeader title="Ruang PJ" eyebrow={<Eyebrow>Aktivitas</Eyebrow>} subtitle="Pantau poin yang kamu catat untuk kelas." />
      <div className="space-y-4 px-5">
        <div className="rounded-[32px] bg-espresso p-5 text-white card-shadow">
          <div className="text-[11px] font-bold tracking-[0.16em] text-brand-300">7 HARI TERAKHIR</div>
          <div className="mt-3 flex">
            {[[18, "Entri"], [11, "Mahasiswa"], [52, "Total poin"]].map(([v, l]) => (
              <div key={l as string} className="flex-1">
                <div className="font-display text-[32px] leading-none font-extrabold">{v}</div>
                <div className="mt-1 text-[12px] text-white/60">{l}</div>
              </div>
            ))}
          </div>
          <Btn full className="mt-4">Input poin mahasiswa</Btn>
          <Btn full variant="outline" className="mt-2 !border-white/15 !bg-white/10 !text-white">Catat absensi kelas</Btn>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-[20px] font-bold">Riwayat Poin</div>
              <div className="text-[13px] text-muted">18 entri tercatat</div>
            </div>
            <History size={20} className="text-muted" />
          </div>
          <div className="mt-3 space-y-2">
            {HISTORY.slice(0, 2).map((h) => (
              <div key={h.n} className="flex items-center gap-3">
                <PointBadge points={h.p} />
                <div className="flex-1"><div className="text-[14px] font-bold">{h.n}</div><div className="text-[12px] text-muted">{h.c} · {h.m}</div></div>
                <span className="text-[12px] text-muted">{h.t}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[26px] bg-brand-500 p-4 text-white">
            <FileBarChart size={22} />
            <div className="mt-6 text-[14px] font-bold">Laporan Saya</div>
            <div className="font-display text-[22px] font-extrabold">128 poin</div>
          </div>
          <div className="rounded-[26px] border border-ink/5 bg-white p-4">
            <Trophy size={22} className="text-brand-600" />
            <div className="mt-6 text-[14px] font-bold">Peringkat Kelas</div>
            <div className="font-display text-[22px] font-extrabold text-brand-600">#4</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════ Riwayat poin ═══════════════ */

const HISTORY = [
  { n: "Rani Wulandari", nim: "NIM ••••1204", c: "Bertanya", m: "Bahasa Indonesia", p: 4, t: "10.42", note: "Bertanya soal kalimat efektif" },
  { n: "Bagas Saputra", nim: "NIM ••••0391", c: "Presentasi", m: "Basis Data", p: 3, t: "09.15", note: "Presentasi kelompok 3" },
  { n: "Intan Permata", nim: "NIM ••••2210", c: "Aktif diskusi", m: "Basis Data", p: 2, t: "Kemarin" },
  { n: "Dewi Anggraini", nim: "NIM ••••0745", c: "Menjawab", m: "Statistika", p: 1, t: "Kemarin" },
];

export function HistoryScreen({ variant = "list" }: { variant?: "list" | "empty" }) {
  return (
    <>
      <TopBar title="Riwayat poin" subtitle={variant === "empty" ? "0 entri" : "18 entri"} />
      <div className="space-y-3 px-5">
        <SearchBox placeholder="Nama, akhir NIM, atau kategori" />
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          <Chip selected>Semua matkul</Chip><Chip>Bahasa Indonesia</Chip><Chip>Basis Data</Chip>
        </div>
        {variant === "empty" ? (
          <Empty title="Belum ada poin tercatat" desc="Entri yang kamu input akan muncul di sini, lengkap dengan jam dan catatannya." action={<Btn>Input poin pertama</Btn>} />
        ) : (
          <>
            {HISTORY.map((h) => (
              <Card key={h.n} className="p-3.5">
                <div className="flex items-start gap-3">
                  <PointBadge points={h.p} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-bold">{h.n}</div>
                    <div className="text-[11px] text-muted">{h.nim}</div>
                    <div className="mt-1 flex flex-wrap gap-1.5"><Badge tone="brand">{h.c}</Badge><Badge tone="neutral">{h.m}</Badge></div>
                    {h.note && <div className="mt-1.5 text-[12px] text-ink-2 italic">“{h.note}”</div>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <MoreVertical size={18} className="text-muted" />
                    <span className="text-[12px] text-muted">{h.t}</span>
                  </div>
                </div>
              </Card>
            ))}
            <div className="flex items-start gap-3 rounded-2xl bg-butter-100 p-3.5 text-[13px] leading-[1.6] text-butter-700">
              <ShieldAlert size={16} className="mt-1 shrink-0" />
              Setiap penghapusan tercatat di audit log dan dapat ditinjau dosen.
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function EntryOptionsSheet() {
  return (
    <Sheet title="Opsi entri">
      <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white p-3">
        <PointBadge points={4} />
        <div><div className="text-[14px] font-bold">Rani Wulandari</div><div className="text-[12px] text-muted">Bertanya · Bahasa Indonesia</div></div>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-danger-100 px-4 py-3.5">
        <Trash2 size={18} className="text-danger-500" />
        <div>
          <div className="text-[15px] font-semibold text-danger-500">Hapus entri</div>
          <div className="text-[12px] text-danger-500/80">Tercatat di audit log</div>
        </div>
      </div>
    </Sheet>
  );
}

export function DeleteEntryDialog() {
  return <Dialog danger title="Hapus entri poin ini?" desc="+4 untuk Rani Wulandari akan dihapus. Tindakan ini tercatat di audit log dan tidak bisa dibatalkan." confirm="Hapus" />;
}

/* ═══════════════ Laporan (Poinku) ═══════════════ */

export function ReportView() {
  const [open, setOpen] = useState(0);
  const courses = [
    { n: "Basis Data", pj: "Bagas Saputra", p: 52, h: [["Bertanya", "+4", "12 Mar"], ["Presentasi", "+3", "10 Mar"], ["Aktif diskusi", "+2", "8 Mar"]] },
    { n: "Bahasa Indonesia", pj: "Rani Wulandari", p: 41, h: [["Menjawab", "+3", "11 Mar"], ["Bertanya", "+4", "5 Mar"]] },
    { n: "Rekayasa Perangkat Lunak", pj: "Cahya Nur", p: 35, h: [["Presentasi", "+3", "2 Mar"]] },
  ];
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[32px] bg-brand-500 p-5 text-white card-shadow">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,167,98,0.6),transparent_70%)]" />
        <div className="relative">
          <div className="text-[14px] font-semibold text-white/85">Total poin keaktifan</div>
          <div className="font-display text-[64px] leading-none font-extrabold tracking-[-0.02em]">128</div>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-[12px] font-bold">3 matkul</span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-[12px] font-bold">14 kontribusi</span>
          </div>
        </div>
      </div>
      <div className="px-1 font-display text-[18px] font-bold">Per mata kuliah</div>
      {courses.map((c, i) => (
        <Card key={c.n} className="p-0">
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full cursor-pointer items-center gap-3 p-4 text-left">
            <div className="flex-1">
              <div className="text-[15px] font-bold">{c.n}</div>
              <div className="text-[11px] font-medium text-muted">PJ {c.pj}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-[24px] leading-none font-extrabold">{c.p}</div>
              <div className="text-[11px] text-muted">{c.h.length} entri</div>
            </div>
            <ChevronDown size={18} className={cn("text-muted transition-transform", open === i && "rotate-180")} />
          </button>
          {open === i && (
            <div className="space-y-1 border-t border-line bg-paper-2/50 px-4 py-3">
              {c.h.map(([a, b, d]) => (
                <div key={a + d} className="flex items-center justify-between py-1">
                  <div><div className="text-[13px] font-semibold">{a}</div><div className="text-[11px] text-muted">{d}</div></div>
                  <Badge tone="brand">{b}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

/* ═══════════════ Peringkat ═══════════════ */

export function RankingView() {
  const rows = [
    ["Aulia Rahmawati", "2310114001", 142],
    ["Bagas Saputra", "2310114011", 131],
    ["Cahya Nurhaliza", "2310114019", 120],
    ["Dewi Anggraini", "2310114023", 104],
    ["Nadia Putri Maharani", "2310114028", 98, true],
    ["Rafi Hidayat", "2310114031", 91],
  ] as const;
  const podium = (r: (typeof rows)[number], rank: number, h: number, bar: string, size: number) => (
    <div className="flex flex-1 flex-col items-center justify-end gap-1.5">
      <Avatar name={r[0]} size={size} />
      <div className="max-w-full truncate text-[12px] font-bold">{r[0].split(" ")[0]}</div>
      <div className={cn("flex w-full items-start justify-center rounded-t-[18px] pt-2 font-display text-[28px] font-extrabold", bar)} style={{ height: h }}>
        {rank}
      </div>
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        <Chip selected>Basis Data</Chip><Chip>Bahasa Indonesia</Chip><Chip>RPL</Chip>
      </div>
      <div className="flex items-end gap-2 rounded-[28px] bg-white p-4 pt-6">
        {podium(rows[1], 2, 88, "bg-paper-3 text-ink-2", 50)}
        {podium(rows[0], 1, 128, "bg-brand-500 text-white", 62)}
        {podium(rows[2], 3, 64, "bg-butter-100 text-butter-700", 46)}
      </div>
      <div className="px-1 font-display text-[18px] font-bold">Peringkat lainnya</div>
      {rows.slice(3).map((r, i) => (
        <div key={r[0]} className={cn("flex items-center gap-3 rounded-[22px] p-3", "me" in r ? "border-2 border-brand-500 bg-brand-50" : "border border-ink/5 bg-white")}>
          <span className="w-6 text-center font-display text-[16px] font-extrabold text-muted">{i + 4}</span>
          <Avatar name={r[0]} size={40} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5"><span className="truncate text-[14px] font-bold">{r[0]}</span>{"me" in r && <Badge tone="solid">KAMU</Badge>}</div>
            <div className="text-[11px] text-muted">{"me" in r ? r[1] : r[1].slice(0, 2) + "••••••" + r[1].slice(-2)}</div>
          </div>
          <span className="font-display text-[20px] font-extrabold">{r[2]}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════ Poinku (mahasiswa) ═══════════════ */

export function Poinku({ seg = 0, controlled, onSeg }: { seg?: number; controlled?: boolean; onSeg?: (n: number) => void }) {
  const [local, setLocal] = useState(seg);
  const cur = controlled ? seg : local;
  const set = (n: number) => (controlled ? onSeg?.(n) : setLocal(n));
  const titles = ["Poinku", "Partisipasi teratas", "Kehadiran"];
  const subs = ["Rekap kontribusimu di kelas.", "SI-4B · Sistem Informasi", "Jatah tanpa keterangan per mata kuliah."];
  const opts = [
    { label: "Laporan", icon: FileBarChart },
    { label: "Peringkat", icon: Trophy },
    { label: "Hadir", icon: CheckCircle2 },
  ];
  return (
    <>
      <PageHeader title={titles[cur]} eyebrow={<Eyebrow>{cur === 2 ? "Absensi" : "Poin keaktifan"}</Eyebrow>} subtitle={subs[cur]} />
      <div className="px-5 pb-4">
        <div className="flex rounded-2xl bg-paper-2 p-1">
          {opts.map((o, i) => (
            <button key={o.label} type="button" onClick={() => set(i)} className={cn("flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl text-[13px] font-bold transition", i === cur ? "bg-white text-ink shadow-sm" : "text-muted")}>
              <o.icon size={15} />{o.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5">
        {cur === 0 && <ReportView />}
        {cur === 1 && <RankingView />}
        {cur === 2 && <StudentAttendanceView />}
      </div>
    </>
  );
}

export function ReportPage() {
  return (
    <>
      <TopBar title="Laporan saya" subtitle="Poin keaktifan semester ini" />
      <div className="px-5"><ReportView /></div>
    </>
  );
}

export function RankingPage() {
  return (
    <>
      <TopBar title="Partisipasi teratas" subtitle="SI-4B · Sistem Informasi" />
      <div className="px-5"><RankingView /></div>
    </>
  );
}

export function ReportEmpty() {
  return (
    <>
      <TopBar title="Laporan saya" subtitle="Poin keaktifan semester ini" />
      <Empty icon={Users} title="Belum ada laporan" desc="Kelas atau semester aktif angkatanmu belum tersedia." />
    </>
  );
}

