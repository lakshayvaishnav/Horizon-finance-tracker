"use client";

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
import React, { useState } from "react";

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
];

export default function TransactionHistory(): React.ReactElement {
  async function handleFetch() {
    const response = await fetch("http://localhost:3000/api/bank/expenses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("✅✅ data fetched success : ", data);
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
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {smampleData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.date.split("T")[0]}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.amount}</TableCell>
                  <TableCell>{data.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardHeader>
      </Card>
    </div>
  );
}
