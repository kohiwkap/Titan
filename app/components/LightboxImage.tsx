"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export function LightboxImage({
  src, alt, sizes, fit = "cover",
}: {
  src: string;
  alt: string;
  sizes: string;
  fit?: "cover" | "contain";
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const returnFocus = trigger.current;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      returnFocus?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`ดูภาพขยาย: ${alt}`}
        aria-haspopup="dialog"
        className="group relative block h-full w-full"
      >
        <Image src={src} alt={alt} fill sizes={sizes}
          className={`${fit === "contain" ? "object-contain" : "object-cover"} transition-opacity group-hover:opacity-80`} />
      </button>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#090909]/95 px-4 pb-6 pt-20 backdrop-blur-sm sm:px-10"
          onClick={() => setOpen(false)}
        >
          <button
            ref={closeButton}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="ปิดภาพขยาย"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#c7b994]/60 bg-[#090909] text-[#c7b994] hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <div className="relative h-full w-full max-w-6xl" onClick={event => event.stopPropagation()}>
            <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
