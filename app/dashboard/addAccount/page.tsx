"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  pincode: z
    .string()
    .length(4, { message: "Pincode must be exactly 4 digits." })
    .regex(/^\d+$/, { message: "Pincode must contain only numbers." }),
  cardNumber: z
    .string()
    .length(16, { message: "Card number must be exactly 16 digits." })
    .regex(/^\d+$/, { message: "Card number must contain only numbers." }),
  bankName: z
    .string()
    .min(2, { message: "Bank name must be at least 2 characters." }),
});

export default function FinanceForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPincode, setShowPincode] = useState(false);
  const { data: session } = useSession();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      pincode: "",
      cardNumber: "",
      bankName: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("session : " ,session);
    const response = await fetch(
      "http://localhost:3000/api/bank/accounts/create-cards",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          cardNumber: values.cardNumber,
          bankName: values.bankName,
          pincode: values.pincode,
        }),
      }
    );

    const data = await response.json();
    console.log("data after form submission : ", data);
    alert("Form submitted successfully!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Finance Application
          </CardTitle>
          <CardDescription className="text-center">
            Please fill in your financial details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>Your full name</FormDescription>
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
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>Your secure password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPincode ? "text" : "password"}
                          placeholder="••••"
                          maxLength={4}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPincode(!showPincode)}
                        >
                          {showPincode ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>Your 4-digit PIN</FormDescription>
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
                        maxLength={16}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your 16-digit card number</FormDescription>
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
                      <Input placeholder="Your Bank" {...field} />
                    </FormControl>
                    <FormDescription>The name of your bank</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-end px-0 pt-4">
                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
