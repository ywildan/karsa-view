import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { PHONE_H, PHONE_W } from "@/mock/Phone";
import type { ScreenEntry } from "@/mock/registry";

export function useScale() {
  const [s, setS] = useState(() => (typeof window !== "undefined" && window.innerWidth < 420 ? 0.7 : 0.8));
  useEffect(() => {
    const on = () => setS(window.innerWidth < 420 ? 0.7 : 0.8);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return s;
}

function LazyMount({ children, scale }: { children: ReactNode; scale: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const w = (PHONE_W + 14) * scale;
  const h = (PHONE_H + 14) * scale;
  return (
    <div ref={ref} style={{ width: w, height: h }}>
      {seen ? (
        children
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-[40px] bg-paper-2 text-[12px] text-muted">Memuat preview…</div>
      )}
    </div>
  );
}

const KIND_STYLE: Record<ScreenEntry["kind"], string> = {
  Phase: "bg-brand-100 text-brand-700",
  Tab: "bg-espresso text-white",
  Route: "bg-tide-100 text-tide-600",
  Overlay: "bg-plum-100 text-plum-600",
};

export function ScreenCard({ entry, index }: { entry: ScreenEntry; index: number }) {
  const [v, setV] = useState(0);
  const scale = useScale();
  const variant = entry.variants[Math.min(v, entry.variants.length - 1)];
  return (
    <article
      id={entry.id}
      className="grid gap-8 rounded-[32px] border border-line bg-white p-5 sm:p-7 lg:grid-cols-[auto_minmax(0,1fr)]"
    >
      <div className="mx-auto flex flex-col items-center gap-4 lg:mx-0">
        <div className="rounded-[48px] bg-gradient-to-b from-paper-2 to-paper-3/60 p-4">
          <LazyMount scale={scale}>
            <div key={`${entry.id}-${v}`}>{variant.node}</div>
          </LazyMount>
        </div>
        {entry.variants.length > 1 && (
          <div className="max-w-[330px]">
            <div className="mb-2 text-center text-[11px] font-bold tracking-[0.14em] text-muted uppercase">
              State · {entry.variants.length} varian
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {entry.variants.map((x, i) => (
                <button
                  key={x.label}
                  type="button"
                  onClick={() => setV(i)}
                  className={cn(
                    "cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-semibold transition",
                    i === v ? "bg-espresso text-white" : "bg-paper-2 text-ink-2 hover:bg-paper-3",
                  )}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[12px] text-muted">#{String(index).padStart(2, "0")}</span>
          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide", KIND_STYLE[entry.kind])}>{entry.kind}</span>
          <span className="rounded-full bg-leaf-100 px-2.5 py-1 text-[11px] font-bold text-leaf-600">🔑 {entry.access}</span>
        </div>
        <h3 className="mt-3 font-display text-[30px] leading-[1.1] font-extrabold tracking-[-0.02em]">{entry.title}</h3>
        <div className="mt-2 space-y-0.5 font-mono text-[12px] leading-[1.6] text-ink-2">
          <div className="break-words"><span className="text-brand-600">fun</span> {entry.code}</div>
          <div className="break-words text-muted">📄 {entry.file}</div>
        </div>
        <p className="mt-4 text-[15px] leading-[1.75] text-ink-2">{entry.summary}</p>

        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <div>
            <h4 className="mb-2 text-[12px] font-bold tracking-[0.14em] text-brand-700 uppercase">Elemen UI</h4>
            <ul className="space-y-2">
              {entry.elements.map((t) => (
                <li key={t} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-ink-2">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-[12px] font-bold tracking-[0.14em] text-leaf-600 uppercase">Perilaku &amp; aturan</h4>
            <ul className="space-y-2">
              {entry.rules.map((t) => (
                <li key={t} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-ink-2">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {entry.api && (
          <div className="mt-5 border-t border-line pt-4">
            <h4 className="mb-2 text-[12px] font-bold tracking-[0.14em] text-tide-600 uppercase">Endpoint</h4>
            <div className="flex flex-wrap gap-1.5">
              {entry.api.map((a) => {
                const i = a.indexOf(" ");
                const method = a.slice(0, i);
                const rest = a.slice(i + 1);
                return (
                  <code key={a} className="inline-flex items-center gap-1.5 rounded-lg bg-paper-2 py-1 pr-2 pl-1 font-mono text-[11.5px] text-ink-2">
                    <span className="rounded-md bg-tide-600 px-1.5 py-0.5 text-[10px] font-bold text-white">{method}</span>
                    {rest}
                  </code>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
