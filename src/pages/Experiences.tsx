import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Code, Users, Award } from "lucide-react";

const Experiences = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = timelineRef.current?.querySelectorAll(".timeline-item");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skills = {
    languages: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "C++", "SQL"],
    tools: ["Git/GitLab", "Docker", "Linux", "Jira", "Bitbucket", "Visual Studio"],
    design: ["Figma", "Adobe XD", "Photoshop", "Visily"],
    methodologies: ["Agile", "Waterfall", "CI/CD"],
  };

  const workExperience = [
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

  const leadership = {
    title: "Women in Computing, UNT",
    role: "President",
    period: "Jan 2025 – Present",
    achievements: [
      "Led 10+ officers to host major STEM events for women in computing",
      "Launched marketing strategies attracting 30+ new members in one semester",
      "Mentored officers and fostered collaborative team culture",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
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

          {/* Skills Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Code className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Technical Skills</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-primary">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-accent">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-primary">Design Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.design.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-accent">Methodologies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.methodologies.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-accent" size={32} />
              <h2 className="text-3xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-6">
              {workExperience.map((exp, index) => {
                const Icon = exp.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:glow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="text-xl font-semibold">{exp.role}</h3>
                          <span className="text-sm text-muted-foreground">{exp.period}</span>
                        </div>
                        <p className="text-accent font-medium mb-1">{exp.company}</p>
                        <p className="text-sm text-muted-foreground mb-4">{exp.location}</p>
                        <ul className="space-y-2">
                          {exp.description.map((item, i) => (
                            <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                              <span className="text-primary mt-1">▹</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Projects Timeline Section */}
          <section className="mb-20" ref={timelineRef}>
            <div className="flex items-center gap-3 mb-8">
              <Code className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Projects</h2>
            </div>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={`timeline-item opacity-0 relative ${
                      index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-8"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 glow"></div>

                    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:glow ml-8 md:ml-0">
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-2xl font-bold gradient-text-alt">{project.title}</h3>
                            <span className="text-sm text-muted-foreground">{project.period}</span>
                          </div>
                          <p className="text-foreground/80 mb-4">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} className="bg-primary/20 text-primary border-primary/30">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                              <span className="text-accent mt-1">▹</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Leadership Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-accent" size={32} />
              <h2 className="text-3xl font-bold">Leadership</h2>
            </div>
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:glow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Award className="text-accent" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold">{leadership.role}</h3>
                    <span className="text-sm text-muted-foreground">{leadership.period}</span>
                  </div>
                  <p className="text-primary font-medium mb-4">{leadership.title}</p>
                  <ul className="space-y-2">
                    {leadership.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="text-accent mt-1">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Experiences;
