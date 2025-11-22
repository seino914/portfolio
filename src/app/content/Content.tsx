"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
// 各セクションのコンテンツ
import AboutContent from "@/src/app/section/about/AboutContent";
import ContactContent from "@/src/app/section/contact/ContactContent";
import SkillsContent from "@/src/app/section/skills/SkillsContent";
// UIコンポーネント
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { scrollStore } from "@/src/store/scrollStore";

// 3Dシーンを動的インポート（SSR無効化）
const Scene = dynamic(() => import("../../components/3d/Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-background" />,
});

function TopSection() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="top" className="pointer-events-none relative z-10 flex h-screen w-full snap-start snap-always flex-col items-center justify-center">
      <div className="container pointer-events-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="mb-6 text-6xl font-bold tracking-tighter text-white mix-blend-difference md:text-9xl">
            <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              Tonosaki
            </span>
            <span className="block bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Seinosuke
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl font-light tracking-wide text-muted-foreground/80 md:text-2xl">
            Software Engineer
          </p>

          <div className="flex justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-6 text-lg text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <Link href="#about" onClick={(e) => handleScrollTo(e, "about")}>About Me</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-6 text-lg text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <Link href="#skills" onClick={(e) => handleScrollTo(e, "skills")}>Skills</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-6 text-lg text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <Link href="#contact" onClick={(e) => handleScrollTo(e, "contact")}>Contact</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse text-sm uppercase tracking-widest text-white/50">
        Scroll
      </div>
    </section>
  );
}

export default function Content() {
  // スクロールイベントハンドラ
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight } = e.currentTarget;
    // 現在のページインデックス (0, 1, 2, 3...)
    const scrollProgress = scrollTop / clientHeight;
    scrollStore.target = scrollProgress;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* 1. WebGL Background Layer (Fixed) */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* 2. HTML Scroll Container (Overlay, Snap enabled) */}
      <div
        className="absolute inset-0 z-10 snap-y snap-mandatory overflow-y-auto scroll-smooth"
        onScroll={handleScroll}
      >
        <TopSection />

        <AboutContent />

        <SkillsContent />

        <ContactContent />
      </div>
    </div>
  );
}
