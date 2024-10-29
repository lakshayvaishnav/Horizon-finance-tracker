import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // @ts-ignore
  const { userId, cardNumber, bankName, pincode } = body;
  console.log("body details : ", userId, cardNumber, bankName, pincode);

  return NextResponse.json({ "response details : ": body });
}
