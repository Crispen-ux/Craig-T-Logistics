"use client";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { wa } from "@/lib/config";

export default function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/#quote"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-ink transition active:brightness-95"
        >
          Get a quote <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={wa()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/25 text-sm font-bold text-white transition active:bg-white/10"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
