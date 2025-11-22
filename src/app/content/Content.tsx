"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
// 各セクションのコンテンツ
import AboutContent from "@/src/app/section/about/AboutContent";
import ContactContent from "@/src/app/section/contact/ContactContent";
import SkillsContent from "@/src/app/section/skills/SkillsContent";
// UIコンポーネント
import { Button } from "@/src/components/ui/button";
import { Environment, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

// 3Dコンポーネント
import BackgroundParticles from "../../components/3d/BackgroundParticles";
import HeroObject from "../../components/3d/HeroObject";

// グローバルなスクロール状態を管理するためのストア（簡易的）
const scrollStore = {
  target: 0, // 目標スクロール位置 (0~1)
  current: 0, // 現在の補間された位置
};

function TopSection() {
  return (
    <section className="pointer-events-none relative z-10 flex h-screen w-full snap-start snap-always flex-col items-center justify-center">
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
              <Link href="#about">About Me</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-6 text-lg text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <Link href="#skills">Skills</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-6 text-lg text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <Link href="#contact">Contact</Link>
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

// 3D空間内に浮かぶセクションタイトル
function SectionTitles() {
  const group = useRef<THREE.Group>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useFrame(() => {
    if (!group.current) return;

    // 現在のページインデックスに近い整数を取得
    const index = Math.round(scrollStore.current);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }

    // 常にカメラの方を向く（ビルボード）
    group.current.lookAt(0, 0, 10);
  });

  // タイトルデータ
  const titles = [
    { text: "", index: 0 }, // TopはUI側で表示するので空
    { text: "About Me", index: 1 },
    { text: "Skills", index: 2 },
    { text: "Contact", index: 3 },
  ];

  return (
    <group ref={group}>
      {titles.map((item) => (
        <Text
          key={item.index}
          position={[0, 0, 1.1]} // オブジェクトより少し手前
          fontSize={0.6} // 少し大きくして存在感を出す
          // フォントURLを削除し、デフォルトフォントを使用（安定性優先）
          anchorX="center"
          anchorY="middle"
          fillOpacity={activeIndex === item.index ? 1 : 0}
          renderOrder={999} // 最前面に描画
          letterSpacing={0.05} // 少し字間を空けて読みやすく
          fontWeight={800} // 太字指定
        >
          {item.text}
          <meshBasicMaterial
            attach="material"
            color="#ffffff"
            transparent
            opacity={activeIndex === item.index ? 1 : 0}
            depthTest={false}
          />
        </Text>
      ))}
    </group>
  );
}

// スクロール連動リグ
function ScrollRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;

    // 減衰アニメーション
    scrollStore.current = THREE.MathUtils.lerp(
      scrollStore.current,
      scrollStore.target,
      0.1,
    );
    const p = scrollStore.current; // 0:Top, 1:About, 2:Skills, 3:Contact

    // セクションごとの移動ロジック (pは 0, 1, 2, 3 の値を取る)
    let targetX = 0;
    let targetZ = 0;
    let targetRotY = 0;

    if (p < 1) {
      // Top -> About (0 -> 1)
      // Aboutで右へ移動 (2.5)
      const progress = p;
      targetX = THREE.MathUtils.lerp(0, 2.5, progress);
      targetZ = THREE.MathUtils.lerp(0, 1, progress);
      targetRotY = THREE.MathUtils.lerp(0, -0.5, progress);
    } else if (p < 2) {
      // About -> Skills (1 -> 2)
      // Skillsで左へ移動 (-2.5)
      const progress = p - 1;
      targetX = THREE.MathUtils.lerp(2.5, -2.5, progress);
      targetZ = 1;
      targetRotY = THREE.MathUtils.lerp(-0.5, 0.5, progress);
    } else {
      // Skills -> Contact (2 -> 3)
      // Contactで再び右へ移動 (2.5)
      // 以前は中央(0)に戻していたが、左右レイアウトにするため右へ
      const progress = p - 2;
      targetX = THREE.MathUtils.lerp(-2.5, 2.5, progress);
      targetZ = THREE.MathUtils.lerp(1, 1, progress);
      targetRotY = THREE.MathUtils.lerp(0.5, -0.5, progress);
    }

    group.current.position.x = targetX;
    group.current.position.z = targetZ;
    group.current.rotation.y = targetRotY;
  });

  return (
    <group ref={group}>
      {children}
      <SectionTitles />
    </group>
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
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            <BackgroundParticles />
            <ScrollRig>
              <HeroObject />
            </ScrollRig>
          </Suspense>
        </Canvas>
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
