import { BookOpen, Building2, ExternalLink, FileText, GraduationCap, Globe, LifeBuoy, Lock, LogOut, RefreshCw, ShieldCheck, Users, UserPen, Pencil, type LucideIcon } from "lucide-react";
import { Avatar, Badge, Btn, Dialog, Eyebrow, IconBtn, PageHeader, TopBar, type BadgeTone } from "../ui";

function InfoRow({ icon: I, title, children, chevron }: { icon: LucideIcon; title: string; children: React.ReactNode; chevron?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-paper-2 text-ink-2"><I size={18} /></div>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-semibold text-muted">{title}</div>
        <div className="text-[14px] leading-[1.35] font-semibold">{children}</div>
      </div>
      {chevron && <span className="text-muted">›</span>}
    </div>
  );
}

export function Account({ role = "pj" }: { role?: "pj" | "mahasiswa" | "pending" }) {
  const pj = role === "pj";
  const author = role === "pj" ? ("DISETUJUI" as const) : role === "pending" ? ("MENUNGGU TINJAUAN" as const) : ("BELUM DIAJUKAN" as const);
  const authorTone: BadgeTone = author === "DISETUJUI" ? "leaf" : author === "MENUNGGU TINJAUAN" ? "butter" : "neutral";
  return (
    <>
      <PageHeader title="Akun" eyebrow={<Eyebrow>Profil</Eyebrow>} right={<IconBtn icon={RefreshCw} />} />
      <div className="space-y-4 px-5">
        <div className="rounded-[32px] bg-espresso p-5 text-white card-shadow">
          <div className="flex items-center gap-3.5">
            <Avatar name="Nadia Putri Maharani" size={60} tone="brand" />
            <div className="min-w-0">
              <div className="font-display text-[22px] leading-[1.25] font-bold">Nadia Putri M.</div>
              <div className="truncate text-[12px] text-white/60">nadia.putri@students.untidar.ac.id</div>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between rounded-2xl bg-white/10 px-4 py-3">
            <div>
              <div className="text-[10px] font-bold tracking-[0.16em] text-brand-300">NIM</div>
              <div className="font-display text-[18px] font-bold tracking-[0.02em]">2310114028</div>
            </div>
            <Badge tone="solid">{pj ? "PJ KELAS" : "MAHASISWA"}</Badge>
          </div>
          <div className="mt-3 text-[12px] text-white/60">SI-4B · Sistem Informasi</div>
        </div>

        <div>
          <div className="mb-2 px-1 font-display text-[16px] font-bold">Identitas dan akses</div>
          <div className="divide-y divide-line overflow-hidden rounded-[26px] border border-ink/5 bg-white">
            <InfoRow icon={ShieldCheck} title="Akses Karsa">
              <div>{pj ? "PJ mata kuliah · pencatat poin" : "Mahasiswa"}</div>
              <div className="text-[12px] font-medium text-muted">{pj ? "Karsa Lib · Tulis artikel · Laporan · Peringkat · Grup kelas" : "Karsa Lib · Laporan · Peringkat · Grup kelas"}</div>
            </InfoRow>
            <InfoRow icon={Building2} title="Fakultas Karsa Lib">Fakultas Ilmu Komputer</InfoRow>
            <InfoRow icon={GraduationCap} title="Program studi">Sistem Informasi</InfoRow>
            <InfoRow icon={Users} title="Kelas Karsa Lib">SI-4B · Semester 4</InfoRow>
            <InfoRow icon={Pencil} title="Akses menulis"><Badge tone={authorTone}>{author}</Badge></InfoRow>
            <InfoRow icon={UserPen} title="Profil penulis" chevron>{pj ? "Tampil di artikel yang kamu terbitkan" : "Nama, fakultas, prodi, kelas"}</InfoRow>
            <InfoRow icon={BookOpen} title="Karsa Lib">{role === "mahasiswa" ? "Aktif" : "Aktif"}</InfoRow>
          </div>
        </div>

        <div>
          <div className="mb-2 px-1 font-display text-[16px] font-bold">Informasi aplikasi</div>
          <div className="divide-y divide-line overflow-hidden rounded-[26px] border border-ink/5 bg-white">
            <InfoRow icon={FileText} title="Syarat Penggunaan" chevron>Versi 1.1 · 6 Oktober 2026</InfoRow>
            <InfoRow icon={Lock} title="Kebijakan Privasi" chevron>Versi 1.1 · 6 Oktober 2026</InfoRow>
            <InfoRow icon={LifeBuoy} title="Bantuan & masukan" chevron>admin@sikarsa.id</InfoRow>
          </div>
        </div>
        <Btn full size="lg" variant="dangerSoft" icon={LogOut}>Keluar dari aplikasi</Btn>
        <div className="pb-2 text-center text-[11px] text-muted">SiKarsa 3.0.0</div>
      </div>
    </>
  );
}

export function LogoutDialog() {
  return <Dialog danger title="Keluar dari SiKarsa?" desc="Kamu perlu masuk lagi dengan akun Google kampus untuk melanjutkan. Draf tulisan yang belum disimpan akan hilang." confirm="Keluar" />;
}

export function Legal({ doc }: { doc: "terms" | "privacy" }) {
  const terms = doc === "terms";
  const sections = terms
    ? [
        ["1. Tentang Karsa dan akun", "Karsa adalah layanan pendukung kegiatan mahasiswa yang menyediakan pencatatan poin keaktifan, laporan, peringkat, grup kelas, dan Karsa Lib. Informasi di Karsa bukan pengganti dokumen akademik resmi universitas."],
        ["2. Poin, laporan, dan grup kelas", "PJ mata kuliah hanya boleh mencatat poin berdasarkan kegiatan yang benar-benar terjadi untuk kelas dan mata kuliah yang ditugaskan."],
        ["3. Karsa Lib dan konten pengguna", "Artikel Karsa Lib ditampilkan kepada pengguna dari program studi yang sama dengan penulis saat artikel diterbitkan…"],
      ]
    : [
        ["1. Data yang digunakan", "Saat kamu masuk dengan Google, Karsa menerima informasi akun yang diperlukan untuk login, seperti nama, alamat email, foto profil, dan pengenal akun Google."],
        ["2. Tujuan penggunaan", "Data dipakai untuk memverifikasi akun, memberi akses sesuai peran dan kelas/program studi, mencatat poin, menampilkan laporan dan peringkat…"],
        ["3. Siapa yang dapat melihat data", "Pengguna hanya mendapat akses sesuai fitur dan perannya. Anggota kelas dapat melihat ruang grup kelas yang tersedia."],
      ];
  return (
    <>
      <TopBar title={terms ? "Syarat Penggunaan" : "Kebijakan Privasi"} subtitle="Dokumen layanan Karsa" right={<IconBtn icon={Globe} />} />
      <div className="space-y-4 px-5">
        <div className="flex gap-2"><Badge tone="brand">Versi 1.1</Badge><Badge tone="neutral">Berlaku 6 Oktober 2026</Badge></div>
        <p className="text-[15px] leading-[1.7] text-ink-2">
          {terms
            ? "Aturan sederhana agar pencatatan poin, percakapan kelas, dan berbagi pengetahuan di Karsa tetap dapat dipercaya."
            : "Penjelasan tentang data yang digunakan Karsa untuk menjalankan fitur akademik, grup kelas, dan Karsa Lib."}
        </p>
        {sections.map(([h, p]) => (
          <div key={h}>
            <div className="mb-1.5 font-display text-[18px] leading-[1.25] font-bold">{h}</div>
            <p className="text-[15px] leading-[1.75] text-ink-2">{p}</p>
          </div>
        ))}
        <div className="rounded-2xl bg-paper-2 p-4 text-[13px] leading-[1.6] text-ink-2">
          Ada pertanyaan tentang dokumen ini? Hubungi pengelola Karsa di <b>admin@sikarsa.id</b>.
        </div>
        <Btn full variant="outline" icon={ExternalLink}>Buka versi web</Btn>
      </div>
    </>
  );
}

