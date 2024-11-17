'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronRight, DollarSign, PieChart, TrendingUp, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

const GridBackground = () => (
  <div className="absolute inset-0 bg-black">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
  </div>
)

// @ts-ignore
const AnimatedButton = ({ children, className, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Button className={`${className} transition-colors duration-200`} {...props}>
      {children}
    </Button>
  </motion.div>
)

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100 relative ov erflow-hidden">
      <GridBackground />
      <header className="relative z-10 px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Link className="flex items-center justify-center" href="#">
          <DollarSign className="h-6 w-6 text-indigo-400" />
          <span className="ml-2 text-xl font-bold text-indigo-400">
            Horizon
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-indigo-400 transition-colors"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-indigo-400 transition-colors"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-indigo-400 transition-colors"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:text-indigo-400 transition-colors"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Manage Your Finances with Ease
              </h1>
              <p className="max-w-[600px] text-gray-400 md:text-xl dark:text-gray-400 mx-auto">
                Take control of your financial future with our powerful and
                intuitive finance management application.``
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  onClick={() => router.push("/dashboard")}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  className="text-indigo-400 border-indigo-400 hover:bg-indigo-950"
                >
                  Learn More
                </AnimatedButton>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <PieChart className="h-10 w-10 mb-2 text-indigo-400" />
                  <CardTitle className="text-gray-100">
                    Expense Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Easily categorize and track your expenses to understand your
                    spending habits.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 mb-2 text-indigo-400" />
                  <CardTitle className="text-gray-100">
                    Investment Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Monitor and manage your investments with real-time data and
                    insights.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-indigo-400" />
                  <CardTitle className="text-gray-100">
                    Bill Splitting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Easily split bills and expenses with friends and family
                    members.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Financial Insights
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-100">
                    Monthly Expenses
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your spending across categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add chart component here */}
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-100">
                    Savings Growth
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Watch your savings grow over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add chart component here */}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              What Our Users Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-100">John Doe</CardTitle>
                  <CardDescription className="text-gray-400">
                    Freelancer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    "This app has completely transformed how I manage my
                    finances. Highly recommended!"
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-100">Jane Smith</CardTitle>
                  <CardDescription className="text-gray-400">
                    Small Business Owner
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    "The insights I get from this app have helped me make better
                    financial decisions for my business."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-100">Mike Johnson</CardTitle>
                  <CardDescription className="text-gray-400">
                    Student
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    "As a student, this app has been a lifesaver in helping me
                    budget and save money."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative z-10 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">
          © 2024 FinanceApp Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-100"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-100"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}