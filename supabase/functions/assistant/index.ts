import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
      const { message } = await req.json();

          const supabase = createClient(
                Deno.env.get("SUPABASE_URL")!,
                      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
                          );

                              const { data, error } = await supabase
                                    .from("knowledge_base")
                                          .select("*");

                                              if (error) {
                                                    throw error;
                                                        }

                                                            const question = message.toLowerCase();

                                                                const match = data.find((item) => {
                                                                      return (
                                                                              item.title.toLowerCase().includes(question) ||
                                                                                      item.content.toLowerCase().includes(question) ||
                                                                                              (item.keywords &&
                                                                                                        item.keywords.toLowerCase().includes(question))
                                                                                                              );
                                                                                                                  });

                                                                                                                      if (!match) {
                                                                                                                            return new Response(
                                                                                                                                    JSON.stringify({
                                                                                                                                              found: false,
                                                                                                                                                        answer:
                                                                                                                                                                    "I couldn't find that information in our knowledge base. Please contact us on WhatsApp.",
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
                                                                                                                                                                                                                                                                answer: match.content,
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
                                                                                                                                                                                                                                                                                                                                            answer: "An unexpected error occurred.",
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
