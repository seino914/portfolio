import { Metadata } from "next";
import SkillsContent from "./SkillsContent";

export const metadata: Metadata = {
  title: "Skills",
  description: "Tonosaki Seinosukeのスキルセットをご紹介します。",
  openGraph: {
    title: "Skills | Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeのスキルセットをご紹介します。",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills | Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeのスキルセットをご紹介します。",
  },
};

export default function SkillsPage() {
  return <SkillsContent />;
}
