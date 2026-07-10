import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const { question } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("knowledge_base")
      .select("title, category, content, keywords, url");

    if (error) throw error;

    const searchWords = question
  .toLowerCase()
  .replace(/[^\w\s]/g, "")
  .split(/\s+/)
  .filter(Boolean);

let bestMatch = null;
let bestScore = 0;

for (const item of data ?? []) {
  let score = 0;

  const title = (item.title ?? "").toLowerCase();
  const category = (item.category ?? "").toLowerCase();
  const content = (item.content ?? "").toLowerCase();
  const keywords = (item.keywords ?? "")
    .toLowerCase()
    .split(",")
    .map((k: string) => k.trim());

  for (const word of searchWords) {
    if (title.includes(word)) score += 10;
    if (category.includes(word)) score += 8;
    if (keywords.some((k: string) => k.includes(word))) score += 6;
    if (content.includes(word)) score += 2;
  }

  // Bonus for exact phrase match
  if (title.includes(question.toLowerCase())) score += 20;
  if (content.includes(question.toLowerCase())) score += 10;

  if (score > bestScore) {
    bestScore = score;
    bestMatch = item;
  }
  }

    if (!bestMatch) {
  return new Response(
    JSON.stringify({
      found: false,
      answer:
        "I couldn't find an answer to that question.\n\nYou can ask me about:\n• Fellowships\n• Ministries\n• Events\n• Leadership\n• Membership\n• Alumni\n\nOr contact us directly on WhatsApp.",
      whatsapp: "https://wa.me/254748777612",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
     }

    return new Response(
      JSON.stringify({
        found: true,
        title: bestMatch.title,
        answer: bestMatch.content,
        url: bestMatch.url,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
  return new Response(
    JSON.stringify({
      found: false,
      error: String(err),
      answer: "Internal server error.",
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
          }
});
