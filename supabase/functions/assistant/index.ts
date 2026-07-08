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

    const search = question.toLowerCase();

    let bestMatch = null;
    let bestScore = 0;

    for (const item of data ?? []) {
      let score = 0;

      if (item.title?.toLowerCase().includes(search)) {
        score += 5;
      }

      if (item.content?.toLowerCase().includes(search)) {
        score += 3;
      }

      if (item.keywords) {
        const keywords = item.keywords
          .toLowerCase()
          .split(",")
          .map((k: string) => k.trim());

        for (const keyword of keywords) {
          if (search.includes(keyword) || keyword.includes(search)) {
            score += 2;
          }
        }
      }

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
            "Sorry, I couldn't find that information in our knowledge base. Please contact us on WhatsApp for further assistance.",
          whatsapp: "https://wa.me/254748777612"
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
