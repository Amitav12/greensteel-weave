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

    // Generate stock price points
    const generateStockData = (points: number, volatility: number = 0.3) => {
      const data = [];
      let price = 100;
      
      for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.5) * volatility;
        price = Math.max(20, price + change);
        data.push(price);
      }
      
      return data;
    };

    // Create multiple stock lines
    const stockLines = [
      { data: generateStockData(100, 0.8), color: 'rgba(16, 185, 129, 0.6)', width: 2 },
      { data: generateStockData(100, 0.6), color: 'rgba(59, 130, 246, 0.5)', width: 1.5 },
      { data: generateStockData(100, 0.4), color: 'rgba(139, 92, 246, 0.4)', width: 1 },
      { data: generateStockData(100, 0.5), color: 'rgba(236, 72, 153, 0.3)', width: 1.2 },
    ];

    const animate = () => {
      time += 0.005;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
      
      const width = canvas.width / 2;
      const height = canvas.height / 2;
      
      // Draw animated stock lines
      stockLines.forEach((line, lineIndex) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Create glow effect
        ctx.shadowColor = line.color;
        ctx.shadowBlur = 8;
        
        const points = line.data.length;
        const xStep = width / (points - 1);
        
        for (let i = 0; i < points; i++) {
          const x = i * xStep + Math.sin(time + lineIndex) * 10;
          const baseY = (height * 0.7) - (line.data[i] / 150) * height * 0.4;
          const y = baseY + Math.sin(time * 2 + i * 0.1 + lineIndex) * 5;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = (width / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Draw floating particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time + i) * 50) + (width / 2) + (i * 30);
        const y = (Math.cos(time * 1.5 + i) * 20) + (height / 2);
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(16, 185, 129, ${0.1 + Math.sin(time + i) * 0.1})`;
        ctx.arc(x % width, y % height, 2, 0, Math.PI * 2);
        ctx.fill();
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