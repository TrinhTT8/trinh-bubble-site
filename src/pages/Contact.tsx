import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to a backend
    toast.success("Message sent! I'll get back to you soon.", {
      description: "Thank you for reaching out!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "trinhttran08@gmail.com",
      href: "mailto:trinhttran08@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(940) 367-8585",
      href: "tel:9403678585",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Denton, TX",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/TrinhTT8",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/trinhtran-unt",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-4">
              Let's Connect
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or want to work together? I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-card border-border hover:border-primary/50 transition-colors">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 glow">
                  <Send className="mr-2" size={18} />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8 bg-card border-border">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-foreground font-medium hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">{item.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-8 bg-card border-border">
                <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors glow-accent"
                      >
                        <Icon className="text-primary" size={28} />
                      </a>
                    );
                  })}
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Feel free to connect with me on social media. I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your vision.
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-border">
                <h3 className="text-xl font-bold mb-3">Currently Available</h3>
                <p className="text-foreground/80">
                  I'm actively seeking internship and full-time opportunities in software engineering, 
                  frontend development, and machine learning. Let's build something amazing together!
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
