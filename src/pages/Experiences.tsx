import Navbar from "@/components/Navbar";
import ExperienceBubbles from "@/components/ExperienceBubbles";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Code, Users, Award } from "lucide-react";

const Experiences = () => {

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
            <ExperienceBubbles
              items={workExperience.map(exp => ({
                title: exp.role,
                subtitle: exp.company,
                period: exp.period,
                description: exp.description,
                location: exp.location,
                icon: exp.icon,
              }))}
              title="Work Experience"
              icon={Briefcase}
            />
          </section>

          {/* Projects Section */}
          <section className="mb-20">
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
          </section>

          {/* Leadership Section */}
          <section className="mb-20">
            <ExperienceBubbles
              items={[{
                title: leadership.role,
                subtitle: leadership.title,
                period: leadership.period,
                achievements: leadership.achievements,
                icon: Award,
              }]}
              title="Leadership"
              icon={Users}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Experiences;
