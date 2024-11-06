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
import { Form, useForm } from "react-hook-form";

export default function AddExpense() {
  const form = useForm({
    defaultValues: {
      name: "",
      bankName: "",
      amount: "",
    },
  });

  function submitHandler(values: any) {
    console.log("submit clicked : ", values);
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
            <label className="w-1/3 text-right">Bank Name:</label>
            <input
              type="text"
              {...form.register("bankName")}
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
