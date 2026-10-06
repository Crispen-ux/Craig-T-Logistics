"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function Reveal({ children, delay = 0, className, as: Tag = "div", ...props }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
