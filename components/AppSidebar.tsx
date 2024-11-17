import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    title: "Add Expenses",
    url: "/dashboard/addExpense",
    icon: Inbox,
  },
  {
    title: "Transaction History",
    url: "/dashboard/history",
    icon: Calendar,
  },

  {
    title: "Add Account",
    url: "/dashboard/addAccount",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <div className="bg-gray-100 max-w-[250px] h-screen">
      <div className="text-sl flex tracking-tight font-bold flex-col justify-start px-4 text-4xl py-8 ">
        Dashboard
      </div>
      <div className="text-xl px-8 flex flex-col gap-4">
        {items.map((item) => {
          return (
            <Link
              key={item.title}
              className="flex flex-row items-center w-48"
              href={item.url}
            >
              <div className="mr-2 ">{<item.icon size={20} />}</div>
              <div className="tracking-tighter text-xl">{item.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
