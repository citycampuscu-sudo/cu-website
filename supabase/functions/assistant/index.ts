import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const { question } = await req.json();

    const search = question.toLowerCase();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // --------------------------
    // KNOWLEDGE BASE
    // --------------------------

    const { data: knowledge } = await supabase
      .from("knowledge_base")
      .select("*");

    let bestMatch = null;
    let bestScore = 0;

    for (const item of knowledge ?? []) {
      let score = 0;

      if (item.title?.toLowerCase().includes(search))
        score += 5;

      if (item.content?.toLowerCase().includes(search))
        score += 3;

      if (item.keywords) {
        const words = item.keywords
          .toLowerCase()
          .split(",");

        for (const word of words) {
          const w = word.trim();

          if (
            search.includes(w) ||
            w.includes(search)
          ) {
            score += 2;
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = {
          answer: item.content,
          url: item.url,
        };
      }
    }

    if (bestMatch) {
      return Response.json({
        answer: bestMatch.answer,
        url: bestMatch.url,
      });
    }

    // --------------------------
    // EVENTS
    // --------------------------

    if (
      search.includes("event") ||
      search.includes("upcoming") ||
      search.includes("meeting")
    ) {

      const { data: events } = await supabase
        .from("events")
        .select("*")
        .order("date");

      if (events?.length) {

        let reply = "📅 Upcoming Events\n\n";

        for (const e of events) {
          reply +=
`${e.title}
📍 ${e.location}
📅 ${e.date}
🕒 ${e.time}

`;
        }

        return Response.json({
          answer: reply,
        });

      }

    }

    // --------------------------
    // MINISTRIES
    // --------------------------

    if (
      search.includes("ministry") ||
      search.includes("ministries")
    ) {

      const { data } = await supabase
        .from("ministries")
        .select("*");

      if (data?.length) {

        let text = "Our ministries:\n\n";

        for (const m of data) {
          text += `• ${m.name}\n`;
        }

        return Response.json({
          answer: text,
        });

      }

    }

    // --------------------------
    // LEADERSHIP
    // --------------------------

    if (
      search.includes("leader") ||
      search.includes("leadership") ||
      search.includes("chairperson")
    ) {

      const { data } = await supabase
        .from("leadership_roles")
        .select("*");

      if (data?.length) {

        let text = "Current Leadership\n\n";

        for (const l of data) {
          text += `${l.name} — ${l.role_type}\n`;
        }

        return Response.json({
          answer: text,
        });

      }

    }

    // --------------------------
    // FALLBACK
    // --------------------------

    return Response.json({
      answer:
`Sorry, I couldn't find that information.

You can ask me about:

• Fellowships
• Ministries
• Events
• Leadership
• Membership
• Alumni

Or contact us on WhatsApp.`,

      whatsapp:
"https://wa.me/254748777612"
    });

  } catch (err) {

    return Response.json({
      answer: "Internal server error."
    }, {
      status: 500
    });

  }
});
