import { ArrowDown, ExternalLink, Smartphone } from "lucide-react";
import { Batik, LogoMark } from "@/mock/ui";
import { Phone } from "@/mock/Phone";
import { LibHome } from "@/mock/screens/lib";
import { Chat } from "@/mock/screens/groups";
import { RankingPage } from "@/mock/screens/points";
import { PJ_TABS, SCREENS } from "@/mock/registry";
import { STATS } from "@/data/docs";

export function Hero() {
  return (
    <section id="ringkasan" className="relative overflow-hidden bg-brand-500 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600" />
      <Batik color="#fff" opacity={0.14} />
      <div className="absolute -top-32 -left-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,167,98,0.55),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:px-12 lg:pt-24 lg:pb-28">
        <div className="rise">
          <div className="mb-6 flex items-center gap-3">
            <LogoMark size={52} tile="#2A1A10" ink="#FFA762" radius={16} />
            <div>
              <div className="font-display text-[20px] leading-none font-extrabold">SiKarsa</div>
              <div className="mt-1 text-[12px] font-semibold tracking-wide text-white/75">karsa-mobile-compose · v3.0.0</div>
            </div>
          </div>
          <h1 className="font-display text-[44px] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-[62px]">
            Dokumentasi fitur &amp; preview <span className="text-espresso">Karsa Compose</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.7] text-white/90">
            Hasil membaca seluruh isi <code className="rounded bg-black/15 px-1.5 py-0.5 font-mono text-[0.9em]">karsa-mobile-compose</code> milik Tim Karsa: aplikasi
            Android native Jetpack Compose untuk pencatatan poin keaktifan mahasiswa UNTIDAR, grup kelas, absensi, dan perpustakaan Karsa Lib.
            Setiap layar di bawah ini direplikasi sebagai preview interaktif dari kode Composable aslinya.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#layar" className="inline-flex h-12 items-center gap-2 rounded-2xl bg-espresso px-6 text-[15px] font-bold text-white transition hover:bg-espresso-2">
              <Smartphone size={18} /> Lihat {SCREENS.length} layar
            </a>
            <a href="#arsitektur" className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white/15 px-6 text-[15px] font-bold text-white backdrop-blur transition hover:bg-white/25">
              <ArrowDown size={18} /> Arsitektur
            </a>
            <a href="https://github.com/ywildan/karsa/tree/main/karsa-mobile-compose" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white/15 px-6 text-[15px] font-bold text-white backdrop-blur transition hover:bg-white/25">
              <ExternalLink size={18} /> Repo
            </a>
          </div>
        </div>

        <div className="relative hidden h-[540px] lg:block">
          <div className="absolute top-8 left-0 -rotate-6 opacity-95">
            <Phone scale={0.64} dock={{ tabs: PJ_TABS, active: "lib" }}>
              <LibHome variant="writer" />
            </Phone>
          </div>
          <div className="absolute top-0 left-[170px] z-10">
            <Phone scale={0.7}>
              <Chat variant="manager" />
            </Phone>
          </div>
          <div className="absolute top-16 right-0 rotate-6 opacity-95">
            <Phone scale={0.62}>
              <RankingPage />
            </Phone>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/15 bg-espresso/90 backdrop-blur">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-y-6 px-5 py-8 sm:px-8 md:grid-cols-3 lg:grid-cols-6 lg:px-12">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="font-display text-[34px] leading-none font-extrabold text-brand-300">{s.v}</div>
              <div className="mt-1.5 text-[13px] font-bold">{s.l}</div>
              <div className="text-[11px] text-white/50">{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
