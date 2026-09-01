import React, { useEffect, useRef } from 'react';

interface VaporCanvasProps {
  density?: number;
  speed?: number;
  accentGlow?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  growth: number;
}

export const VaporCanvas: React.FC<VaporCanvasProps> = ({
  density = 35,
  speed = 0.4,
  accentGlow = true,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 80 + 40,
        vx: (Math.random() - 0.5) * speed,
        vy: -Math.random() * speed - 0.1,
        alpha: 0,
        maxAlpha: Math.random() * 0.12 + 0.03,
        growth: Math.random() * 0.05 + 0.02
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting vapor particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Fade in and out
        if (p.alpha < p.maxAlpha) {
          p.alpha += 0.001;
        }

        // Reset if off top or sides
        if (p.y < -p.radius * 2 || p.x < -p.radius * 2 || p.x > width + p.radius * 2) {
          p.y = height + p.radius;
          p.x = Math.random() * width;
          p.alpha = 0;
        }

        // Draw radial gradient vapor puff
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius
        );

        if (accentGlow && Math.random() > 0.7) {
          gradient.addColorStop(0, `rgba(229, 9, 20, ${p.alpha * 0.3})`);
          gradient.addColorStop(0.5, `rgba(25, 10, 15, ${p.alpha * 0.6})`);
          gradient.addColorStop(1, 'rgba(3, 3, 3, 0)');
        } else {
          gradient.addColorStop(0, `rgba(180, 180, 190, ${p.alpha})`);
          gradient.addColorStop(0.4, `rgba(50, 50, 60, ${p.alpha * 0.5})`);
          gradient.addColorStop(1, 'rgba(3, 3, 3, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, accentGlow]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 opacity-80 ${className}`}
    />
  );
};
