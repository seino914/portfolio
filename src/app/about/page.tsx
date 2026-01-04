import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Tonosaki Seinosukeの自己紹介です。",
  openGraph: {
    title: "About | Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeの自己紹介です。",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeの自己紹介です。",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
