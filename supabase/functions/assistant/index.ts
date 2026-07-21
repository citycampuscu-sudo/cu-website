import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  let question = "";

try {
  const body = await req.json();
  console.log("Received body:", body);

  question = body?.question ?? "";
} catch (err) {
  console.error("JSON Error:", err);

  return Response.json({
    answer: "The assistant did not receive a valid question.",
  });
}
  const search = question.toLowerCase();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  // ------------------------------
// FETCH ALL WEBSITE DATA
// ------------------------------
async function fetchWebsiteData() {
  const [
    content,
    leadership,
    ministries,
    events,
    documents,
    knowledge
  ] = await Promise.all([
    supabase.from("content").select("*"),
    supabase.from("leadership").select("*"),
    supabase.from("ministries").select("*"),
    supabase.from("events").select("*"),
    supabase.from("documents").select("*"),
    supabase.from("knowledge_base").select("*")
  ]);

  return {
    content: content.data || [],
    leadership: leadership.data || [],
    ministries: ministries.data || [],
    events: events.data || [],
    documents: documents.data || [],
    knowledge: knowledge.data || []
  };
}

// ------------------------------
// BUILD SEARCH INDEX
// ------------------------------
function buildSearchIndex(data: any) {
  const index: any[] = [];

  // CONTENT
  data.content.forEach((item: any) => {
    index.push({
      source: "content",
      title: item.page ?? "Website Content",
      text: JSON.stringify(item),
      raw: item
    });
  });

  // LEADERSHIP
  data.leadership.forEach((item: any) => {
    index.push({
      source: "leadership",
      title: item.name,
      text: `
        ${item.name ?? ""}
        ${item.position ?? ""}
        ${item.bio ?? ""}
        ${item.email ?? ""}
      `,
      raw: item
    });
  });

  // MINISTRIES
  data.ministries.forEach((item: any) => {
    index.push({
      source: "ministries",
      title: item.name,
      text: `
        ${item.name ?? ""}
        ${item.description ?? ""}
      `,
      raw: item
    });
  });

  // EVENTS
  data.events.forEach((item: any) => {
    index.push({
      source: "events",
      title: item.title,
      text: `
        ${item.title ?? ""}
        ${item.description ?? ""}
        ${item.date ?? ""}
        ${item.time ?? ""}
        ${item.location ?? ""}
      `,
      raw: item
    });
  });

  // DOCUMENTS
  data.documents.forEach((item: any) => {
    index.push({
      source: "documents",
      title: item.title,
      text: `
        ${item.title ?? ""}
        ${item.description ?? ""}
      `,
      raw: item
    });
  });

  // KNOWLEDGE BASE
  data.knowledge.forEach((item: any) => {
    index.push({
      source: "knowledge",
      title: item.title,
      text: `
        ${item.title ?? ""}
        ${item.content ?? ""}
        ${item.keywords ?? ""}
      `,
      raw: item
    });
  });

  return index;
}

// ------------------------------
// SIMPLE RELEVANCE SCORING
// ------------------------------
function searchKnowledge(index: any[], question: string) {

  const words = question
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return index
    .map((item) => {

      let score = 0;

      const text = item.text.toLowerCase();

      words.forEach((word) => {

        if (text.includes(word)) score += 3;

        if (item.title?.toLowerCase().includes(word))
          score += 5;

      });

      return {
        ...item,
        score
      };

    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

    }

  const websiteData = await fetchWebsiteData();

const searchIndex = buildSearchIndex(websiteData);

const results = searchKnowledge(searchIndex, question);

if (results.length) {

  const answer = results
    .map(item => {

      switch (item.source) {

        case "leadership":
          return `${item.raw.position}: ${item.raw.name}`;

        case "ministries":
          return `${item.raw.name}\n${item.raw.description}`;

        case "events":
          return `📅 ${item.raw.title}
🗓 ${item.raw.date}
🕒 ${item.raw.time}
📍 ${item.raw.location}`;

        case "documents":
          return `${item.raw.title}\n${item.raw.description}`;

        case "content":
          return JSON.stringify(item.raw, null, 2);

        case "knowledge":
          return item.raw.content;

        default:
          return item.text;

      }

    })
    .join("\n\n");

  return Response.json({
    answer
  });

}

return Response.json({
  answer:
    "Sorry, I couldn't find that information on the MUKCCU website.",
  whatsapp:
    "https://wa.me/254748777612"
});
});
