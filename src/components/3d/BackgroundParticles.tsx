"use client";

import { useMemo, useRef } from "react";
import { Line } from "@react-three/drei";
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
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // ノードの位置と速度を生成
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5 - 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          0
        ),
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // 位置の更新
      particle.position.add(particle.velocity);

      // 境界チェック（画面外に出たら反対側に戻す）
      if (Math.abs(particle.position.x) > 8) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 5) particle.velocity.y *= -1;

      // 行列の更新
      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* ノードの描画 (InstancedMesh) */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#6b21a8" />
      </instancedMesh>

      {/* インスタンス化された回路ライン（静的 + 一部動的） */}
      <CircuitLines />
    </group>
  );
}

function CircuitLines() {
  // ランダムなパスとそのプロパティを生成
  const pathData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        -2
      );
      const mid = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 2,
        start.y,
        -2
      ); // 直角に曲がる
      const end = new THREE.Vector3(
        mid.x,
        mid.y + (Math.random() - 0.5) * 2,
        -2
      );
      const path = [start, mid, end];
      const speed = 0.5 + Math.random() * 0.5;
      const offset = Math.random();
      data.push({ path, speed, offset });
    }
    return data;
  }, []);

  return (
    <group>
      {pathData.map(({ path, speed, offset }, i) => (
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
          <DataPacket path={path} speed={speed} offset={offset} />
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
  // ジオメトリとマテリアルを再利用するために、ここでは宣言だけして
  // 実際には親側で共有するのがベストだが、数が少ないので個別に作成でも可
  // ただし、useMemoでキャッシュすることは可能

  const geometry = useMemo(() => new THREE.BoxGeometry(0.05, 0.05, 0.05), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: "#a855f7" }), []);

  useFrame((state) => {
    if (!ref.current) return;

    const t = (state.clock.getElapsedTime() * speed + offset) % 1;

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
    <mesh ref={ref} geometry={geometry} material={material} />
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
