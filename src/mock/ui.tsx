import type { CSSProperties, ReactNode } from "react";
import {
  Activity,
  BookOpen,
  ChevronLeft,
  Inbox,
  MessagesSquare,
  PenLine,
  Search,
  Trophy,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

/* ───────────── Tokens ───────────── */

export type Tone = "brand" | "butter" | "leaf" | "tide" | "plum" | "clay";
const TONES: Tone[] = ["brand", "butter", "leaf", "tide", "plum", "clay"];

export function toneFor(seed: string): Tone {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

const toneBg: Record<Tone, string> = {
  brand: "bg-brand-100 text-brand-700",
  butter: "bg-butter-100 text-butter-700",
  leaf: "bg-leaf-100 text-leaf-600",
  tide: "bg-tide-100 text-tide-600",
  plum: "bg-plum-100 text-plum-600",
  clay: "bg-paper-3 text-ink-2",
};

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");
}

/* ───────────── Logo & marks ───────────── */

export function LogoMark({
  size = 56,
  tile = "#E36B0F",
  ink = "#fff",
  radius = 15,
}: {
  size?: number;
  tile?: string;
  ink?: string;
  radius?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx={radius} fill={tile} />
      <g stroke={ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="24" cy="14.5" rx="5.2" ry="8.8" />
        <ellipse cx="24" cy="33.5" rx="5.2" ry="8.8" />
        <ellipse cx="14.5" cy="24" rx="8.8" ry="5.2" />
        <ellipse cx="33.5" cy="24" rx="8.8" ry="5.2" />
      </g>
      <circle cx="24" cy="24" r="3.2" fill={ink} />
    </svg>
  );
}

export function GoogleMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

/** Batik truntum — bunga kecil bertepi titik yang berulang. */
export function Batik({
  color = "#fff",
  opacity = 0.2,
  className,
}: {
  color?: string;
  opacity?: number;
  className?: string;
}) {
  const id = `bt-${color.replace("#", "")}-${Math.round(opacity * 100)}`;
  return (
    <svg className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} style={{ opacity }}>
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
            <path d="M22 12v20M12 22h20M15 15l14 14M29 15 15 29" />
            <circle cx="22" cy="22" r="3.5" />
          </g>
          <g fill={color}>
            <circle cx="0" cy="0" r="1.6" />
            <circle cx="44" cy="0" r="1.6" />
            <circle cx="0" cy="44" r="1.6" />
            <circle cx="44" cy="44" r="1.6" />
            <circle cx="22" cy="6" r="1" />
            <circle cx="22" cy="38" r="1" />
            <circle cx="6" cy="22" r="1" />
            <circle cx="38" cy="22" r="1" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ───────────── Atoms ───────────── */

export function Avatar({
  name,
  size = 40,
  tone,
  square,
  className,
}: {
  name: string;
  size?: number;
  tone?: Tone;
  square?: boolean;
  className?: string;
}) {
  const t = tone ?? toneFor(name);
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-display font-bold",
        toneBg[t],
        square ? "rounded-[14px]" : "rounded-full",
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.max(11, size * 0.36) }}
    >
      {initials(name)}
    </div>
  );
}

export type BadgeTone = "brand" | "solid" | "dark" | "leaf" | "butter" | "danger" | "neutral" | "plum" | "tide";
const badgeCls: Record<BadgeTone, string> = {
  brand: "bg-brand-100 text-brand-700",
  solid: "bg-brand-500 text-white",
  dark: "bg-espresso text-white",
  leaf: "bg-leaf-100 text-leaf-600",
  butter: "bg-butter-100 text-butter-700",
  danger: "bg-danger-100 text-danger-500",
  neutral: "bg-paper-2 text-ink-2",
  plum: "bg-plum-100 text-plum-600",
  tide: "bg-tide-100 text-tide-600",
};

export function Badge({
  children,
  tone = "brand",
  icon: Icon,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] leading-[1.2] font-bold tracking-[0.025em]",
        badgeCls[tone],
        className,
      )}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}

export function PointBadge({ points, large }: { points: number; large?: boolean }) {
  const cls =
    points >= 4
      ? "bg-brand-500 text-white"
      : points === 3
        ? "bg-brand-100 text-brand-700"
        : points === 2
          ? "bg-butter-100 text-butter-700"
          : "bg-paper-2 text-ink-2";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-display font-extrabold",
        cls,
        large ? "h-14 w-14 rounded-[18px] text-2xl" : "h-11 w-11 rounded-[14px] text-lg",
      )}
    >
      +{points}
    </div>
  );
}

type BtnVariant = "primary" | "dark" | "soft" | "outline" | "ghost" | "danger" | "dangerSoft" | "disabled";
const btnCls: Record<BtnVariant, string> = {
  primary: "bg-brand-500 text-white shadow-[0_8px_20px_-6px_rgba(227,107,15,0.6)]",
  dark: "bg-espresso text-white",
  soft: "bg-brand-100 text-brand-700",
  outline: "border border-line bg-white text-ink",
  ghost: "text-ink-2",
  danger: "bg-danger-500 text-white",
  dangerSoft: "bg-danger-100 text-danger-500",
  disabled: "bg-paper-3 text-muted",
};

export function Btn({
  children,
  variant = "primary",
  size = "md",
  full,
  icon: Icon,
  iconRight,
  className,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  size?: "sm" | "md" | "lg";
  full?: boolean;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  className?: string;
}) {
  const IR = iconRight;
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-2 font-bold",
        btnCls[variant],
        size === "sm" && "h-9 rounded-xl px-3.5 text-[13px]",
        size === "md" && "h-12 rounded-2xl px-5 text-[14px]",
        size === "lg" && "h-14 rounded-[20px] px-6 text-[15px]",
        full && "w-full",
        className,
      )}
    >
      {Icon && <Icon size={size === "lg" ? 18 : 16} />}
      {children}
      {IR && <IR size={size === "lg" ? 20 : 16} />}
    </div>
  );
}

export function Chip({ children, selected, icon: Icon }: { children: ReactNode; selected?: boolean; icon?: LucideIcon }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold whitespace-nowrap",
        selected ? "bg-espresso text-white" : "border border-line bg-white text-ink-2",
      )}
    >
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}

export function Segmented({
  options,
  value,
}: {
  options: { label: string; icon?: LucideIcon }[];
  value: number;
}) {
  return (
    <div className="flex rounded-2xl bg-paper-2 p-1">
      {options.map((o, i) => {
        const Icon = o.icon;
        return (
          <div
            key={o.label}
            className={cn(
              "flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl text-[13px] font-bold",
              i === value ? "bg-white text-ink shadow-sm" : "text-muted",
            )}
          >
            {Icon && <Icon size={15} />}
            {o.label}
          </div>
        );
      })}
    </div>
  );
}

export function Card({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn("card-shadow overflow-hidden rounded-[28px] border border-ink/5 bg-white", className)}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-[11px] leading-[1.4] font-bold tracking-[0.16em] text-brand-700 uppercase", className)}>
      {children}
    </div>
  );
}

export function SearchBox({ placeholder, value }: { placeholder: string; value?: string }) {
  return (
    <div className="flex h-12 items-center gap-2.5 rounded-2xl border border-line bg-white px-4">
      <Search size={17} className="text-muted" />
      <span className={cn("text-[14px]", value ? "text-ink" : "text-muted")}>{value ?? placeholder}</span>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="text-[13px] font-semibold text-ink-2">{label}</div>
      {children}
      {hint && <div className="text-[11px] leading-[1.5] text-muted">{hint}</div>}
    </div>
  );
}

export function Input({
  value,
  placeholder,
  tall,
  right,
  className,
}: {
  value?: string;
  placeholder?: string;
  tall?: boolean;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex rounded-2xl border border-line bg-white px-4 py-3 text-[14px]",
        tall ? "min-h-[84px] items-start" : "h-12 items-center",
        className,
      )}
    >
      <span className={cn("flex-1 leading-[1.4]", value ? "text-ink" : "text-muted")}>{value || placeholder}</span>
      {right}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("relative overflow-hidden rounded-xl bg-paper-3", className)}><div className="shimmer absolute inset-0" /></div>;
}

export function Empty({
  title,
  desc,
  icon: Icon = Inbox,
  action,
  className,
}: {
  title: string;
  desc: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center px-8 py-10 text-center", className)}>
      <div className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-brand-50">
        <Icon size={32} className="text-brand-600" />
      </div>
      <div className="font-display text-[18px] leading-[1.25] font-bold">{title}</div>
      <div className="mt-1.5 text-[13px] leading-[1.55] text-muted">{desc}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ───────────── Headers ───────────── */

export function PageHeader({
  title,
  eyebrow,
  subtitle,
  right,
}: {
  title: string;
  eyebrow?: ReactNode;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-3 pb-4">
      <div className="min-w-0">
        {eyebrow && <div className="mb-1">{eyebrow}</div>}
        <div className="font-display text-[32px] leading-[1.05] font-extrabold tracking-[-0.02em]">{title}</div>
        {subtitle && <div className="mt-1.5 text-[14px] leading-[1.4] text-muted">{subtitle}</div>}
      </div>
      {right && <div className="mt-1 shrink-0">{right}</div>}
    </div>
  );
}

export function TopBar({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 pt-2 pb-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white">
        <ChevronLeft size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-[18px] leading-[1.2] font-bold">{title}</div>
        {subtitle && <div className="truncate text-[12px] text-muted">{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

export function IconBtn({ icon: Icon, dark }: { icon: LucideIcon; dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
        dark ? "bg-espresso text-white" : "border border-line bg-white text-ink",
      )}
    >
      <Icon size={18} />
    </div>
  );
}

/* ───────────── Overlays ───────────── */

export function Sheet({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end bg-espresso/45 backdrop-blur-[3px]">
      <div className="sheet-up max-h-[88%] w-full overflow-y-auto rounded-t-[32px] bg-paper px-5 pt-3 pb-8 no-scrollbar">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-paper-3" />
        {title && <div className="mb-4 font-display text-[20px] font-bold">{title}</div>}
        {children}
      </div>
    </div>
  );
}

export function Dialog({
  title,
  desc,
  confirm = "Lanjutkan",
  cancel = "Batal",
  danger,
  children,
}: {
  title: string;
  desc?: string;
  confirm?: string;
  cancel?: string;
  danger?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-espresso/45 px-6 backdrop-blur-[3px]">
      <div className="sheet-up w-full rounded-[28px] bg-paper p-5">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
          <div className={cn("h-3 w-3 rounded-full", danger ? "bg-danger-500" : "bg-brand-500")} />
        </div>
        <div className="font-display text-[20px] leading-[1.2] font-bold">{title}</div>
        {desc && <div className="mt-2 text-[13px] leading-[1.55] text-ink-2">{desc}</div>}
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-5 flex gap-2">
          <Btn variant="soft" className="flex-1">{cancel}</Btn>
          <Btn variant={danger ? "danger" : "primary"} className="flex-1">{confirm}</Btn>
        </div>
      </div>
    </div>
  );
}

export function Toast({
  msg,
  tone = "success",
  action,
}: {
  msg: string;
  tone?: "success" | "neutral" | "error";
  action?: string;
}) {
  return (
    <div className="sheet-up absolute inset-x-4 top-12 z-40 flex items-center gap-3 rounded-2xl bg-espresso px-4 py-3 text-white pop-shadow">
      <span
        className={cn(
          "h-2 w-2 shrink-0 rounded-full",
          tone === "success" ? "bg-leaf-500" : tone === "error" ? "bg-danger-500" : "bg-brand-300",
        )}
      />
      <span className="flex-1 text-[13px] font-semibold">{msg}</span>
      {action && <span className="text-[13px] font-bold text-brand-300">{action}</span>}
    </div>
  );
}

/* ───────────── Dock ───────────── */

export type TabKey = "lib" | "grup" | "input" | "aktivitas" | "poinku" | "akun";

export const TAB_META: Record<TabKey, { label: string; icon: LucideIcon }> = {
  lib: { label: "Karsa Lib", icon: BookOpen },
  grup: { label: "Grup", icon: MessagesSquare },
  input: { label: "Input poin", icon: PenLine },
  aktivitas: { label: "Aktivitas", icon: Activity },
  poinku: { label: "Poinku", icon: Trophy },
  akun: { label: "Akun", icon: UserRound },
};

export function Dock({
  tabs,
  active,
  onSelect,
}: {
  tabs: TabKey[];
  active: TabKey;
  onSelect?: (t: TabKey) => void;
}) {
  const hasInput = tabs.includes("input");
  const side = tabs.filter((t) => t !== "input");
  const spacerAfter = !hasInput ? -1 : side.length >= 4 ? 1 : 0;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      <div className="h-24 bg-gradient-to-b from-paper/0 via-paper/70 to-paper" />
      <div className="pointer-events-auto absolute inset-x-3 bottom-4 h-[106px]">
        <div className="pop-shadow absolute inset-x-0 bottom-0 flex h-[74px] items-end rounded-full bg-espresso px-3.5 pb-2.5">
          {side.map((t, i) => {
            const M = TAB_META[t];
            const on = active === t;
            return (
              <div key={t} className="flex flex-1 items-end">
                <button
                  type="button"
                  onClick={() => onSelect?.(t)}
                  className={cn(
                    "flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-full py-1.5 transition-colors",
                    on ? "text-brand-300" : "text-white/55",
                  )}
                >
                  <div className={cn("flex h-8 w-12 items-center justify-center rounded-full", on && "bg-white/10")}>
                    <M.icon size={20} strokeWidth={on ? 2.4 : 2} />
                  </div>
                  <span className="text-[9.5px] leading-none font-bold">{M.label}</span>
                </button>
                {i === spacerAfter && <div className="w-[76px] shrink-0" />}
              </div>
            );
          })}
        </div>
        {hasInput && (
          <button
            type="button"
            onClick={() => onSelect?.("input")}
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center"
          >
            <div
              className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-brand-500 text-white"
              style={{ boxShadow: "0 0 0 6px #2a1a10, 0 8px 28px 2px rgba(227,107,15,0.65)" }}
            >
              <PenLine size={28} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
