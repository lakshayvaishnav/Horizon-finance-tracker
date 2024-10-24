import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { BarChart, LineChart } from "@/components/ui/chart";
import {
  ChevronRight,
  DollarSign,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-blue-900">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-blue-100">
        <Link className="flex items-center justify-center" href="#">
          <DollarSign className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-blue-600">
            FinanceApp
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-900">
                    Manage Your Finances with Ease
                  </h1>
                  <p className="max-w-[600px] text-blue-700 md:text-xl">
                    Take control of your financial future with our powerful and
                    intuitive finance management application.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/nft.webp"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-900">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <PieChart className="h-10 w-10 mb-2 text-blue-600" />
                  <CardTitle className="text-blue-900">
                    Expense Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    Easily categorize and track your expenses to understand your
                    spending habits.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 mb-2 text-blue-600" />
                  <CardTitle className="text-blue-900">
                    Investment Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    Monitor and manage your investments with real-time data and
                    insights.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-blue-600" />
                  <CardTitle className="text-blue-900">
                    Bill Splitting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    Easily split bills and expenses with friends and family
                    members.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-900">
              Financial Insights
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    Monthly Expenses
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Track your spending across categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <BarChart
                    className="w-full aspect-[4/3]"
                    data={[
                      { name: "Jan", total: 1200 },
                      { name: "Feb", total: 900 },
                      { name: "Mar", total: 1100 },
                      { name: "Apr", total: 1000 },
                      { name: "May", total: 800 },
                      { name: "Jun", total: 1500 },
                    ]}
                    colors={["blue"]}
                  /> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    Savings Growth
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Watch your savings grow over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <LineChart
                    className="w-full aspect-[4/3]"
                    data={[
                      { name: "Jan", total: 5000 },
                      { name: "Feb", total: 5500 },
                      { name: "Mar", total: 6000 },
                      { name: "Apr", total: 7000 },
                      { name: "May", total: 7500 },
                      { name: "Jun", total: 8500 },
                    ]}
                    colors={["blue"]}
                  /> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-900">
              What Our Users Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">John Doe</CardTitle>
                  <CardDescription className="text-blue-600">
                    Freelancer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    "This app has completely transformed how I manage my
                    finances. Highly recommended!"
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">Jane Smith</CardTitle>
                  <CardDescription className="text-blue-600">
                    Small Business Owner
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    "The insights I get from this app have helped me make better
                    financial decisions for my business."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">Mike Johnson</CardTitle>
                  <CardDescription className="text-blue-600">
                    Student
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    "As a student, this app has been a lifesaver in helping me
                    budget and save money."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-100 bg-blue-50">
        <p className="text-xs text-blue-600">
          © 2024 FinanceApp Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-800"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-800"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
