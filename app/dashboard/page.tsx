"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default () => {
  const { data, status } = useSession();

  console.log("session details from client side : ", data);
  const router = useRouter();

  if (status === "unauthenticated") {
    return <div>"please login you are unauthenticated dashboard page"</div>;
  }

  return (
    <section className="bg-blue-300 flex justify-center items-center h-screen">
      <h1 className="tracking-tighter font-bold text-2xl">
        this is the dashbaord{" "}
      </h1>
    </section>
  );
};
