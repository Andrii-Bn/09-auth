// app/api/debug/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";
  console.log("Incoming cookies:", cookie); // лог у серверній консолі

  return NextResponse.json({ receivedCookies: cookie });
}
