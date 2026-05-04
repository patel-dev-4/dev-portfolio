import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
// import Chatbot from "@/components/Chatbot";

// import ThemeTransition from "@/components/ThemeTransition";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: '--font-manrope',
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
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${manrope.variable} font-sans bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <SmoothScroll />
          {/* <WelcomeAudio /> */}
          {/* <ThemeTransition /> */}
          <ScrollProgress />
          <div className="max-w-[2000px] mx-auto relative shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-background">
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          {/* <Chatbot /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
