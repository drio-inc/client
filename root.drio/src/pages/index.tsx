import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/comps/Layout/Layout";

import Button from "@ui/Button";
import { HiArrowRight } from "react-icons/hi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <section className="flex min-h-screen flex-col items-center justify-center relative w-full">
        <Image
          src="/logo.svg"
          alt="Drio Logo"
          width={145}
          height={145}
          className="absolute top-0 left-0 m-6"
        />
        <h1 className="text-center text-6xl md:text-8xl font-semibold">
          Welcome to <span className="text-[#C44240]">DRIO Root</span>
        </h1>
        <Button
          intent={"primary"}
          className="mt-8 flex justify-center items-center"
        >
          <Link href="/login" className="text-lg md:text-2xl py-2">
            Login to your account
            <HiArrowRight className="inline-block w-6 h-6 ml-2" />
          </Link>
        </Button>
      </section>
    </Layout>
  );
}
