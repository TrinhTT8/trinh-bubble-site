import { lazy, Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingBubbles from "@/components/FloatingBubbles";
import WorkExperienceCards, { type WorkExperienceItem } from "@/components/WorkExperienceCards";
import type { ProjectItem } from "@/components/ProjectsCarousel";
import LeadershipJourney, { type LeadershipOrg, type MembershipItem } from "@/components/LeadershipJourney";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  Code,
  Users,
  Code2,
  Wrench,
  Palette,
  Workflow,
  Blocks,
  X,
} from "lucide-react";

type SkillColor = "blue" | "cyan" | "pink" | "purple" | "amber";

const colorStyles: Record<SkillColor, { icon: string; border: string; badge: string; active: string }> = {
  blue: {
    icon: "text-blue-400",
    border: "hover:border-blue-400/50",
    badge: "hover:bg-blue-400/20 hover:text-blue-300 hover:border-blue-400/40",
    active: "bg-blue-400/20 text-blue-300 border-blue-400/40",
  },
  cyan: {
    icon: "text-cyan-400",
    border: "hover:border-cyan-400/50",
    badge: "hover:bg-cyan-400/20 hover:text-cyan-300 hover:border-cyan-400/40",
    active: "bg-cyan-400/20 text-cyan-300 border-cyan-400/40",
  },
  pink: {
    icon: "text-pink-400",
    border: "hover:border-pink-400/50",
    badge: "hover:bg-pink-400/20 hover:text-pink-300 hover:border-pink-400/40",
    active: "bg-pink-400/20 text-pink-300 border-pink-400/40",
  },
  purple: {
    icon: "text-purple-400",
    border: "hover:border-purple-400/50",
    badge: "hover:bg-purple-400/20 hover:text-purple-300 hover:border-purple-400/40",
    active: "bg-purple-400/20 text-purple-300 border-purple-400/40",
  },
  amber: {
    icon: "text-amber-400",
    border: "hover:border-amber-400/50",
    badge: "hover:bg-amber-400/20 hover:text-amber-300 hover:border-amber-400/40",
    active: "bg-amber-400/20 text-amber-300 border-amber-400/40",
  },
};

// Loaded on demand: pulls in three.js/@react-three, so keep it out of the main bundle.
const ProjectsCarousel = lazy(() => import("@/components/ProjectsCarousel"));

const Experiences = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const toggleSkill = (skill: string) => setSelectedSkill((prev) => (prev === skill ? null : skill));

  const skills = {
    languages: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "C++", "SQL"],
    frameworks: ["Angular", "React.js", "Bootstrap", "Firebase", "Vite", "Tailwind CSS", "Framer Motion", "FastAPI"],
    tools: [
      "Git/GitLab",
      "Docker",
      "Linux",
      "Jira",
      "Bitbucket",
      "Visual Studio",
      "Vultr",
      "Vercel",
      "MongoDB Atlas",
      "Google Cloud Storage",
      "Gemini API",
      "Web Speech API",
      "Presage",
    ],
    design: ["Figma", "Photoshop", "Visily", "Figma Make"],
    methodologies: ["Agile", "Waterfall", "CI/CD", "OOP", "System Design"],
  };

  const skillCategories: { key: string; label: string; icon: typeof Code2; items: string[]; color: SkillColor }[] = [
    { key: "languages", label: "Languages", icon: Code2, items: skills.languages, color: "blue" },
    { key: "frameworks", label: "Frameworks & Libraries", icon: Blocks, items: skills.frameworks, color: "amber" },
    { key: "tools", label: "Tools & Technologies", icon: Wrench, items: skills.tools, color: "cyan" },
    { key: "design", label: "Design Tools", icon: Palette, items: skills.design, color: "pink" },
    { key: "methodologies", label: "Methodologies", icon: Workflow, items: skills.methodologies, color: "purple" },
  ];

  // Tip: add an `image: "/path/to/photo.jpg"` field to any entry below to swap
  // its postcard placeholder cover for a real photo. `technologies` should only
  // list skill names that also appear in `skills` above, so the sidebar filter can match them.
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
      technologies: ["Angular", "Python", "Typescript", "CSS", "HTML", "Linux", "Jira", "Bitbucket", "Visual Studio", "Agile", "CI/CD"],
      image: "/DTCC.png"
    },
    {
      company: "Wize Computing Academy",
      role: "Teacher Assistant",
      location: "Dallas, TX",
      period: "Jan 2026 – Present",
      description: [
        "Teach coding and robotics fundamentals to 50+ K-12 students across multiple classes, some with 15+ students each, using Scratch, Python, LEGO robotics kits, Minecraft, and Roblox Studio.",
        "Adapt lessons across age groups and skill levels, provide one-on-one troubleshooting support, and manage group instruction for larger classes while building students' confidence in STEM.",
      ],
      icon: GraduationCap,
      // Assuming Python here since it's the de facto language for this kind of ML work —
      // adjust/remove if that wasn't actually the language used.
      technologies: ["Python", "Visual Studio"],
      image: "/Wize.png"
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
      // Assuming Python here since it's the de facto language for this kind of ML work —
      // adjust/remove if that wasn't actually the language used.
      technologies: ["Python"],
      image: "/NSF.png"
    }
  ];

  // Tip: add a `githubUrl: "https://github.com/..."` field to any entry below
  // once its repo is ready to share — the modal will swap the placeholder
  // button for a real "View on GitHub" link automatically.
  const projects: ProjectItem[] = [
    {
      title: "No Treble",
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
      description:
        "Designed a large-scale C++ application simulating ride-sharing operations with OOP principles",
      technologies: ["C++", "OOP", "System Design"],
      highlights: [
        "Integrated authentication, scheduling, and real-time matching modules",
        "Optimized cross-module communication for improved stability",
        "Built modular architecture for future GPS integration",
      ],
    },
    {
      // TODO: add real dates and a couple of highlight bullets once you have them —
      // this description is just a factual restatement of the stack you gave me.
      title: "Nest Guard",
      period: "WEHack 2026 Winner",
      description:
        "Built with React, Vite, and Tailwind CSS on the frontend, a Python FastAPI backend, and the Gemini API, deployed on Vultr and Vercel.",
      technologies: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "Python", "FastAPI", "Gemini API", "Vultr", "Vercel"],
      highlights: [],
      githubUrl: "https://github.com/TrinhTT8/nest-guard",
      hackathonWinner: true,
    },
    {
      // TODO: add real dates, a github link (if public), and a couple of highlight bullets.
      title: "PosiSense",
      period: "HackAI 2026 Winner",
      description:
        "Built using Presage and the Web Speech API, designed with Figma Make, with a React and Tailwind CSS frontend backed by MongoDB Atlas.",
      technologies: ["Presage", "Web Speech API", "Figma Make", "React.js", "Tailwind CSS", "MongoDB Atlas"],
      highlights: [],
      hackathonWinner: true,
    },
    {
      // TODO: add a period/date label and a github link (if public) once you have them.
      title: "Magnify CRM",
      description: "Customer Relationship Management Platform",
      technologies: ["Angular", "Python", "Google Cloud Storage"],
      highlights: [
        "Built a full-stack SaaS CRM (Angular/Python) with Google Cloud Storage integration for scalable document management",
        "Developed a modular Angular frontend with 15+ reusable components, improving UI development consistency and accelerating feature implementation",
        "Optimized database schema and queries, accelerating data retrieval for core views by 40%",
        "Migrated 100+ customer records to the cloud with stakeholders, boosting info retrieval 80% and outreach speed",
      ],
    },
  ];

  const leadershipProgressions: LeadershipOrg[] = [
    {
      organization: "Women in Computing, UNT",
      subtitle: "Jan 2024 – Present",
      roles: [
        {
          title: "General Secretary",
          period: "Jan 2024 – Aug 2024",
          achievements: [
            "Managed administrative tasks and coordinated club communications",
            "Organized initial member recruitment events",
            "Assisted in planning first semester activities",
          ],
        },
        {
          title: "Vice President",
          period: "Aug 2024 – Dec 2024",
          achievements: [
            "Coordinated event planning and logistics for major STEM events",
            "Managed officer team and delegated responsibilities",
            "Developed marketing strategies to increase club visibility",
          ],
        },
        {
          title: "President",
          period: "Jan 2025 – Present",
          achievements: [
            "Led 10+ officers to host major STEM events for women in computing",
            "Launched marketing strategies attracting 30+ new members in one semester",
            "Mentored officers and fostered collaborative team culture",
          ],
        },
      ],
    },
  ];

  // Tip: add a `period` here (e.g. "Since Fall 2024") once you have one.
  const leadershipMemberships: MembershipItem[] = [
    { organization: "Society of Women Engineers", role: "Member" },
  ];

  const filteredWorkExperience = selectedSkill
    ? workExperience.filter((exp) => exp.technologies?.includes(selectedSkill))
    : workExperience;

  const filteredProjects = selectedSkill
    ? projects.filter((project) => project.technologies.includes(selectedSkill))
    : projects;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingBubbles />

      <main className="relative z-10 pt-24 pb-16 px-2.5">
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-4">
              My Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of my experiences, skills, and projects that showcase my growth as a developer.
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Skills Sidebar */}
            <aside className="bg-card/50 border border-border rounded-xl p-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold">Technical Skills</h2>
                {selectedSkill && (
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <X size={12} />
                    Clear
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                Click a skill to filter the work & projects that used it.
              </p>

              <div className="space-y-5">
                {skillCategories.map(({ key, label, icon: CategoryIcon, items, color }) => {
                  const styles = colorStyles[color];
                  return (
                    <div key={key}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <CategoryIcon className={styles.icon} size={14} />
                        <h3 className={`text-xs font-semibold uppercase tracking-wide ${styles.icon}`}>
                          {label}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((skill) => {
                          const isSelected = selectedSkill === skill;
                          return (
                            <button
                              key={skill}
                              onClick={() => toggleSkill(skill)}
                              aria-pressed={isSelected}
                              className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${
                                isSelected
                                  ? `${styles.active} scale-105 shadow-md`
                                  : `bg-secondary/50 border-transparent text-foreground/80 ${styles.badge}`
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Experience / Projects / Leadership */}
            <div className="min-w-0">
              {selectedSkill && (
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Showing results for:</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary border border-primary/30 px-3 py-1 font-medium">
                    {selectedSkill}
                    <button onClick={() => setSelectedSkill(null)} aria-label="Clear skill filter">
                      <X size={12} />
                    </button>
                  </span>
                </div>
              )}

              <Tabs defaultValue="work" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto mb-12">
                  <TabsTrigger value="work" className="gap-2 py-2.5">
                    <Briefcase size={16} />
                    Work Experience
                    {selectedSkill && (
                      <span className="opacity-70">({filteredWorkExperience.length})</span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="gap-2 py-2.5">
                    <Code size={16} />
                    Projects
                    {selectedSkill && <span className="opacity-70">({filteredProjects.length})</span>}
                  </TabsTrigger>
                  <TabsTrigger value="leadership" className="gap-2 py-2.5">
                    <Users size={16} />
                    Leadership
                  </TabsTrigger>
                </TabsList>

                {/* Work Experience Section */}
                <TabsContent value="work">
                  <div className="flex items-center gap-3 mb-8">
                    <Briefcase className="text-primary" size={32} />
                    <h2 className="text-3xl font-bold">Work Experience</h2>
                  </div>
                  <WorkExperienceCards items={filteredWorkExperience} />
                </TabsContent>

                {/* Projects Section */}
                <TabsContent value="projects">
                  <div className="flex items-center gap-3 mb-8 justify-center sm:justify-start">
                    <Code className="text-primary" size={32} />
                    <h2 className="text-3xl font-bold">Projects</h2>
                  </div>
                  <Suspense
                    fallback={
                      <div className="h-80 sm:h-[28rem] max-w-2xl mx-auto rounded-2xl border border-primary/20 bg-card animate-pulse" />
                    }
                  >
                    <ProjectsCarousel items={filteredProjects} />
                  </Suspense>
                </TabsContent>

                {/* Leadership Section */}
                <TabsContent value="leadership">
                  <div className="flex items-center gap-3 mb-8">
                    <Users className="text-primary" size={32} />
                    <h2 className="text-3xl font-bold">Leadership</h2>
                  </div>
                  <LeadershipJourney progressions={leadershipProgressions} memberships={leadershipMemberships} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Experiences;
