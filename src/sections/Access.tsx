import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Code, Section } from "@/components/Section";
import { Phone } from "@/mock/Phone";
import { TAB_META, type TabKey } from "@/mock/ui";
import { CAPABILITIES, PRESETS, ROUTES_RULES, type CapKey } from "@/data/docs";
import { useScale } from "@/components/ScreenCard";
import { LibHome } from "@/mock/screens/lib";
import { GroupList } from "@/mock/screens/groups";
import { ActivityHub, InputPoin, Poinku } from "@/mock/screens/points";
import { Account } from "@/mock/screens/account";

export function tabsFor(c: Record<CapKey, boolean>, hasClass: boolean): TabKey[] {
  const t: TabKey[] = [];
  if (c.view_karsa_lib) t.push("lib");
  if (hasClass) t.push("grup");
  if (c.record_points) t.push("input", "aktivitas");
  else if (c.view_report || c.view_leaderboard) t.push("poinku");
  t.push("akun");
  return t;
}

export function Access() {
  const [caps, setCaps] = useState<Record<CapKey, boolean>>(PRESETS[0].caps);
  const [hasClass, setHasClass] = useState(true);
  const [preset, setPreset] = useState(0);
  const [active, setActive] = useState<TabKey>("lib");
  const scale = useScale();

  const tabs = useMemo(() => tabsFor(caps, hasClass), [caps, hasClass]);
  const current: TabKey = tabs.includes(active) ? active : tabs[0];
  const isPj = caps.record_points;

  const apply = (i: number) => {
    setPreset(i);
    setCaps(PRESETS[i].caps);
    setHasClass(PRESETS[i].hasClass);
    setActive(tabsFor(PRESETS[i].caps, PRESETS[i].hasClass)[0]);
  };
  const toggle = (k: CapKey) => {
    setPreset(-1);
    setCaps((c) => ({ ...c, [k]: !c[k] }));
  };

  const screen = (() => {
    switch (current) {
      case "lib":
        return caps.write_karsa_lib ? <LibHome variant="writer" /> : <LibHome variant="reader" />;
      case "grup":
        return <GroupList />;
      case "input":
        return <InputPoin stage={0} />;
      case "aktivitas":
        return <ActivityHub />;
      case "poinku":
        return <Poinku />;
      default:
        return <Account role={isPj ? "pj" : "mahasiswa"} />;
    }
  })();

  return (
    <Section
      id="akses"
      no="03"
      title="Peran, capability & Dock adaptif"
      lead={
        <>
          Aplikasi tidak punya “mode PJ” yang di-hardcode. Server mengirim lima flag <Code>capabilities</Code> pada <Code>GET /me</Code>; seluruh tab, rute, dan tombol
          diturunkan darinya. Ubah flag di bawah dan lihat Dock, daftar rute, serta isi layar berubah — sama seperti logika <Code>tabsFor()</Code> &amp;{" "}
          <Code>canOpen()</Code> di <Code>AppState.kt</Code>.
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-[12px] font-bold tracking-[0.14em] text-muted uppercase">Preset peran</div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => apply(i)}
                  className={cn("cursor-pointer rounded-full px-4 py-2 text-[13px] font-bold transition", preset === i ? "bg-espresso text-white" : "bg-white text-ink-2 ring-1 ring-line hover:bg-paper-2")}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-line bg-white p-2">
            {CAPABILITIES.map((c) => (
              <label key={c.k} className="flex cursor-pointer items-start gap-3 rounded-2xl p-3 hover:bg-paper">
                <button
                  type="button"
                  role="switch"
                  aria-checked={caps[c.k]}
                  onClick={() => toggle(c.k)}
                  className={cn("relative mt-0.5 h-6 w-11 shrink-0 cursor-pointer rounded-full transition", caps[c.k] ? "bg-brand-500" : "bg-paper-3")}
                >
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", caps[c.k] ? "left-[22px]" : "left-0.5")} />
                </button>
                <div onClick={() => toggle(c.k)}>
                  <div className="font-mono text-[13px] font-semibold">{c.k}</div>
                  <div className="text-[12.5px] leading-[1.5] text-muted">{c.t} — {c.d}</div>
                </div>
              </label>
            ))}
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl p-3 hover:bg-paper">
              <button
                type="button"
                role="switch"
                aria-checked={hasClass}
                onClick={() => {
                  setPreset(-1);
                  setHasClass(!hasClass);
                }}
                className={cn("relative mt-0.5 h-6 w-11 shrink-0 cursor-pointer rounded-full transition", hasClass ? "bg-brand-500" : "bg-paper-3")}
              >
                <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", hasClass ? "left-[22px]" : "left-0.5")} />
              </button>
              <div>
                <div className="font-mono text-[13px] font-semibold">kelas_id != null</div>
                <div className="text-[12.5px] leading-[1.5] text-muted">Akun terhubung ke kelas — membuka tab Grup & rute Chat</div>
              </div>
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[24px] bg-espresso p-5 text-white">
              <div className="text-[11px] font-bold tracking-[0.16em] text-brand-300">TAB AKTIF DI DOCK</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tabs.map((t) => {
                  const M = TAB_META[t];
                  return (
                    <span key={t} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold">
                      <M.icon size={14} /> {M.label}
                    </span>
                  );
                })}
              </div>
              <div className="mt-3 text-[12px] leading-[1.6] text-white/60">
                Peran turunan: <b className="text-white">{isPj ? "Role.Pj" : "Role.Mahasiswa"}</b> (<Code className="!bg-white/10 !text-brand-300">record_points</Code>). Tombol tengah melayang hanya muncul bila tab Input ada.
              </div>
            </div>
            <div className="rounded-[24px] border border-line bg-white p-5">
              <div className="mb-3 text-[11px] font-bold tracking-[0.16em] text-muted uppercase">Route yang boleh dibuka</div>
              <ul className="space-y-1.5">
                {ROUTES_RULES.map((r) => {
                  const ok = r.test(caps, hasClass);
                  return (
                    <li key={r.route} className="flex items-start gap-2 text-[12.5px] leading-[1.45]">
                      {ok ? <Check size={15} className="mt-0.5 shrink-0 text-leaf-500" /> : <X size={15} className="mt-0.5 shrink-0 text-danger-500" />}
                      <span className={cn(!ok && "text-muted line-through decoration-danger-500/40")}>
                        <b className="font-semibold">{r.route}</b> <span className="text-muted">· {r.rule}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto flex flex-col items-center gap-3">
          <div className="rounded-[48px] bg-gradient-to-b from-paper-2 to-paper-3/60 p-4">
            <Phone
              scale={scale}
              dock={{ tabs, active: current, onSelect: setActive }}
            >
              <div key={current} className="rise">
                {screen}
              </div>
            </Phone>
          </div>
          <div className="text-[12px] font-semibold text-muted">↑ Dock interaktif — ketuk tab</div>
        </div>
      </div>
    </Section>
  );
}
