"use client";

import { useState } from "react";

type Lang = "en" | "th";
type Status = "idle" | "sending" | "sent" | "error";

const copy = {
  en: {
    open: "Leave a message",
    title: "Leave a message",
    name: "Name",
    namePlaceholder: "Your name",
    message: "Message",
    messagePlaceholder: "Type your message...",
    contact: "How to reach you back",
    contactPlaceholder: "Email, Discord, phone...",
    send: "Send",
    sending: "Sending...",
    cancel: "Cancel",
    note: "This sends straight to my Discord.",
    sentMessage: "Sent! Thanks for reaching out.",
    errorMessage: "Couldn't send that, please try again.",
  },
  th: {
    open: "ฝากข้อความ",
    title: "ฝากข้อความ",
    name: "ชื่อ",
    namePlaceholder: "ชื่อของคุณ",
    message: "ข้อความ",
    messagePlaceholder: "พิมพ์ข้อความของคุณ...",
    contact: "ช่องทางติดต่อกลับ",
    contactPlaceholder: "อีเมล, Discord, เบอร์โทร...",
    send: "ส่ง",
    sending: "กำลังส่ง...",
    cancel: "ยกเลิก",
    note: "ข้อความจะถูกส่งเข้า Discord ของผมโดยตรง",
    sentMessage: "ส่งแล้ว! ขอบคุณที่ติดต่อมานะ",
    errorMessage: "ส่งไม่สำเร็จ ลองใหม่อีกครั้ง",
  },
} as const;

export function ContactFab({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const t = copy[lang];

  const canSend = name.trim() !== "" && message.trim() !== "" && status !== "sending";

  const handleSend = async () => {
    if (!canSend) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, contact }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setName("");
      setMessage("");
      setContact("");
    } catch {
      setStatus("error");
    }
  };

  const closeAndReset = () => {
    setOpen(false);
    setStatus("idle");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.open}
        className="contact-fab-button fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center bg-[#c7b994] text-[#090909] shadow-[0_0_20px_rgba(255,43,214,0.45)] transition-shadow [clip-path:polygon(0_0,100%_0,100%_75%,75%_100%,0_100%)] hover:shadow-[0_0_30px_rgba(255,43,214,0.7)]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#090909]/90 p-6 backdrop-blur-sm"
          onClick={closeAndReset}
        >
          <div
            className="relative w-full max-w-md border border-white/10 bg-[#181818] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-[#ddd7c9]" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-[#c7b994]" />

            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-white">{t.title}</h3>
              <button
                type="button"
                onClick={closeAndReset}
                aria-label={t.cancel}
                className="flex h-8 w-8 items-center justify-center border border-[#c7b994]/60 text-[#c7b994] transition-colors hover:bg-[#c7b994]/10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            {status === "sent" ? (
              <p className="py-4 text-sm text-[#ddd7c9]">{t.sentMessage}</p>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <label className="flex flex-col gap-1.5 text-sm text-[#a3a39e]">
                  {t.name}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="border border-white/15 bg-[#090909] px-3 py-2 text-sm text-white outline-none placeholder:text-[#797973] focus:border-[#ddd7c9]"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm text-[#a3a39e]">
                  {t.message}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    rows={4}
                    className="resize-none border border-white/15 bg-[#090909] px-3 py-2 text-sm text-white outline-none placeholder:text-[#797973] focus:border-[#ddd7c9]"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm text-[#a3a39e]">
                  {t.contact}
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.contactPlaceholder}
                    className="border border-white/15 bg-[#090909] px-3 py-2 text-sm text-white outline-none placeholder:text-[#797973] focus:border-[#ddd7c9]"
                  />
                </label>

                <p className={`text-xs ${status === "error" ? "text-[#c7b994]" : "text-[#797973]"}`}>
                  {status === "error" ? t.errorMessage : t.note}
                </p>

                <div className="flex justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={closeAndReset}
                    className="inline-flex h-10 items-center justify-center border border-white/15 px-5 text-sm font-medium text-[#a3a39e] transition-colors hover:text-white"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="inline-flex h-10 items-center justify-center bg-[#c7b994] px-5 text-sm font-bold text-[#090909] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === "sending" ? t.sending : t.send}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
