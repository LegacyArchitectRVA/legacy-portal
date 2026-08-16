import {
  RiCheckboxCircleFill,
  RiCheckDoubleLine,
  RiCircleFill,
  RiSparklingFill,
  RiThumbUpFill,
} from "@remixicon/react";
import {
  ArrowRightCircle,
  Check,
  Heart,
  ShieldCheck,
  Star,
} from "reicon-react";

/**
 * A small, curated set of icons an admin can swap a "marker" icon
 * (like a feature-list checkmark) to, via the Visual Editor's icon
 * panel. Kept deliberately short, this is a stylistic choice between
 * a handful of good options, not a full icon library browser.
 */
export const SWAPPABLE_MARKER_ICONS: {
  name: string;
  label: string;
  icon: React.ComponentType<any>;
}[] = [
  { name: "check", label: "Check", icon: Check },
  { name: "check-circle", label: "Check Circle", icon: RiCheckboxCircleFill },
  { name: "check-double", label: "Double Check", icon: RiCheckDoubleLine },
  { name: "star", label: "Star", icon: Star },
  { name: "shield-check", label: "Shield", icon: ShieldCheck },
  { name: "heart", label: "Heart", icon: Heart },
  { name: "dot", label: "Dot", icon: RiCircleFill },
  { name: "thumb-up", label: "Thumbs Up", icon: RiThumbUpFill },
  { name: "sparkle", label: "Sparkle", icon: RiSparklingFill },
  { name: "arrow", label: "Arrow", icon: ArrowRightCircle },
];

export function getSwappableIcon(name: string) {
  return SWAPPABLE_MARKER_ICONS.find(i => i.name === name)?.icon;
}
