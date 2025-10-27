import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import FloatingBubbles from "@/components/FloatingBubbles";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingBubbles />

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Intro */}
          <div className="animate-fade-in-up">
            <p className="text-accent text-sm sm:text-base font-medium mb-4">
              Xin Chào! My name is
            </p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold gradient-text mb-6">
              Trinh Tran
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-foreground/80 mb-4">
              Entry Level Software Developer
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Passionate about building accessible, scalable applications with modern technologies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/experiences">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-accent bg-[length:300%_100%] hover:bg-[length:100%_100%] text-primary-foreground glow hover:animate-color-slide transition-all duration-500">
                View My Work
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 hover:text-accent transition-colors animate-pulse-glow">
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="https://github.com/TrinhTT8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/in/trinhtran-unt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:trinhttran08@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
