import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { UserStateProvider } from "@/context/userStateContext";
import WavyFooter from "@/components/wavy-footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Movies List",
  description: "Website to store movie information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <div className="bg-[#093545] min-h-screen flex flex-col justify-between">
          <UserStateProvider>{children}</UserStateProvider>
          <WavyFooter />
        </div>
      </body>
    </html>
  );
}
