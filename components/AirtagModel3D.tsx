"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function AirtagModel() {
    const { scene } = useGLTF("/airtagbleu.glb");
    const meshRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.4;
        }
    });

    return (
        <group ref={meshRef} scale={3} position={[0, -0.5, 0]}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload("/airtagbleu.glb");

export default function AirtagModel3D() {
    return (
        <div className="w-full h-full min-h-[500px]" style={{ cursor: "grab" }}>
            <Canvas
                camera={{ position: [0, 2, 7.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} />
                <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#4EFFC5" />
                <pointLight position={[0, 3, 0]} intensity={0.5} color="#7B5CF5" />

                <Suspense fallback={null}>
                    <AirtagModel />
                    <Environment preset="city" />
                    <ContactShadows
                        position={[0, -1, 0]}
                        opacity={0.3}
                        scale={6}
                        blur={2.5}
                        far={4}
                        color="#4EFFC5"
                    />
                </Suspense>

                {/* Interactive controls — drag to spin */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.8}
                />
            </Canvas>
        </div>
    );
}
