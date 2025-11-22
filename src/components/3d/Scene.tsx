"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Environment, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import BackgroundParticles from "./BackgroundParticles";
import HeroObject from "./HeroObject";
import { scrollStore } from "@/src/store/scrollStore";

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

export default function Scene() {
  return (
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
  );
}


