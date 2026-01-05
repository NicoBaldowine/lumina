'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================================================
// CUSTOM SHADER - Premium Aurora/Mesh Gradient
// ============================================================================
// This shader uses layered simplex noise (FBM) to create organic, flowing gradients
// Colors: Deep charcoal base with teal/emerald aurora highlights
// ============================================================================

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColorBase;      // Deep charcoal background
  uniform vec3 uColorPrimary;   // Teal/cyan aurora
  uniform vec3 uColorSecondary; // Emerald green
  uniform vec3 uColorAccent;    // Warm accent (subtle)
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uVignetteStrength;
  uniform int uReducedMotion;

  varying vec2 vUv;

  // =========================================
  // Simplex 3D Noise (optimized)
  // =========================================
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // =========================================
  // Fractal Brownian Motion (FBM)
  // Creates organic, layered noise patterns
  // =========================================
  float fbm(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float lacunarity = 2.0;
    float persistence = 0.5;

    for (int i = 0; i < 6; i++) {
      if (i >= octaves) break;
      value += amplitude * snoise(p * frequency);
      frequency *= lacunarity;
      amplitude *= persistence;
    }
    return value;
  }

  // =========================================
  // Smooth vignette for readability
  // =========================================
  float vignette(vec2 uv, float strength) {
    vec2 centered = uv - 0.5;
    float dist = length(centered);
    return 1.0 - smoothstep(0.2, 0.9, dist * strength);
  }

  void main() {
    vec2 uv = vUv;
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 scaledUv = vec2(uv.x * aspectRatio, uv.y);

    // Time factor (frozen if reduced motion)
    float time = uReducedMotion == 1 ? 0.0 : uTime * uSpeed;

    // =========================================
    // Layer 1: Primary aurora field (teal/cyan)
    // Slow, large-scale movement
    // =========================================
    vec3 pos1 = vec3(scaledUv * 1.5, time * 0.15);
    float noise1 = fbm(pos1, 4);
    noise1 = smoothstep(-0.3, 0.6, noise1);

    // =========================================
    // Layer 2: Secondary aurora field (emerald)
    // Medium scale, offset movement
    // =========================================
    vec3 pos2 = vec3(scaledUv * 2.0 + vec2(1.7, 0.8), time * 0.12 + 100.0);
    float noise2 = fbm(pos2, 4);
    noise2 = smoothstep(-0.2, 0.7, noise2);

    // =========================================
    // Layer 3: Detail/accent layer
    // Faster, smaller details for depth
    // =========================================
    vec3 pos3 = vec3(scaledUv * 3.5 + vec2(-0.5, 2.0), time * 0.2 + 50.0);
    float noise3 = fbm(pos3, 3);
    noise3 = smoothstep(-0.1, 0.5, noise3) * 0.5;

    // =========================================
    // Color mixing with soft blending
    // =========================================
    vec3 color = uColorBase;

    // Add primary aurora (teal/cyan)
    color = mix(color, uColorPrimary, noise1 * uIntensity * 0.7);

    // Add secondary aurora (emerald)
    color = mix(color, uColorSecondary, noise2 * uIntensity * 0.5);

    // Add subtle accent highlights
    color = mix(color, uColorAccent, noise3 * uIntensity * 0.3);

    // =========================================
    // Apply vignette for text readability
    // Darkens edges, keeps center readable
    // =========================================
    float vig = vignette(uv, uVignetteStrength);
    color = mix(uColorBase * 0.7, color, vig);

    // =========================================
    // Subtle contrast adjustment
    // =========================================
    color = pow(color, vec3(0.95));

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ============================================================================
// Aurora Mesh Component (renders the shader on a fullscreen plane)
// ============================================================================
interface AuroraMeshProps {
  speed?: number;
  intensity?: number;
  vignetteStrength?: number;
  colorBase?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  colorAccent?: string;
  reducedMotion?: boolean;
}

function AuroraMesh({
  speed = 0.4,
  intensity = 0.85,
  vignetteStrength = 1.2,
  colorBase = '#1a1a1a',
  colorPrimary = '#0d9488',    // Teal-600
  colorSecondary = '#059669',  // Emerald-600
  colorAccent = '#14b8a6',     // Teal-400
  reducedMotion = false,
}: AuroraMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Convert hex colors to THREE.Color
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uColorBase: { value: new THREE.Color(colorBase) },
      uColorPrimary: { value: new THREE.Color(colorPrimary) },
      uColorSecondary: { value: new THREE.Color(colorSecondary) },
      uColorAccent: { value: new THREE.Color(colorAccent) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uVignetteStrength: { value: vignetteStrength },
      uReducedMotion: { value: reducedMotion ? 1 : 0 },
    }),
    [colorBase, colorPrimary, colorSecondary, colorAccent, speed, intensity, vignetteStrength, reducedMotion]
  );

  // Animate the shader
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uResolution.value.set(viewport.width, viewport.height);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// ============================================================================
// Main Aurora Background Component
// ============================================================================
interface AuroraBackgroundGLProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  className?: string;
  // Customization props
  speed?: number;
  intensity?: number;
  vignetteStrength?: number;
}

export function AuroraBackgroundGL({
  children,
  variant = 'dark',
  className = '',
  speed = 0.4,
  intensity = 0.85,
  vignetteStrength = 1.2,
}: AuroraBackgroundGLProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle reduced motion preference
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const isDark = variant === 'dark';

  // Color configurations
  const colors = isDark
    ? {
        base: '#1a1a1a',
        primary: '#0d9488',    // Teal
        secondary: '#059669',  // Emerald
        accent: '#14b8a6',     // Bright teal
      }
    : {
        base: '#f5f5f5',
        primary: '#2dd4bf',    // Lighter teal for light mode
        secondary: '#34d399',  // Lighter emerald
        accent: '#5eead4',     // Very light teal
      };

  return (
    <div
      className={`relative flex flex-col min-h-screen items-center justify-center overflow-hidden ${
        isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-black'
      } ${className}`}
    >
      {/* WebGL Canvas - renders the aurora shader */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 1.5]} // Limit DPR for performance
            camera={{ position: [0, 0, 1] }}
            style={{ background: isDark ? '#1a1a1a' : '#f5f5f5' }}
          >
            <AuroraMesh
              speed={speed}
              intensity={isDark ? intensity : intensity * 0.6}
              vignetteStrength={vignetteStrength}
              colorBase={colors.base}
              colorPrimary={colors.primary}
              colorSecondary={colors.secondary}
              colorAccent={colors.accent}
              reducedMotion={reducedMotion}
            />
          </Canvas>
        </div>
      )}

      {/* Noise/grain overlay for premium feel (prevents banding) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dark overlay for extra text readability (subtle) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(26,26,26,0.3) 70%, rgba(26,26,26,0.6) 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(245,245,245,0.3) 70%, rgba(245,245,245,0.6) 100%)',
        }}
      />

      {/* Bottom fade gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(34,34,34,0.5) 80%, rgba(34,34,34,1) 100%)'
            : 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(255,255,255,0.5) 80%, rgba(255,255,255,1) 100%)',
        }}
      />

      {/* Children content */}
      {children}
    </div>
  );
}

export default AuroraBackgroundGL;
