import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "お問い合わせフォームです。",
  openGraph: {
    title: "Contact | Tonosaki Seinosuke",
    description: "お問い合わせフォームです。",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Tonosaki Seinosuke",
    description: "お問い合わせフォームです。",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
