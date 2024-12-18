import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prismaClient";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (req.method === "POST") {
    const body = await req.json();
    const { name, amount, description } = body;
    if (session) {
      const response = await prisma.expense.create({
        data: {
          userId: session.user.id,
          amount: amount,
          name: name,
          description: description,
          date: new Date(),
        },
      });
      console.log(response);
      return NextResponse.json({
        message: "expense added successfully",
        response,
      });
    } else {
      console.log("no session found");
      return NextResponse.json({ message: "no session found" });
    }
  }

  if (req.method === "GET") {
    if (session) {
      const response = await prisma.expense.findMany({
        where: {
          userId: session.user.id,
        },
      });

      return NextResponse.json({
        response,
        message: "get response from expenses",
      });
    } else {
      console.log("no session found");
      return NextResponse.json({ message: "no session found" });
    }
  }

  if (req.method === "DELETE") {
    if (session) {
      const body = await req.json();
      const { id } = body;

      if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }

      const deleteExpense = await prisma.expense.delete({
        where: {
          id: id,
        },
      });

      console.log("⚠️ Deleted Expense : ", deleteExpense);

      return NextResponse.json(
        { message: "Expense deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalide session" },
        { status: 500 }
      );
    }
  }
}

export { handler as GET, handler as POST , handler as DELETE};
