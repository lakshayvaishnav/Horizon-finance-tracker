"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import { error } from "console";
import { useSession } from "next-auth/react";

export default function AddAccount() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState(0);
  const [bankName, setbankName] = useState("");
  const [pinCode, setPincode] = useState(0);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      cardNumber: "",
      bankName: "",
      pincode: "",
    },
  });

  async function onSubmit() {
    alert("✅ Form submitted successfully!");

    const res = await fetch(
      "http://localhost:3000/api/bank/accounts/create-cards",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // @ts-ignore
          userId: session?.user?.id,
          cardNumber,
          bankName,
          pinCode,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("not able to create new card");
    }
    const data = await res.json();
    console.log(data);
    alert("✅ successfully created the bank account.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add Account
          </CardTitle>
          <CardDescription className="text-center">
            Please fill in your account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe"
                          {...field}
                          className="w-full"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Your public display name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="w-full"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>Your secure password</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          {...field}
                          className="w-full"
                          onChange={(e) =>
                            setCardNumber(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Your 16-digit card number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Bank"
                          {...field}
                          className="w-full"
                          onChange={(e) => setbankName(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>The name of your bank</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••"
                          {...field}
                          className="w-full"
                          maxLength={4}
                          onChange={(e) => setPincode(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Your 4-digit PIN</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex justify-end px-0">
                <Button type="submit" className="w-full md:w-auto">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
