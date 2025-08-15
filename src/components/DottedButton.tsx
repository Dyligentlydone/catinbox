import { useEffect, useRef, useState } from 'react';

interface Atom {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  delayMs: number; // time before this atom starts moving
}

interface DottedButtonProps {
  text?: string;
  width?: number;
  height?: number;
  dotStep?: number;
  font?: string; // e.g., 'bold 60px Arial'
  pointSize?: number; // dot radius in px
  className?: string; // wrapper classes
  onClick?: () => void;
  // animation controls
  maxStaggerMs?: number; // maximum delay across dots
  approachFactor?: number; // movement easing factor
  fadeInFactor?: number; // opacity easing factor
}

// Convert text into dot positions using an offscreen canvas
function rasterizeTextToDots(
  text: string,
  boxW: number,
  boxH: number,
  dotStep: number,
  font: string
): { x: number; y: number }[] {
  const off = document.createElement('canvas');
  off.width = Math.max(1, Math.floor(boxW));
  off.height = Math.max(1, Math.floor(boxH));
  const ctx = off.getContext('2d');
  if (!ctx) return [];

  ctx.clearRect(0, 0, off.width, off.height);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = font;

  // Fit text within box (heuristic)
  const padX = Math.floor(dotStep);
  const padY = Math.floor(dotStep * 0.6);
  const maxTextW = off.width - padX * 2;
  const maxTextH = off.height - padY * 2;

  if (!/\d+px/.test(font)) {
    const px = Math.max(10, Math.floor(maxTextH * 0.8));
    ctx.font = `${px}px ${font}`;
  }

  const m = ctx.measureText(text);
  let scaleX = 1;
  if (m.width > maxTextW) scaleX = maxTextW / m.width;

  ctx.save();
  ctx.translate(padX, padY);
  ctx.scale(scaleX, 1);
  ctx.fillText(text, 0, 0);
  ctx.restore();

  const img = ctx.getImageData(0, 0, off.width, off.height).data;
  const pts: { x: number; y: number }[] = [];
  for (let y = 0; y < off.height; y += dotStep) {
    for (let x = 0; x < off.width; x += dotStep) {
      const idx = (y * off.width + x) * 4;
      const r = img[idx], g = img[idx + 1], b = img[idx + 2], a = img[idx + 3];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) * (a / 255);
      if (lum > 127) pts.push({ x, y });
    }
  }
  return pts;
}

export default function DottedButton({
  text = 'DEX Screner',
  width = 600,
  height = 100,
  dotStep = 10,
  font = 'bold 72px Arial',
  pointSize = 2.0,
  className = '',
  onClick,
  maxStaggerMs = 1200,
  approachFactor = 0.08,
  fadeInFactor = 0.04,
}: DottedButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [atoms, setAtoms] = useState<Atom[]>([]);
  const startRef = useRef<number | null>(null);

  // Ensure canvas is crisp on high-DPI displays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    // Set backing store size
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    // Set display size via CSS
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing to logical units
    }
  }, [width, height]);

  // Init atoms to random positions, then animate into text
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targets = rasterizeTextToDots(text, width, height, dotStep, font);
    const count = targets.length;

    // Stagger by x position (left-to-right reveal)
    const initial: Atom[] = [];
    for (let i = 0; i < count; i++) {
      const t = targets[i];
      const delayRatio = Math.min(1, Math.max(0, t.x / width));
      const delayMs = delayRatio * maxStaggerMs;
      initial.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: t.x,
        targetY: t.y,
        size: pointSize,
        opacity: 0.0,
        delayMs,
      });
    }
    setAtoms(initial);
    startRef.current = performance.now();
  }, [text, width, height, dotStep, font, pointSize, maxStaggerMs]);

  // Animate atoms to their targets and draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || atoms.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const animate = () => {
      // Clear in logical units (after dpr scaling)
      ctx.clearRect(0, 0, width, height);
      // Background transparent so page bg shows through

      const now = performance.now();
      const startedAt = startRef.current ?? now;

      atoms.forEach((atom) => {
        const elapsed = now - startedAt;
        if (elapsed < atom.delayMs) {
          // Not started yet; keep invisible until its delay
          return;
        }
        const dx = atom.targetX - atom.x;
        const dy = atom.targetY - atom.y;
        const dist = Math.hypot(dx, dy);

        // Smooth approach with easing
        if (dist < 0.4) {
          atom.x = atom.targetX;
          atom.y = atom.targetY;
          atom.opacity = Math.min(1, atom.opacity + fadeInFactor * 3.0);
        } else {
          atom.x += dx * approachFactor;
          atom.y += dy * approachFactor;
          atom.opacity = Math.min(1, atom.opacity + fadeInFactor);
        }

        // Draw as crisp squares aligned to pixel grid
        const size = Math.max(1, Math.round(atom.size));
        const ix = Math.round(atom.x - size / 2);
        const iy = Math.round(atom.y - size / 2);
        ctx.fillStyle = `rgba(255, 222, 0, ${atom.opacity})`;
        ctx.fillRect(ix, iy, size, size);
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [atoms]);

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width, height }}
      onClick={onClick}
      role="button"
      aria-label={text}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block"
      />
      {/* Invisible clickable overlay to guarantee click target */}
      <div className="absolute inset-0" />
    </div>
  );
}
