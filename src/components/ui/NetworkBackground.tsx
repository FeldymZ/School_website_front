import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = (canvas.width = parent.offsetWidth);
    let height = (canvas.height = parent.offsetHeight);

    const COLOR = "#00A4E0";
    const POINTS = 70;
    const MAX_DISTANCE = 140;
    const SPEED = 2;

    const points = Array.from({ length: POINTS }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }));

    const resize = () => {
      width = canvas.width = parent.offsetWidth;
      height = canvas.height = parent.offsetHeight;
    };

    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        // Point
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = COLOR;
        ctx.fill();

        // Lignes
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,164,224,${
              1 - dist / MAX_DISTANCE
            })`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
