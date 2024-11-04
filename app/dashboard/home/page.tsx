"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";

interface cardDetails {
  id: number;
  bankName: String;
  cardNumber: number;
  pincode: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState("");
  const [cardDetails, setCardDetails] = useState<cardDetails[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchBankDetails() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/bank/accounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch bank details");
      }
      const data = await response.json();
      setUserDetails(data.user);
      
      setCardDetails(data.cardDetails);
      
      
      console.log(" cardetails :", cardDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Bank Details</h1>

        {status === "authenticated" && session?.user && (
          <Card className="mb-8 bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Name: {session.user.name}</p>
              <p>Email: {session.user.email}</p>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={fetchBankDetails}
          disabled={loading}
          className="mb-8 w-full"
        >
          {loading ? "Loading..." : "Fetch Bank Details"}
        </Button>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded-md mb-8">
            Error: {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 text-white">
          {cardDetails.map((account) => (
            <Card  className="bg-gray-800">
              <CardHeader>
                <CardTitle>{account.bankName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Card Number: {account.cardNumber}</p>
                <p>Pincode: ••••</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
