import type { APIContext } from "astro";

export const prerender = false;

export async function POST({ request }: APIContext) {
  const { name, email, message } = await request.json();

  const webhook = import.meta.env.SLACK_WEBHOOK_URL;
  if (!webhook) return new Response("Missing webhook", { status: 500 });

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `📩 New form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    }),
  });

  if (!res.ok) return new Response("Slack error", { status: 500 });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
