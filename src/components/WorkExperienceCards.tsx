import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar, MapPin, ImageIcon, BookOpen } from "lucide-react";

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
        <DialogContent
          className="max-w-2xl p-0 overflow-hidden bg-[#fdfaf3] dark:bg-[#211d17] text-[#2b2620] dark:text-[#ece5d8] border-[#e4dcc8] dark:border-[#3a3327]"
        >
          {/* Ruled-paper texture + notebook margin */}
          <div
            className="relative max-h-[80vh] overflow-y-auto p-8 pl-12"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 31px, rgba(120,105,70,0.18) 32px)",
              backgroundPositionY: "4px",
            }}
          >
            <div className="absolute left-8 top-0 bottom-0 w-px bg-red-400/30" />

            {selectedItem && (
              <>
                {selectedItem.image && (
                  <img
                    src={selectedItem.image}
                    alt={`${selectedItem.role} at ${selectedItem.company}`}
                    className="w-full h-48 object-cover rounded-md mb-6 shadow-md -rotate-1"
                  />
                )}

                <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2 font-journal text-4xl font-semibold text-inherit">
                    <selectedItem.icon className="text-primary shrink-0" size={28} />
                    {selectedItem.role}
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5c5340] dark:text-[#b8ae98]">
                      <span className="font-medium text-primary">{selectedItem.company}</span>
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

                <div className="space-y-3 font-journal text-xl leading-relaxed">
                  {selectedItem.description.map((line, i) => (
                    <p key={i} className="flex gap-2">
                      <span className="text-primary">—</span>
                      <span>{line}</span>
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkExperienceCards;
