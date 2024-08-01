import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { useAppSelector } from "@/hooks/useStoreTypes";

interface ILayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function Layout({ children }: ILayoutProps) {
  const router = useRouter();
  const { pageTitles } = useAppSelector((state) => state.ui);

  const path =
    router.pathname &&
    router.pathname?.split("/")[router?.pathname?.split("/")?.length - 1]?.replace(/-/g, " ");

  return (
    <>
      <Head>
        <title>Drio - {pageTitles[path] ?? "We make data sharing simple!"}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Drio - We make data sharing simple!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="We are an insertable SaaS service that will connect to your data sources and allow them to be accessed by anyone you have a contract with based on the access rights you define!"
        />
      </Head>

      <div className={`${inter.variable} font-inter`}>{children}</div>
    </>
  );
}
