"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { socialLinks } from "@/src/lib/constants";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-purple-500/10">
      <div className="container px-4 py-32 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-purple-500">Tonosaki</span> Seinosuke
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12">
            Software Engineer
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 min-w-[140px]"
            >
              <Link href="/about">About Me</Link>
            </Button>
            {/* <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button> */}
            <Button asChild size="lg" variant="outline" className="min-w-[140px]">
              <Link
                href={
                  socialLinks.find((link) => link.label === "GitHub")?.href ||
                  "https://github.com/seino914"
                }
                className="flex items-center justify-center gap-2"
              >
                <FaGithub className="w-5 h-5" />
                Github
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
