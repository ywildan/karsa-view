import { Code, Section } from "@/components/Section";
import { COLORS } from "@/data/docs";
import { Avatar, Badge, Batik, Btn, Chip, Empty, Field, Input, LogoMark, PointBadge, Segmented, Skeleton, Toast, type BadgeTone, type Tone } from "@/mock/ui";
import { Pencil, Trash2, Sparkles } from "lucide-react";

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[26px] border border-line bg-white p-5 sm:p-6">
      <div className="mb-4">
        <h4 className="font-display text-[19px] font-bold">{title}</h4>
        {note && <div className="mt-0.5 text-[12.5px] leading-[1.55] text-muted">{note}</div>}
      </div>
      {children}
    </div>
  );
}

const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export function DesignSystem() {
  const badgeTones: BadgeTone[] = ["brand", "solid", "dark", "leaf", "butter", "danger", "neutral", "plum", "tide"];
  const tones: Tone[] = ["brand", "butter", "leaf", "tide", "plum", "clay"];
  return (
    <Section
      id="desain"
      no="05"
      tone="white"
      title="Design system “Kertas hangat”"
      lead={
        <>
          Palet krem, tinta cokelat espresso, dan satu aksen jingga (Brand500 <Code>#E36B0F</Code>). Seluruh komponen ditulis sendiri di <Code>ui/Common.kt</Code> &amp;{" "}
          <Code>ui/Overlay.kt</Code> — Material3 hanya dipakai sebagai fondasi tema; tampilan akhirnya khas Karsa.
        </>
      }
    >
      {/* Colors */}
      <div className="grid gap-5 lg:grid-cols-2">
        {COLORS.map((g) => (
          <Block key={g.g} title={g.g} note="theme/Colors.kt">
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
              {g.items.map(([n, hex]) => (
                <div key={n} className="overflow-hidden rounded-2xl border border-line">
                  <div className="h-14" style={{ background: hex }} />
                  <div className="px-2 py-1.5">
                    <div className="truncate text-[11.5px] font-bold" style={{ color: luminance(hex) > 0.5 ? undefined : undefined }}>{n}</div>
                    <div className="font-mono text-[10.5px] text-muted">{hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </Block>
        ))}
      </div>

      {/* Typography */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Block title="Tipografi" note="Dua font variabel dibundel di res/font: Bricolage Grotesque (display) dan Plus Jakarta Sans (isi). Bobot 400–800 lewat FontVariation.weight().">
          <div className="space-y-4">
            <div>
              <div className="font-mono text-[11px] text-muted">displayStyle(40, 800) · Bricolage Grotesque</div>
              <div className="font-display text-[40px] leading-[1.02] font-extrabold tracking-[-0.02em]">Setiap karsa, satu poin.</div>
            </div>
            <div>
              <div className="font-mono text-[11px] text-muted">displayStyle(22, 700)</div>
              <div className="font-display text-[22px] leading-[1.25] font-bold">Poin-poin penting artikel</div>
            </div>
            <div>
              <div className="font-mono text-[11px] text-muted">sansStyle(14, 400) · Plus Jakarta Sans</div>
              <div className="text-[14px] leading-[1.5]">Grup otomatis muncul setelah kamu terdaftar di mata kuliah semester ini.</div>
            </div>
            <div>
              <div className="font-mono text-[11px] text-muted">Eyebrow · sansStyle(11, 700, tracking 0.16em)</div>
              <div className="text-[11px] font-bold tracking-[0.16em] text-brand-700 uppercase">Perpustakaan prodi</div>
            </div>
          </div>
        </Block>

        <Block title="Identitas visual" note="LogoMark: empat kelopak kawung bertemu di satu titik — simbol kontribusi yang saling terhubung. BatikPattern memakai motif truntum (ubin 44dp).">
          <div className="flex flex-wrap items-center gap-5">
            <LogoMark size={72} />
            <LogoMark size={72} tile="#2A1A10" ink="#FFA762" radius={20} />
            <LogoMark size={72} tile="#FFE6D0" ink="#C75A08" />
            <div className="relative h-[72px] w-40 overflow-hidden rounded-2xl bg-brand-500"><Batik color="#fff" opacity={0.3} /></div>
            <div className="relative h-[72px] w-40 overflow-hidden rounded-2xl bg-paper-2"><Batik color="#E36B0F" opacity={0.25} /></div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
            <div className="rounded-2xl bg-paper p-3 card-shadow"><b>cardShadow</b><div className="text-muted">elevation 10dp</div></div>
            <div className="rounded-2xl bg-paper p-3 pop-shadow"><b>popShadow</b><div className="text-muted">Dock & menu</div></div>
            <div className="rounded-2xl bg-brand-500 p-3 text-white shadow-[0_8px_20px_-6px_rgba(227,107,15,0.6)]"><b>brandShadow</b><div className="text-white/75">tombol utama</div></div>
          </div>
        </Block>
      </div>

      {/* Components */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Block title="KarsaButton" note="7 varian × 3 ukuran (Sm 36 · Md 48 · Lg 56dp), loading Spinner, leading icon, efek tekan 0,98.">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Btn>Primary</Btn><Btn variant="dark">Dark</Btn><Btn variant="soft">Soft</Btn><Btn variant="outline">Outline</Btn>
            </div>
            <div className="flex flex-wrap gap-2">
              <Btn variant="ghost">Ghost</Btn><Btn variant="danger" icon={Trash2}>Danger</Btn><Btn variant="dangerSoft">DangerSoft</Btn><Btn variant="disabled">Nonaktif</Btn>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Btn size="sm" icon={Pencil}>Sm</Btn><Btn size="md" icon={Pencil}>Md</Btn><Btn size="lg" icon={Sparkles}>Lg</Btn>
            </div>
          </div>
        </Block>

        <Block title="Badge · Chip · Segmented" note="Badge 9 nada. Chip terpilih = Espresso. Segmented dengan ikon opsional.">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">{badgeTones.map((t) => <Badge key={t} tone={t}>{t.toUpperCase()}</Badge>)}</div>
            <div className="flex flex-wrap gap-2"><Chip selected>Terbaru</Chip><Chip>Trending 7 hari</Chip><Chip>Trending 30 hari</Chip></div>
            <Segmented value={1} options={[{ label: "Ringkasan", icon: Sparkles }, { label: "Tanya materi" }]} />
          </div>
        </Block>

        <Block title="PointBadge & Avatar" note="PointBadge berubah warna menurut nilai (≥4 jingga solid, 3 Brand100, 2 Butter100, 1 Paper2). Avatar: tone deterministik dari hash nama (31×).">
          <div className="space-y-4">
            <div className="flex items-center gap-2"><PointBadge points={1} /><PointBadge points={2} /><PointBadge points={3} /><PointBadge points={4} /><PointBadge points={4} large /></div>
            <div className="flex flex-wrap items-center gap-2.5">
              {tones.map((t) => <Avatar key={t} name={`${t} X`} tone={t} size={44} />)}
              <Avatar name="Basis Data" size={52} tone="tide" square />
            </div>
          </div>
        </Block>

        <Block title="Field · Skeleton · Empty state" note="Field = label + KarsaTextField. Skeleton shimmer 1,6 dtk. EmptyState & ErrorState seragam untuk semua layar.">
          <div className="space-y-3">
            <Field label="Nama yang ditampilkan"><Input value="Nadia Putri Maharani" /></Field>
            <div className="flex gap-2"><Skeleton className="h-10 w-10 !rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-2/3" /><Skeleton className="h-3.5 w-1/3" /></div></div>
            <div className="rounded-2xl bg-paper"><Empty title="Belum ada artikel" desc="Saat ada tulisan baru dari prodimu, artikel itu akan muncul di sini." className="!py-6" /></div>
          </div>
        </Block>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Block title="Toast / Snackbar" note="3 nada (Success · Neutral · Error), aksi opsional, hilang 3,8 dtk.">
          <div className="relative h-[168px] space-y-2">
            {(["success", "neutral", "error"] as const).map((t, i) => (
              <div key={t} className="relative h-[46px]">
                <div className="[&>div]:!static [&>div]:!inset-auto"><Toast tone={t} msg={t === "success" ? "Komentar terkirim" : t === "neutral" ? "Pesan disalin" : "Koneksi belum tersedia"} action={i === 0 ? "Lihat" : undefined} /></div>
              </div>
            ))}
          </div>
        </Block>
        <Block title="Sheet & Dialog" note="KarsaSheet (handle, footer, scroll state) dan KarsaDialog (Primary/Danger). Saat terbuka, latar di-blur 16dp (API 31+).">
          <ul className="space-y-2 text-[13px] leading-[1.55] text-ink-2">
            <li>• <b>SelectField</b> membuka sheet pilihan dengan sub-label</li>
            <li>• <b>PopMenu</b> mengambang di sudut kanan (MenuEntry + danger)</li>
            <li>• <b>OverlayBlurState</b> acquire/release per overlay</li>
            <li>• Animasi: <Code>cubic-bezier(0.2, 0.9, 0.2, 1)</Code> 240–320 ms</li>
          </ul>
        </Block>
        <Block title="Ikon & Markdown" note="77 ikon Lucide disimpan sebagai daftar path SVG (KarsaIcons) dan digambar lewat LucideIcon — tanpa dependensi ikon.">
          <ul className="space-y-2 text-[13px] leading-[1.55] text-ink-2">
            <li>• Markdown buatan sendiri: <Code>#</Code> <Code>##</Code> <Code>&gt;</Code> <Code>-</Code> <Code>```</Code></li>
            <li>• Inline: <b>tebal</b>, <i>miring</i>, <Code>kode</Code>, tautan</li>
            <li>• Dipakai di artikel, pratinjau editor, jawaban AI</li>
          </ul>
        </Block>
      </div>
    </Section>
  );
}
