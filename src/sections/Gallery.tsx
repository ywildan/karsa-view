import { Code, Section } from "@/components/Section";
import { ScreenCard } from "@/components/ScreenCard";
import { MODULES, SCREENS } from "@/mock/registry";
import { cn } from "@/utils/cn";

export function Gallery() {
  const total = SCREENS.reduce((a, s) => a + s.variants.length, 0);
  let counter = 0;
  return (
    <Section
      id="layar"
      no="04"
      title="Katalog seluruh layar"
      lead={
        <>
          {SCREENS.length} layar dan overlay dengan total <b>{total} state</b> yang dapat dipilih. Tiap preview digambar ulang dari Composable aslinya (warna, jarak, tipografi,
          teks) dan bisa digulir. Gunakan chip state di bawah ponsel untuk berpindah antara kondisi normal, kosong, error, dialog, dan sheet.
        </>
      }
    >
      {/* Daftar isi modul */}
      <div className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => {
          const list = SCREENS.filter((s) => s.module === m.id);
          return (
            <a key={m.id} href={`#mod-${m.id}`} className="group rounded-[24px] border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <span className={cn("h-3 w-3 rounded-full", m.color)} />
                <span className="font-display text-[19px] font-bold">{m.title}</span>
              </div>
              <div className="mt-1 text-[12px] text-muted">{m.subtitle}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {list.map((s) => (
                  <span key={s.id} className="rounded-full bg-paper-2 px-2 py-0.5 text-[11px] font-semibold text-ink-2">{s.title}</span>
                ))}
              </div>
            </a>
          );
        })}
      </div>

      <div className="space-y-20">
        {MODULES.map((m) => {
          const list = SCREENS.filter((s) => s.module === m.id);
          return (
            <div key={m.id} id={`mod-${m.id}`}>
              <div className="mb-6 flex items-start gap-4">
                <div className={cn("mt-1 h-12 w-2 shrink-0 rounded-full", m.color)} />
                <div>
                  <h3 className="font-display text-[34px] leading-[1.1] font-extrabold tracking-[-0.02em]">{m.title}</h3>
                  <p className="mt-1.5 max-w-3xl text-[15px] leading-[1.7] text-ink-2">{m.blurb}</p>
                  <div className="mt-2 text-[12px] font-semibold text-muted">
                    {list.length} layar · {list.reduce((a, s) => a + s.variants.length, 0)} state · <Code>{list.map((s) => s.file.split(" ")[0].replace("screens/", "")).filter((v, i, a) => a.indexOf(v) === i).join(" · ")}</Code>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {list.map((s) => (
                  <ScreenCard key={s.id} entry={s} index={++counter} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
