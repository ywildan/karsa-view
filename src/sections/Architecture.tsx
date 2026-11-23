import { ArrowRight, Ban, Check, Layers } from "lucide-react";
import { cn } from "@/utils/cn";
import { Code, Section } from "@/components/Section";
import { NOT_USED, PACKAGES, PHASES, STACK, TRANSITIONS } from "@/data/docs";

export function Overview() {
  return (
    <Section
      id="gambaran"
      no="01"
      title="Apa itu Karsa Compose?"
      lead={
        <>
          <b>Karsa</b> adalah “Sistem Pencatatan Poin Keaktifan Mahasiswa UNTIDAR — setiap karsa, satu poin.” Repo monorepo berisi web Next.js, aplikasi Flutter
          lama, dan <Code>karsa-mobile-compose</Code>: pembangunan ulang aplikasi Android <b>SiKarsa</b> 100% memakai Jetpack Compose (versi 3.0.0) yang berbicara ke API{" "}
          <Code>/api/mobile/v1</Code> yang sama.
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          {
            t: "Untuk Mahasiswa",
            c: "bg-leaf-100",
            tc: "text-leaf-600",
            li: ["Membaca & mendiskusikan artikel prodi", "Bertanya ke Teman baca (AI) tentang materi", "Mengobrol di grup kelas per mata kuliah", "Memantau Poinku, peringkat, dan jatah absensi"],
          },
          {
            t: "Untuk PJ Kelas",
            c: "bg-brand-100",
            tc: "text-brand-700",
            li: ["Input poin 3 langkah dengan idempotency", "Riwayat poin + hapus berjejak audit", "Catat absensi massal & reset matkul", "Moderasi grup: sematkan, sembunyikan, kunci, blokir"],
          },
          {
            t: "Untuk Penulis Karsa Lib",
            c: "bg-tide-100",
            tc: "text-tide-600",
            li: ["Editor Markdown dengan toolbar & pratinjau", "Impor dokumen Word (.docx) hingga 5 MB", "Siklus draf → terbit → arsip → terbit kembali", "Profil penulis dengan total pembaca"],
          },
        ].map((r) => (
          <div key={r.t} className={cn("rounded-[28px] p-6", r.c)}>
            <div className={cn("font-display text-[22px] font-bold", r.tc)}>{r.t}</div>
            <ul className="mt-4 space-y-2.5">
              {r.li.map((x) => (
                <li key={x} className="flex gap-2.5 text-[14px] leading-[1.55] text-ink-2">
                  <Check size={16} className={cn("mt-0.5 shrink-0", r.tc)} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[28px] border border-line bg-white p-6 sm:p-8">
        <h3 className="font-display text-[22px] font-bold">Riwayat pembangunan (git log)</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-4">
          {[
            { d: "19 Nov", t: "Slice 1–5 · Fondasi", x: "Entry flow, Karsa Lib, grup & chat, input poin & aktivitas, akun & legal — diport dari Flutter dengan data demo." },
            { d: "20 Nov", t: "S1–S6 · API nyata", x: "Auth sesi nyata + capability gating, Karsa Lib & Teman baca, grup, poin, akun/legal final." },
            { d: "21 Nov", t: "Splash karusel", x: "Splash kartu penuh: urutan acak, transisi geser, progres shimmer." },
            { d: "22 Nov", t: "Polish & Absensi", x: "Batik truntum, blur latar dialog/sheet, fitur Absensi matkul (PR #92)." },
          ].map((e, i) => (
            <div key={e.d} className="relative">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 font-display text-[12px] font-extrabold text-white">{i + 1}</span>
                <span className="text-[12px] font-bold tracking-wider text-brand-700">{e.d} 2026</span>
              </div>
              <div className="text-[15px] font-bold">{e.t}</div>
              <p className="mt-1 text-[13px] leading-[1.6] text-muted">{e.x}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Architecture() {
  const total = PACKAGES.reduce((a, p) => a + p.loc, 0);
  return (
    <Section
      id="arsitektur"
      no="02"
      tone="white"
      title="Arsitektur & alur aplikasi"
      lead={
        <>
          Tanpa Navigation Compose, tanpa ViewModel: seluruh navigasi dan state dipegang satu objek <Code>KarsaState</Code> yang dibagikan lewat{" "}
          <Code>CompositionLocal</Code>. Controller per domain (Lib, Grup, Poin, Absensi) memegang state Compose dan memanggil <Code>ApiClient</Code>.
        </>
      }
    >
      {/* Layers */}
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {[
          { t: "UI", s: "screens/ · ui/ · components/", d: "Composable stateless-ish, membaca LocalApp.current", c: "bg-brand-500 text-white" },
          { t: "State", s: "KarsaState + 4 controller", d: "mutableStateOf, coroutine scope, LoadStatus Loading/Error/Ready", c: "bg-espresso text-white" },
          { t: "Jaringan", s: "ApiClient · SessionStore", d: "OkHttp, Bearer, refresh 401, DTO @Serializable", c: "bg-tide-600 text-white" },
          { t: "Backend", s: "Next.js /api/mobile/v1", d: "Auth.js + Prisma + Supabase (di luar modul ini)", c: "bg-paper-3 text-ink" },
        ].flatMap((l, i, arr) => [
          <div key={l.t} className={cn("rounded-[24px] p-5", l.c)}>
            <div className="font-display text-[22px] font-extrabold">{l.t}</div>
            <div className="mt-0.5 font-mono text-[11px] opacity-80">{l.s}</div>
            <p className="mt-3 text-[13px] leading-[1.55] opacity-90">{l.d}</p>
          </div>,
          i < arr.length - 1 ? (
            <div key={`a${i}`} className="flex items-center justify-center text-muted">
              <ArrowRight className="hidden lg:block" />
              <ArrowRight className="rotate-90 lg:hidden" />
            </div>
          ) : null,
        ])}
      </div>

      {/* Phases */}
      <div className="mt-14">
        <h3 className="font-display text-[26px] font-bold">Mesin fase (<Code>enum Phase</Code>)</h3>
        <p className="mt-2 max-w-3xl text-[14.5px] leading-[1.7] text-ink-2">
          <Code>KarsaApp()</Code> memilih satu layar penuh sesuai <Code>state.phase</Code>. Hanya fase <b>App</b> yang menampilkan <Code>TabsHost</Code>,{" "}
          <Code>StackHost</Code>, dan Dock.
        </p>
        <div className="mt-6 flex flex-wrap items-stretch gap-3">
          {PHASES.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <div className={cn("rounded-2xl px-5 py-3.5", p.c)}>
                <div className="font-display text-[17px] font-extrabold">{p.id}</div>
                <div className="text-[12px] opacity-80">{p.d}</div>
              </div>
              {i < PHASES.length - 1 && <ArrowRight size={18} className="text-muted" />}
            </div>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-[22px] border border-line">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-paper-2 text-[11px] tracking-wider text-muted uppercase">
              <tr>
                <th className="px-4 py-3">Dari</th>
                <th className="px-4 py-3">Ke</th>
                <th className="px-4 py-3">Pemicu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {TRANSITIONS.map(([a, b, c]) => (
                <tr key={a + b + c}>
                  <td className="px-4 py-3 font-mono font-semibold whitespace-nowrap">{a}</td>
                  <td className="px-4 py-3 font-mono font-semibold whitespace-nowrap text-brand-700">{b}</td>
                  <td className="px-4 py-3 leading-[1.5] text-ink-2">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] bg-paper p-6 sm:p-7">
          <div className="mb-3 flex items-center gap-2 font-display text-[22px] font-bold"><Layers size={20} className="text-brand-600" /> Model navigasi</div>
          <ul className="space-y-3 text-[14px] leading-[1.65] text-ink-2">
            <li><b>6 Tab</b> (<Code>enum Tab</Code>): Lib, Grup, Input, Aktivitas, Poinku, Akun. <Code>tabsFor(capabilities, hasClass)</Code> menyusun daftar sesuai akses.</li>
            <li><b>TabsHost</b> menjaga tab yang pernah dikunjungi tetap termuat (alpha 0) agar posisi gulir &amp; isi formulir tidak hilang.</li>
            <li><b>13 Route</b> (<Code>sealed interface Route</Code>) ditumpuk di <Code>stack</Code>. Tiap route masuk lewat <Code>PushIn</Code>: geser 36dp + fade 0,4→1 selama 320 ms, easing <Code>(0.2, 0.9, 0.2, 1)</Code>.</li>
            <li><b>Dock</b> hanya terlihat saat stack kosong; naik/turun 280/180 ms.</li>
            <li><b>Back</b>: pop stack → bila kosong kembali ke tab pertama → baru keluar app. <Code>ensureTab()</Code> membuang route yang tak lagi diizinkan saat capability berubah.</li>
          </ul>
        </div>
        <div className="rounded-[28px] bg-paper p-6 sm:p-7">
          <div className="mb-3 font-display text-[22px] font-bold">Pola yang konsisten</div>
          <ul className="space-y-3 text-[14px] leading-[1.65] text-ink-2">
            <li><b>Gate</b>: setiap data jaringan melewati <Code>Gate(status, onRetry, skeleton)</Code> → Skeleton / ErrorState / konten.</li>
            <li><b>Rise</b>: animasi muncul naik 10dp + fade untuk kartu.</li>
            <li><b>Toast</b> global via <Code>state.notify(msg, tone, actionLabel, onAction)</Code>, hilang otomatis 3,8 detik.</li>
            <li><b>Blur latar</b>: <Code>OverlayBlurState</Code> menghitung overlay terbuka; root di-blur 16dp bila API ≥ 31.</li>
            <li><b>friendlyError()</b> memetakan exception ke pesan Indonesia: timeout, tidak ada koneksi, atau pesan server.</li>
            <li><b>Reset sesi</b>: logout memanggil <Code>reset()</Code> di semua controller agar data akun lama tidak bocor.</li>
          </ul>
        </div>
      </div>

      {/* Stack & Packages */}
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-[26px] font-bold">Dependensi</h3>
          <div className="mt-4 divide-y divide-line overflow-hidden rounded-[22px] border border-line">
            {STACK.map((s) => (
              <div key={s.n} className="flex items-start gap-3 bg-white px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-bold">{s.n}</div>
                  <div className="text-[12px] text-muted">{s.d}</div>
                </div>
                <code className="rounded-lg bg-paper-2 px-2 py-1 font-mono text-[11.5px] text-brand-700">{s.v}</code>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-[12px] font-bold text-muted"><Ban size={14} /> Sengaja tidak dipakai:</span>
            {NOT_USED.map((n) => (
              <span key={n} className="rounded-full bg-danger-100 px-2.5 py-1 text-[11px] font-semibold text-danger-500">{n}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-[26px] font-bold">Peta paket <span className="text-[14px] font-semibold text-muted">· {total.toLocaleString("id-ID")} baris</span></h3>
          <div className="mt-4 flex h-4 overflow-hidden rounded-full">
            {PACKAGES.map((p) => (
              <div key={p.p} className={p.c} style={{ width: `${(p.loc / total) * 100}%` }} title={`${p.p} ${p.loc}`} />
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {PACKAGES.map((p) => (
              <div key={p.p} className="flex items-start gap-3 text-[13px]">
                <span className={cn("mt-1 h-3 w-3 shrink-0 rounded-sm", p.c)} />
                <div className="min-w-0 flex-1">
                  <span className="font-mono font-bold">{p.p}</span> <span className="text-muted">· {p.loc.toLocaleString("id-ID")}</span>
                  <div className="text-[12px] leading-[1.5] text-ink-2">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
