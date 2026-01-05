'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

// ============================================================================
// AURORA CANVAS - Premium Atmospheric Gradient Background
// ============================================================================
// A 2D canvas renderer that creates organic, flowing "light volumes"
// with procedural noise, vignette, and proper motion physics.
// ============================================================================

// ============================================================================
// CONFIGURATION - Tweak these for visual tuning
// ============================================================================
interface AuroraConfig {
  // Motion
  speed: number;              // Global speed multiplier (0.1 = slow, 1 = normal)
  noiseScale: number;         // How much noise affects blob position
  noiseSpeed: number;         // How fast the noise evolves

  // Blobs
  blobCount: number;          // Number of light volumes (2-4 recommended)
  blobSize: number;           // Base size multiplier (0.3-0.6 of canvas)
  blobSoftness: number;       // Edge softness (higher = softer edges)

  // Colors
  baseColor: string;          // Deep background color
  colors: string[];           // Blob colors (teal, emerald, accent)
  colorIntensity: number;     // Color strength (0-1)

  // Post-processing
  vignetteStrength: number;   // Edge darkening (0-1)
  vignetteRadius: number;     // How far vignette extends (0.3-0.8)
  noiseOpacity: number;       // Grain overlay (0.02-0.06)
  contrast: number;           // Contrast boost (1.0-1.3)
}

const DEFAULT_CONFIG: AuroraConfig = {
  speed: 0.3,
  noiseScale: 80,
  noiseSpeed: 0.0003,
  blobCount: 4,
  blobSize: 0.5,
  blobSoftness: 0.7,
  baseColor: '#0f0f0f',
  colors: [
    '#0d9488', // Teal-600
    '#059669', // Emerald-600
    '#14b8a6', // Teal-400
    '#065f46', // Emerald-800 (deep accent)
  ],
  colorIntensity: 0.75,
  vignetteStrength: 0.65,
  vignetteRadius: 0.5,
  noiseOpacity: 0.04,
  contrast: 1.15,
};

// ============================================================================
// SIMPLEX-LIKE VALUE NOISE (Lightweight procedural noise)
// ============================================================================
class ValueNoise {
  private permutation: number[];

  constructor(seed: number = 0) {
    // Create permutation table
    this.permutation = [];
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = i;
    }
    // Shuffle with seed
    let n = seed;
    for (let i = 255; i > 0; i--) {
      n = (n * 1103515245 + 12345) & 0x7fffffff;
      const j = n % (i + 1);
      [this.permutation[i], this.permutation[j]] = [this.permutation[j], this.permutation[i]];
    }
    // Duplicate for overflow
    this.permutation = [...this.permutation, ...this.permutation];
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }

  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const A = this.permutation[X] + Y;
    const B = this.permutation[X + 1] + Y;

    return this.lerp(
      this.lerp(this.grad(this.permutation[A], x, y), this.grad(this.permutation[B], x - 1, y), u),
      this.lerp(this.grad(this.permutation[A + 1], x, y - 1), this.grad(this.permutation[B + 1], x - 1, y - 1), u),
      v
    );
  }

  // Fractal Brownian Motion for smoother, more organic noise
  fbm(x: number, y: number, octaves: number = 4): number {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2D(x * frequency, y * frequency);
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    return value / maxValue;
  }
}

// ============================================================================
// BLOB CLASS - Individual light volume with physics
// ============================================================================
interface Blob {
  x: number;           // Current X position (0-1)
  y: number;           // Current Y position (0-1)
  baseX: number;       // Base X (anchor point)
  baseY: number;       // Base Y (anchor point)
  vx: number;          // Velocity X
  vy: number;          // Velocity Y
  size: number;        // Size multiplier
  color: string;       // Blob color
  noiseOffsetX: number; // Unique noise offset
  noiseOffsetY: number;
  phase: number;       // Animation phase offset
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 0, g: 0, b: 0 };
}

function createNoiseTexture(width: number, height: number): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 255;
    data[i] = noise;     // R
    data[i + 1] = noise; // G
    data[i + 2] = noise; // B
    data[i + 3] = 255;   // A
  }

  return imageData;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
interface AuroraCanvasProps {
  variant?: 'dark' | 'light';
  config?: Partial<AuroraConfig>;
  className?: string;
}

export function AuroraCanvas({
  variant = 'dark',
  config: userConfig = {},
  className = '',
}: AuroraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const noiseRef = useRef<ValueNoise | null>(null);
  const blobsRef = useRef<Blob[]>([]);
  const noiseTextureRef = useRef<ImageData | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Merge config with defaults
  const config: AuroraConfig = { ...DEFAULT_CONFIG, ...userConfig };

  // Adjust for light mode
  if (variant === 'light') {
    config.baseColor = '#f8f8f8';
    config.colorIntensity = 0.5;
    config.vignetteStrength = 0.4;
  }

  // Initialize blobs
  const initBlobs = useCallback((width: number, height: number) => {
    const blobs: Blob[] = [];

    for (let i = 0; i < config.blobCount; i++) {
      // Distribute blobs across canvas with some randomness
      const angle = (i / config.blobCount) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 0.15 + Math.random() * 0.2;

      blobs.push({
        x: 0.5 + Math.cos(angle) * radius,
        y: 0.5 + Math.sin(angle) * radius,
        baseX: 0.5 + Math.cos(angle) * radius,
        baseY: 0.5 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.0002,
        vy: (Math.random() - 0.5) * 0.0002,
        size: 0.8 + Math.random() * 0.4,
        color: config.colors[i % config.colors.length],
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        phase: Math.random() * Math.PI * 2,
      });
    }

    blobsRef.current = blobs;
  }, [config.blobCount, config.colors]);

  // Render frame
  const render = useCallback((
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const noise = noiseRef.current!;
    const blobs = blobsRef.current;

    // Clear with base color
    const baseRgb = hexToRgb(config.baseColor);
    ctx.fillStyle = config.baseColor;
    ctx.fillRect(0, 0, width, height);

    // Create offscreen canvas for blob compositing
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext('2d')!;

    // Update and render each blob
    blobs.forEach((blob, i) => {
      // Update position with noise displacement
      const noiseX = noise.fbm(
        blob.noiseOffsetX + time * config.noiseSpeed,
        blob.noiseOffsetY,
        3
      );
      const noiseY = noise.fbm(
        blob.noiseOffsetX,
        blob.noiseOffsetY + time * config.noiseSpeed,
        3
      );

      // Organic circular motion + noise
      const orbitSpeed = config.speed * 0.0005;
      const orbitRadius = 0.08;
      blob.x = blob.baseX +
        Math.sin(time * orbitSpeed + blob.phase) * orbitRadius +
        noiseX * (config.noiseScale / width);
      blob.y = blob.baseY +
        Math.cos(time * orbitSpeed * 0.7 + blob.phase) * orbitRadius * 0.6 +
        noiseY * (config.noiseScale / height);

      // Clamp to canvas bounds (with padding)
      blob.x = Math.max(0.1, Math.min(0.9, blob.x));
      blob.y = Math.max(0.1, Math.min(0.9, blob.y));

      // Calculate blob dimensions
      const blobWidth = width * config.blobSize * blob.size;
      const blobHeight = height * config.blobSize * blob.size * 0.7; // Slightly elongated

      // Create radial gradient for blob
      const centerX = blob.x * width;
      const centerY = blob.y * height;
      const gradientRadius = Math.max(blobWidth, blobHeight);

      const gradient = offCtx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, gradientRadius
      );

      const blobRgb = hexToRgb(blob.color);
      const intensity = config.colorIntensity * (0.8 + Math.sin(time * 0.0002 + blob.phase) * 0.2);

      // Multi-stop gradient for soft, natural falloff
      gradient.addColorStop(0, `rgba(${blobRgb.r}, ${blobRgb.g}, ${blobRgb.b}, ${intensity * 0.6})`);
      gradient.addColorStop(0.2, `rgba(${blobRgb.r}, ${blobRgb.g}, ${blobRgb.b}, ${intensity * 0.4})`);
      gradient.addColorStop(0.5, `rgba(${blobRgb.r}, ${blobRgb.g}, ${blobRgb.b}, ${intensity * 0.15})`);
      gradient.addColorStop(config.blobSoftness, `rgba(${blobRgb.r}, ${blobRgb.g}, ${blobRgb.b}, ${intensity * 0.05})`);
      gradient.addColorStop(1, `rgba(${blobRgb.r}, ${blobRgb.g}, ${blobRgb.b}, 0)`);

      offCtx.fillStyle = gradient;
      offCtx.fillRect(0, 0, width, height);
    });

    // Composite blobs with screen/lighten blend mode
    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(offscreen, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    // Apply vignette
    const vignetteGradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) * 0.8
    );
    vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignetteGradient.addColorStop(config.vignetteRadius, 'rgba(0, 0, 0, 0)');
    vignetteGradient.addColorStop(config.vignetteRadius + 0.2, `rgba(0, 0, 0, ${config.vignetteStrength * 0.3})`);
    vignetteGradient.addColorStop(1, `rgba(0, 0, 0, ${config.vignetteStrength})`);

    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, width, height);

    // Apply corner darkening for depth
    const cornerSize = Math.min(width, height) * 0.5;

    // Top-left corner
    const tlGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, cornerSize);
    tlGrad.addColorStop(0, `rgba(0, 0, 0, ${config.vignetteStrength * 0.4})`);
    tlGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = tlGrad;
    ctx.fillRect(0, 0, cornerSize, cornerSize);

    // Bottom-right corner
    const brGrad = ctx.createRadialGradient(width, height, 0, width, height, cornerSize);
    brGrad.addColorStop(0, `rgba(0, 0, 0, ${config.vignetteStrength * 0.4})`);
    brGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = brGrad;
    ctx.fillRect(width - cornerSize, height - cornerSize, cornerSize, cornerSize);

    // Apply micro-noise for anti-banding
    if (noiseTextureRef.current) {
      const noiseCanvas = document.createElement('canvas');
      noiseCanvas.width = noiseTextureRef.current.width;
      noiseCanvas.height = noiseTextureRef.current.height;
      const noiseCtx = noiseCanvas.getContext('2d')!;
      noiseCtx.putImageData(noiseTextureRef.current, 0, 0);

      ctx.globalAlpha = config.noiseOpacity;
      ctx.globalCompositeOperation = 'overlay';

      // Tile the noise
      const pattern = ctx.createPattern(noiseCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    // Subtle contrast enhancement
    if (config.contrast !== 1) {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const factor = (259 * (config.contrast * 255 + 255)) / (255 * (259 - config.contrast * 255));

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
      }

      ctx.putImageData(imageData, 0, 0);
    }
  }, [config]);

  // Animation loop
  const animate = useCallback((startTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const loop = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      render(ctx, canvas.width, canvas.height, elapsed);

      if (!reducedMotion) {
        animationRef.current = requestAnimationFrame(loop);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, [render, reducedMotion]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Initialize noise generator
    noiseRef.current = new ValueNoise(Date.now());

    // Create noise texture (small, tiled)
    noiseTextureRef.current = createNoiseTexture(128, 128);

    // Handle resize
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Cap DPR for performance
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Reinitialize blobs with new dimensions
      initBlobs(canvas.width, canvas.height);
    };

    // Initial setup
    handleResize();

    // Start animation
    animate(performance.now());

    // Resize observer
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [initBlobs, animate]);

  // Re-render static frame when reduced motion changes
  useEffect(() => {
    if (reducedMotion) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      // Render a single static frame
      render(ctx, canvas.width, canvas.height, 0);
    }
  }, [reducedMotion, render]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        display: 'block',
        imageRendering: 'auto',
      }}
    />
  );
}

// ============================================================================
// WRAPPER COMPONENT WITH OVERLAYS
// ============================================================================
interface AuroraBackgroundCanvasProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  className?: string;
  config?: Partial<AuroraConfig>;
}

export function AuroraBackgroundCanvas({
  children,
  variant = 'dark',
  className = '',
  config = {},
}: AuroraBackgroundCanvasProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`relative flex flex-col min-h-screen items-center justify-center overflow-hidden ${
        isDark ? 'bg-[#0f0f0f] text-white' : 'bg-[#f8f8f8] text-black'
      } ${className}`}
    >
      {/* Main aurora canvas */}
      <AuroraCanvas variant={variant} config={config} />

      {/* Premium grain overlay (CSS-based for performance) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Center clarity / readability gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.5) 50%, rgba(15,15,15,0.7) 100%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(248,248,248,0.3) 0%, rgba(248,248,248,0.5) 50%, rgba(248,248,248,0.7) 100%)',
        }}
      />

      {/* Bottom fade to content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, transparent 0%, transparent 65%, rgba(34,34,34,0.4) 85%, rgba(34,34,34,1) 100%)'
            : 'linear-gradient(to bottom, transparent 0%, transparent 65%, rgba(255,255,255,0.4) 85%, rgba(255,255,255,1) 100%)',
        }}
      />

      {/* Content */}
      {children}
    </div>
  );
}

export default AuroraBackgroundCanvas;
