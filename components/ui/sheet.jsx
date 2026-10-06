"use client";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn("fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex w-full flex-col gap-4 bg-card shadow-lift transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-400 data-[state=open]:animate-in data-[state=closed]:animate-out",
        side === "right" && "inset-y-0 right-0 h-full w-[85%] max-w-sm border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        side === "left" && "inset-y-0 left-0 h-full w-[85%] max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        side === "bottom" && "inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        side === "top" && "inset-x-0 top-0 rounded-b-3xl border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        className
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-5 top-5 rounded-full p-2 opacity-70 transition-opacity hover:bg-muted hover:opacity-100 focus:outline-none">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }) => <div className={cn("flex flex-col space-y-1.5", className)} {...props} />;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("font-display text-xl font-extrabold", className)} {...props} />
));
SheetTitle.displayName = "SheetTitle";
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = "SheetDescription";

export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription };
