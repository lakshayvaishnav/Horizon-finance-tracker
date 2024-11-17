'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, Trash2, AlertCircle, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Transaction {
    id: number;
    name: string;
    description: string;
    amount: number;
    date: string;
}

type SortKey = keyof Transaction;

export default function TransactionHistory(): React.ReactElement {
    const [data, setData] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' }>({
        key: 'date',
        direction: 'descending',
    });

    const handleSort = (key: SortKey) => {
        setSortConfig((prevConfig) => ({
            key,
            direction:
                prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
        }));
    };

    const sortedData = React.useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    async function fetchTransactions() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/api/bank/expenses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }
            const result = await response.json();
            setData(result.response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching transactions');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function deleteExpense(txid: number) {
        try {
            const response = await fetch('http://localhost:3000/api/bank/expenses', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: txid,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }
            await fetchTransactions();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while deleting the expense');
        }
    }

    return (
        <div className="min-h-screen  bg-black w-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="bg-gray-900 border-gray-800    ml-[300px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-100">Transaction History</CardTitle>
                    <CardDescription className="text-gray-400">View and manage your transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-2 bg-red-900 text-red-100 rounded-md flex items-center"
                        >
                            <AlertCircle className="mr-2" size={16} />
                            {error}
                        </motion.div>
                    )}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {(['date', 'name', 'description', 'amount'] as const).map((key) => (
                                        <TableHead
                                            key={key}
                                            className="cursor-pointer hover:bg-gray-800 transition-colors"
                                            onClick={() => handleSort(key)}
                                        >
                                            <div className="flex items-center">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                <ArrowUpDown
                                                    size={14}
                                                    className={`ml-2 ${
                                                        sortConfig.key === key ? 'opacity-100' : 'opacity-50'
                                                    }`}
                                                />
                                            </div>
                                        </TableHead>
                                    ))}
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence>
                                    {sortedData.map((transaction) => (
                                        <motion.tr
                                            key={transaction.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{transaction.name}</TableCell>
                                            <TableCell>{transaction.description}</TableCell>
                                            <TableCell
                                                className={transaction.amount < 0 ? 'text-red-400' : 'text-green-400'}
                                            >
                                                ${Math.abs(transaction.amount).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => deleteExpense(transaction.id)}
                                                    className="hover:bg-red-900 hover:text-red-100 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </div>
                    {loading && (
                        <div className="flex justify-center items-center h-32">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                                <RefreshCcw size={24} className="text-gray-400" />
                            </motion.div>
                        </div>
                    )}
                    {!loading && data.length === 0 && (
                        <p className="text-center text-gray-400 py-4">No transactions found.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}