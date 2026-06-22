import { RiPulseLine as Pulse, RiBuildingLine as Building, RiCalendarLine as Calendar, RiCarLine as Car, RiClipboardLine as ClipboardText, RiTimeLine as Clock, RiCloudLine as Cloud, RiBankCardLine as CreditCard, RiVipCrownLine as Crown, RiQuillPenLine as Signature, RiFileTextLine as FileText, RiFingerprintLine as Fingerprint, RiGlobalLine as Globe, RiHandHeartLine as Handshake, RiHeartLine as Heart, RiHospitalLine as Hospital, RiKeyLine as Key, RiBankLine as Bank, RiComputerLine as Laptop, RiLockLine as Lock, RiMailLine as EnvelopeSimple, RiMegaphoneLine as Megaphone, RiChat3Line as ChatCircle, RiNodeTree as Network, RiArchiveLine as Package, RiFootprintLine as PawPrint, RiPhoneLine as Phone, RiReceiptLine as Receipt, RiRefreshLine as ArrowsClockwise, RiScalesLine as Scales, RiHardDrive2Line as HardDrive, RiShieldLine as Shield, RiShieldFlashLine as ShieldWarning, RiShieldCheckLine as ShieldCheck, RiSparklingLine as Sparkle, RiStethoscopeLine as Stethoscope, RiUserFollowLine as UserCheck, RiTeamLine as Users, RiToolsLine as Wrench, RiQuestionLine as Question } from "@remixicon/react";

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
}

export function LucideIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = ICON_REGISTRY[name] || Question;
  return <IconComponent {...props} />;
}
