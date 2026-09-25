import React, { useEffect, useRef } from 'react';

export const AmbientSunlitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Subtle sunlit dust / golden bokeh particles
    const motes = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: - (Math.random() * 0.25 + 0.08), // gently rising like sun dust
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.4 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      motes.forEach((m) => {
        m.pulse += 0.015;
        m.y += m.speedY;
        m.x += m.speedX + Math.sin(m.pulse) * 0.1;

        // Wrap particles
        if (m.y < -10) m.y = height + 10;
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const currentOpacity = m.opacity * (0.6 + Math.sin(m.pulse) * 0.4);

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        // Golden sun & subtle warm orange motes
        ctx.fillStyle = `rgba(231, 196, 86, ${currentOpacity * 0.55})`;
        ctx.shadowColor = 'rgba(249, 115, 22, 0.45)';
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#18191B]">
      {/* 1. Radiant Ambient Gradient Glows (#E7C456 Sun Gold + Touch of Orange) */}
      {/* Top right golden orb */}
      <div 
        className="absolute -top-32 right-0 w-[750px] h-[750px] rounded-full blur-[140px] opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(231, 196, 86, 0.4) 0%, rgba(249, 115, 22, 0.15) 45%, transparent 70%)'
        }}
      />
      {/* Mid left ambient gold pool */}
      <div 
        className="absolute top-1/3 -left-32 w-[650px] h-[650px] rounded-full blur-[130px] opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(231, 196, 86, 0.35) 0%, rgba(249, 115, 22, 0.1) 60%, transparent 80%)'
        }}
      />
      {/* Bottom right subtle gold & orange bloom */}
      <div 
        className="absolute bottom-10 right-1/4 w-[700px] h-[700px] rounded-full blur-[150px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(231, 196, 86, 0.3) 0%, rgba(249, 115, 22, 0.12) 50%, transparent 75%)'
        }}
      />

      {/* 2. Delicate Golden & Orange Bokeh Motes Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75"
      />

      {/* 3. High-End Editorial Surface Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
