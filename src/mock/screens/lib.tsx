import {
  Bold,
  BookOpen,
  Check,
  Code,
  Eye,
  Feather,
  FileText,
  FileUp,
  Flag,
  Globe,
  Heading1,
  Heading2,
  AtSign,
  Italic,
  Link2,
  List,
  MessageCircle,
  MessagesSquare,
  MoreHorizontal,
  Pencil,
  Quote,
  Send,
  Share2,
  Sparkles,
  Upload,
  UserPen,
} from "lucide-react";
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
  IconBtn,
  Input,
  PageHeader,
  SearchBox,
  Segmented,
  Sheet,
  TopBar,
} from "../ui";

/* ───────────── Data demo ───────────── */

export const ARTICLES = [
  {
    author: "Rafi Hidayat",
    prodi: "Sistem Informasi",
    tag: "Sistem Informasi",
    title: "Normalisasi tanpa pusing lewat satu studi kasus",
    body: "Kita mulai dari tabel pesanan toko buku yang berantakan, lalu turun bertahap dari 1NF sampai BCNF dengan contoh nyata…",
    views: 214,
    comments: 14,
  },
  {
    author: "Intan Permata",
    prodi: "Sistem Informasi",
    tag: "Sistem Informasi",
    title: "Catatan UTS Rekayasa Perangkat Lunak: 7 konsep yang sering keluar",
    body: "Ringkasan siklus hidup perangkat lunak, perbedaan waterfall dan agile, serta contoh soal beserta pembahasannya…",
    views: 168,
    comments: 9,
  },
  {
    author: "Dewi Anggraini",
    prodi: "Informatika",
    tag: "Informatika",
    title: "Tips mengatur waktu belajar saat jadwal organisasi padat",
    body: "Tiga kebiasaan kecil yang membantuku tetap konsisten belajar tanpa meninggalkan kegiatan kampus…",
    views: 96,
    comments: 4,
  },
];

function ArticleCard({ a }: { a: (typeof ARTICLES)[number] }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2.5">
        <Avatar name={a.author} size={38} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] leading-[1.25] font-bold">{a.author}</div>
          <div className="truncate text-[12px] text-muted">{a.prodi}</div>
        </div>
        <Badge tone="neutral">{a.tag}</Badge>
      </div>
      <div className="mt-3 font-display text-[20px] leading-[1.2] font-bold tracking-[-0.02em]">{a.title}</div>
      <div className="mt-1.5 line-clamp-3 text-[13px] leading-[1.55] text-ink-2">{a.body}</div>
      <div className="mt-3 flex gap-4 text-[12px] font-semibold text-muted">
        <span className="flex items-center gap-1.5"><Eye size={14} /> {a.views} pembaca</span>
        <span className="flex items-center gap-1.5"><MessageCircle size={14} /> {a.comments} komentar</span>
      </div>
    </Card>
  );
}

/* ═══════════════ Karsa Lib · Beranda ═══════════════ */

export function LibHome({ variant = "writer" }: { variant?: "writer" | "reader" | "pending" | "empty" | "error" }) {
  const writer = variant === "writer";
  return (
    <>
      <PageHeader
        title="Karsa Lib"
        eyebrow={<Eyebrow>Perpustakaan prodi</Eyebrow>}
        subtitle="Ilmu tumbuh saat dibagikan."
        right={
          writer ? (
            <div className="flex items-center gap-2">
              <div className="flex h-11 items-center gap-1.5 rounded-full bg-brand-500 px-4 text-[14px] font-semibold text-white">
                <Pencil size={15} /> Tulis
              </div>
              <IconBtn icon={MoreHorizontal} />
            </div>
          ) : (
            <IconBtn icon={MoreHorizontal} />
          )
        }
      />
      {variant === "error" ? (
        <Empty title="Karsa Lib belum termuat" desc="Periksa koneksi lalu coba lagi." icon={BookOpen} action={<Btn variant="soft">Coba lagi</Btn>} />
      ) : (
        <div className="space-y-4 px-5">
          {variant === "reader" && (
            <div className="flex items-center gap-3 rounded-[22px] bg-brand-50 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-100">
                <Feather size={20} className="text-brand-600" />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold">Ingin ikut menulis?</div>
                <div className="text-[12px] leading-[1.45] text-ink-2">Ajukan akses penulis agar tulisanmu dibaca seluruh prodi.</div>
              </div>
              <Btn size="sm">Ajukan</Btn>
            </div>
          )}
          {variant === "pending" && (
            <div className="flex items-center gap-3 rounded-[22px] bg-butter-100 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/70">
                <Feather size={20} className="text-butter-700" />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-butter-700">Pengajuan sedang ditinjau</div>
                <div className="text-[12px] leading-[1.45] text-butter-700/90">Kamu tetap bisa membaca dan berdiskusi. Tarik layar untuk memperbarui status.</div>
              </div>
            </div>
          )}
          <SearchBox placeholder="Cari judul artikel di prodimu" />
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
            <Chip selected>Terbaru</Chip>
            <Chip>Trending 7 hari</Chip>
            <Chip>Trending 30 hari</Chip>
          </div>
          {variant === "empty" ? (
            <Empty
              title="Belum ada artikel"
              desc="Saat ada tulisan baru dari prodimu, artikel itu akan muncul di sini."
              icon={BookOpen}
              action={<Btn icon={Pencil}>Tulis artikel</Btn>}
            />
          ) : (
            ARTICLES.map((a) => <ArticleCard key={a.title} a={a} />)
          )}
        </div>
      )}
    </>
  );
}

export function WriterGateSheet() {
  return (
    <Sheet title="Perlu akses penulis">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[20px] bg-brand-100">
        <Feather size={26} className="text-brand-600" />
      </div>
      <div className="mb-5 text-[14px] leading-[1.6] text-ink-2">
        Menulis di Karsa Lib membutuhkan akses penulis. Lengkapi profil penulis, lalu admin prodi akan meninjaunya.
      </div>
      <div className="space-y-2">
        <Btn full size="lg">Ajukan akses penulis</Btn>
        <Btn full size="lg" variant="ghost">Nanti saja</Btn>
      </div>
    </Sheet>
  );
}

/* ═══════════════ Artikel + diskusi ═══════════════ */

function Comment({ name, text, time, author, reply, mine }: { name: string; text: string; time: string; author?: boolean; reply?: boolean; mine?: boolean }) {
  return (
    <div className={cn("flex gap-2.5", reply && "ml-9 border-l-2 border-paper-3 pl-3")}>
      <Avatar name={name} size={reply ? 28 : 34} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold">{name}</span>
          {author && <Badge tone="brand">PENULIS</Badge>}
          <span className="text-[11px] text-muted">{time}</span>
        </div>
        <div className="mt-0.5 text-[13px] leading-[1.55] text-ink-2">{text}</div>
        <div className="mt-1 flex gap-4 text-[12px] font-semibold text-muted">
          <span>Balas</span>
          {mine ? <span className="text-danger-500">Hapus</span> : <span>Laporkan</span>}
        </div>
      </div>
    </div>
  );
}

export function Article({ ai = true }: { ai?: boolean }) {
  return (
    <>
      <TopBar
        title="Artikel"
        right={
          <div className="flex gap-2">
            {ai && <IconBtn icon={Sparkles} />}
            <IconBtn icon={Flag} />
            <IconBtn icon={Share2} />
          </div>
        }
      />
      <div className="px-5 pb-4">
        <Badge tone="brand">Sistem Informasi</Badge>
        <div className="mt-3 font-display text-[28px] leading-[1.1] font-extrabold tracking-[-0.02em]">
          Normalisasi tanpa pusing lewat satu studi kasus
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Avatar name="Rafi Hidayat" size={44} />
          <div>
            <div className="text-[15px] leading-[1.25] font-bold">Rafi Hidayat</div>
            <div className="text-[12px] text-muted">Sistem Informasi</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2 text-[13px] font-semibold text-muted">
          <span>214 pembaca unik</span>·<span>12 Mar 2026</span>
        </div>
        <div className="mt-5 space-y-3 text-[15px] leading-[1.75] text-ink-2">
          <div className="font-display text-[22px] leading-[1.25] font-bold text-ink">Mulai dari tabel yang berantakan</div>
          <p>
            Bayangkan tabel <code className="rounded bg-paper-2 px-1 font-mono text-[13px]">pesanan</code> toko buku yang menyimpan nama pelanggan,
            alamat, dan daftar judul buku dalam satu kolom.
          </p>
          <div className="border-l-4 border-brand-300 pl-3 text-ink-2 italic">Satu fakta disimpan di satu tempat — itu inti normalisasi.</div>
          <ul className="list-disc space-y-1 pl-5">
            <li>1NF: tiap sel hanya berisi satu nilai</li>
            <li>2NF: hilangkan ketergantungan parsial</li>
            <li>3NF/BCNF: hilangkan ketergantungan transitif</li>
          </ul>
        </div>
        <div className="mt-6 border-t border-line pt-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="font-display text-[22px] font-bold">Diskusi</span>
            <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[12px] font-bold text-ink-2">3</span>
          </div>
          <div className="space-y-4">
            <Comment name="Bagas Saputra" time="2 jam lalu" text="Contoh tabel pesanannya enak diikuti. Boleh minta file SQL-nya?" />
            <Comment name="Rafi Hidayat" time="1 jam lalu" author reply text="Boleh, kutaruh di bagian akhir artikel ya." />
            <Comment name="Nadia Putri" time="35 mnt lalu" mine text="Terima kasih, paham sekarang bedanya 3NF dan BCNF." />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 flex items-center gap-2 border-t border-line bg-paper px-4 py-3">
        <div className="flex h-11 flex-1 items-center rounded-full border border-line bg-white px-4 text-[13px] text-muted">Tulis komentar…</div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-3 text-muted"><Send size={17} /></div>
      </div>
    </>
  );
}

export function ReportDialog({ title = "Laporkan artikel" }: { title?: string }) {
  return (
    <Dialog title={title} desc="Laporan akan ditinjau admin. Pilih alasan yang paling sesuai." confirm="Kirim laporan" cancel="Batal">
      <div className="space-y-3">
        <Field label="Alasan laporan">
          <Input value="Informasi keliru" right={<span className="text-muted">▾</span>} />
        </Field>
        <Field label="Keterangan (opsional)">
          <Input placeholder="Tambahkan konteks bila perlu" tall />
        </Field>
        <div className="flex flex-wrap gap-1.5">
          {["Informasi keliru", "Konten tidak pantas", "Spam atau promosi", "Hak cipta", "Lainnya"].map((r, i) => (
            <span key={r} className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", i === 0 ? "bg-espresso text-white" : "bg-paper-2 text-ink-2")}>{r}</span>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

/* ═══════════════ Teman baca (AI) ═══════════════ */

function Para({ n }: { n: number }) {
  return <span className="mx-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-md bg-brand-100 px-1 text-[10px] font-bold text-brand-700">¶{n}</span>;
}

export function AiSheet({ tab }: { tab: "empty" | "summary" | "chat" | "web" | "quota" }) {
  const isSummaryTab = tab === "empty" || tab === "summary";
  return (
    <div className="absolute inset-0 z-30 flex items-end bg-espresso/45 backdrop-blur-[3px]">
      <div className="sheet-up flex h-[88%] w-full flex-col rounded-t-[32px] bg-paper pt-3">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-paper-3" />
        <div className="px-5">
          <div className="font-display text-[20px] font-bold">Teman baca</div>
          <div className="mt-1 line-clamp-2 text-[12px] font-medium text-muted">Normalisasi tanpa pusing lewat satu studi kasus</div>
          <div className="mt-3">
            <Segmented
              value={isSummaryTab ? 0 : 1}
              options={[
                { label: "Ringkasan", icon: Sparkles },
                { label: "Tanya materi", icon: MessagesSquare },
              ]}
            />
          </div>
        </div>
        <div className="no-scrollbar flex-1 overflow-y-auto px-5 pt-4 pb-3">
          {tab === "empty" && (
            <div className="rounded-[24px] bg-white p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100">
                <Sparkles className="text-brand-600" size={22} />
              </div>
              <div className="font-display text-[19px] leading-[1.25] font-bold">Poin-poin penting artikel</div>
              <div className="mt-1.5 text-[12px] leading-[1.55] text-muted">
                Buat ringkasan untuk membantu memahami materi. Isi artikel akan dikirim ke penyedia AI Karsa.
              </div>
              <Btn full icon={Sparkles} className="mt-4">Buat ringkasan</Btn>
              <div className="mt-2 text-[11px] text-muted">Kuota membuat ringkasan baru hari ini habis? <span className="font-bold text-brand-700">Periksa ringkasan tersimpan</span></div>
            </div>
          )}
          {tab === "summary" && (
            <div className="space-y-3">
              <div className="rounded-[22px] bg-white p-4 text-[13px] leading-[1.7] text-ink-2">
                <p className="mb-2">1. Normalisasi menata ulang tabel agar tiap fakta hanya tersimpan di satu tempat.<Para n={1} /></p>
                <p className="mb-2">2. 1NF mensyaratkan satu nilai per sel; 2NF menghapus ketergantungan parsial.<Para n={3} /></p>
                <p>3. 3NF/BCNF menghilangkan ketergantungan transitif demi data yang konsisten.<Para n={4} /></p>
              </div>
              <Btn full variant="soft" icon={MessagesSquare}>Tanya tentang ringkasan</Btn>
            </div>
          )}
          {(tab === "chat" || tab === "web" || tab === "quota") && (
            <div className="space-y-3.5">
              {tab === "chat" && (
                <div>
                  <div className="font-display text-[17px] font-bold">Ada bagian yang belum jelas?</div>
                  <div className="mt-1 text-[12px] leading-[1.55] text-muted">Tanyakan materi dari artikel ini. Jawaban menyertakan rujukan paragraf jika tersedia.</div>
                  <div className="mt-3 space-y-2">
                    {["Apa inti artikel ini?", "Jelaskan konsep utama dengan bahasa sederhana."].map((q) => (
                      <div key={q} className="rounded-2xl border border-line bg-white px-4 py-3 text-[13px] font-medium">{q}</div>
                    ))}
                  </div>
                </div>
              )}
              {tab !== "chat" && (
                <>
                  <div className="ml-10 self-end rounded-[20px] rounded-br-md bg-brand-500 px-4 py-2.5 text-[13px] text-white">
                    {tab === "web" ? "Apa perbedaan BCNF dan 3NF menurut referensi terbaru?" : "Kapan tabel dianggap sudah 2NF?"}
                  </div>
                  <div className="rounded-[20px] rounded-bl-md bg-white p-4 text-[13px] leading-[1.65] text-ink-2">
                    {tab === "web" && <Badge tone="tide" icon={Globe} className="mb-2">DARI WEB</Badge>}
                    <p>
                      {tab === "web"
                        ? "BCNF lebih ketat: setiap determinan harus merupakan kunci kandidat, sedangkan 3NF masih mengizinkan atribut prima."
                        : "Saat sudah 1NF dan semua atribut non-kunci bergantung penuh pada seluruh kunci utama."}
                      <Para n={3} />
                    </p>
                    {tab === "web" && (
                      <div className="mt-2 border-t border-line pt-2 text-[11px]">
                        <div className="font-bold text-muted">Sumber web:</div>
                        <div className="font-semibold text-tide-600 underline">GeeksforGeeks — Difference between 3NF and BCNF</div>
                      </div>
                    )}
                  </div>
                </>
              )}
              {tab === "quota" && (
                <div className="rounded-2xl bg-butter-100 p-3.5 text-[12px] leading-[1.5] font-semibold text-butter-700">
                  Kuota token bulan ini habis. <span className="font-bold underline">Lihat paket</span>
                </div>
              )}
            </div>
          )}
        </div>
        {isSummaryTab || tab === "quota" ? (
          tab === "quota" ? null : <div className="px-5 pb-6 text-center text-[11px] text-muted">AI dapat keliru. Periksa kembali artikel dan sumber belajarmu.</div>
        ) : null}
        {!isSummaryTab && (
          <div className="border-t border-line bg-paper px-4 pt-3 pb-6">
            <div className="rounded-[24px] border border-line bg-white p-2.5">
              <div className="px-2 py-1 text-[13px] text-muted">Tanya tentang materi...</div>
              <div className="mt-1 flex items-center justify-between">
                <span className={cn("flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium", tab === "web" ? "bg-tide-100 text-tide-600" : "bg-paper-2 text-ink-2")}>
                  <Globe size={13} /> Cari web
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-muted">{tab === "quota" ? "0" : "1.2 JT"} token</span>
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", tab === "quota" ? "bg-paper-3 text-muted" : "bg-brand-500 text-white")}>
                    <Send size={15} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-center text-[11px] text-muted">AI dapat keliru. Periksa kembali artikel dan sumber belajarmu.</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════ Editor ═══════════════ */

export function Editor({ mode }: { mode: "tulis" | "pratinjau" }) {
  const tools = [Heading1, Heading2, Bold, Italic, Code, List, Quote, Link2];
  return (
    <>
      <TopBar title="Tulis artikel" subtitle="Belum disimpan" right={<Btn size="sm" variant="soft">Simpan draf</Btn>} />
      <div className="space-y-3 px-5">
        <Segmented value={mode === "tulis" ? 0 : 1} options={[{ label: "Tulis", icon: Pencil }, { label: "Pratinjau", icon: Eye }]} />
        {mode === "tulis" ? (
          <>
            <div className="font-display text-[26px] leading-[1.15] font-extrabold tracking-[-0.02em]">Normalisasi tanpa pusing lewat satu studi kasus</div>
            <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto py-1">
              {tools.map((T, i) => (
                <div key={i} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink-2"><T size={17} /></div>
              ))}
            </div>
            <div className="rounded-2xl border border-line bg-white p-4 font-mono text-[12.5px] leading-[1.7] text-ink-2">
              <div className="text-brand-700">## Mulai dari tabel yang berantakan</div>
              <div>Bayangkan tabel `pesanan` toko buku yang menyimpan **nama pelanggan**, alamat, dan daftar buku…</div>
              <br />
              <div className="text-muted">&gt; Satu fakta disimpan di satu tempat.</div>
              <div>- 1NF: satu nilai per sel<span className="blink">|</span></div>
            </div>
          </>
        ) : (
          <div className="space-y-3 rounded-[24px] bg-white p-5">
            <div className="font-display text-[26px] leading-[1.15] font-extrabold">Normalisasi tanpa pusing lewat satu studi kasus</div>
            <div className="font-display text-[20px] font-bold">Mulai dari tabel yang berantakan</div>
            <p className="text-[14px] leading-[1.7] text-ink-2">Bayangkan tabel <code className="rounded bg-paper-2 px-1 font-mono text-[12px]">pesanan</code> toko buku yang menyimpan <b>nama pelanggan</b>, alamat, dan daftar buku…</p>
            <div className="border-l-4 border-brand-300 pl-3 text-[14px] text-ink-2 italic">Satu fakta disimpan di satu tempat.</div>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 mt-4 border-t border-line bg-paper px-5 py-3">
        <Btn full size="lg" icon={Send}>Terbitkan</Btn>
      </div>
    </>
  );
}

export function DiscardDialog() {
  return <Dialog title="Buang perubahan?" desc="Ada perubahan yang belum disimpan. Simpan sebagai draf agar tidak hilang." confirm="Buang" cancel="Lanjut menulis" danger />;
}

/* ═══════════════ Tulisan saya ═══════════════ */

export function MyPosts() {
  const items = [
    { t: "Normalisasi tanpa pusing lewat satu studi kasus", s: "TERBIT", tone: "leaf" as const, sub: "214 pembaca · 14 komentar" },
    { t: "Ringkasan Jaringan Komputer Bab 4", s: "DRAF", tone: "butter" as const, sub: "Ketuk untuk melanjutkan menulis" },
    { t: "Pengalaman magang di startup logistik", s: "DIARSIPKAN", tone: "neutral" as const, sub: "Diarsipkan · bisa diterbitkan kembali" },
  ];
  return (
    <>
      <TopBar title="Tulisan saya" right={<div className="flex h-10 items-center gap-1.5 rounded-full bg-brand-500 px-3.5 text-[13px] font-semibold text-white"><Pencil size={14} /> Tulis</div>} />
      <div className="space-y-3 px-5">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          <Chip selected>Semua</Chip><Chip>Draf</Chip><Chip>Terbit</Chip><Chip>Arsip</Chip>
        </div>
        {items.map((i) => (
          <Card key={i.t} className="p-4">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <Badge tone={i.tone}>{i.s}</Badge>
                <div className="mt-2 font-display text-[17px] leading-[1.25] font-bold">{i.t}</div>
                <div className="mt-1 text-[12px] text-muted">{i.sub}</div>
              </div>
              <MoreHorizontal size={20} className="text-muted" />
            </div>
          </Card>
        ))}
        <div className="rounded-2xl bg-white p-3 text-[12px] leading-[1.5] text-muted">
          <b className="text-ink-2">Menu entri:</b> Edit tulisan · Terbitkan · Hapus draf · Arsipkan · Terbitkan kembali
        </div>
      </div>
    </>
  );
}

export function PostActionDialog() {
  return <Dialog title="Arsipkan artikel?" desc="Artikel tidak lagi muncul di beranda. Kamu bisa menerbitkannya kembali." confirm="Lanjutkan" />;
}

/* ═══════════════ Impor .docx ═══════════════ */

export function ImportDocx({ picked }: { picked?: boolean }) {
  return (
    <>
      <TopBar title="Impor .docx" subtitle="Ubah dokumen Word menjadi artikel" />
      <div className="space-y-4 px-5">
        <div className="flex flex-col items-center rounded-[28px] border-2 border-dashed border-brand-200 bg-brand-50 p-8 text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-[22px] bg-brand-100">
            {picked ? <FileText size={28} className="text-brand-600" /> : <FileUp size={28} className="text-brand-600" />}
          </div>
          {picked ? (
            <>
              <div className="font-display text-[18px] font-bold">catatan-basis-data.docx</div>
              <div className="mt-1 text-[14px] text-muted">248.6 KB · ketuk untuk ganti berkas</div>
            </>
          ) : (
            <>
              <div className="font-display text-[20px] font-bold">Pilih berkas .docx</div>
              <div className="mt-1 text-[14px] text-muted">Ukuran maksimal 5 MB</div>
            </>
          )}
        </div>
        <div className="rounded-[24px] bg-white p-5">
          <div className="mb-2 font-display text-[16px] font-bold">Yang perlu kamu tahu</div>
          {["Baris pertama dipakai sebagai judul artikel.", "Heading, tebal, miring, dan daftar dipertahankan.", "Gambar dan tabel belum didukung dan akan dilewati."].map((t) => (
            <div key={t} className="flex gap-2 py-1 text-[13px] leading-[1.5] text-ink-2"><Check size={15} className="mt-0.5 shrink-0 text-leaf-500" />{t}</div>
          ))}
        </div>
        <Btn full size="lg" icon={Upload} variant={picked ? "primary" : "disabled"}>Impor ke editor</Btn>
      </div>
    </>
  );
}

/* ═══════════════ Akses penulis ═══════════════ */

export function AuthorRequest({ step }: { step: "profile" | "form" | "pending" | "active" }) {
  return (
    <>
      <TopBar
        title="Akses menulis"
        subtitle={step === "profile" ? "Lengkapi profil Karsa Lib" : step === "pending" ? "Menunggu tinjauan" : step === "active" ? "Penulis aktif" : "Ajukan akses penulis"}
      />
      <div className="space-y-4 px-5">
        {step === "profile" && (
          <>
            <div>
              <div className="font-display text-[18px] font-bold">Siapkan ruang belajarmu</div>
              <div className="text-[13px] text-muted">Pilih identitas program studi agar feed menampilkan artikel yang tepat.</div>
            </div>
            <Field label="Nama yang ditampilkan"><Input value="Nadia Putri Maharani" /></Field>
            <Field label="Fakultas"><Input value="Fakultas Ilmu Komputer" right={<span className="text-muted">▾</span>} /></Field>
            <Field label="Program studi"><Input value="Sistem Informasi" right={<span className="text-muted">▾</span>} /></Field>
            <Field label="Kelas"><Input value="SI-4B · Semester 4" right={<span className="text-muted">▾</span>} /></Field>
            <div className="rounded-2xl bg-butter-100 p-3.5 text-[12px] leading-[1.5] text-butter-700">
              Fakultas dan program studi tidak dapat diubah setelah disimpan. Pilihan prodi menentukan artikel yang bisa kamu lihat.
            </div>
            <Btn full size="lg">Simpan profil</Btn>
          </>
        )}
        {step === "form" && (
          <>
            <div className="rounded-[22px] bg-brand-50 p-4">
              <div className="font-display text-[18px] font-bold">Bagikan ilmu untuk satu prodi</div>
              <div className="mt-1 text-[13px] leading-[1.5] text-ink-2">Admin akan meninjau permohonanmu sebelum akses menulis aktif.</div>
            </div>
            <Field label="Mengapa ingin menjadi penulis?"><Input placeholder="Ceritakan alasan dan rencanamu menulis" tall /></Field>
            <Field label="Topik yang ingin ditulis"><Input placeholder="Misalnya: catatan kuliah, tutorial, pengalaman organisasi" tall /></Field>
            <Field label="Username Instagram (opsional)"><Input value="@nadia.putri" right={<AtSign size={16} className="text-muted" />} /></Field>
            <Field label="Username TikTok (opsional)" hint="Isi username dengan huruf, angka, titik, atau garis bawah."><Input placeholder="@username" /></Field>
            <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-3.5">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md bg-brand-500"><Check size={13} className="text-white" /></div>
              <span className="text-[13px] leading-[1.5]">Saya akan mengikuti panduan komunitas Karsa Lib.</span>
            </div>
            <Btn full size="lg">Kirim permohonan</Btn>
          </>
        )}
        {step === "pending" && (
          <>
            <div className="rounded-[22px] bg-butter-100 p-5">
              <div className="font-display text-[18px] font-bold text-butter-700">Permohonan sedang ditinjau</div>
              <div className="mt-1 text-[13px] leading-[1.5] text-butter-700">Kamu tetap bisa membaca dan berdiskusi. Tarik layar untuk memperbarui status.</div>
            </div>
            <Skeleton3 />
          </>
        )}
        {step === "active" && (
          <>
            <div className="rounded-[28px] bg-espresso p-5 text-white">
              <div className="text-[12px] font-semibold text-white/60">Akses menulis aktif</div>
              <div className="font-display text-[24px] font-bold">Selamat menulis, Nadia!</div>
            </div>
            <Btn full size="lg" icon={Pencil}>Tulis artikel</Btn>
            <Btn full size="lg" variant="soft" icon={FileText}>Tulisan saya</Btn>
            <Btn full size="lg" variant="outline" icon={UserPen}>Lihat profil penulis</Btn>
          </>
        )}
      </div>
    </>
  );
}

function Skeleton3() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-2xl bg-white p-3.5">
          <div className="h-10 w-10 rounded-full bg-paper-3" />
          <div className="flex-1 space-y-2"><div className="h-3 w-2/3 rounded bg-paper-3" /><div className="h-3 w-1/3 rounded bg-paper-2" /></div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════ Profil penulis ═══════════════ */

export function AuthorProfile() {
  return (
    <>
      <TopBar title="Profil penulis" subtitle="Karsa Lib" />
      <div className="space-y-4 px-5">
        <div className="flex items-center gap-4">
          <Avatar name="Rafi Hidayat" size={64} />
          <div>
            <div className="font-display text-[22px] leading-[1.2] font-bold">Rafi Hidayat</div>
            <div className="text-[13px] text-muted">Fakultas Ilmu Komputer</div>
            <div className="text-[13px] text-muted">Sistem Informasi</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[22px] bg-brand-50 p-4"><div className="font-display text-[28px] font-extrabold text-brand-600">12</div><div className="text-[12px] font-semibold text-ink-2">Artikel terbit</div></div>
          <div className="rounded-[22px] bg-tide-100 p-4"><div className="font-display text-[28px] font-extrabold text-tide-600">1.482</div><div className="text-[12px] font-semibold text-ink-2">Total pembaca</div></div>
        </div>
        <div className="font-display text-[18px] font-bold">Tulisan Rafi</div>
        <ArticleCard a={ARTICLES[0]} />
        <ArticleCard a={{ ...ARTICLES[1], author: "Rafi Hidayat", title: "Panduan ERD dari nol untuk tugas besar" }} />
      </div>
    </>
  );
}

