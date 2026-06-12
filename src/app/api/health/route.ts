import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", app: "Fantasy Stratos", databaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY), footballDataConfigured: Boolean(process.env.API_FOOTBALL_KEY) });
}
