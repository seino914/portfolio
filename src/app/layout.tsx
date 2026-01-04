import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";
import { Navigation } from "@/src/components/navigation";
import { Toaster } from "sonner";
import { getSameAsLinks } from "@/src/lib/constants";

const inter = Inter({ subsets: ["latin"] });

// デフォルトのメタデータ
export const metadata: Metadata = {
  metadataBase: new URL("https://tonosaki-tech.com/"),
  title: {
    default: "Tonosaki Seinosuke",
    template: "%s | Tonosaki Seinosuke",
  },
  description: "Tonosaki Seinosukeのポートフォリオサイトです。エンジニア・開発者としてのスキル、プロジェクト、経歴を紹介しています。",
  keywords: [
    "Tonosaki Seinosuke",
    "外崎靖之輔",
    "とのさきせいのすけ",
    "Software Engineer",  
    "ポートフォリオ",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeのポートフォリオサイトです。エンジニア・開発者としてのスキル、プロジェクト、経歴を紹介しています。",
    url: "https://tonosaki-tech.com/",
    siteName: "Tonosaki Seinosuke",
    locale: "ja_JP",
    type: "website",
    // images: ["https://tonosaki-tech.com/og-image.jpg"], // OGP画像を追加する場合はコメントを外す
  },
  alternates: {
    canonical: "https://tonosaki-tech.com/",
  },
  authors: [
    {
      name: "Tonosaki Seinosuke",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeのポートフォリオサイトです。エンジニア・開発者としてのスキル、プロジェクト、経歴を紹介しています。",
  },
  verification: {
    google: "jY4YSH4OsSrQbWpr5K7-mX75Le6aU8QfQIlJobQYIxM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 構造化データ（JSON-LD）を追加
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tonosaki Seinosuke",
    alternateName: "外崎靖之輔",
    jobTitle: "Software Engineer",
    url: "https://tonosaki-tech.com",
    sameAs: getSameAsLinks(),
  };

  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          <Toaster
            closeButton
            theme="dark"
            className="bg-background border-purple-500/20"
            style={
              {
                "--toast-success": "rgb(168 85 247)",
                "--toast-error": "rgb(239 68 68)",
                "--toast-background": "rgb(23 23 23)",
              } as React.CSSProperties
            }
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
