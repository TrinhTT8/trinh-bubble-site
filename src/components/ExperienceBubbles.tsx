import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Code, Users, Award } from "lucide-react";

interface ExperienceItem {
  title: string;
  subtitle?: string;
  period: string;
  description?: string[];
  technologies?: string[];
  highlights?: string[];
  location?: string;
  company?: string;
  role?: string;
  achievements?: string[];
  icon: any;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  item: ExperienceItem;
  isPopping: boolean;
  popFrames: number;
}

interface ExperienceBubblesProps {
  items: ExperienceItem[];
  title: string;
  icon: any;
}

const ExperienceBubbles = ({ items, title, icon: Icon }: ExperienceBubblesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create bubbles
    const colors = [
      "rgba(139, 92, 246, 0.2)", // Purple
      "rgba(99, 102, 241, 0.2)", // Blue
      "rgba(6, 182, 212, 0.2)", // Cyan
      "rgba(236, 72, 153, 0.2)", // Pink
    ];

    const newBubbles: Bubble[] = items.map((item, index) => ({
      x: (index % 3 + 1) * (canvas.width / 4),
      y: (Math.floor(index / 3) + 1) * (canvas.height / 3),
      radius: 80,
      item,
      isPopping: false,
      popFrames: 0,
    }));

    setBubbles(newBubbles);

    // Handle click to pop bubbles
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      newBubbles.forEach((bubble) => {
        const distance = Math.sqrt((clickX - bubble.x) ** 2 + (clickY - bubble.y) ** 2);
        if (distance < bubble.radius && !bubble.isPopping) {
          bubble.isPopping = true;
          bubble.popFrames = 10; // Number of frames for popping animation
          setSelectedItem(bubble.item);
          setIsModalOpen(true);
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      newBubbles.forEach((bubble) => {
        if (bubble.isPopping) {
          bubble.popFrames--;
          bubble.radius *= 0.9; // Shrink radius
          if (bubble.popFrames <= 0) {
            bubble.isPopping = false;
            bubble.radius = 80; // Reset radius
          }
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
        gradient.addColorStop(0, colors[Math.floor(Math.random() * colors.length)].replace("0.2", "0.4"));
        gradient.addColorStop(0.5, colors[Math.floor(Math.random() * colors.length)].replace("0.2", "0.2"));
        gradient.addColorStop(1, colors[Math.floor(Math.random() * colors.length)].replace("0.2", "0"));

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add border glow
        ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)].replace("0.2", "0.5");
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw icon and text
        if (!bubble.isPopping) {
          const iconSize = 24;
          const text = bubble.item.title;
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 14px Arial";
          ctx.textAlign = "center";
          ctx.fillText(text, bubble.x, bubble.y + iconSize / 2 + 10);

          // Draw icon (simplified, using text for now)
          ctx.font = `${iconSize}px Arial`;
          ctx.fillText("●", bubble.x, bubble.y - 10);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("click", handleClick);
    };
  }, [items]);

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Icon className="text-primary" size={32} />
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-96 bg-transparent cursor-pointer"
      />
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && <selectedItem.icon className="text-primary" size={24} />}
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.subtitle && <span className="text-accent font-medium">{selectedItem.subtitle}</span>}
              {selectedItem?.period && <span className="text-sm text-muted-foreground ml-2">{selectedItem.period}</span>}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem?.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <ul className="space-y-2">
                  {selectedItem.description.map((item, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedItem?.technologies && (
              <div>
                <h3 className="font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.technologies.map((tech) => (
                    <Badge key={tech} className="bg-primary/20 text-primary border-primary/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {selectedItem?.highlights && (
              <div>
                <h3 className="font-semibold mb-2">Highlights</h3>
                <ul className="space-y-2">
                  {selectedItem.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-accent mt-1">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedItem?.achievements && (
              <div>
                <h3 className="font-semibold mb-2">Achievements</h3>
                <ul className="space-y-2">
                  {selectedItem.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-accent mt-1">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceBubbles;
