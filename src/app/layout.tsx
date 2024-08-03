import "./globals.css";
import { ThemeProvider } from "@/components/ui/Theme/theme-provider";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import { Toaster } from "@/components/ui/toaster";
// import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Brighter Bee",
  description: "BrighterBee is a platform for project Management",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} md:overflow-hidden`}>
        <NextTopLoader color="var(--themeColor)" showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientProviders>{children}</ClientProviders>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
