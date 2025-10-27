import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>>;
}

interface ExperienceBubblesProps {
  items: ExperienceItem[];
  title: string;
  icon: React.ComponentType<any>;
  leadershipItems?: ExperienceItem[];
}

const ExperienceBubbles = ({ items, title, icon: Icon, leadershipItems }: ExperienceBubblesProps) => {
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);

  const handleBubbleClick = (item: ExperienceItem, event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedItem(item);
    setIsModalOpen(true);

    // Create particle effect
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.1, // gravity
      })).filter(p => p.y < window.innerHeight + 100));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const gradients = [
    "bg-gradient-to-br from-blue-400/20 to-blue-600/20",
    "bg-gradient-to-br from-purple-400/20 to-purple-600/20",
    "bg-gradient-to-br from-green-400/20 to-green-600/20",
    "bg-gradient-to-br from-blue-400/20 to-purple-600/20",
    "bg-gradient-to-br from-purple-400/20 to-green-600/20",
    "bg-gradient-to-br from-green-400/20 to-blue-600/20",
  ];

  return (
    <>
      {/* Particle Effects */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none w-2 h-2 bg-primary rounded-full opacity-70"
          style={{
            left: particle.x,
            top: particle.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div className="flex items-center gap-3 mb-8">
        <Icon className="text-primary" size={32} />
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={(e) => handleBubbleClick(item, e)}
            className={`
              ${gradients[index % gradients.length]}
              relative p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out
              hover:scale-110 hover:shadow-lg hover:shadow-primary/25
              border border-primary/20 hover:border-primary/40
              flex flex-col items-center justify-center text-center
              min-h-[120px] group
            `}
          >
            <item.icon className="text-primary mb-2 group-hover:scale-110 transition-transform duration-300" size={24} />
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm text-muted-foreground mt-1 group-hover:text-primary/80 transition-colors duration-300">
                {item.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>

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
              title === "Leadership" ? (
                <div>
                  <h3 className="font-semibold mb-4">Leadership Timeline</h3>
                  <div className="space-y-6">
                    {leadershipItems?.map((role, index) => (
                      <div key={index} className="relative">
                        {index < leadershipItems.length - 1 && (
                          <div className="absolute left-4 top-8 w-0.5 h-16 bg-primary/30"></div>
                        )}
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-primary">{role.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{role.period}</p>
                            <ul className="space-y-1">
                              {role.achievements?.map((achievement, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <span className="text-accent mt-1">▹</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
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
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceBubbles;
