import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { cn } from "@/utils/cn";
import { Dock, type TabKey } from "./ui";

export const PHONE_W = 360;
export const PHONE_H = 740;

type Props = {
  children: ReactNode;
  overlay?: ReactNode;
  scale?: number;
  /** Tampilkan Dock mengambang (hanya untuk layar tab). */
  dock?: { tabs: TabKey[]; active: TabKey; onSelect?: (t: TabKey) => void };
  /** Konten penuh tanpa scroll & padding (Splash, Login, Onboarding). */
  bare?: boolean;
  lightStatus?: boolean;
  bg?: string;
  className?: string;
};

export function Phone({ children, overlay, scale = 0.78, dock, bare, lightStatus, bg = "bg-paper", className }: Props) {
  const pad = 7;
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: (PHONE_W + pad * 2) * scale, height: (PHONE_H + pad * 2) * scale }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: PHONE_W + pad * 2, height: PHONE_H + pad * 2, transform: `scale(${scale})` }}
      >
        <div
          className="h-full w-full rounded-[46px] bg-espresso p-[7px]"
          style={{ boxShadow: "0 30px 60px -20px rgba(42,26,16,.55), 0 0 0 1.5px rgba(255,255,255,.08) inset" }}
        >
          <div className={cn("relative h-full w-full overflow-hidden rounded-[40px] font-sans", bg)}>
            {/* status bar */}
            <div
              className={cn(
                "absolute inset-x-0 top-0 z-50 flex h-[34px] items-center justify-between px-6 pt-1 text-[12px] font-bold",
                lightStatus ? "text-white" : "text-ink",
              )}
            >
              <span>9:41</span>
              <div className="absolute top-2 left-1/2 h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-espresso" />
              <span className="flex items-center gap-1">
                <Signal size={12} />
                <Wifi size={12} />
                <BatteryFull size={14} />
              </span>
            </div>

            {bare ? (
              <div className="relative h-full w-full">{children}</div>
            ) : (
              <div className={cn("no-scrollbar h-full overflow-y-auto pt-[44px]", dock ? "pb-[140px]" : "pb-8")}>
                {children}
              </div>
            )}

            {dock && <Dock tabs={dock.tabs} active={dock.active} onSelect={dock.onSelect} />}
            {overlay}
            {/* gesture bar */}
            <div
              className={cn(
                "absolute bottom-1.5 left-1/2 z-50 h-1 w-[110px] -translate-x-1/2 rounded-full",
                lightStatus ? "bg-white/60" : "bg-ink/70",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
