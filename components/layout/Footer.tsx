import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/yourusername", 
      label: "GitHub" 
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/yourprofile",
      label: "LinkedIn",
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com/yourusername", 
      label: "Twitter" 
    },
    { 
      icon: Mail, 
      href: "mailto:your.email@example.com", 
      label: "Email" 
    },
  ];

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <IconComponent className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} Walid. Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}