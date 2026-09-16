"use client";

import { useEffect, useState } from "react";
import { siTiktok, siDiscord } from "simple-icons";
import { LightboxImage } from "./components/LightboxImage";
import { ContactFab } from "./components/ContactFab";

type Lang = "en" | "th";

const ui = {
  en: {
    navAbout: "About",
    navPrograms: "Programs",
    navContact: "Contact",
    eyebrow: "[SYSTEM] loading profile: titan.dat",
    heroTagline: "Welcome!",
    ctaPrograms: "Programs",
    ctaContact: "Contact Me",
    aboutHeading: "// About",
    aboutHook: "Websites starting at a few hundred baht — cheaper than boba for the whole squad. 🧋",
    aboutBody: "I build personal sites, squad sites, whatever website you've got in mind.",
    aboutPricing: "Price is negotiable. Domain cost not included.",
    aboutCta: "Got an idea so wild it sounds impossible? Throw it at me — I'm down to try (and down to go read the docs). 😅",
    programsHeading: "// Free Programs",
    contactHeading: "// Contact",
    download: "Download",
    noImage: "no image",
    emailLabel: "Email",
    footer: (year: number) => `© ${year} Titan. All rights reserved.`,
  },
  th: {
    navAbout: "เกี่ยวกับ",
    navPrograms: "โปรแกรม",
    navContact: "ติดต่อ",
    eyebrow: "[SYSTEM] loading profile: titan.dat",
    heroTagline: "ยินดีต้อนรับ!",
    ctaPrograms: "โปรแกรม",
    ctaContact: "ติดต่อฉัน",
    aboutHeading: "// เกี่ยวกับ",
    aboutHook: "เว็บไซต์ราคาหลักร้อย ถูกกว่าค่าชานมไข่มุกทั้งแก๊ง 🧋",
    aboutBody: "รับทำเว็บส่วนตัว เว็บแก๊ง เว็บอะไรก็ว่ามา",
    aboutPricing: "ราคาคุยกัน ไม่รวมค่าโดเมนนะครับ",
    aboutCta: "ไอเดียหลุดโลกแค่ไหนก็เสนอมา ผมพร้อมลอง (และพร้อมไปนั่งอ่านวิธีทำ) 😅",
    programsHeading: "// โปรแกรมแจกฟรี",
    contactHeading: "// ติดต่อ",
    download: "ดาวน์โหลด",
    noImage: "ไม่มีภาพ",
    emailLabel: "อีเมล",
    footer: (year: number) => `© ${year} Titan สงวนลิขสิทธิ์`,
  },
} as const;

const programs = [
  {
    downloadUrl: "/ClearFiveMCache.rar",
    image: "/fivem-cache-cleaner-1200x675-dark.png" as string | undefined,
    name: { en: "FiveM Cache Cleaner", th: "เคลียร์แคช Fivem" },
    description: {
      en: "Clear your FiveM cache in a single click!",
      th: "เคลียร์แคช Fivem ได้เลยในคลิกเดียว!",
    },
    bullets: {
      en: [
        "🔴 Automatically closes any stuck FiveM process",
        "🧹 Clears cache (cache + server-cache) completely in one click",
        "📝 Step-by-step log so you can follow along easily",
        "📦 Single file, no install, no admin rights needed",
        "🎨 Clean dark-themed UI, easy to use",
      ],
      th: [
        "🔴 ปิดโปรแกรม FiveM ที่ค้างให้อัตโนมัติ",
        "🧹 ลบแคช (cache + server-cache) ให้ครบในคลิกเดียว",
        "📝 มี log แสดงทีละขั้นตอน อ่านง่าย",
        "📦 ไฟล์เดียวจบ ไม่ต้องติดตั้ง ไม่ต้องรัน Admin",
      ],
    } as { en: string[]; th: string[] } | undefined,
  },
  {
    downloadUrl: "/FPSBooster.rar",
    image: "/fps-booster-1200x675-dark.png" as string | undefined,
    name: { en: "🚀 FPS Booster", th: "🚀 FPS Booster" },
    description: {
      en: "Unlock your gaming rig's full power in one click! 🎮",
      th: "ปลดล็อกพลังเครื่องเกมมิ่งของคุณในคลิกเดียว! 🎮",
    },
    bullets: {
      en: [
        "⚡ Speed boost with Ultimate Performance Mode",
        "🖥️ Unleash your CPU/GPU to full throttle, zero stutter",
        "📶 Auto latency reduction for smooth, low-ping play",
        "🧹 Wipe junk files, cache, and history in one click",
      ],
      th: [
        "⚡ เร่งสปีดด้วย Ultimate Performance Mode",
        "🖥️ ปลดล็อก CPU/GPU ให้ลุยเต็มสูบ ไม่สะดุด",
        "📶 ลด Latency อัตโนมัติ เน็ตลื่น ปิงต่ำ",
        "🧹 ล้างไฟล์ขยะ แคช และประวัติ ในปุ่มเดียว",
      ],
    },
  },
];

const contactLinks = [
  {
    labelKey: "emailLabel" as const,
    value: "titan.moorez@gmail.com",
    href: "mailto:titan.moorez@gmail.com",
    accent: "green" as const,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    value: "ทท",
    href: "https://www.tiktok.com/@titancommandprompt",
    accent: "pink" as const,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d={siTiktok.path} />
      </svg>
    ),
  },
  {
    label: "Discord",
    value: "your-discord-username",
    href: "#",
    accent: "blurple" as const,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d={siDiscord.path} />
      </svg>
    ),
  },
];

const accentColors = {
  green: {
    border: "border-[#39ff88]/25",
    iconBg: "bg-[#39ff88]/10",
    iconText: "text-[#39ff88]",
  },
  pink: {
    border: "border-[#ff2bd6]/25",
    iconBg: "bg-[#ff2bd6]/10",
    iconText: "text-[#ff2bd6]",
  },
  blurple: {
    border: "border-[#7289da]/25",
    iconBg: "bg-[#7289da]/10",
    iconText: "text-[#7289da]",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("titan-lang");
    // Syncing from localStorage (a real external source) after mount, so the
    // server-rendered "en" default matches the client's first paint and hydration doesn't mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "en" || stored === "th") setLang(stored);
  }, []);

  const handleSetLang = (next: Lang) => {
    setLang(next);
    window.localStorage.setItem("titan-lang", next);
  };

  const t = ui[lang];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#0a0612] font-sans text-[#e3dcf4]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_3px)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ff2bd6] via-[#39ff88] to-[#ff2bd6] opacity-70" />

      <header className="sticky top-0 z-10 border-b border-[#ff2bd6]/20 bg-[#0a0612]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
          <span className="font-display text-lg font-bold text-white">
            TITAN<span className="text-[#39ff88]">.exe</span>
          </span>
          <div className="flex items-center gap-6 text-sm font-medium tracking-wide text-[#9d94b8]">
            <a href="#about" className="hover:text-[#39ff88]">
              {t.navAbout}
            </a>
            <a href="#programs" className="hover:text-[#39ff88]">
              {t.navPrograms}
            </a>
            <a href="#contact" className="hover:text-[#39ff88]">
              {t.navContact}
            </a>
            <div className="flex items-center gap-0.5 border border-white/15 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleSetLang("en")}
                aria-pressed={lang === "en"}
                className={
                  lang === "en"
                    ? "bg-[#39ff88] px-2 py-1 text-[#0a0612]"
                    : "px-2 py-1 text-[#9d94b8] hover:text-white"
                }
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleSetLang("th")}
                aria-pressed={lang === "th"}
                className={
                  lang === "th"
                    ? "bg-[#39ff88] px-2 py-1 text-[#0a0612]"
                    : "px-2 py-1 text-[#9d94b8] hover:text-white"
                }
              >
                TH
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-[1] mx-auto flex w-full max-w-4xl flex-1 flex-col gap-20 px-6 py-24">
        <section className="flex flex-col items-start gap-6">
          <span className="font-display text-sm text-[#39ff88]">
            {t.eyebrow}
          </span>
          <div className="relative inline-block leading-none">
            <h1
              aria-hidden
              className="glitch-layer-a pointer-events-none absolute -left-[3px] top-0 font-display text-6xl font-bold text-[#ff2bd6]/75 mix-blend-screen sm:text-7xl"
            >
              TITAN
            </h1>
            <h1
              aria-hidden
              className="glitch-layer-b pointer-events-none absolute left-[3px] top-0 font-display text-6xl font-bold text-[#39ff88]/75 mix-blend-screen sm:text-7xl"
            >
              TITAN
            </h1>
            <h1 className="glitch-main relative font-display text-6xl font-bold tracking-tight text-white sm:text-7xl">
              TITAN
            </h1>
          </div>
          <p className="max-w-lg text-lg leading-8 text-[#9d94b8]">
            {t.heroTagline}
          </p>
          <div className="flex gap-4">
            <a
              href="#programs"
              className="flex h-11 items-center justify-center bg-[#ff2bd6] px-6 text-sm font-bold uppercase tracking-wide text-[#0a0612] transition-shadow [clip-path:polygon(0_0,100%_0,100%_70%,92%_100%,0_100%)] hover:shadow-[0_0_22px_rgba(255,43,214,0.5)]"
            >
              {t.ctaPrograms}
            </a>
            <a
              href="#contact"
              className="flex h-11 items-center justify-center border border-[#39ff88] px-6 text-sm font-bold uppercase tracking-wide text-[#39ff88] transition-shadow [clip-path:polygon(0_0,100%_0,100%_100%,8%_100%,0_30%)] hover:shadow-[0_0_22px_rgba(57,255,136,0.5)]"
            >
              {t.ctaContact}
            </a>
          </div>
        </section>

        <section id="about" className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-white">
            {t.aboutHeading}
          </h2>
          <p className="font-display max-w-2xl text-xl font-semibold leading-8 text-[#39ff88]">
            {t.aboutHook}
          </p>
          <p className="max-w-2xl text-base leading-7 text-[#9d94b8]">
            {t.aboutBody}
          </p>
          <p className="max-w-2xl text-sm leading-6 text-[#5c5573]">
            {t.aboutPricing}
          </p>
          <p className="max-w-2xl text-base leading-7 text-white">
            {t.aboutCta}
          </p>
        </section>

        <section id="programs" className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-semibold text-white">
            {t.programsHeading}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {programs.map((program) => (
              <div
                key={program.name.en}
                className="relative flex flex-col border border-white/10 bg-[#120c1e]"
              >
                <span className="absolute left-0 top-0 z-10 h-2.5 w-2.5 border-l-2 border-t-2 border-[#39ff88]" />
                <span className="absolute bottom-0 right-0 z-10 h-2.5 w-2.5 border-b-2 border-r-2 border-[#ff2bd6]" />

                <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-black/40">
                  {program.image ? (
                    <LightboxImage
                      src={program.image}
                      alt={program.name[lang]}
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#4a4460]">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                      <span className="font-display text-[10px] uppercase tracking-widest">{t.noImage}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-[15px] font-semibold text-white">
                    {program.name[lang]}
                  </h3>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-sm leading-6 text-[#9d94b8]">
                      {program.description[lang]}
                    </p>
                    {program.bullets && (
                      <ul className="flex flex-col gap-1.5">
                        {program.bullets[lang].map((bullet) => (
                          <li key={bullet} className="text-sm leading-6 text-[#9d94b8]">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <a
                    href={program.downloadUrl}
                    download
                    onClick={() => {
                      fetch("/api/track-download", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ program: program.name.en }),
                        keepalive: true,
                      }).catch(() => {});
                    }}
                    className="inline-flex h-9 w-fit items-center justify-center border border-[#ff2bd6] px-4 text-xs font-semibold text-[#ff8fe8] transition-colors hover:bg-[#ff2bd6]/10"
                  >
                    {t.download}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-white">
            {t.contactHeading}
          </h2>
          <div className="flex flex-col gap-2.5">
            {contactLinks.map((link) => (
              <a
                key={link.label ?? link.labelKey}
                href={link.href}
                className={`flex items-center gap-3.5 border ${accentColors[link.accent].border} bg-[#120c1e] px-4.5 py-3.5 text-sm text-[#9d94b8] transition-colors hover:text-[#e3dcf4]`}
              >
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center ${accentColors[link.accent].iconBg} ${accentColors[link.accent].iconText}`}
                >
                  {link.icon}
                </span>
                <span>
                  <span className="font-semibold text-white">
                    {link.label ?? t[link.labelKey]}:
                  </span>{" "}
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-[1] border-t border-white/10 py-8 text-center text-sm text-[#5c5573]">
        {t.footer(new Date().getFullYear())}
      </footer>

      <ContactFab lang={lang} />
    </div>
  );
}
