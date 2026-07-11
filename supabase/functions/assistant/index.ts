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

  // EVENTS
  if (
    search.includes("event") ||
    search.includes("upcoming") ||
    search.includes("fellowship")
  ) {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (data?.length) {
      return Response.json({
        answer: data
          .map(
            (e) =>
              `📅 ${e.title}\n🗓 ${e.date}\n🕒 ${e.time}\n📍 ${e.location}`
          )
          .join("\n\n"),
      });
    }
  }

  // MINISTRIES
  if (
    search.includes("ministry") ||
    search.includes("ministries")
  ) {
    const { data } = await supabase
      .from("ministries")
      .select("*");

    if (data?.length) {
      return Response.json({
        answer:
          "Our Ministries:\n\n" +
          data.map((m) => `• ${m.name}`).join("\n"),
      });
    }
  }

  // LEADERS
  if (
    search.includes("leader") ||
    search.includes("leadership") ||
    search.includes("chairperson")
  ) {
    const { data } = await supabase
      .from("leaders")
      .select("*");

    if (data?.length) {
      return Response.json({
        answer:
          "Current Leaders:\n\n" +
          data
            .map((l) => `${l.position}: ${l.name}`)
            .join("\n"),
      });
    }
  }

  // ALUMNI
  if (search.includes("alumni")) {
    const { data } = await supabase
      .from("alumni_events")
      .select("*")
      .order("event_date");

    if (data?.length) {
      return Response.json({
        answer:
          "Upcoming Alumni Events:\n\n" +
          data
            .map((a) => `${a.title} - ${a.event_date}`)
            .join("\n"),
      });
    }

    return Response.json({
      answer:
        "Our Alumni Network keeps former members connected through fellowship, mentorship and events.",
    });
  }

  // CONTACT
  if (
    search.includes("contact") ||
    search.includes("phone") ||
    search.includes("email")
  ) {
    return Response.json({
      answer:
        "Email: citycampusc.u@gmail.com",
    });
  }

  // JOIN CU
  if (
    search.includes("join") ||
    search.includes("member")
  ) {
    return Response.json({
      answer:
        "You are welcome to join Maseno City Campus Christian Union. Attend our fellowship or register through the Membership page on our website.",
    });
  }

  // DEFAULT
  return Response.json({
    answer:
      "Sorry, I couldn't find that information.",
    whatsapp:
      "https://wa.me/254748777612",
  });
});