import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/utils/cn";
import { Code, Section } from "@/components/Section";
import { API_GROUPS, FILES, SECURITY } from "@/data/docs";

const METHOD_CLS: Record<string, string> = {
  GET: "bg-leaf-600",
  POST: "bg-brand-500",
  PATCH: "bg-plum-600",
  PUT: "bg-butter-700",
  DELETE: "bg-danger-500",
};

export function ApiRef() {
  const [q, setQ] = useState("");
  const [g, setG] = useState("Semua");
  const total = API_GROUPS.reduce((a, x) => a + x.items.length, 0);
  const groups = API_GROUPS.filter((x) => g === "Semua" || x.g === g)
    .map((x) => ({ ...x, items: x.items.filter((i) => (i.p + i.d + i.m).toLowerCase().includes(q.toLowerCase())) }))
    .filter((x) => x.items.length);
  return (
    <Section
      id="api"
      no="06"
      title="Referensi API"
      lead={
        <>
          {total} kombinasi metode-endpoint di bawah <Code>{"{API_BASE_URL}"}/api/mobile/v1</Code> (default <Code>https://www.sikarsa.id</Code>, bisa diganti lewat env{" "}
          <Code>KARSA_API_BASE_URL</Code> saat build). Semua permintaan membawa <Code>Authorization: Bearer</Code>; respons berbentuk <Code>{`{ ok, data }`}</Code> atau <Code>{`{ ok:false, error:{ code, message } }`}</Code>. Timeout: connect 20 dtk, read 45 dtk, write 20 dtk (unggah .docx 60 dtk). Kegagalan dipetakan ke pesan ramah lewat <Code>friendlyError()</Code>.
        </>
      }
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex h-12 flex-1 items-center gap-2.5 rounded-2xl border border-line bg-white px-4">
          <Search size={17} className="text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari endpoint, mis. “attendance” atau “pin”" className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted" />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {["Semua", ...API_GROUPS.map((x) => x.g)].map((x) => (
            <button key={x} type="button" onClick={() => setG(x)} className={cn("h-12 shrink-0 cursor-pointer rounded-full px-4 text-[13px] font-semibold transition", g === x ? "bg-espresso text-white" : "bg-white text-ink-2 ring-1 ring-line hover:bg-paper-2")}>
              {x}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        {groups.map((x) => (
          <div key={x.g} className="overflow-hidden rounded-[24px] border border-line bg-white">
            <div className="flex items-center justify-between bg-paper-2 px-5 py-3">
              <h3 className="font-display text-[18px] font-bold">{x.g}</h3>
              <span className="text-[12px] font-semibold text-muted">{x.items.length} endpoint</span>
            </div>
            <div className="divide-y divide-line">
              {x.items.map((i) => (
                <div key={i.m + i.p} className="flex flex-col gap-1.5 px-5 py-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex min-w-0 items-center gap-3 sm:w-[52%]">
                    <span className={cn("w-[58px] shrink-0 rounded-md py-0.5 text-center font-mono text-[10.5px] font-bold text-white", METHOD_CLS[i.m])}>{i.m}</span>
                    <code className="min-w-0 font-mono text-[12.5px] break-all">{i.p}</code>
                  </div>
                  <div className="text-[13px] leading-[1.5] text-ink-2">{i.d}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 && <div className="rounded-2xl bg-white p-8 text-center text-muted">Tidak ada endpoint yang cocok.</div>}
      </div>
    </Section>
  );
}

export function Security() {
  return (
    <Section
      id="keamanan"
      no="07"
      tone="dark"
      title="Keamanan, sesi & rilis"
      lead="Beberapa keputusan teknis yang membuat aplikasi aman dipakai di perangkat mahasiswa — dan bagaimana APK dibangun."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {SECURITY.map((s) => (
          <div key={s.t} className="rounded-[24px] bg-white/[0.06] p-5 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-[20px]">{s.i}</span>
              <h3 className="font-display text-[18px] leading-[1.25] font-bold">{s.t}</h3>
            </div>
            <p className="mt-3 text-[13.5px] leading-[1.7] text-white/70">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] bg-white/[0.06] p-6 ring-1 ring-white/10">
          <h3 className="font-display text-[20px] font-bold">Alur login (PKCE)</h3>
          <ol className="mt-4 space-y-3 text-[13.5px] leading-[1.6] text-white/75">
            {[
              "Pengguna mencentang persetujuan lalu menekan “Masuk dengan Google”.",
              "AuthController membuat state, code_verifier, dan SHA-256 challenge; menyimpannya di SessionStore.",
              "Browser terbuka ke /auth/start?state&code_challenge&redirect_uri=karsa://auth/callback. SessionState → Authenticating.",
              "Setelah Google selesai, server memanggil deep link karsa://auth/callback?code=… (atau ?error=not_eligible).",
              "MainActivity.onNewIntent → KarsaAuth.onIntent: state diverifikasi, kode ditukar (/auth/exchange) bersama versi dokumen hukum.",
              "GET /me memuat profil + capabilities → SessionState.SignedIn → fase App dan toast sambutan.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[12px] font-extrabold text-white">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-[24px] bg-white/[0.06] p-6 ring-1 ring-white/10">
          <h3 className="font-display text-[20px] font-bold">Konfigurasi build</h3>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[13px]">
            {[
              ["applicationId", "ac.id.untidar.karsa_mobile"],
              ["namespace", "ac.id.untidar.karsa"],
              ["Label launcher", "SiKarsa"],
              ["minSdk / targetSdk", "26 / 35 (compileSdk 35)"],
              ["versionName", "3.0.0 (properti karsaVersionName)"],
              ["versionCode", "30000 (properti karsaVersionCode)"],
              ["API_BASE_URL", "env KARSA_API_BASE_URL → default https://www.sikarsa.id"],
              ["Penandatanganan", "env KARSA_KEYSTORE_FILE, ANDROID_KEYSTORE_PASSWORD, ANDROID_KEY_ALIAS, ANDROID_KEY_PASSWORD; tanpa itu release memakai kunci debug"],
              ["Minify", "isMinifyEnabled = false"],
              ["Aktivitas", "MainActivity · singleTask · adjustResize · edge-to-edge"],
              ["Deep link", "karsa://auth/callback"],
              ["Izin", "INTERNET, ACCESS_NETWORK_STATE"],
              ["Ikon", "Adaptif — latar #E36B0F, foreground kawung (mipmap-anydpi-v26)"],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-mono text-[11.5px] text-brand-300">{k}</dt>
                <dd className="leading-[1.5] text-white/80">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

export function Files() {
  return (
    <Section
      id="struktur"
      no="08"
      title="Peta berkas sumber"
      lead={
        <>
          Seluruh kode ada di <Code>karsa-mobile-compose/app/src/main/java/ac/id/untidar/karsa</Code>. Jumlah baris dihitung dari clone repo.
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {FILES.map((g) => (
          <div key={g.dir} className="overflow-hidden rounded-[24px] border border-line bg-white">
            <div className="bg-paper-2 px-5 py-3 font-mono text-[13px] font-bold">{g.dir}</div>
            <div className="divide-y divide-line">
              {g.files.map((f) => (
                <div key={f.n} className="flex items-start gap-3 px-5 py-2.5">
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[12.5px] font-semibold">{f.n}</div>
                    <div className="text-[12.5px] leading-[1.5] text-ink-2">{f.d}</div>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-muted">{f.loc.toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
