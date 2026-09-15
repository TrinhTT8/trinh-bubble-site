import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ImageIcon, BookOpen, SearchX } from "lucide-react";

export interface WorkExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  /** Optional photo for the postcard. Leave undefined to show a placeholder cover. */
  image?: string;
  /** Skills used here — must match a skill name in the Technical Skills sidebar to be filterable. */
  technologies?: string[];
}

interface WorkExperienceCardsProps {
  items: WorkExperienceItem[];
}

const coverGradients = [
  "bg-gradient-to-br from-blue-500/40 via-blue-400/20 to-transparent",
  "bg-gradient-to-br from-purple-500/40 via-purple-400/20 to-transparent",
  "bg-gradient-to-br from-cyan-500/40 via-cyan-400/20 to-transparent",
  "bg-gradient-to-br from-pink-500/40 via-pink-400/20 to-transparent",
];

const WorkExperienceCards = ({ items }: WorkExperienceCardsProps) => {
  const [selectedItem, setSelectedItem] = useState<WorkExperienceItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (item: WorkExperienceItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
        <SearchX size={36} className="mb-3 opacity-50" />
        <p className="text-sm">No work experience uses that skill yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {items.map((item, index) => {
          const tilt = index % 2 === 0 ? "-rotate-1" : "rotate-1";
          return (
            <div
              key={index}
              onClick={() => handleOpen(item)}
              className={`
                group relative bg-card border border-border rounded-lg overflow-hidden
                cursor-pointer shadow-md transition-all duration-300 ease-out
                ${tilt} hover:rotate-0 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20
                hover:border-primary/40
              `}
            >
              {/* "Photo" */}
              <div className={`relative aspect-[4/3] w-full overflow-hidden ${coverGradients[index % coverGradients.length]}`}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`${item.role} at ${item.company}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <item.icon
                      className="text-foreground/20 group-hover:text-foreground/30 transition-colors duration-300"
                      size={64}
                      strokeWidth={1.25}
                    />
                  </div>
                )}

                {/* Postmark-style date stamp */}
                <div className="absolute top-3 right-3 rotate-6 bg-background/90 backdrop-blur-sm border border-dashed border-foreground/30 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-[10px] sm:text-xs font-medium text-foreground/70 whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                {!item.image && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-foreground/30">
                    <ImageIcon size={12} />
                    <span className="text-[10px]">photo coming soon</span>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {item.role}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <BookOpen size={13} />
                  <span>Open journal entry</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-primary/20 shadow-2xl shadow-primary/10">
          {/* Faint circuit-grid texture, matching the hologram/futuristic motif used elsewhere */}
          <div
            className="relative max-h-[85vh] overflow-y-auto p-8 sm:p-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, hsl(var(--primary) / 0.05) 0px, hsl(var(--primary) / 0.05) 1px, transparent 1px, transparent 3px), radial-gradient(circle at top right, hsl(var(--accent) / 0.1), transparent 60%)",
            }}
          >
            {selectedItem && (
              <>
                {selectedItem.image && (
                  <img
                    src={selectedItem.image}
                    alt={`${selectedItem.role} at ${selectedItem.company}`}
                    className="w-full h-56 sm:h-72 object-cover rounded-xl mb-8 ring-1 ring-primary/20 shadow-lg"
                  />
                )}

                <DialogHeader className="mb-6">
                  <DialogTitle className="flex items-center gap-3 text-2xl sm:text-3xl font-bold">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                      <selectedItem.icon className="text-primary" size={22} />
                    </span>
                    <span className="gradient-text">{selectedItem.role}</span>
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-accent">{selectedItem.company}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {selectedItem.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {selectedItem.location}
                      </span>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="relative pl-6 space-y-3 text-sm sm:text-base leading-relaxed">
                  <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
                  {selectedItem.description.map((line, i) => (
                    <p key={i} className="flex gap-2.5 text-foreground/90">
                      <span className="text-accent mt-0.5 shrink-0">▹</span>
                      <span>{line}</span>
                    </p>
                  ))}
                </div>

                {selectedItem.technologies && selectedItem.technologies.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      Skills used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.technologies.map((tech) => (
                        <Badge key={tech} className="bg-primary/10 text-primary border-primary/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkExperienceCards;
