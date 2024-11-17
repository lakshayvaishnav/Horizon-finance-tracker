'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, User, Mail, AlertCircle } from 'lucide-react';

interface CardDetails {
  id: number;
  bankName: string;
  cardNumber: number;
  pincode: number;
}

const DebitCard = ({ card }: { card: CardDetails }) => (
  <motion.div
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="text-gray-400 text-sm">{card.bankName}</div>
      <CreditCard className="text-gray-400" size={24} />
    </div>
    <div className="text-2xl font-mono mb-6 text-gray-200">
      {card.cardNumber.toString().replace(/(\d{4})/g, '$1 ').trim()}
    </div>
    <div className="flex justify-between items-end">
      <div>
        <div className="text-gray-500 text-xs mb-1">Card Holder</div>
        <div className="text-gray-300 text-sm">JOHN DOE</div>
      </div>
      <div>
        <div className="text-gray-500 text-xs mb-1">Expires</div>
        <div className="text-gray-300 text-sm">12/25</div>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState('');
  const [cardDetails, setCardDetails] = useState<CardDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBankDetails();
  }, []);

  async function fetchBankDetails() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/bank/accounts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bank details');
      }
      const data = await response.json();
      setUserDetails(data.user);
      setCardDetails(data.cardDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-black text-gray-200 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Bank Details</h1>

        {status === 'authenticated' && session?.user && (
          <Card className="mb-8 bg-gray-900 text-gray-200 border border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center mb-2">
                <User className="mr-2" size={16} />
                {session.user.name}
              </p>
              <p className="flex items-center">
                <Mail className="mr-2" size={16} />
                {session.user.email}
              </p>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={fetchBankDetails}
          disabled={loading}
          className="mb-8 w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
        >
          {loading ? 'Loading...' : 'Fetch Bank Details'}
        </Button>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900 text-gray-200 p-4 rounded-md mb-8 flex items-center"
          >
            <AlertCircle className="mr-2" size={20} />
            Error: {error}
          </motion.div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {cardDetails.map((card: CardDetails) => (
            <DebitCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}