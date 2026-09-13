import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden rounded-[2px] border border-[rgba(216,199,154,0.6)] bg-[linear-gradient(180deg,#d4c294_0%,#d4b661_55%,#b3a074_100%)] text-[#1a1509] shadow-[0_1px_0_rgba(255,248,230,0.4)_inset,0_8px_22px_rgba(0,0,0,0.32),0_2px_6px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(255,248,230,0.5)_inset,0_14px_32px_rgba(0,0,0,0.4),0_4px_10px_rgba(0,0,0,0.28)]",
        destructive:
          "rounded-[2px] bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "rounded-[2px] border border-gold-border bg-transparent text-foreground hover:border-gold-primary/50 hover:bg-gold-primary/5",
        secondary:
          "rounded-[2px] border border-gold-border bg-secondary text-secondary-foreground hover:border-gold-primary/40",
        ghost:
          "rounded-[2px] text-muted-foreground hover:bg-gold-primary/5 hover:text-gold-primary",
        link: "normal-case tracking-normal text-sm font-normal text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-7 py-2",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-12 px-9 text-xs",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
