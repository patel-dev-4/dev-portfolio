import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
<<<<<<< HEAD
import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  title: "Dev Patel | Full Stack Developer | Enterprise Web Applications",
  description: "Personal portfolio of Dev Patel, a Full Stack Developer specializing in React, TypeScript, Java Spring Boot, and enterprise workflow systems.",
  keywords: ["Full Stack Developer", "React Developer", "Java Spring Boot", "Enterprise Software", "Workflow Systems", "Dev Patel Portfolio"],
  authors: [{ name: "Dev Patel" }],
  openGraph: {
    title: "Dev Patel | Full Stack Developer",
    description: "Building scalable web applications and enterprise systems with a focus on UI/UX and robust backends.",
    type: "website",
  }
=======
import Chatbot from "@/components/Chatbot"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Portfolio",
  description:
    "The exclusive development portfolio and interactive resume of Dev.",
>>>>>>> d17808455001810d193735fa22286161634336f6
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
=======
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
>>>>>>> d17808455001810d193735fa22286161634336f6
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
<<<<<<< HEAD
          <ScrollProgress />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Chatbot />
=======
          {children}
          <Chatbot />{" "}
          {/* <-- 2. We place it here so it floats on the screen! */}
>>>>>>> d17808455001810d193735fa22286161634336f6
        </ThemeProvider>
      </body>
    </html>
  );
}
