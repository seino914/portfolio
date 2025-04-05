import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "お問い合わせフォームです。",
  openGraph: {
    title: "Contact | Tonosaki Seinosuke",
    description: "お問い合わせフォームです。",
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
    title: "Contact | Tonosaki Seinosuke",
    description: "お問い合わせフォームです。",
    // images: ["https://seino.vercel.app/ogp.png"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
