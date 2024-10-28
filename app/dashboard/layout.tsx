import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode } from "react";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-lime-300">
  <AppSidebar />
  <div className="flex-1 flex flex-row bg-gray-200 ">
    <div className="w-full h-full ">
    {children}
    </div>
  </div>
</section>
  );
}
