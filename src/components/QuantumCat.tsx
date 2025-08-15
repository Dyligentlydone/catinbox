import { useEffect, useRef, useState } from 'react';
import { schrodingersPatternCoordinates } from './SchrodingersPattern';
import { catInBoxPatternCoordinates } from './CatInBoxPattern';
import { secondImagePatternCoordinates } from './SecondImagePattern';
import { fourthImagePatternCoordinates } from './FourthImagePattern';
import { fifthImagePatternCoordinates } from './FifthImagePattern';
 

interface Atom {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
}

const QuantumCat = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [atoms, setAtoms] = useState<Atom[]>([]);
  const [frame, setFrame] = useState(0);
  const animationRef = useRef<number>(0);
  
  // Generate initial random positions for atoms
  useEffect(() => {
    const generateAtoms = () => {
      const newAtoms: Atom[] = [];
      const totalAtoms = 549; // Same as in the article
      
      for (let i = 0; i < totalAtoms; i++) {
        newAtoms.push({
          id: i,
          x: Math.random() * 600,
          y: Math.random() * 600,
          targetX: Math.random() * 600,
          targetY: Math.random() * 600,
          size: 2.5, // Fixed size to match screenshot
          opacity: 1.0 // Full opacity to match screenshot
        });
      }
      
      setAtoms(newAtoms);
    };
 
    
    generateAtoms();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  // New fifth image pattern - uses exact detected coordinates from the fifth screenshot
  const generateFifthImagePattern = () => {
    const canvasW = 600;
    const canvasH = 600;
    const margin = 60; // consistent padding

    const fitted = fitCoordinatesToCanvas(
      fifthImagePatternCoordinates,
      canvasW,
      canvasH,
      margin
    );

    const exactCount = fitted.length;

    setAtoms((prev: Atom[]) => {
      return prev.map((atom: Atom, index: number) => {
        if (index < exactCount) {
          const point = fitted[index];
          return {
            ...atom,
            targetX: point.x,
            targetY: point.y,
            size: 2.5,
            opacity: 1
          };
        }
        return {
          ...atom,
          targetX: -1000,
          targetY: -1000,
          size: 2.5,
          opacity: 0
        };
      });
    });
  };

  const generateSixthImagePattern = () => {
    const canvasW = 600;
    const canvasH = 600;
    const margin = 60;

    const fitted = fitCoordinatesToCanvas(
      secondImagePatternCoordinates,
      canvasW,
      canvasH,
      margin
    );

    const topBandY = 220;
    const bodyDots = fitted.filter(p => p.y >= topBandY);

    const textBox = { x: 80, y: 90, w: 440, h: 110 };
    const textDotsLocal = rasterizeTextToDots('$catinbox', textBox.w, textBox.h, 9, 'bold 90px Arial');
    const textDots = textDotsLocal.map(p => ({ x: p.x + textBox.x, y: p.y + textBox.y }));

    const combined = [...textDots, ...bodyDots];
    const exactCount = combined.length;

    setAtoms((prev: Atom[]) => {
      return prev.map((atom: Atom, index: number) => {
        if (index < exactCount) {
          const point = combined[index];
          return {
            ...atom,
            targetX: point.x,
            targetY: point.y,
            size: 2.5,
            opacity: 1
          };
        }
        return {
          ...atom,
          targetX: -1000,
          targetY: -1000,
          size: 2.5,
          opacity: 0
        };
      });
    });
  };

  useEffect(() => {
    const frames = [
      generateSchrodingersPattern,
      generateSecondImagePattern,
      generateCatInBoxPattern,
      generateFourthImagePattern,
      generateFifthImagePattern,
      generateSixthImagePattern
    ];

    const currentFrame = frames[frame % frames.length];

    if (atoms.length > 0) {
      currentFrame();
    }

    const frameInterval = setTimeout(() => {
      setFrame(prev => (prev + 1) % frames.length);
    }, 6000);

    return () => clearTimeout(frameInterval);
  }, [frame, atoms.length]);

  useEffect(() => {
    if (!canvasRef.current || atoms.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;

    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const animate = () => {
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      atoms.forEach(atom => {
        const dx = atom.targetX - atom.x;
        const dy = atom.targetY - atom.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 0.5) {
          atom.x = atom.targetX;
          atom.y = atom.targetY;
        } else {
          // Slightly slower again (0.16 -> 0.14)
          atom.x += dx * 0.14;
          atom.y += dy * 0.14;
        }

        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 222, 0, ${atom.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [atoms]);

  const fitCoordinatesToCanvas = (
    coords: { x: number; y: number }[],
    canvasW: number,
    canvasH: number,
    margin: number
  ) => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of coords) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    const width = maxX - minX || 1;
    const height = maxY - minY || 1;

    const availableW = canvasW - margin * 2;
    const availableH = canvasH - margin * 2;
    const scale = Math.min(availableW / width, availableH / height);

    const offsetX = (canvasW - width * scale) / 2 - minX * scale;
    const offsetY = (canvasH - height * scale) / 2 - minY * scale;

    return coords.map(p => ({ x: p.x * scale + offsetX, y: p.y * scale + offsetY }));
  };

  const rasterizeTextToDots = (
    text: string,
    boxW: number,
    boxH: number,
    dotStep: number,
    font: string
  ) => {
    const off = document.createElement('canvas');
    off.width = Math.max(1, Math.floor(boxW));
    off.height = Math.max(1, Math.floor(boxH));
    const ctx = off.getContext('2d');
    if (!ctx) return [] as { x: number; y: number }[];

    ctx.clearRect(0, 0, off.width, off.height);
    ctx.fillStyle = 'white';
    ctx.font = font;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

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
    if (m.width > maxTextW) {
      scaleX = maxTextW / m.width;
    }

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
        if (lum > 127) {
          pts.push({ x, y });
        }
      }
    }
    return pts;
  };

  const generateSchrodingersPattern = () => {
    const canvasW = 600;
    const canvasH = 600;
    const margin = 60;

    const fitted = fitCoordinatesToCanvas(
      schrodingersPatternCoordinates,
      canvasW,
      canvasH,
      margin
    );

    const exactCount = fitted.length;

    setAtoms((prev: Atom[]) => {
      return prev.map((atom: Atom, index: number) => {
        if (index < exactCount) {
          const point = fitted[index];
          return {
            ...atom,
            targetX: point.x,
            targetY: point.y,
            size: 2.5,
            opacity: 1
          };
        }
        return {
          ...atom,
          targetX: -1000,
          targetY: -1000,
          size: 2.5,
          opacity: 0
        };
      });
    });
  };

  const generateSecondImagePattern = () => {
    const canvasW = 600;
    const canvasH = 600;
    const margin = 60;

    const fitted = fitCoordinatesToCanvas(
      secondImagePatternCoordinates,
      canvasW,
      canvasH,
      margin
    );

    const exactCount = fitted.length;

    setAtoms((prev: Atom[]) => {
      return prev.map((atom: Atom, index: number) => {
        if (index < exactCount) {
          const point = fitted[index];
          return {
            ...atom,
            targetX: point.x,
            targetY: point.y,
            size: 2.5,
            opacity: 1
          };
        }
        return {
          ...atom,
          targetX: -1000,
          targetY: -1000,
          size: 2.5,
          opacity: 0
        };
      });
    });
  };

  const generateFourthImagePattern = () => {
    const canvasW = 600;
    const canvasH = 600;
    const margin = 60;

    const fitted = fitCoordinatesToCanvas(
      fourthImagePatternCoordinates,
      canvasW,
      canvasH,
      margin
    );

    const exactCount = fitted.length;

    setAtoms((prev: Atom[]) => {
      return prev.map((atom: Atom, index: number) => {
        if (index < exactCount) {
          const point = fitted[index];
          return {
            ...atom,
            targetX: point.x,
            targetY: point.y,
            size: 2.5,
            opacity: 1
          };
        }
        return {
          ...atom,
          targetX: -1000,
          targetY: -1000,
          size: 2.5,
          opacity: 0
        };
      });
    });
  };
  
  
  // Cat in box pattern - uses exact detected coordinates from the second screenshot
  const generateCatInBoxPattern = () => {
    const canvasW = 600;
    const canvasH = 600;
    const margin = 60; // consistent padding like the first image

    const fitted = fitCoordinatesToCanvas(
      catInBoxPatternCoordinates,
      canvasW,
      canvasH,
      margin
    );

    const exactCount = fitted.length;

    setAtoms((prev: Atom[]) => {
      return prev.map((atom: Atom, index: number) => {
        if (index < exactCount) {
          const point = fitted[index];
          return {
            ...atom,
            targetX: point.x,
            targetY: point.y,
            size: 2.5,
            opacity: 1
          };
        }
        return {
          ...atom,
          targetX: -1000,
          targetY: -1000,
          size: 2.5,
          opacity: 0
        };
      });
    });
  };

  
  
  // Return the JSX for the component
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="relative w-[600px] h-[600px] overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="absolute bottom-4 left-4 text-quantum-yellow text-sm">
          33x slowed down
        </div>
      </div>
    </div>
  );
};


export default QuantumCat;
