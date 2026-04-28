import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PredictedPath = ({ radius, color, isWarning }: { radius: number; color: string; isWarning?: boolean }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.01, radius + 0.01, 128]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={isWarning ? 0.4 : 0.15} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const DebrisField = ({ radius, count = 20 }: { radius: number; count?: number }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = radius + (Math.random() - 0.5) * 0.5;
        p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [radius, count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#94a3b8" transparent opacity={0.6} />
    </points>
  );
};

const Satellite = ({ id, orbit, color, isWarning }: { id: string; orbit: any; color: string; isWarning?: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const radius = 2 + (orbit.altitude / 1000);
  const speed = orbit.velocity / 10;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = (state.clock.getElapsedTime() + (orbit.phase || 0)) * speed;
    meshRef.current.position.x = Math.cos(time) * radius;
    meshRef.current.position.z = Math.sin(time) * radius;
    meshRef.current.position.y = Math.sin(time * 0.5) * (radius * 0.1);
  });

  return (
    <group>
      <PredictedPath radius={radius} color={color} isWarning={isWarning} />
      <group ref={meshRef}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={isWarning ? 4 : 2} 
          />
        </mesh>
        <pointLight color={color} intensity={isWarning ? 1 : 0.5} distance={1} />
        
        {isWarning && (
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
        )}
      </group>
    </group>
  );
};

const Earth = () => {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.5, 64, 64]}>
          <meshStandardMaterial 
            color="#0f172a" 
            roughness={0.7} 
            metalness={0.2} 
          />
        </Sphere>
        {/* Atmosphere glow */}
        <Sphere args={[1.6, 64, 64]}>
          <meshBasicMaterial 
            color="#3b82f6" 
            transparent 
            opacity={0.05}
            side={THREE.BackSide}
          />
        </Sphere>
        <Sphere args={[1.505, 64, 64]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            transparent 
            opacity={0.1}
            wireframe
          />
        </Sphere>
      </Float>
      <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, -2, 0]} />
    </group>
  );
};

export const Globe = () => {
  return (
    <div className="w-full h-full min-h-[400px] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
      <div className="absolute top-4 left-4 z-10 p-4 backdrop-blur-md bg-slate-950/40 rounded-xl border border-white/5">
        <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] font-black">Orbital Monitoring</h3>
        <p className="text-[10px] text-slate-500 font-mono mt-1">REGION // LEO_ZONE_09</p>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span className="text-[8px] font-black text-slate-300 uppercase">Active_Fleet</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="text-[8px] font-black text-slate-300 uppercase">Warning_Node</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Objects</div>
        <div className="text-2xl font-black text-slate-100 tracking-tighter">34,241</div>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[6, 3, 6]} />
        <OrbitControls enablePan={false} maxDistance={20} minDistance={3} autoRotate autoRotateSpeed={0.5} />
        < Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <Earth />
        
        {/* Active Fleet */}
        <Satellite id="f1" color="#0ea5e9" orbit={{ altitude: 500, velocity: 0.8, phase: 0 }} />
        <Satellite id="f2" color="#0ea5e9" orbit={{ altitude: 500, velocity: 0.8, phase: Math.PI }} />
        <Satellite id="f3" color="#0ea5e9" orbit={{ altitude: 1200, velocity: 0.5, phase: 2 }} />
        
        {/* Collision Risk Pair */}
        <Satellite id="w1" color="#ef4444" isWarning orbit={{ altitude: 800, velocity: 1.2, phase: 1 }} />
        <Satellite id="w2" color="#0ea5e9" isWarning orbit={{ altitude: 810, velocity: 1.1, phase: 1.05 }} />
        
        {/* Debris Fields */}
        <DebrisField radius={2.5} count={40} />
        <DebrisField radius={4} count={30} />
        
      </Canvas>
    </div>
  );
};
