import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    // @ts-ignore
    const {userId,  cardNumber, bankName, pinCode } = req.body;

    try {
            const newCard = await prisma.card.create({
                data:{
                    userId,
                    cardNumber,
                    bankName,
                    pinCode
                }
            })

            res.status(201).json(newCard);

    } catch(err){
      console.log("error while creating new card : " , err)
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
