import Navbar from "@/components/Navbar";
import FloatingBubbles from "@/components/FloatingBubbles";
import ExperienceBubbles from "@/components/ExperienceBubbles";
import WorkExperienceCards, { type WorkExperienceItem } from "@/components/WorkExperienceCards";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, Code, Users, Code2, Wrench, Palette, Workflow } from "lucide-react";

type SkillColor = "blue" | "cyan" | "pink" | "purple";

const colorStyles: Record<SkillColor, { icon: string; border: string; badge: string }> = {
  blue: {
    icon: "text-blue-400",
    border: "hover:border-blue-400/50",
    badge: "hover:bg-blue-400/20 hover:text-blue-300 hover:border-blue-400/40 hover:shadow-blue-400/20",
  },
  cyan: {
    icon: "text-cyan-400",
    border: "hover:border-cyan-400/50",
    badge: "hover:bg-cyan-400/20 hover:text-cyan-300 hover:border-cyan-400/40 hover:shadow-cyan-400/20",
  },
  pink: {
    icon: "text-pink-400",
    border: "hover:border-pink-400/50",
    badge: "hover:bg-pink-400/20 hover:text-pink-300 hover:border-pink-400/40 hover:shadow-pink-400/20",
  },
  purple: {
    icon: "text-purple-400",
    border: "hover:border-purple-400/50",
    badge: "hover:bg-purple-400/20 hover:text-purple-300 hover:border-purple-400/40 hover:shadow-purple-400/20",
  },
};

const Experiences = () => {
  const skills = {
    languages: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "C++", "SQL"],
    tools: ["Git/GitLab", "Docker", "Linux", "Jira", "Bitbucket", "Visual Studio"],
    design: ["Figma", "Adobe XD", "Photoshop", "Visily"],
    methodologies: ["Agile", "Waterfall", "CI/CD"],
  };

  const skillCategories: { key: string; label: string; icon: typeof Code2; items: string[]; color: SkillColor }[] = [
    { key: "languages", label: "Languages", icon: Code2, items: skills.languages, color: "blue" },
    { key: "tools", label: "Tools & Technologies", icon: Wrench, items: skills.tools, color: "cyan" },
    { key: "design", label: "Design Tools", icon: Palette, items: skills.design, color: "pink" },
    { key: "methodologies", label: "Methodologies", icon: Workflow, items: skills.methodologies, color: "purple" },
  ];

  // Tip: add an `image: "/path/to/photo.jpg"` field to any entry below to swap
  // its postcard placeholder cover for a real photo.
  const workExperience: WorkExperienceItem[] = [
    {
      company: "Depository of Trust & Clearing Corporation (DTCC)",
      role: "IT Intern",
      location: "Dallas, TX",
      period: "Jun 2025 – Present",
      description: [
        "Coordinated Agile sprints as Scrum Master, fostering collaboration between backend, frontend, and design teams",
        "Engineered scalable UI components using Angular with 90%+ test coverage",
        "Conducted customer research and designed 10+ high-fidelity prototypes, improving usability by 30%",
        "Collaborated with backend teams to integrate APIs and automate CI/CD pipelines",
      ],
      icon: Briefcase,
    },
    {
      company: "National Science Foundation (NSF)",
      role: "Machine Learning Researcher",
      location: "Remote",
      period: "Jun – Aug 2024",
      description: [
        "Designed and trained ML models (SVM, Decision Tree, LSTM) achieving 80%+ F1 score",
        "Applied pattern mining and deep learning to analyze user mobile behavior trends",
        "Authored research findings with data-driven recommendations",
      ],
      icon: GraduationCap,
    },
  ];

  const projects = [
    {
      title: "No Treble",
      period: "Jan – Jun 2025",
      description:
        "Led frontend design and development for an accessible learning app for visually impaired students, collaborating with a team of 6",
      technologies: ["React.js", "Bootstrap", "Firebase", "Docker", "CI/CD"],
      highlights: [
        "Translated insights from 10+ user interviews into 20+ interactive prototypes",
        "Integrated text-to-speech functionality for accessibility",
        "Implemented CI/CD pipelines improving deployment efficiency by 25%",
      ],
    },
    {
      title: "Mean Green Lyft",
      period: "Aug – Jan 2023",
      description:
        "Designed a large-scale C++ application simulating ride-sharing operations with OOP principles",
      technologies: ["C++", "OOP", "System Design"],
      highlights: [
        "Integrated authentication, scheduling, and real-time matching modules",
        "Optimized cross-module communication for improved stability",
        "Built modular architecture for future GPS integration",
      ],
    },
  ];

  const leadership = [
    {
      title: "General Secretary",
      subtitle: "Women in Computing, UNT",
      period: "Jan 2024 – Aug 2024",
      achievements: [
        "Managed administrative tasks and coordinated club communications",
        "Organized initial member recruitment events",
        "Assisted in planning first semester activities",
      ],
    },
    {
      title: "Vice President",
      subtitle: "Women in Computing, UNT",
      period: "Aug 2024 – Dec 2024",
      achievements: [
        "Coordinated event planning and logistics for major STEM events",
        "Managed officer team and delegated responsibilities",
        "Developed marketing strategies to increase club visibility",
      ],
    },
    {
      title: "President",
      subtitle: "Women in Computing, UNT",
      period: "Jan 2025 – Present",
      achievements: [
        "Led 10+ officers to host major STEM events for women in computing",
        "Launched marketing strategies attracting 30+ new members in one semester",
        "Mentored officers and fostered collaborative team culture",
      ],
    },
  ];

  const leadershipBubble = {
    title: "Women in Computing",
    subtitle: "UNT",
    period: "Jan 2024 – Present",
    achievements: [],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingBubbles />

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-4">
              My Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of my experiences, skills, and projects that showcase my growth as a developer.
            </p>
          </div>

          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto mb-12">
              <TabsTrigger value="skills" className="gap-2 py-2.5">
                <Code size={16} />
                Skills
              </TabsTrigger>
              <TabsTrigger value="work" className="gap-2 py-2.5">
                <Briefcase size={16} />
                Work Experience
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2 py-2.5">
                <Code size={16} />
                Projects
              </TabsTrigger>
              <TabsTrigger value="leadership" className="gap-2 py-2.5">
                <Users size={16} />
                Leadership
              </TabsTrigger>
            </TabsList>

            {/* Skills Section */}
            <TabsContent value="skills">
              <div className="flex items-center gap-3 mb-8">
                <Code className="text-primary" size={32} />
                <h2 className="text-3xl font-bold">Technical Skills</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {skillCategories.map(({ key, label, icon: CategoryIcon, items, color }) => {
                  const styles = colorStyles[color];
                  return (
                    <Card
                      key={key}
                      className={`p-6 bg-card border-border transition-colors ${styles.border}`}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <CategoryIcon className={styles.icon} size={22} />
                        <h3 className={`text-xl font-semibold ${styles.icon}`}>{label}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className={`bg-secondary/50 text-sm sm:text-base px-3 py-1.5 cursor-default transition-all duration-200 hover:scale-110 hover:shadow-md ${styles.badge}`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Work Experience Section */}
            <TabsContent value="work">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-primary" size={32} />
                <h2 className="text-3xl font-bold">Work Experience</h2>
              </div>
              <WorkExperienceCards items={workExperience} />
            </TabsContent>

            {/* Projects Section */}
            <TabsContent value="projects">
              <ExperienceBubbles
                items={projects.map(project => ({
                  title: project.title,
                  period: project.period,
                  description: [project.description],
                  technologies: project.technologies,
                  highlights: project.highlights,
                  icon: Code,
                }))}
                title="Projects"
                icon={Code}
              />
            </TabsContent>

            {/* Leadership Section */}
            <TabsContent value="leadership">
              <ExperienceBubbles
                items={[{
                  title: leadershipBubble.title,
                  subtitle: leadershipBubble.subtitle,
                  period: leadershipBubble.period,
                  achievements: leadershipBubble.achievements,
                  icon: Users,
                }]}
                title="Leadership"
                icon={Users}
                leadershipItems={leadership.map(role => ({
                  title: role.title,
                  subtitle: role.subtitle,
                  period: role.period,
                  achievements: role.achievements,
                  icon: Users,
                }))}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Experiences;
