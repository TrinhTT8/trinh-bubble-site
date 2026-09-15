import { ChevronUp, Crown, Shield, ChevronsUp, Users } from "lucide-react";

export interface LeadershipRole {
  title: string;
  period: string;
  achievements: string[];
}

export interface LeadershipOrg {
  organization: string;
  subtitle?: string;
  roles: LeadershipRole[]; // ordered oldest -> newest
}

export interface MembershipItem {
  organization: string;
  role: string;
  period?: string;
}

interface LeadershipJourneyProps {
  progressions: LeadershipOrg[];
  memberships?: MembershipItem[];
}

// Ranks up as the list goes on — later roles get a bigger, brighter badge.
const rankStyles = [
  {
    icon: Shield,
    color: "text-blue-400",
    ring: "ring-blue-400/40",
    border: "border-blue-400/30",
    glow: "shadow-blue-400/10",
    badge: "bg-blue-400/15",
    title: "text-lg sm:text-xl",
    pad: "p-5",
  },
  {
    icon: ChevronsUp,
    color: "text-purple-400",
    ring: "ring-purple-400/40",
    border: "border-purple-400/30",
    glow: "shadow-purple-400/15",
    badge: "bg-purple-400/15",
    title: "text-xl sm:text-2xl",
    pad: "p-6",
  },
  {
    icon: Crown,
    color: "text-amber-400",
    ring: "ring-amber-400/50",
    border: "border-amber-400/40",
    glow: "shadow-amber-400/25",
    badge: "bg-amber-400/15",
    title: "text-2xl sm:text-3xl",
    pad: "p-7",
  },
];

const LeadershipJourney = ({ progressions, memberships = [] }: LeadershipJourneyProps) => {
  return (
    <div className="space-y-16">
      {progressions.map((org) => (
        <div key={org.organization}>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground">{org.organization}</h3>
            {org.subtitle && <p className="text-sm text-muted-foreground">{org.subtitle}</p>}
          </div>

          <div className="space-y-2">
            {org.roles.map((role, index) => {
              const style = rankStyles[Math.min(index, rankStyles.length - 1)];
              const RankIcon = style.icon;
              return (
                <div key={role.title}>
                  {index > 0 && (
                    <div className="flex justify-center py-1">
                      <ChevronUp className="text-primary/40 animate-bounce" size={18} />
                    </div>
                  )}
                  <div
                    className="transition-all duration-300"
                    style={{ marginLeft: `min(${index * 5}vw, ${index * 32}px)` }}
                  >
                    <div
                      className={`relative rounded-xl border bg-card/60 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:-translate-y-1 ${style.border} ${style.glow} ${style.pad}`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ring-2 ${style.ring} ${style.badge}`}
                        >
                          <RankIcon className={style.color} size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h4 className={`font-bold ${style.color} ${style.title}`}>{role.title}</h4>
                            <span className="text-xs text-muted-foreground">{role.period}</span>
                          </div>
                          <ul className="mt-3 space-y-1.5">
                            {role.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm flex items-start gap-2 text-foreground/85">
                                <span className="text-accent mt-1 shrink-0">▹</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {memberships.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-foreground mb-5">Also Involved In</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {memberships.map((item) => (
              <div
                key={item.organization}
                className="flex items-center gap-4 rounded-xl border border-border bg-card/60 p-5 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-primary/10 ring-2 ring-primary/20">
                  <Users className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.organization}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.role}
                    {item.period && ` · ${item.period}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipJourney;
