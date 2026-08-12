import {
  RiLockPasswordLine as LockKey,
  RiShieldCheckLine as ShieldCheckIcon,
  RiGhostLine as ZeroKnowledgeGlyph,
} from "@remixicon/react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

/**
 * Shared gold-medallion icon treatment used across the portal: a soft glow,
 * a dark gradient disc, a thin gold ring, and a centered icon. Color and
 * size are configurable so the same component works for the landing page
 * trust badges, chapter dots, admin stat cards, and guide cards.
 */
export function IconMedallion({
  icon: Icon,
  size = 16,
  boxSize = 36,
  color = "#e8c869",
  className = "",
}: {
  icon: LucideIcon | ComponentType<any>;
  size?: number;
  boxSize?: number;
  color?: string;
  className?: string;
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
        <Icon size={size} color={color} />
      </div>
    </div>
  );
}

/** Landing page trust badge: "Encrypted & Secure" */
export function EncryptedIcon({ size = 20 }: { size?: number }) {
  return <IconMedallion icon={LockKey} size={size} boxSize={size * 2.25} />;
}

/** Landing page trust badge: "Zero-Knowledge Protocol" */
export function ZeroKnowledgeIcon({ size = 20 }: { size?: number }) {
  return (
    <IconMedallion
      icon={ZeroKnowledgeGlyph}
      size={size}
      boxSize={size * 2.25}
    />
  );
}

/** Landing page trust badge: "Private & Confidential" */
export function PrivateIcon({ size = 20 }: { size?: number }) {
  return (
    <IconMedallion icon={ShieldCheckIcon} size={size} boxSize={size * 2.25} />
  );
}
