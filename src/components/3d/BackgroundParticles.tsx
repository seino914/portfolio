"use client";

import { useMemo, useRef } from "react";
import { Line, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BackgroundParticles() {
  return (
    <group>
      {/* デジタルグリッドの床 */}
      <GridFloor />

      {/* 浮遊するデータノードと接続線 */}
      <NetworkNodes />

      {/* 背景のアクセントとしての幾何学図形 */}
      <BackgroundShapes />
    </group>
  );
}

function GridFloor() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, -5]}>
      {/* メイング​​リッド */}
      <gridHelper
        args={[40, 40, "#4c1d95", "#2e1065"]}
        position={[0, 0.01, 0]}
      />
      {/* 走査する光のバー */}
      <ScanningBar />
    </group>
  );
}

function ScanningBar() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      // グリッド上を前後にスキャン
      const t = state.clock.getElapsedTime();
      ref.current.position.z = Math.sin(t * 0.5) * 10;
      ref.current.scale.x = 20 + Math.sin(t * 2) * 5;
    }
  });

  return (
    <mesh ref={ref} rotation={[0, 0, 0]}>
      <planeGeometry args={[1, 0.2]} />
      <meshBasicMaterial
        color="#a855f7"
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function NetworkNodes() {
  const count = 40;
  const linesRef = useRef<any>(null); // Lineコンポーネントの型定義が複雑なためany回避推奨だが簡略化

  // ノードの位置と速度を生成
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5 - 2, // 少し奥に配置
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          0,
        ),
      });
    }
    return temp;
  }, []);

  // フレームごとの更新
  useFrame(() => {
    nodes.forEach((node) => {
      node.position.add(node.velocity);

      // 境界チェック（画面外に出たら反対側に戻す）
      if (Math.abs(node.position.x) > 8) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 5) node.velocity.y *= -1;
    });
  });

  // 近接するノード同士を結ぶ線を計算
  // 注意: 毎フレームの計算は重いため、LineSegmentsやInstancedMeshを使うのが最適だが、
  // ここではDreiのLineを使って簡易実装する（ノード数が少ないため可）

  // 今回はシンプルに、固定の「回路図」のようなラインを描画し、
  // その上をパケットが走る表現にする方が「工学的」かもしれない。
  // Pleans表現は有機的になりがちなので、今回は「Circuit」アプローチをとる。

  return (
    <group>
      {/* ノードの描画 */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#6b21a8" />
        </mesh>
      ))}

      {/* インスタンス化された回路ライン（静的 + 一部動的） */}
      <CircuitLines />
    </group>
  );
}

function CircuitLines() {
  // ランダムなパスを生成
  const paths = useMemo(() => {
    const p = [];
    for (let i = 0; i < 10; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        -2,
      );
      const mid = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 2,
        start.y,
        -2,
      ); // 直角に曲がる
      const end = new THREE.Vector3(
        mid.x,
        mid.y + (Math.random() - 0.5) * 2,
        -2,
      );
      p.push([start, mid, end]);
    }
    return p;
  }, []);

  return (
    <group>
      {paths.map((path, i) => (
        <group key={i}>
          {/* 回路の物理的な線 */}
          <Line
            points={path}
            color="#3b0764"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
          {/* 線上を走るパケット */}
          <DataPacket
            path={path}
            speed={0.5 + Math.random() * 0.5}
            offset={Math.random()}
          />
        </group>
      ))}
    </group>
  );
}

function DataPacket({
  path,
  speed,
  offset,
}: {
  path: THREE.Vector3[];
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t = (state.clock.getElapsedTime() * speed + offset) % 1;

    // パス上の位置を計算 (3点、2セグメントの場合)
    // セグメントの長さを考慮すべきだが、簡易的に等分割とみなす
    let targetPos;
    if (t < 0.5) {
      // 前半: start -> mid
      const localT = t * 2;
      targetPos = new THREE.Vector3().lerpVectors(path[0], path[1], localT);
    } else {
      // 後半: mid -> end
      const localT = (t - 0.5) * 2;
      targetPos = new THREE.Vector3().lerpVectors(path[1], path[2], localT);
    }

    ref.current.position.copy(targetPos);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial color="#a855f7" />
    </mesh>
  );
}

function BackgroundShapes() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref} position={[0, 0, -5]}>
      <mesh>
        <ringGeometry args={[3, 3.02, 64]} />
        <meshBasicMaterial color="#2e1065" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[3.5, 3.52, 4]} /> {/* 四角い枠 */}
        <meshBasicMaterial color="#2e1065" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
