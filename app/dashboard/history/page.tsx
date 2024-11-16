"use client";

import {
  ArrowDownUp,
  ArrowUpDown,
  Delete,
  DeleteIcon,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

interface Transaction {
  id: number;
  name: string;
  description: string;
  amount: number;
  date: string;
}

const smampleData = [
  {
    id: 1,
    name: "lxsh",
    description: "asdf",
    amount: 1231,
    date: "2024-11-13T10:04:08.478Z",
    userId: 1,
  },
  {
    id: 2,
    name: "Lxsh - Dev",
    description: "rakahel",
    amount: 99999,
    date: "2024-11-13T10:20:26.109Z",
    userId: 1,
  },

  {
    id: 3,
    name: "yo boi",
    description: "go",
    amount: 23,
    date: "2024-11-13T10:20:33.109Z",
    userId: 1,
  },
];

export default function TransactionHistory(): React.ReactElement {
  const [data, setData] = useState(smampleData);
  const [sortConfig, setSortConfig] = useState({
    key: " ",
    direction: "ascending",
  });

  const handleSort = (key: keyof Transaction) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      if (key === "date") {
        return direction === "ascending"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (key === "amount") {
        return direction === "ascending"
          ? a.amount - b.amount
          : b.amount - a.amount;
      } else if (key === "description") {
        return direction === "ascending"
          ? a.description.localeCompare(b.description) -
              b.description.localeCompare(a.description)
          : b.description.localeCompare(a.description) -
              a.description.localeCompare(b.description);
      } else if (key === "name") {
        return direction === "ascending"
          ? a.name.localeCompare(b.name) - b.name.localeCompare(a.name)
          : b.name.localeCompare(a.name) - a.name.localeCompare(b.name);
      }

      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  async function handleFetch() {
    const response = await fetch("http://localhost:3000/api/bank/expenses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("✅✅ data fetched success : ", data.response);
    setData(data.response);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  async function DeleteExpense(txid: number) {
    const response = await fetch("http://localhost:3000/api/bank/expenses", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: txid,
      }),
    });

    const data = await response.json();
    console.log("fe respone of delete : ", data);
    handleFetch();
  }

  return (
    <div className="h-screen py-36">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View your transaction history baby...
          </CardDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Date
                  {sortConfig.key === "date" && (
                    <span className="inline-block ml-2">
                      <ArrowUpDown size={12} />
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("description")}
                >
                  Description
                  {sortConfig.key === "description" && (
                    <span className="inline-block ml-2">
                      <ArrowDownUp size={12} />
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  Amount
                  {sortConfig.key === "amount" && (
                    <span className="inline-block ml-2">
                      <ArrowUpDown size={12} />
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                  {sortConfig.key === "name" && (
                    <span className="ml-2 inline-block">
                      <ArrowDownUp size={12} />{" "}
                    </span>
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.date.split("T")[0]}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.amount}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => DeleteExpense(data.id)}
                      color="red"
                      size={14}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardHeader>
      </Card>
    </div>
  );
}
