import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export default async function POST(req:NextRequest){
    const session = await getServerSession(authOptions)

    if(session) {

    }
}