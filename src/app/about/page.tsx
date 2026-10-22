import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tonosaki Seinosukeの自己紹介です。Web開発・AI駆動開発、DX・AX支援を行うソフトウェアエンジニアです。",
  openGraph: {
    title: "About | Tonosaki Seinosuke",
    description:
      "Tonosaki Seinosukeの自己紹介です。Web開発・AI駆動開発、DX・AX支援を行うソフトウェアエンジニアです。",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Tonosaki Seinosuke",
    description:
      "Tonosaki Seinosukeの自己紹介です。Web開発・AI駆動開発、DX・AX支援を行うソフトウェアエンジニアです。",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
