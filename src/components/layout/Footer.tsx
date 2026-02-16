import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "ZYLOENS Platform", href: "/products" },
      { name: "Edge Intelligence", href: "/products" },
      { name: "Smart Devices", href: "/products" },
      { name: "View All Products", href: "/products" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Education", href: "/technology" },
      { name: "Smart Cities", href: "/technology" },
      { name: "Manufacturing", href: "/technology" },
      { name: "Healthcare", href: "/technology" },
      { name: "View All Solutions", href: "/technology" },
    ],
  },
  {
    title: "Technology",
    links: [
      { name: "AI & Machine Learning", href: "/technology" },
      { name: "Computer Vision", href: "/technology" },
      { name: "IoT Systems", href: "/technology" },
      { name: "Quantum Research", href: "/technology" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Leadership", href: "/about" },
      { name: "Careers", href: "/about" },
      { name: "News & Blog", href: "/about" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Documentation", href: "/contact" },
      { name: "Technical Support", href: "/contact" },
      { name: "Training", href: "/contact" },
      { name: "FAQs", href: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="section-tech-dark">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/80">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-lg">
              <span className="text-primary">XYP</span>{" "}
              <span className="text-primary-foreground">Quantum AI</span>
            </Link>
            <span className="text-xs text-primary-foreground/50">
              © 2026 XYP Quantum AI Systems. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs text-primary-foreground/50">
              <Link to="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
