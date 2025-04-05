import { Metadata } from "next";
import SkillsContent from "./SkillsContent";

export const metadata: Metadata = {
  title: "Skills",
  description: "Tonosaki Seinosukeのスキルセットをご紹介します。",
  openGraph: {
    title: "Skills | Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeのスキルセットをご紹介します。",
    // images: [
    //   {
    //     url: "https://seino.vercel.app/ogp.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Tonosaki Seinosuke",
    //   },
    // ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills | Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeのスキルセットをご紹介します。",
    // images: ["https://seino.vercel.app/ogp.png"],
  },
};

export default function SkillsPage() {
  return <SkillsContent />;
}
