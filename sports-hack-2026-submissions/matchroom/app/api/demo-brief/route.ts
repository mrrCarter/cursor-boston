import { NextResponse } from "next/server";
import { loadDemoBrief } from "@/lib/data/loaders";

export const dynamic = "force-static";

type DemoBriefRequest = {
  coachQuestion?: unknown;
  mode?: unknown;
};

function getCoachQuestion(body: DemoBriefRequest): string | undefined {
  return typeof body.coachQuestion === "string" ? body.coachQuestion : undefined;
}

export async function GET() {
  const brief = await loadDemoBrief();

  return NextResponse.json(brief, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300"
    }
  });
}

export async function POST(request: Request) {
  let body: DemoBriefRequest = {};

  try {
    body = (await request.json()) as DemoBriefRequest;
  } catch {
    body = {};
  }

  if (process.env.NODE_ENV === "development" && body.mode === "live" && !process.env.OPENAI_API_KEY) {
    console.info("MatchRoom demo-brief live mode requested without OPENAI_API_KEY; returning seeded brief.");
  }

  const brief = await loadDemoBrief(getCoachQuestion(body));
  return NextResponse.json(brief);
}
