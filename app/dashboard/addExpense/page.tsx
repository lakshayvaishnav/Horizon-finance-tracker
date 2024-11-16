"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

export default function AddExpense() {
  const { data: session } = useSession();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      amount: "",
    },
  });

  const formschema = z.object({
    name: z.string(),
    description: z
      .string()
      .min(8, { message: "description must be atleast 8 charachters long" }),
    amount: z.string(),
  });

  async function submitHandler(values: z.infer<typeof formschema>) {
    const data = await fetch("http://localhost:3000/api/bank/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
        name: values.name,
        description: values.description,
        amount: parseInt(values.amount),
      }),
    });
    alert("added succesfully.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="flex-col gap-8 flex justify-center text-center items-center">
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <div className="flex items-center gap-4">
            <label className="w-1/3 text-right">Name:</label>
            <input
              type="text"
              {...form.register("name")}
              className="border rounded p-2 w-2/3"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-1/3 text-right">Amount:</label>
            <input
              type="number"
              {...form.register("amount")}
              className="border rounded p-2 w-2/3"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-1/3 text-right">Descripton:</label>
            <input
              type="text"
              {...form.register("description")}
              className="border rounded p-2 w-2/3"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white rounded p-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
