import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Tonosaki Seinosukeの自己紹介です。",
  openGraph: {
    title: "About | Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeの自己紹介です。",
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
    title: "About | Tonosaki Seinosuke",
    description: "Tonosaki Seinosukeの自己紹介です。",
    // images: ["https://seino.vercel.app/ogp.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
