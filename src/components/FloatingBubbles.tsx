import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  isPopping: boolean;
  popFrames: number;
}

const FloatingBubbles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create bubbles
    const bubbles: Bubble[] = [];
    const colors = [
      "rgba(163, 63, 218, 0.15)", // Purple
      "rgba(99, 102, 241, 0.15)", // Blue
      "rgba(6, 182, 212, 0.15)", // Cyan
      "rgba(189, 50, 143, 0.15)", // Pink
    ];

    // Function to add a new bubble
    const addBubble = () => {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 70,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        isPopping: false,
        popFrames: 0,
      });
    };

    for (let i = 0; i < 8; i++) {
      addBubble();
    }

    // Handle click to pop bubbles
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      bubbles.forEach((bubble) => {
        const distance = Math.sqrt((clickX - bubble.x) ** 2 + (clickY - bubble.y) ** 2);
        if (distance < bubble.radius && !bubble.isPopping) {
          bubble.isPopping = true;
          bubble.popFrames = 10; // Number of frames for popping animation
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];

        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Bounce off edges
        if (bubble.x + bubble.radius > canvas.width || bubble.x - bubble.radius < 0) {
          bubble.vx *= -1;
        }
        if (bubble.y + bubble.radius > canvas.height || bubble.y - bubble.radius < 0) {
          bubble.vy *= -1;
        }

        // Draw bubble with glow
        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, bubble.color.replace("0.15", "0.25"));
        gradient.addColorStop(0.5, bubble.color.replace("0.15", "0.15"));
        gradient.addColorStop(1, bubble.color.replace("0.15", "0"));

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add border glow
        ctx.strokeStyle = bubble.color.replace("0.15", "0.3");
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default FloatingBubbles;
