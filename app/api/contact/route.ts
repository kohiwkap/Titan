import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Discord webhook is not configured." },
      { status: 500 }
    );
  }

  const { name, message, contact } = await request.json();

  if (typeof name !== "string" || typeof message !== "string" || !name.trim() || !message.trim()) {
    return NextResponse.json(
      { error: "Name and message are required." },
      { status: 400 }
    );
  }

  const discordRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "New message from the website",
          color: 0xff2bd6,
          fields: [
            { name: "Name", value: name.slice(0, 256) },
            {
              name: "Contact",
              value: typeof contact === "string" && contact.trim() ? contact.slice(0, 256) : "-",
            },
            { name: "Message", value: message.slice(0, 1024) },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!discordRes.ok) {
    return NextResponse.json(
      { error: "Failed to send to Discord." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
