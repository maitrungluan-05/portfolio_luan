import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  colorType: 'flame_core' | 'flame_cyan' | 'flame_blue' | 'smoke';
  turbOffset: number;
}

export const ElectricFireSmokeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const MAX_PARTICLES = 130;

    const colors = {
      flame_core: 'rgba(255, 255, 255,',
      flame_cyan: 'rgba(0, 220, 255,',
      flame_blue: 'rgba(0, 102, 255,',
      smoke: 'rgba(180, 205, 230,',
    };

    const createParticle = (spawnType?: 'smoke_side' | 'flame_center'): Particle => {
      const isSideSmoke = spawnType === 'smoke_side' || Math.random() < 0.35;
      
      let x: number;
      let y = height * (0.65 + Math.random() * 0.4);
      let colorType: Particle['colorType'] = 'flame_cyan';

      if (isSideSmoke) {
        // Spawn on left or right corners like reference image
        const isLeft = Math.random() < 0.5;
        x = isLeft ? Math.random() * (width * 0.3) : width * 0.7 + Math.random() * (width * 0.3);
        colorType = 'smoke';
      } else {
        // Center flame rising behind character
        x = width * 0.35 + Math.random() * (width * 0.3);
        const r = Math.random();
        if (r < 0.25) colorType = 'flame_core';
        else if (r < 0.75) colorType = 'flame_cyan';
        else colorType = 'flame_blue';
      }

      const maxLife = isSideSmoke ? 160 + Math.random() * 100 : 90 + Math.random() * 80;
      const maxSize = isSideSmoke ? 120 + Math.random() * 160 : 60 + Math.random() * 90;
      const maxAlpha = isSideSmoke ? 0.08 + Math.random() * 0.08 : 0.25 + Math.random() * 0.35;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * (isSideSmoke ? 0.6 : 1.2),
        vy: -(1.4 + Math.random() * (isSideSmoke ? 1.6 : 3.2)), // Upward flame velocity
        size: isSideSmoke ? 30 : 15,
        maxSize,
        alpha: 0,
        maxAlpha,
        life: 0,
        maxLife,
        colorType,
        turbOffset: Math.random() * 1000,
      };
    };

    // Pre-populate particles
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      p.y += p.vy * p.life;
      particles.push(p);
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Ensure particles count
      while (particles.length < MAX_PARTICLES) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Turbulence wave
        const turb = Math.sin(time * 2 + p.turbOffset) * (p.colorType === 'smoke' ? 0.8 : 1.8);
        p.x += p.vx + turb * 0.5;
        p.y += p.vy;

        // Size expansion
        const progress = p.life / p.maxLife;
        p.size = p.size + (p.maxSize - p.size) * 0.035;

        // Alpha envelope: fade in then out
        if (progress < 0.25) {
          p.alpha = (progress / 0.25) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.25) / 0.75) * p.maxAlpha;
        }

        if (p.life >= p.maxLife || p.y < -100 || p.alpha <= 0.001) {
          particles.splice(i, 1);
          continue;
        }

        // Draw soft volumetric flame/smoke particle with radial gradient
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(1, p.size));
        const colPrefix = colors[p.colorType];

        radGrad.addColorStop(0, `${colPrefix} ${p.alpha})`);
        radGrad.addColorStop(0.4, `${colPrefix} ${p.alpha * 0.6})`);
        radGrad.addColorStop(1, `${colPrefix} 0)`);

        ctx.save();
        ctx.globalCompositeOperation = p.colorType === 'smoke' ? 'screen' : 'lighter';
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-15"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
