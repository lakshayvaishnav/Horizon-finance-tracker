import prisma from "@/lib/prismaClient";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "../../auth/[...nextauth]/options";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("session details from serverside : ", session);
  
  return NextResponse.json("message from server")

  
}
