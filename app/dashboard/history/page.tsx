'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Transaction {
  id: number
  date: string
  description: string
  amount: number
  category: string
}

// Mock data for transactions
const transactions: Transaction[] = [
  { id: 1, date: '2023-05-01', description: 'Grocery Shopping', amount: -75.50, category: 'Food' },
  { id: 2, date: '2023-05-02', description: 'Salary Deposit', amount: 3000, category: 'Income' },
  { id: 3, date: '2023-05-03', description: 'Electric Bill', amount: -120, category: 'Utilities' },
  { id: 4, date: '2023-05-04', description: 'Online Course', amount: -49.99, category: 'Education' },
  { id: 5, date: '2023-05-05', description: 'Restaurant Dinner', amount: -85, category: 'Food' },
  // Add more transactions as needed
]

type SortColumn = keyof Transaction
type SortDirection = 'asc' | 'desc'

export default function TransactionHistory(): React.ReactElement {
  const [sortColumn, setSortColumn] = useState<SortColumn>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [filterCategory, setFilterCategory] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const filteredTransactions = sortedTransactions.filter(
    (transaction) =>
      (filterCategory.length === 0 || filterCategory.includes(transaction.category)) &&
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSort = (column: SortColumn): void => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const toggleCategoryFilter = (category: string): void => {
    setFilterCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Categories <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Array.from(new Set(transactions.map((t) => t.category))).map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={filterCategory.includes(category)}
                    onCheckedChange={() => toggleCategoryFilter(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {(['date', 'description', 'amount', 'category'] as const).map((column) => (
                  <TableHead key={column} onClick={() => handleSort(column)} className="cursor-pointer">
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                    {sortColumn === column && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(new Date(transaction.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}