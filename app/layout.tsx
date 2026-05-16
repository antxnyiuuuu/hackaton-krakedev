import type { Metadata } from "next";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hackathon Krakedev | Rompe el Sistema",
  description: "Registro para la Hackathon de Krakedev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
