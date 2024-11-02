"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
export default function Home() {

  const { data, status } = useSession();

  console.log("session details from client side : ", data);

  async function handler() {
    console.log("handler clicked");
    const response = await fetch("http://localhost:3000/api/bank/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("response after requeest : ", response);
  }
  return (
    <section className="bg-black text-white flex flex-col items-center justify-center max-w-screen max-h-screen">
      <h1>this page will show bank details</h1>
      <Button onClick={handler}>post</Button>
    </section>
  );
}
