import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="min-h-screen  flex flex-col">
      <header className="bg-white p-4 flex-row flex  items-center justify-between ">
        <h1 className="text-blue-500 font-bold text-xl ml-5">Horizon</h1>
        <nav className="flex ml-auto mr-5 text-blue-500 text-sm gap-6">
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>Features</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Contact</Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full bg-blue-50">
          <div className="container px-8  py-20">
            <div className="grid grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-5xl font-bold tracking-tighter text-blue-800">
                  {" "}
                  Manage Your Finances with Ease
                </h1>
                <p className="text-blue-500">
                  Take control of your financial future with our powerful and
                  intuitive finance management application.
                </p>

                <div className="flex w-full gap-6">
                  <Button
                    size={"lg"}
                    className="bg-blue-500 hover:bg-blue-700 text-white"
                    variant={"default"}
                  >
                    Get Started
                  </Button>

                  <Button className="" variant={"outline"} size={"lg"}>
                    Learn Mre
                  </Button>
                </div>
              </div>
              <Image src={"/nft.webp"} width="300" height="300" alt="" />
            </div>
          </div>
        </section>
        <section className="w-full">
          <div className="flex justify-center items-center mt-20">
            <h1 className="text-4xl font-bold text-blue-800 tracking-tighter">
              Key Features
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
}
