import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";
import { Navigation } from "@/src/components/navigation";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

// デフォルトのメタデータ
export const metadata: Metadata = {
  metadataBase: new URL("https://tonosaki-tech.com/"),
  title: {
    default: "Tonosaki Seinosuke",
    template: "%s | Tonosaki Seinosuke",
  },
  description: "Tonosaki Seinosukeのポートフォリオサイトです。",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeのポートフォリオサイトです。",
    url: "https://tonosaki-tech.com/",
    siteName: "Tonosaki Seinosuke",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeのポートフォリオサイトです。",
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
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
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
