import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ParallaxHardwareProps {
  imageSrc: string;
  alt: string;
  badgeText?: string;
  glowAccent?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ParallaxHardware: React.FC<ParallaxHardwareProps> = ({
  imageSrc,
  alt,
  badgeText,
  glowAccent = true,
  className = "",
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const shineOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.1, 0.4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative cursor-pointer group perspective-1000 ${className}`}
    >
      {/* Background Rim Light Glow */}
      {glowAccent && (
        <div
          className={`absolute -inset-4 rounded-full bg-gradient-to-tr from-brand-accent/30 via-transparent to-red-900/20 blur-2xl transition-opacity duration-700 pointer-events-none ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-40 scale-100'
          }`}
        />
      )}

      {/* Main Image Container */}
      <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-[#070707]/90 shadow-2xl transition-all duration-500 group-hover:border-brand-accent/50 group-hover:shadow-[0_0_40px_rgba(229,9,20,0.25)]">
        {/* Specular Highlight Overlay */}
        <motion.div
          style={{ opacity: shineOpacity }}
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent"
        />

        {/* Device Image */}
        <div className="relative p-6 sm:p-10 flex items-center justify-center min-h-[320px] sm:min-h-[420px] bg-radial-at-c from-[#141414] via-[#080808] to-[#030303]">
          <img
            src={imageSrc}
            alt={alt}
            className="w-auto h-[260px] sm:h-[360px] max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
          />

          {/* Floor Shadow Reflection Effect */}
          <div className="absolute bottom-3 w-3/4 h-6 bg-black/80 blur-md rounded-full transform scale-x-125" />
        </div>

        {/* Badge Label */}
        {badgeText && (
          <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-black/80 border border-white/10 backdrop-blur-md text-[10px] uppercase tracking-widest font-mono text-brand-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            {badgeText}
          </div>
        )}

        {/* Hover Cue */}
        <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 rounded-md bg-brand-accent/20 border border-brand-accent/40 text-[11px] font-mono text-white flex items-center gap-1">
          INSPECT HARDWARE →
        </div>
      </div>
    </motion.div>
  );
};
