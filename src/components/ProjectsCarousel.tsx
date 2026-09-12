import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProjectHologram, { type HologramShape } from "@/components/ProjectHologram";
import { Github, Calendar, Sparkles, SearchX } from "lucide-react";

export interface ProjectItem {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
  /** Leave undefined until a repo is public/ready to share. */
  githubUrl?: string;
}

interface ProjectsCarouselProps {
  items: ProjectItem[];
}

const shapes: HologramShape[] = ["torusKnot", "icosahedron", "octahedron", "dodecahedron", "torus"];
const colors = ["#22d3ee", "#a855f7", "#60a5fa", "#f472b6", "#fbbf24"];

const ProjectsCarousel = ({ items }: ProjectsCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Jump back to the first slide whenever the filtered set of projects changes.
  useEffect(() => {
    api?.scrollTo(0);
  }, [api, items]);

  const handleOpen = (item: ProjectItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
        <SearchX size={36} className="mb-3 opacity-50" />
        <p className="text-sm">No projects use that skill yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 sm:px-16">
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {items.map((item, index) => {
              const shape = shapes[index % shapes.length];
              const color = colors[index % colors.length];
              return (
                <CarouselItem key={item.title}>
                  <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-b from-card to-background overflow-hidden">
                    <div
                      className="h-80 sm:h-[28rem] cursor-grab active:cursor-grabbing"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, rgba(34,211,238,0.05) 0px, rgba(34,211,238,0.05) 1px, transparent 1px, transparent 4px)",
                      }}
                    >
                      <ProjectHologram shape={shape} color={color} />
                    </div>

                    <button
                      onClick={() => handleOpen(item)}
                      className="group w-full text-left p-6 pt-4 border-t border-primary/10 hover:bg-primary/5 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                        <Calendar size={12} />
                        {item.period}
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <Sparkles size={13} />
                        <span>Tap to explore this project</span>
                      </div>
                    </button>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-0 sm:-left-2" />
          <CarouselNext className="right-0 sm:-right-2" />
        </Carousel>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to project ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "w-6 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-1.5">
              <Calendar size={13} />
              {selectedItem?.period}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedItem?.description && (
              <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
            )}

            {selectedItem?.technologies && (
              <div>
                <h3 className="font-semibold mb-2 text-sm">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.technologies.map((tech) => (
                    <Badge key={tech} className="bg-primary/20 text-primary border-primary/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedItem?.highlights && selectedItem.highlights.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-sm">Highlights</h3>
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

            <div className="pt-2">
              {selectedItem?.githubUrl ? (
                <a href={selectedItem.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <Github size={16} />
                    View on GitHub
                  </Button>
                </a>
              ) : (
                <Button variant="outline" disabled className="gap-2 opacity-60">
                  <Github size={16} />
                  GitHub link coming soon
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsCarousel;
