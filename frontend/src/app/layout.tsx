import type { Metadata, Viewport } from "next";
import { Syne, JetBrains_Mono, Syne_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor }    from "@/components/ui/CustomCursor";
import { ScrollProgress }  from "@/components/ui/ScrollProgress";
import { IntroLoader }     from "@/components/ui/IntroLoader";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const syneMono = Syne_Mono({
  subsets: ["latin"],
  variable: "--font-syne-mono",
  weight: "400",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://andrea.dev";

export const viewport: Viewport = {
  themeColor: "#050508",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Andrea — Data Scientist & Dev-Fullstack",
    template: "%s | Andrea",
  },
  description:
    "Data Scientist & Développeur Full-Stack — analyse de données, machine learning, dashboards Power BI et applications web. Diplômé ENI, basé à Antananarivo, Madagascar.",
  keywords: [
    "Data Scientist", "Dev Fullstack", "freelance", "Machine Learning",
    "Power BI", "Python", "Django", "FastAPI", "React", "PostgreSQL",
    "Antananarivo", "Madagascar", "ENI", "dashboard", "API REST",
  ],
  authors: [{ name: "Nantenaina Andrea RABEMANANTSOA" }],
  creator: "Nantenaina Andrea RABEMANANTSOA",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Andrea — Data Scientist & Dev-Fullstack",
    title: "Andrea — Data Scientist & Dev-Fullstack",
    description:
      "Data Scientist & Développeur Full-Stack — machine learning, Power BI, APIs REST, basé à Antananarivo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Andrea — Data Engineer & Analyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea — Data Scientist & Dev-Fullstack",
    description: "Data Scientist & Dev-Fullstack — machine learning, Power BI, APIs REST, Antananarivo.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${jetbrainsMono.variable} ${syneMono.variable}`}
    >
      <body className="mesh-bg antialiased">
        <IntroLoader />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
