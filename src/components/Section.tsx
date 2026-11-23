import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Section({
  id,
  no,
  title,
  lead,
  children,
  tone = "paper",
}: {
  id: string;
  no: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  tone?: "paper" | "white" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-5 py-16 sm:px-8 lg:px-12 lg:py-24",
        tone === "white" && "bg-white",
        tone === "dark" && "bg-espresso text-white",
      )}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 max-w-3xl">
          <div className={cn("mb-3 flex items-center gap-3 text-[12px] font-bold tracking-[0.18em] uppercase", tone === "dark" ? "text-brand-300" : "text-brand-700")}>
            <span className="font-display text-[15px]">{no}</span>
            <span className={cn("h-px w-10", tone === "dark" ? "bg-brand-400/60" : "bg-brand-300")} />
            <span>{id.replace(/-/g, " ")}</span>
          </div>
          <h2 className="font-display text-[38px] leading-[1.05] font-extrabold tracking-[-0.025em] sm:text-[48px]">{title}</h2>
          {lead && <p className={cn("mt-4 text-[16px] leading-[1.75] sm:text-[17px]", tone === "dark" ? "text-white/70" : "text-ink-2")}>{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return <code className={cn("rounded-md bg-paper-2 px-1.5 py-0.5 font-mono text-[0.88em] text-brand-700", className)}>{children}</code>;
}
