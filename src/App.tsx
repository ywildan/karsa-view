import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { LogoMark } from "@/mock/ui";
import { MODULES, SCREENS } from "@/mock/registry";
import { Hero } from "@/sections/Hero";
import { Architecture, Overview } from "@/sections/Architecture";
import { Access } from "@/sections/Access";
import { Gallery } from "@/sections/Gallery";
import { DesignSystem } from "@/sections/DesignSystem";
import { ApiRef, Files, Security } from "@/sections/Reference";

const NAV = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "gambaran", label: "01 · Gambaran" },
  { id: "arsitektur", label: "02 · Arsitektur & alur" },
  { id: "akses", label: "03 · Peran & Dock" },
  { id: "layar", label: "04 · Katalog layar" },
  { id: "desain", label: "05 · Design system" },
  { id: "api", label: "06 · Referensi API" },
  { id: "keamanan", label: "07 · Keamanan & rilis" },
  { id: "struktur", label: "08 · Peta berkas" },
];

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const on = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [ids]);
  return active;
}

const ALL_IDS = [...NAV.map((n) => n.id), ...MODULES.map((m) => `mod-${m.id}`), ...SCREENS.map((s) => s.id)];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const active = useActive(ALL_IDS);
  const inGallery = active === "layar" || active.startsWith("mod-") || SCREENS.some((s) => s.id === active);
  const activeScreen = SCREENS.find((s) => s.id === active);
  const activeMod = active.startsWith("mod-") ? active.slice(4) : activeScreen?.module;
  return (
    <nav className="flex h-full flex-col">
      <a href="#ringkasan" onClick={onNavigate} className="mb-6 flex items-center gap-3 px-2">
        <LogoMark size={40} radius={13} />
        <div>
          <div className="font-display text-[18px] leading-none font-extrabold">SiKarsa</div>
          <div className="mt-1 text-[11px] font-semibold text-muted">Compose · Dokumentasi</div>
        </div>
      </a>
      <div className="no-scrollbar -mr-2 flex-1 space-y-0.5 overflow-y-auto pr-2 pb-6">
        {NAV.map((n) => {
          const on = n.id === "layar" ? inGallery : active === n.id;
          return (
            <div key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={onNavigate}
                className={cn("block rounded-xl px-3 py-2 text-[13.5px] font-semibold transition", on ? "bg-espresso text-white" : "text-ink-2 hover:bg-paper-2")}
              >
                {n.label}
              </a>
              {n.id === "layar" && inGallery && (
                <div className="mt-1 mb-2 ml-3 space-y-0.5 border-l-2 border-line pl-2">
                  {MODULES.map((m) => (
                    <div key={m.id}>
                      <a
                        href={`#mod-${m.id}`}
                        onClick={onNavigate}
                        className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-bold transition", activeMod === m.id ? "text-brand-700" : "text-ink-2 hover:text-ink")}
                      >
                        <span className={cn("h-2 w-2 rounded-full", m.color)} />
                        {m.title}
                      </a>
                      {activeMod === m.id && (
                        <div className="mb-1 ml-4 space-y-0.5">
                          {SCREENS.filter((s) => s.module === m.id).map((s) => (
                            <a
                              key={s.id}
                              href={`#${s.id}`}
                              onClick={onNavigate}
                              className={cn("block truncate rounded-md px-2 py-1 text-[12px] transition", active === s.id ? "bg-brand-100 font-bold text-brand-700" : "text-muted hover:text-ink")}
                            >
                              {s.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl bg-paper-2 p-3 text-[11.5px] leading-[1.5] text-muted">
        Sumber: <span className="font-semibold text-ink-2">Tim Karsa</span> › <span className="font-mono">karsa-mobile-compose</span>
      </div>
    </nav>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-paper/90 px-4 backdrop-blur lg:hidden">
        <a href="#ringkasan" className="flex items-center gap-2.5">
          <LogoMark size={30} radius={10} />
          <span className="font-display text-[16px] font-extrabold">SiKarsa Compose</span>
        </a>
        <button type="button" onClick={() => setOpen(true)} aria-label="Menu" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-white">
          <Menu size={18} />
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="sheet-up absolute inset-y-0 left-0 w-[300px] max-w-[86%] bg-paper p-5">
            <button type="button" onClick={() => setOpen(false)} aria-label="Tutup" className="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white">
              <X size={16} />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[272px] border-r border-line bg-paper p-5 lg:block">
        <Sidebar />
      </aside>

      <main className="lg:pl-[272px]">
        <Hero />
        <Overview />
        <Architecture />
        <Access />
        <Gallery />
        <DesignSystem />
        <ApiRef />
        <Security />
        <Files />
        <footer className="bg-espresso px-5 py-10 text-center text-[13px] leading-[1.7] text-white/60 sm:px-8">
          <div className="mx-auto mb-3 flex w-fit items-center gap-2.5">
            <LogoMark size={28} tile="#E36B0F" radius={9} />
            <span className="font-display text-[16px] font-extrabold text-white">SiKarsa Compose</span>
          </div>
          Dokumentasi ini disusun dari pembacaan kode <span className="font-mono text-white/80">karsa-mobile-compose</span> (v3.0.0). Preview adalah rekonstruksi UI dengan data
          demo — bukan tangkapan layar perangkat.
        </footer>
      </main>
    </div>
  );
}
