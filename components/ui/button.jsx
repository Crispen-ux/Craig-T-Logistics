import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_12px_30px_-14px_rgba(255,184,28,0.9)] hover:brightness-[1.06]",
        ink: "bg-ink text-white hover:bg-port dark:bg-white dark:text-ink dark:hover:bg-mist",
        outline: "border-2 border-border bg-transparent hover:border-ink hover:bg-card dark:hover:border-white/40",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline decoration-amber decoration-2 underline-offset-4 hover:opacity-80",
        destructive: "bg-destructive text-destructive-foreground hover:brightness-110",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs uppercase tracking-wider",
        lg: "h-12 px-8 text-[15px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
