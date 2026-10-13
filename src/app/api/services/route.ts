import { NextResponse } from "next/server";
import { getServicePlans } from "@/lib/queries";
import { isServiceType } from "@/lib/categories";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const category = searchParams.get("category") ?? undefined;
  if (!isServiceType(type)) return NextResponse.json({ error: "Invalid service type." }, { status: 400 });

  const plans = await getServicePlans(type, category);
  return NextResponse.json(
    plans.map((p) => ({
      id: p.id, name: p.name, description: p.description, is_pro: p.isPro,
      benefits: p.benefits, code_types: p.codeTypes, tech_tools: p.techTools,
    })),
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}