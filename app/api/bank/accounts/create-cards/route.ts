import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, cardNumber, bankName, pinCode } = body;
  if (!userId || !cardNumber || !bankName || !pinCode) {
    return NextResponse.json({ error: "All fields are required" });
  }
  try {
    if (req.method == "POST") {
      const response = await prisma.card.create({
        data: {
          userId,
          cardNumber,
          bankName,
          pinCode,
        },
      });
      return NextResponse.json({ "card created successfully : ": response });
    } else {
      console.log("only post request allowed here ...");
    }
  } catch (error) {
    console.log("⚠️ error occured while creating the card : ", error);
  }

  return NextResponse.json({ "response details : ": body });
}
