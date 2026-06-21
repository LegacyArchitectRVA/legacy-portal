import {
  Pulse,
  Building,
  Calendar,
  Car,
  ClipboardText,
  Clock,
  Cloud,
  CreditCard,
  Crown,
  Signature,
  FileText,
  Fingerprint,
  Globe,
  Handshake,
  Heart,
  Hospital,
  Key,
  Bank,
  Laptop,
  Lock,
  EnvelopeSimple,
  Megaphone,
  ChatCircle,
  Network,
  Package,
  PawPrint,
  Phone,
  Receipt,
  ArrowsClockwise,
  Scales,
  HardDrive,
  Shield,
  ShieldWarning,
  ShieldCheck,
  Sparkle,
  Stethoscope,
  UserCheck,
  Users,
  Wrench,
  Question,
} from "@phosphor-icons/react";

/**
 * The chapters.ts data file specifies each section's icon by name (a
 * holdover from when these were Lucide icon names). Rather than touch
 * that carefully-curated, "order may not be altered" data file, this
 * translates the old names to their Phosphor equivalents at render time.
 *
 * Explicit imports (not `import *`) so the bundle only includes the
 * ~38 icons actually used here, not the entire Phosphor library.
 */
const ICON_REGISTRY: Record<string, any> = {
  Activity: Pulse,
  Building,
  Calendar,
  Car,
  ClipboardList: ClipboardText,
  Clock,
  Cloud,
  CreditCard,
  Crown,
  FileSignature: Signature,
  FileText,
  Fingerprint,
  Globe,
  Handshake,
  Heart,
  Hospital,
  KeyRound: Key,
  Landmark: Bank,
  Laptop,
  Lock,
  Mail: EnvelopeSimple,
  Megaphone,
  MessageSquare: ChatCircle,
  Network,
  Package,
  PawPrint,
  Phone,
  Receipt,
  RefreshCw: ArrowsClockwise,
  Scale: Scales,
  Server: HardDrive,
  Shield,
  ShieldAlert: ShieldWarning,
  ShieldCheck,
  Sparkles: Sparkle,
  Stethoscope,
  UserCheck,
  Users,
  Wrench,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export function LucideIcon({ name, weight = "duotone", ...props }: DynamicIconProps) {
  const IconComponent = ICON_REGISTRY[name] || Question;
  return <IconComponent {...props} weight={weight} />;
}
