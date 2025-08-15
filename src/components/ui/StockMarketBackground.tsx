import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function StockMarketBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    let time = 0;

    // Generate bar chart data
    const generateBarData = (count: number) => {
      return Array.from({ length: count }, () => ({
        height: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        maxHeight: Math.random() * 0.9 + 0.1
      }));
    };

    const bars = generateBarData(50);
    
    // Generate curve data points
    const generateCurveData = (points: number) => {
      const data = [];
      for (let i = 0; i < points; i++) {
        const progress = i / (points - 1);
        const baseY = 0.3 + Math.sin(progress * Math.PI * 2) * 0.2;
        data.push(baseY);
      }
      return data;
    };
    
    const curveData = generateCurveData(100);

    const animate = () => {
      time += 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
      
      const width = canvas.width / 2;
      const height = canvas.height / 2;
      
      // Draw dark background with world map effect
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
      gradient.addColorStop(1, 'rgba(3, 7, 18, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw grid pattern
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Horizontal grid lines
      for (let i = 0; i <= 10; i++) {
        const y = (height / 10) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let i = 0; i <= 20; i++) {
        const x = (width / 20) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Draw animated vertical bars with up/down movement
      const barWidth = width / bars.length;
      bars.forEach((bar, i) => {
        const x = i * barWidth;
        const baseHeight = 0.2; // Minimum height
        const variationHeight = Math.sin(time * (bar.speed * 2) + bar.phase) * 0.6 + 0.4;
        const animatedHeight = baseHeight + variationHeight;
        const barHeight = height * bar.maxHeight * animatedHeight;
        
        // Determine if bar is rising or falling for color variation
        const currentTrend = Math.sin(time * (bar.speed * 2) + bar.phase);
        const previousTrend = Math.sin((time - 0.1) * (bar.speed * 2) + bar.phase);
        const isRising = currentTrend > previousTrend;
        
        // Create gradient for bars with dynamic colors
        const barGradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        if (isRising) {
          barGradient.addColorStop(0, 'rgba(34, 197, 94, 0.9)');   // Green for rising
          barGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.7)');
          barGradient.addColorStop(1, 'rgba(34, 197, 94, 0.4)');
        } else {
          barGradient.addColorStop(0, 'rgba(239, 68, 68, 0.9)');   // Red for falling
          barGradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.7)');
          barGradient.addColorStop(1, 'rgba(239, 68, 68, 0.4)');
        }
        
        // Draw bar with glow effect
        ctx.shadowColor = isRising ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = barGradient;
        ctx.fillRect(x + barWidth * 0.1, height - barHeight, barWidth * 0.8, barHeight);
        
        // Add extra glow on top with trend color
        ctx.shadowColor = isRising ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = isRising ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)';
        ctx.fillRect(x + barWidth * 0.2, height - barHeight - 1, barWidth * 0.6, 3);
        
        ctx.shadowBlur = 0;
      });
      
      // Draw animated curve line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
      ctx.shadowBlur = 15;
      
      const curvePoints = curveData.length;
      const xStep = width / (curvePoints - 1);
      
      for (let i = 0; i < curvePoints; i++) {
        const x = i * xStep;
        const baseY = height * curveData[i];
        const animatedY = baseY + Math.sin(time * 2 + i * 0.1) * 10;
        
        if (i === 0) {
          ctx.moveTo(x, animatedY);
        } else {
          ctx.lineTo(x, animatedY);
        }
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw floating particles
      for (let i = 0; i < 15; i++) {
        const x = (Math.sin(time * 0.5 + i) * width * 0.3) + (width / 2);
        const y = (Math.cos(time * 0.7 + i) * height * 0.2) + (height / 2);
        const opacity = 0.3 + Math.sin(time + i) * 0.2;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
        ctx.shadowBlur = 8;
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(59, 130, 246, 0.02) 50%, rgba(139, 92, 246, 0.03) 100%)',
        }}
      />
      
      {/* Additional glow effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-blue-500/5" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-500/10 to-transparent" />
      
      {/* Animated dots */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + (i * 0.2),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}