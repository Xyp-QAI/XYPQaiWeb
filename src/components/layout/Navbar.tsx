import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Products",
    href: "/products",
    columns: [
      {
        title: "Product Categories",
        links: [
          { name: "ZYLOENS Platform", href: "/products", badge: "" },
          { name: "XYP Edge Intelligence", href: "/products", badge: "Coming Soon" },
          { name: "XYP Smart Devices", href: "/products", badge: "Coming Soon" },
        ],
      },
      {
        title: "By Industry",
        links: [
          { name: "Education Solutions", href: "/technology" },
          { name: "Smart Cities", href: "/technology" },
          { name: "Industrial IoT", href: "/technology" },
        ],
      },
      {
        title: "Featured",
        links: [
          { name: "Latest Product Update", href: "/products" },
          { name: "View All Products →", href: "/products" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/technology",
    columns: [
      {
        title: "By Domain",
        links: [
          { name: "AI for Education", href: "/technology" },
          { name: "Computer Vision Systems", href: "/technology" },
          { name: "Smart City Infrastructure", href: "/technology" },
        ],
      },
      {
        title: "By Industry",
        links: [
          { name: "Healthcare", href: "/technology" },
          { name: "Manufacturing", href: "/technology" },
          { name: "Retail & Hospitality", href: "/technology" },
        ],
      },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    columns: [
      {
        title: "Core Technology",
        links: [
          { name: "AI & Machine Learning", href: "/technology" },
          { name: "Computer Vision", href: "/technology" },
          { name: "Edge Computing", href: "/technology" },
        ],
      },
      {
        title: "Research",
        links: [
          { name: "Quantum Computing", href: "/technology" },
          { name: "Research & Innovation", href: "/technology" },
          { name: "Technology Stack", href: "/technology" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    columns: [
      {
        title: "About",
        links: [
          { name: "About Us", href: "/about" },
          { name: "Leadership Team", href: "/about" },
          { name: "Careers", href: "/about" },
        ],
      },
      {
        title: "Resources",
        links: [
          { name: "News & Blog", href: "/about" },
          { name: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
          <span className="text-primary">XYP</span>
          <span className="text-foreground">Quantum AI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  "hover:text-primary",
                  location.pathname === item.href ? "text-primary" : "text-foreground"
                )}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    activeMenu === item.label && "rotate-180"
                  )}
                />
              </Link>

              {/* Mega Menu */}
              {activeMenu === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2" onMouseEnter={() => setActiveMenu(item.label)}>
                  <div className="bg-background rounded-lg shadow-xl border border-border p-6 min-w-[480px] animate-fade-in-up grid grid-cols-2 gap-8"
                    style={{ animationDuration: "0.2s" }}>
                    {item.columns.map((col) => (
                      <div key={col.title}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          {col.title}
                        </p>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.name}>
                              <Link
                                to={link.href}
                                className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2"
                              >
                                {link.name}
                                {"badge" in link && link.badge && (
                                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">
                                    {link.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search size={18} />
          </Button>
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="flex items-center justify-between w-full py-3 text-sm font-medium"
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform",
                      mobileExpanded === item.label && "rotate-180"
                    )}
                  />
                </button>
                {mobileExpanded === item.label && (
                  <div className="pl-4 pb-3 space-y-4">
                    {item.columns.map((col) => (
                      <div key={col.title}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          {col.title}
                        </p>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.name}>
                              <Link
                                to={link.href}
                                className="text-sm text-foreground hover:text-primary transition-colors"
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border">
              <Button asChild className="w-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
