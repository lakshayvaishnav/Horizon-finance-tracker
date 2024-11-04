import prisma from "@/lib/prismaClient";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });
      console.log("user found : ✅ ", user);
      const cardDetails = await prisma.card.findUnique({
        where: {
          id: session.user.id,
        },
      });
      console.log("card details found ✅ : ", cardDetails);

      return NextResponse.json({
        success: "true",
        user,
        cardDetails,
      });
    } catch (error) {
      console.log("error came while fetching user account details : ", error);
    }
  }

  return NextResponse.json(
    {
      success: "flase",
      message: "error fetching the data no session found",
    },
    {
      status: 401,
    }
  );
}
