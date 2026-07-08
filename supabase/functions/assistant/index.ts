import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const { question } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: knowledge, error } = await supabase
      .from("knowledge")
      .select("*");

    if (error) {
      throw error;
    }

    const userQuestion = question.toLowerCase();

    let bestMatch = null;

    for (const item of knowledge) {
      const keywords = item.question.toLowerCase().split(" ");

      const matched = keywords.filter((word: string) =>
        userQuestion.includes(word)
      );

      if (
        matched.length > 0 &&
        (!bestMatch || matched.length > bestMatch.score)
      ) {
        bestMatch = {
          answer: item.answer,
          score: matched.length,
        };
      }
    }

    if (bestMatch) {
      return new Response(
        JSON.stringify({
          answer: bestMatch.answer,
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
        answer:
          "Sorry, I couldn't find that information in our knowledge base. Please contact us on WhatsApp for further assistance.",
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
        error: err.message,
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
