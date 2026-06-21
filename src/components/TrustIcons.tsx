import { LockKey, EyeSlash, ShieldCheck as ShieldCheckPhosphor } from "@phosphor-icons/react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

/**
 * Shared gold-medallion icon treatment used across the portal: a soft glow,
 * a dark gradient disc, a thin gold ring, and a centered icon. Color and
 * size are configurable so the same component works for the landing page
 * trust badges, chapter dots, admin stat cards, and guide cards.
 *
 * Accepts either a Lucide icon (strokeWidth-based) or a Phosphor icon
 * (weight-based) — pass `weight` for Phosphor, omit it for Lucide.
 */
export function IconMedallion({
  icon: Icon,
  size = 16,
  boxSize = 36,
  color = "#e8c46a",
  className = "",
  weight,
}: {
  icon: LucideIcon | ComponentType<any>;
  size?: number;
  boxSize?: number;
  color?: string;
  className?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: boxSize, height: boxSize }}
    >
      <div
        className="absolute inset-0 rounded-full blur-[5px]"
        style={{ backgroundColor: `${color}1f` }}
      />
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#1a1610] to-[#0a0806]"
        style={{ border: `1px solid ${color}59` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {weight ? (
          <Icon size={size} color={color} weight={weight} />
        ) : (
          <Icon style={{ width: size, height: size, color }} strokeWidth={1.75} />
        )}
      </div>
    </div>
  );
}

/** Landing page trust badge: "Encrypted & Secure" */
export function EncryptedIcon({ size = 20 }: { size?: number }) {
  return <IconMedallion icon={LockKey} size={size} boxSize={size * 2.25} weight="duotone" />;
}

/** Landing page trust badge: "Zero-Knowledge Protocol" */
export function ZeroKnowledgeIcon({ size = 20 }: { size?: number }) {
  return <IconMedallion icon={EyeSlash} size={size} boxSize={size * 2.25} weight="duotone" />;
}

/** Landing page trust badge: "Private & Confidential" */
export function PrivateIcon({ size = 20 }: { size?: number }) {
  return <IconMedallion icon={ShieldCheckPhosphor} size={size} boxSize={size * 2.25} weight="duotone" />;
}
