import {
  Ban,
  ChevronLeft,
  Copy,
  EyeOff,
  Flag,
  Lock,
  MessagesSquare,
  Pencil,
  Pin,
  Reply,
  Send,
  ShieldAlert,
  Trash2,
  Unlock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Avatar, Badge, Btn, Dialog, Empty, Field, IconBtn, Input, PageHeader, SearchBox, Sheet, TopBar, Eyebrow, type Tone } from "../ui";

const ROOMS: { n: string; k: string; pj: string; last: string; who: string; t: string; tone: Tone; locked?: boolean; unread?: number }[] = [
  { n: "Basis Data", k: "SI-4B", pj: "Bagas Saputra", who: "Intan", last: "Ada yang punya catatan BCNF?", t: "10.42", tone: "tide", unread: 3 },
  { n: "Rekayasa Perangkat Lunak", k: "SI-4B", pj: "Cahya Nur", who: "Kamu", last: "Siap, nanti kuunggah ke drive", t: "Kemarin", tone: "brand" },
  { n: "Bahasa Indonesia", k: "SI-4B", pj: "Rani Wulandari", who: "Rani", last: "Grup dikunci sampai UTS selesai", t: "Sen", tone: "leaf", locked: true },
  { n: "Statistika Dasar", k: "SI-4B", pj: "Dewi Anggraini", who: "Dewi", last: "Pesan disembunyikan oleh PJ", t: "Min", tone: "plum" },
];

export function GroupList({ variant = "default" }: { variant?: "default" | "empty" | "noresult" }) {
  return (
    <>
      <PageHeader title="Grup kelas" eyebrow={<Eyebrow>Percakapan</Eyebrow>} subtitle="Percakapan kelas tetap dekat." />
      <div className="space-y-3 px-5">
        <SearchBox placeholder="Cari matkul atau kelas" value={variant === "noresult" ? "kalkulus" : undefined} />
        {variant === "empty" && <Empty icon={MessagesSquare} title="Belum bergabung ke grup" desc="Grup otomatis muncul setelah kamu terdaftar di mata kuliah semester ini." />}
        {variant === "noresult" && <Empty icon={MessagesSquare} title="Grup tidak ditemukan" desc="Tidak ada matkul atau kelas yang cocok." action={<Btn variant="soft">Hapus pencarian</Btn>} />}
        {variant === "default" &&
          ROOMS.map((r) => (
            <div key={r.n} className="flex items-center gap-3 rounded-[24px] border border-ink/5 bg-white p-3.5 card-shadow">
              <Avatar name={r.n} size={52} tone={r.tone} square />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[15px] font-bold">{r.n}</span>
                  {r.locked && <Lock size={14} className="text-muted" />}
                  <span className={cn("ml-auto shrink-0 text-[11px] font-semibold", r.unread ? "text-brand-600" : "text-muted")}>{r.t}</span>
                </div>
                <div className="truncate text-[11px] text-muted">{r.k} · PJ {r.pj}</div>
                <div className="flex items-center gap-2">
                  <span className={cn("flex-1 truncate text-[13px] text-ink-2", r.last.startsWith("Pesan disembunyikan") && "italic")}>
                    <b className="font-semibold">{r.who}:</b> {r.last}
                  </span>
                  {r.unread ? <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[11px] font-bold text-white">{r.unread}</span> : null}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

/* ═══════════════ Chat ═══════════════ */

type MsgProps = {
  name?: string;
  text?: string;
  mine?: boolean;
  pj?: boolean;
  tone?: Tone;
  time: string;
  reply?: { n: string; t: string };
  edited?: boolean;
  state?: "deleted" | "hidden" | "blocked";
  pinned?: boolean;
  hiddenReason?: string;
};

function Msg({ name, text, mine, pj, time, reply, edited, state, pinned, hiddenReason }: MsgProps) {
  if (state) {
    return (
      <div className="mx-auto max-w-[85%] rounded-full bg-paper-2 px-4 py-1.5 text-center text-[12px] text-muted italic">
        {state === "deleted" ? "Pesan ini telah dihapus" : state === "blocked" ? "Pesan dari pengguna yang diblokir" : hiddenReason ?? "Pesan disembunyikan oleh PJ"}
      </div>
    );
  }
  return (
    <div className={cn("flex gap-2", mine ? "justify-end" : "justify-start")}>
      {!mine && <Avatar name={name!} size={30} className="mt-auto" />}
      <div
        className={cn(
          "max-w-[78%] px-3.5 py-2.5",
          mine ? "rounded-[22px] rounded-br-lg bg-brand-500 text-white" : "rounded-[22px] rounded-bl-lg bg-white",
          pinned && !mine && "ring-2 ring-brand-300",
        )}
      >
        {!mine && (
          <div className="mb-0.5 flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-tide-600">{name}</span>
            {pj && <Badge tone="brand" className="!px-1.5 !py-0.5 !text-[9px]">PJ</Badge>}
          </div>
        )}
        {reply && (
          <div className={cn("mb-1.5 rounded-lg border-l-[3px] px-2 py-1", mine ? "border-white/70 bg-white/15" : "border-brand-500 bg-paper-2")}>
            <div className={cn("text-[11px] font-bold", mine ? "text-white" : "text-brand-700")}>{reply.n}</div>
            <div className={cn("truncate text-[12px]", mine ? "text-white/85" : "text-ink-2")}>{reply.t}</div>
          </div>
        )}
        <div className="text-[14px] leading-[1.4]">{text}</div>
        <div className={cn("mt-0.5 flex justify-end gap-1.5 text-[11px]", mine ? "text-white/75" : "text-muted")}>
          {edited && <span>diedit</span>}
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export function Chat({ variant = "member" }: { variant?: "member" | "manager" | "locked" | "moderation" }) {
  const manager = variant !== "member";
  const locked = variant === "locked";
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white"><ChevronLeft size={20} /></div>
        <Avatar name="Basis Data" size={40} tone="tide" square />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 truncate font-display text-[17px] leading-[1.2] font-bold">
            Basis Data {locked && <Lock size={14} className="text-muted" />}
          </div>
          <div className="truncate text-[11px] text-muted">38 anggota · PJ Bagas Saputra</div>
        </div>
        {manager && (
          <div className="flex gap-1.5">
            <IconBtn icon={ShieldAlert} />
            <IconBtn icon={locked ? Unlock : Lock} />
          </div>
        )}
      </div>
      <div className="mx-4 mb-2 flex items-center gap-2.5 rounded-2xl bg-brand-50 px-3.5 py-2.5">
        <Pin size={15} className="text-brand-600" />
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold tracking-[0.05em] text-brand-700">DISEMATKAN</div>
          <div className="truncate text-[13px] text-ink-2">Kuis Kamis 10.00, Lab 3 — bawa laptop.</div>
        </div>
      </div>
      <div className="no-scrollbar flex-1 space-y-2.5 overflow-y-auto px-4 pb-3">
        <div className="mx-auto w-fit rounded-full bg-paper-3 px-3 py-1 text-[11px] font-semibold text-ink-2">Hari ini</div>
        <div className="mx-auto w-fit text-[12px] font-bold text-brand-700">Muat pesan sebelumnya</div>
        <Msg name="Intan Permata" text="Ada yang punya catatan BCNF?" time="10.42" />
        <Msg mine text="Kuunggah di drive kelas ya!" time="10.44" reply={{ n: "Intan Permata", t: "Ada yang punya catatan BCNF?" }} />
        <Msg name="Bagas Saputra" pj text="Jangan lupa kuis hari Kamis, materi sampai bab 6." time="10.50" pinned />
        {variant === "moderation" && (
          <>
            <Msg state="hidden" time="" hiddenReason="Keluar dari topik kelas" />
            <Msg state="deleted" time="" />
            <Msg state="blocked" time="" />
          </>
        )}
        <Msg mine text="Siap, makasih Bagas!" time="10.52" edited />
      </div>
      {locked ? (
        <div className="mx-4 mb-6 rounded-2xl bg-paper-2 px-4 py-3 text-center text-[12px] leading-[1.5] text-muted">
          <Lock size={13} className="mr-1 inline" /> Grup dikunci. Hanya kamu sebagai PJ yang dapat mengirim.
        </div>
      ) : (
        <div className="flex items-center gap-2 border-t border-line bg-paper px-4 pt-3 pb-6">
          <div className="flex h-11 flex-1 items-center rounded-full border border-line bg-white px-4 text-[13px] text-muted">Tulis pesan…</div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white"><Send size={17} /></div>
        </div>
      )}
    </div>
  );
}

function ActionRow({ icon: I, title, sub, danger }: { icon: LucideIcon; title: string; sub?: string; danger?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", danger ? "bg-danger-100 text-danger-500" : "bg-paper-2 text-ink-2")}>
        <I size={17} />
      </div>
      <div>
        <div className={cn("text-[14px] font-semibold", danger && "text-danger-500")}>{title}</div>
        {sub && <div className="text-[11px] text-muted">{sub}</div>}
      </div>
    </div>
  );
}

export function MessageActionSheet({ role }: { role: "member" | "manager" }) {
  return (
    <Sheet title="Aksi pesan">
      <div className="space-y-2">
        <ActionRow icon={Copy} title="Salin teks" />
        <ActionRow icon={Reply} title="Balas pesan" />
        {role === "manager" ? (
          <>
            <ActionRow icon={Pin} title="Sematkan pesan" sub="Pesan tampil di bagian atas grup" />
            <ActionRow icon={EyeOff} title="Sembunyikan pesan" sub="Disembunyikan untuk seluruh anggota" danger />
            <ActionRow icon={Trash2} title="Hapus pesan" sub="Diganti penanda “telah dihapus”" danger />
            <ActionRow icon={Ban} title="Blokir Intan" sub="Pesan darinya disembunyikan di semua grup" danger />
          </>
        ) : (
          <>
            <ActionRow icon={Pencil} title="Edit pesan" />
            <ActionRow icon={Flag} title="Laporkan pesan" />
            <ActionRow icon={Ban} title="Blokir Intan" danger />
          </>
        )}
      </div>
    </Sheet>
  );
}

export function PinnedSheet() {
  return (
    <Sheet title="Pesan disematkan">
      <div className="space-y-2">
        {["Kuis Kamis 10.00, Lab 3 — bawa laptop.", "Tautan materi: drive.untidar.ac.id/basisdata"].map((t, i) => (
          <div key={i} className="rounded-2xl bg-white p-3.5">
            <div className="text-[11px] font-bold text-brand-700">Bagas Saputra · PJ</div>
            <div className="text-[13px] leading-[1.5]">{t}</div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

export function ReportMessageDialog() {
  return (
    <Dialog title="Laporkan pesan" desc="Pilih alasan yang paling sesuai. Identitasmu tidak terlihat oleh pelapor lain." confirm="Kirim laporan">
      <div className="space-y-2">
        {["Spam atau promosi", "Ujaran kasar atau pelecehan", "Konten tidak pantas", "Informasi menyesatkan", "Lainnya"].map((r, i) => (
          <div key={r} className={cn("flex items-center gap-2.5 rounded-xl border px-3 py-2 text-[13px] font-medium", i === 1 ? "border-brand-500 bg-brand-50" : "border-line bg-white")}>
            <span className={cn("h-4 w-4 rounded-full border-2", i === 1 ? "border-brand-500 bg-brand-500 ring-2 ring-white ring-inset" : "border-line")} />
            {r}
          </div>
        ))}
        <Field label="Keterangan (opsional)"><Input placeholder="Tambahkan konteks bila perlu" /></Field>
      </div>
    </Dialog>
  );
}

export function HideDialog() {
  return (
    <Dialog title="Sembunyikan pesan" desc="Pesan akan disembunyikan dari seluruh anggota grup. Alasan wajib diisi." confirm="Sembunyikan" danger>
      <Field label="Alasan"><Input placeholder="Misalnya: keluar dari topik kelas" /></Field>
    </Dialog>
  );
}

export function BlockDialog() {
  return <Dialog title="Blokir Intan?" desc="Pesan darinya akan disembunyikan di semua grup. Kamu bisa membuka blokir kapan saja." confirm="Blokir" danger />;
}

export function GroupReports({ empty }: { empty?: boolean }) {
  return (
    <>
      <TopBar title="Laporan grup" subtitle="Basis Data · SI-4B" />
      <div className="space-y-3 px-5">
        {empty ? (
          <Empty icon={ShieldAlert} title="Tidak ada laporan terbuka" desc="Laporan anggota yang dapat kamu tangani akan muncul di sini." />
        ) : (
          [
            { r: "Spam atau promosi", who: "Dimas Prakoso", msg: "Jual joki tugas murah, DM ya!", by: "Intan Permata" },
            { r: "Pelecehan atau perundungan", who: "Raka Aditya", msg: "Kamu tuh nggak ngerti apa-apa deh.", by: "Aulia Rahmawati" },
          ].map((x) => (
            <div key={x.who} className="rounded-[24px] border border-ink/5 bg-white p-4 card-shadow">
              <div className="flex items-center gap-2">
                <Badge tone="danger" icon={Flag}>{x.r} · {x.who}</Badge>
              </div>
              <div className="mt-3 rounded-2xl bg-paper-2 p-3 text-[13px] leading-[1.5]">{x.msg}</div>
              <div className="mt-2 text-[11px] text-muted">Dilaporkan {x.by}</div>
              <div className="mt-3 flex gap-2">
                <Btn variant="soft" size="sm" className="flex-1">Tutup laporan</Btn>
                <Btn variant="dangerSoft" size="sm" className="flex-1" icon={EyeOff}>Sembunyikan</Btn>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
