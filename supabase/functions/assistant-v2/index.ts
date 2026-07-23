import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { question } = await req.json();

    console.log("Question:", question);

    return Response.json(
      {
        success: true,
        answer: `👋 Hello! You asked: "${question}"`,
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        success: false,
        answer: "Invalid request.",
      },
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }
});