import { Inter } from "next/font/google";

interface ILayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function Layout({ children }: ILayoutProps) {
  return <div className={`${inter.variable} font-inter`}>{children}</div>;
}
