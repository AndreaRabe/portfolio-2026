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
    default: "Andrea — Data Analyst & Scientist",
    template: "%s | Andrea",
  },
  description:
    "Data Analyst & Scientist — analyse de données, machine learning, dashboards Power BI. Diplômé ENI, actuellement chez MCB Madagascar, basé à Antananarivo.",
  keywords: [
    "Data Analyst", "Data Scientist", "freelance", "Machine Learning",
    "Power BI", "Python", "PostgreSQL", "SQL", "Scikit-learn",
    "Antananarivo", "Madagascar", "ENI", "dashboard", "MCB",
  ],
  authors: [{ name: "Nantenaina Andrea RABEMANANTSOA" }],
  creator: "Nantenaina Andrea RABEMANANTSOA",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Andrea — Data Analyst & Scientist",
    title: "Andrea — Data Analyst & Scientist",
    description:
      "Data Analyst & Scientist — machine learning, Power BI, analyse de données, basé à Antananarivo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Andrea — Data Analyst & Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea — Data Analyst & Scientist",
    description: "Data Analyst & Scientist — machine learning, Power BI, analyse de données, Antananarivo.",
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
