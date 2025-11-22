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
import { smoothScrollTo } from "@/src/lib/utils";

// 3Dシーンを動的インポート（SSR無効化）
const Scene = dynamic(() => import("../../components/3d/Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-background" />,
});

function TopSection() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  return (
    <section id="top" className="pointer-events-none relative z-10 flex min-h-screen w-full snap-start snap-always flex-col items-center justify-center py-20 md:h-screen md:py-0">
      <div className="container pointer-events-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="mb-4 text-6xl font-bold tracking-tighter text-white mix-blend-difference sm:text-6xl md:mb-6 md:text-9xl">
            <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              Tonosaki
            </span>
            <span className="block bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Seinosuke
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg font-light tracking-wide text-muted-foreground/80 md:mb-12 md:text-2xl">
            Software Engineer
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row md:gap-6">
            <Button
              asChild
              size="lg"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 md:px-8 md:py-6 md:text-lg"
            >
              <Link href="#about" onClick={(e) => handleClick(e, "about")}>About Me</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 md:px-8 md:py-6 md:text-lg"
            >
              <Link href="#skills" onClick={(e) => handleClick(e, "skills")}>Skills</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 md:px-8 md:py-6 md:text-lg"
            >
              <Link href="#contact" onClick={(e) => handleClick(e, "contact")}>Contact</Link>
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
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;

    // 各セクションの要素を取得
    const top = document.getElementById("top");
    const about = document.getElementById("about");
    const skills = document.getElementById("skills");
    const contact = document.getElementById("contact");

    if (!top || !about || !skills || !contact) {
      // 要素が見つからない場合は単純計算（フォールバック）
      const { clientHeight } = container;
      const scrollProgress = scrollTop / clientHeight;
      scrollStore.target = scrollProgress;
      return;
    }

    // 各セクションの開始位置と高さを取得
    const sections = [top, about, skills, contact];
    let currentProgress = 0;

    // 現在のスクロール位置がどのセクションにあるか判定
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // セクションの範囲内、またはそれ以降にいる場合
      if (scrollTop >= sectionTop - 10) { // マージンを少し持たせる
        if (scrollTop < sectionTop + sectionHeight - 10) {
          // このセクションの中にいる
          // マージン(-10px)分で入った場合、計算値が負になるのを防ぐために0で下限クリップ
          const progressWithinSection = Math.max(0, (scrollTop - sectionTop) / sectionHeight);
          currentProgress = i + progressWithinSection;
          break;
        } else {
          // このセクションは通過済み
          // 次のセクションに到達していない場合でも、このセクションは完了したものとして扱う
          currentProgress = i + 1;
        }
      } else {
        // このセクションより手前にいる
        break;
      }
    }

    // 範囲外の補正 (0 ~ 3)
    // 最後のセクション(contact)の終わり際は 3.0 を超える可能性があるのでキャップする
    // ただし、Scene側で >3 の処理をしていないなら 3.0 で止めるのが無難
    currentProgress = Math.min(Math.max(currentProgress, 0), 3);

    scrollStore.target = currentProgress;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* 1. WebGL Background Layer (Fixed) */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* 2. HTML Scroll Container (Overlay, Snap enabled only on desktop) */}
      <div
        className="absolute inset-0 z-10 overflow-y-auto scroll-smooth md:snap-y md:snap-mandatory"
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
