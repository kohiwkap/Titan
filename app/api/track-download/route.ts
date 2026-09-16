import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Discord webhook is not configured." },
      { status: 500 }
    );
  }

  const { program } = await request.json();

  if (typeof program !== "string" || !program.trim()) {
    return NextResponse.json(
      { error: "Program name is required." },
      { status: 400 }
    );
  }

  const discordRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "📥 New download",
          description: program.slice(0, 256),
          color: 0x39ff88,
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!discordRes.ok) {
    return NextResponse.json(
      { error: "Failed to notify Discord." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
