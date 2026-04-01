"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Nodes ─────────────────────────────────────────────────────────────────────
function Nodes({ count = 70 }: { count?: number }) {
  const ref = useRef<THREE.Group>(null!);

  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6;
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    // Build edges between nearby nodes
    const edgePositions: number[] = [];
    const maxDist = 2.2;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < maxDist) {
          edgePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z,
          );
        }
      }
    }

    return { positions, connections: new Float32Array(edgePositions) };
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* Nodes */}
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.06}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>

      {/* Violet accent nodes (subset) */}
      <Points positions={positions.slice(0, 30 * 3)} stride={3}>
        <PointMaterial
          transparent
          color="#7B61FF"
          size={0.04}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
export function ParticleGraph() {
  return (
    <div
      className="absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Nodes count={70} />
      </Canvas>
    </div>
  );
}
