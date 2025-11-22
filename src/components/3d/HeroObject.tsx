"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroObject() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState(false);

  // アニメーションの状態保持用
  const animState = useRef({
    expansion: 1.0,
    slideIntensity: 0,
  });

  // グリッド設定
  const gridSize = 8;
  const count = gridSize * gridSize * gridSize;

  // インスタンス計算用
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  // データ生成
  const particles = useMemo(() => {
    const temp = [];
    const offset = (gridSize - 1) / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // 一部のブロックを間引く
          if ((x + y + z) % 3 === 0 && Math.random() > 0.8) continue;

          temp.push({
            x: (x - offset) * 0.4,
            y: (y - offset) * 0.4,
            z: (z - offset) * 0.4,
            // アクセスランプの点滅パターンを個別に持つ
            blinkSpeed: Math.random() * 2 + 0.5,
            blinkPhase: Math.random() * Math.PI * 2,
            isBlinking: Math.random() > 0.9,
          });
        }
      }
    }
    return temp;
  }, [gridSize]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Lerpによる状態の滑らかな更新
    const targetExpansion = hovered ? 1.2 : 1.0;
    const targetSlideIntensity = hovered ? 0.15 : 0;

    // フレームレートに依存しない補間
    const lerpFactor = 1 - Math.exp(-delta * 4); // 収束速度

    animState.current.expansion = THREE.MathUtils.lerp(
      animState.current.expansion,
      targetExpansion,
      lerpFactor,
    );
    animState.current.slideIntensity = THREE.MathUtils.lerp(
      animState.current.slideIntensity,
      targetSlideIntensity,
      lerpFactor,
    );

    const { expansion, slideIntensity } = animState.current;

    // 全体の回転
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;

    let idx = 0;

    // 事前に色オブジェクトを作成（ループ外で）
    const baseColor = new THREE.Color("#1a1a2e");
    const highlightColor = new THREE.Color();

    particles.forEach((particle) => {
      const { x, y, z, isBlinking, blinkSpeed, blinkPhase } = particle;

      // 位置とスケールの計算
      // スライド: Y座標に基づいて、特定の層だけが横にせり出す
      // Math.sin(y * 2) を使うことで、層ごとのズレを作る
      const slideAmount = Math.sin(y * 2 + time) * slideIntensity;

      dummy.position.set(
        x * expansion + slideAmount, // X方向にのみスライド
        y * expansion,
        z * expansion,
      );

      // プレート形状
      dummy.scale.set(1, 0.2, 1);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(idx, dummy.matrix);

      // 色の計算
      // 1. データストリーム (Y軸方向の走査線)
      // 閾値を緩やかにして、パキッとした変化を防ぐ
      const streamPos = (Math.sin(y * 4 - time * 3) + 1) / 2;
      const streamIntensity = Math.pow(streamPos, 8); // ピークを鋭くするが、グラデーションは残す

      // 2. 明滅 (Blink)
      // 滑らかな明滅: (sin + 1) / 2 で 0~1 の範囲にする
      const blinkValue = isBlinking
        ? (Math.sin(time * blinkSpeed * 5 + blinkPhase) + 1) / 2
        : 0;

      // 最終的な発光強度
      const glowIntensity = Math.max(streamIntensity, blinkValue);

      if (glowIntensity > 0.01) {
        // 発光色: ネオンパープルベース
        // 強度に応じて白に近づける
        highlightColor.setHSL(0.75, 0.9, 0.1 + glowIntensity * 0.5);

        // ベースカラーと発光色をブレンド
        // hovered時はより明るく
        const mixFactor = Math.min(1, glowIntensity * (hovered ? 1.5 : 0.8));
        color.lerpColors(baseColor, highlightColor, mixFactor);
      } else {
        color.copy(baseColor);
        // 深度によるシェーディング
        const depth = (z + 2) * 0.1;
        color.offsetHSL(0, 0, depth);
      }

      meshRef.current!.setColorAt(idx, color);
      idx++;
    });

    meshRef.current.count = idx;
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* よりシンプルなBoxGeometryに戻して描画負荷を下げる */}
      <boxGeometry args={[0.35, 0.35, 0.35]} />
      <meshStandardMaterial
        roughness={0.2} // ツルツルにして高級感
        metalness={0.9} // 金属感
        emissive="#4c1d95"
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  );
}
