import {
  RiArrowRightCircleFill,
  RiCheckboxCircleFill,
  RiCheckDoubleLine,
  RiCheckLine,
  RiCircleFill,
  RiHeartFill,
  RiShieldCheckFill,
  RiSparklingFill,
  RiStarFill,
  RiThumbUpFill,
} from "@remixicon/react";

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
  { name: "check", label: "Check", icon: RiCheckLine },
  { name: "check-circle", label: "Check Circle", icon: RiCheckboxCircleFill },
  { name: "check-double", label: "Double Check", icon: RiCheckDoubleLine },
  { name: "star", label: "Star", icon: RiStarFill },
  { name: "shield-check", label: "Shield", icon: RiShieldCheckFill },
  { name: "heart", label: "Heart", icon: RiHeartFill },
  { name: "dot", label: "Dot", icon: RiCircleFill },
  { name: "thumb-up", label: "Thumbs Up", icon: RiThumbUpFill },
  { name: "sparkle", label: "Sparkle", icon: RiSparklingFill },
  { name: "arrow", label: "Arrow", icon: RiArrowRightCircleFill },
];

export function getSwappableIcon(name: string) {
  return SWAPPABLE_MARKER_ICONS.find(i => i.name === name)?.icon;
}
