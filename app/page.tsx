"use client";

import { useEffect, useState } from "react";
import { siTiktok } from "simple-icons";
import { LightboxImage } from "./components/LightboxImage";
import { ContactFab } from "./components/ContactFab";
import { MusicPlayer } from "./components/MusicPlayer";

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

  },
  {
    downloadUrl: "/TTReShadeAuto.rar",
    image: "/reshade-auto-preview.png" as string | undefined,
    imageFit: "contain" as const,
    name: { en: "ReShade Auto Installer", th: "ลง ReShade Auto" },
    description: {
      en: "Install ReShade easily with ReShade Auto.",
      th: "ติดตั้ง ReShade ได้ง่าย ๆ ด้วย ReShade Auto",
    },
    bullets: {
      en: ["Select the version you want, then install ReShade."],
      th: ["เลือกเวอร์ชันที่ต้องการ แล้วติดตั้ง ReShade ได้เลย"],
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
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("th");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("titan-lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "en" || stored === "th") setLang(stored);
  }, []);

  const handleSetLang = (next: Lang) => {
    setLang(next);
    window.localStorage.setItem("titan-lang", next);
  };
  const t = ui[lang];

  return (
    <div className="premium-site">
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Titan home">TITAN<span>®</span></a>
        <nav className={mobileMenuOpen ? "site-nav is-open" : "site-nav"} aria-label={lang === "th" ? "เมนูหลัก" : "Main navigation"}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>{t.navAbout}</a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}>{t.navPrograms}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t.navContact}<span aria-hidden="true"> ↗</span></a>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language">
            <button aria-pressed={lang === "th"} onClick={() => handleSetLang("th")}>TH</button>
            <span>/</span>
            <button aria-pressed={lang === "en"} onClick={() => handleSetLang("en")}>EN</button>
          </div>
          <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? "✕" : "☰"}</button>
        </div>
      </header>

      <main>
        <section id="home" className="premium-hero">
          <div className="hero-atmosphere" aria-hidden="true"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-glow" /></div>
          <div className="hero-content">
            <span className="eyebrow"><span className="status-dot" /> INDEPENDENT DEVELOPER & CREATOR</span>
            <h1>T I T A N<span className="hero-period">.</span></h1>
            <div className="hero-actions">
              <a className="button-primary" href="#programs">{t.ctaPrograms}<span aria-hidden="true">↗</span></a>
              <a className="button-secondary" href="#contact">{t.ctaContact}<span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="hero-footnote"><span>DESIGNED WITH INTENTION</span><a href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a><span>BASED IN THAILAND</span></div>
        </section>

        <div className="content-shell">
          <section id="about" className="about-section content-section">
            <div className="section-label"><span>01 / ABOUT</span><h2>{lang === "th" ? "เรียบง่าย แต่ใส่ใจ\nทุกรายละเอียด" : "Simple by design.\nConsidered in detail."}</h2></div>
            <div className="about-copy"><p className="large-copy">{t.aboutHook}</p><p>{t.aboutBody}</p><p className="muted">{t.aboutPricing}</p><p>{t.aboutCta}</p><a className="text-link" href="#contact">{t.ctaContact} <span aria-hidden="true">↗</span></a></div>
          </section>

          <section id="programs" className="content-section">
            <div className="section-heading"><div className="section-label"><span>02 / SELECTED TOOLS</span><h2>{lang === "th" ? "เครื่องมือเล็ก ๆ\nที่ช่วยได้มาก" : "Small tools.\nA little more ease."}</h2></div><p>{lang === "th" ? "สร้างด้วยความใส่ใจ พร้อมให้คุณดาวน์โหลดฟรี" : "Made with care. Free for you to use."}</p></div>
            <div className="program-grid">
              {programs.map((program, index) => (
                <article className="program-card" key={program.name.en}>
                  <div className="program-preview">
                    {program.image ? <LightboxImage src={program.image} fit={program.imageFit} alt={program.name[lang]} sizes="(min-width: 1100px) 520px, (min-width: 700px) 45vw, 90vw" /> : <span>{t.noImage}</span>}
                  </div>
                  <div className="program-body">
                    <div className="program-meta"><span>UTILITY / 0{index + 1}</span><span className="free-tag">FREE DOWNLOAD</span></div>
                    <h3>{program.name[lang]}</h3>
                    <p>{program.description[lang]}</p>
                    {program.bullets && <ul>{program.bullets[lang].map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
                    <a className="download-link" href={program.downloadUrl} download onClick={() => {
                      fetch("/api/track-download", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ program: program.name.en }), keepalive: true }).catch(() => {});
                    }}>{t.download}<span aria-hidden="true">↓</span></a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="content-section contact-section">
            <div className="section-label"><span>03 / LET’S CONNECT</span><h2>{lang === "th" ? "มีไอเดียอยู่ในใจ?\nมาคุยกันครับ" : "Something in mind?\nLet’s make it happen."}</h2></div>
            <div className="contact-list">{contactLinks.map(link => (
              <a href={link.href} key={link.value}><span className="contact-icon">{link.icon}</span><span><small>{link.label ?? t[link.labelKey]}</small><strong>{link.value}</strong></span><span className="contact-arrow" aria-hidden="true">↗</span></a>
            ))}</div>
          </section>
        </div>
      </main>
      <footer className="site-footer"><a className="wordmark" href="#home">TITAN<span>®</span></a><p>{t.footer(new Date().getFullYear())}</p><a href="#home">BACK TO TOP ↑</a></footer>
      <MusicPlayer lang={lang} />
      <ContactFab lang={lang} />
    </div>
  );
}
