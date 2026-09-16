const programs = [
  {
    name: "โปรแกรมของฉัน #1",
    description: "คำอธิบายสั้น ๆ ว่าโปรแกรมนี้ทำอะไรได้บ้าง",
    downloadUrl: "#",
  },
  {
    name: "โปรแกรมของฉัน #2",
    description: "คำอธิบายสั้น ๆ ว่าโปรแกรมนี้ทำอะไรได้บ้าง",
    downloadUrl: "#",
  },
  {
    name: "โปรแกรมของฉัน #3",
    description: "คำอธิบายสั้น ๆ ว่าโปรแกรมนี้ทำอะไรได้บ้าง",
    downloadUrl: "#",
  },
];

const contactLinks = [
  { label: "Email", value: "your-email@example.com", href: "mailto:your-email@example.com" },
  { label: "TikTok", value: "@your-tiktok", href: "https://www.tiktok.com/@your-tiktok" },
  { label: "Social", value: "your-social-handle", href: "#" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="sticky top-0 z-10 border-b border-black/[.06] bg-zinc-50/80 backdrop-blur dark:border-white/[.08] dark:bg-black/80">
        <nav className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">Titan</span>
          <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#about" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              About
            </a>
            <a href="#programs" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              ผลงาน
            </a>
            <a href="#contact" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              ติดต่อ
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-32 px-6 py-24">
        <section className="flex flex-col items-start gap-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Titan</h1>
          <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            ยินดีต้อนรับสู่เว็บไซต์ส่วนตัวของ Titan
          </p>
          <div className="flex gap-4">
            <a
              href="#programs"
              className="flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              ดูผลงาน
            </a>
            <a
              href="#contact"
              className="flex h-11 items-center justify-center rounded-full border border-black/[.08] px-6 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              ติดต่อฉัน
            </a>
          </div>
        </section>

        <section id="about" className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            เขียนแนะนำตัวสั้น ๆ ที่นี่ เช่น คุณเป็นใคร ทำอะไร สนใจเรื่องอะไร
            หรือมีประสบการณ์ด้านไหนบ้าง
          </p>
        </section>

        <section id="programs" className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">ผลงาน / โปรแกรมแจก</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {programs.map((program) => (
              <div
                key={program.name}
                className="flex flex-col gap-3 rounded-2xl border border-black/[.08] p-6 dark:border-white/[.145]"
              >
                <h3 className="text-lg font-semibold">{program.name}</h3>
                <p className="flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {program.description}
                </p>
                <a
                  href={program.downloadUrl}
                  className="inline-flex h-10 w-fit items-center justify-center rounded-full border border-black/[.08] px-5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                >
                  ดาวน์โหลด
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">ติดต่อ</h2>
          <div className="flex flex-col gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex w-fit items-center gap-3 text-base text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                <span className="font-medium text-zinc-950 dark:text-zinc-50">
                  {link.label}:
                </span>
                {link.value}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[.06] py-8 text-center text-sm text-zinc-500 dark:border-white/[.08] dark:text-zinc-500">
        © {new Date().getFullYear()} Titan. All rights reserved.
      </footer>
    </div>
  );
}
