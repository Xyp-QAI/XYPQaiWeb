import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const news = [
  {
    category: "Product Update",
    title: "ZYLOENS Platform v2.5 Launches with Enhanced Analytics",
    date: "February 10, 2026",
    excerpt: "New real-time analytics dashboard gives administrators unprecedented insights into institutional performance and student engagement across Indian schools.",
  },
  {
    category: "Research",
    title: "XYP Publishes Breakthrough in Quantum Error Correction",
    date: "January 28, 2026",
    excerpt: "Our research team at our Bengaluru lab demonstrates a novel approach to quantum error correction that significantly improves qubit stability.",
  },
  {
    category: "Press Release",
    title: "XYP Quantum AI Expands Across 5 Indian States",
    date: "January 15, 2026",
    excerpt: "Strategic expansion into Karnataka, Tamil Nadu, Maharashtra, Telangana, and Kerala brings AI-powered learning platforms to over 200 new schools.",
  },
];

const categoryColors: Record<string, string> = {
  "Product Update": "bg-primary/10 text-primary",
  Research: "bg-accent/10 text-accent",
  "Press Release": "bg-destructive/10 text-destructive",
};

const NewsSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-section-sm lg:text-section mb-2">
              Latest News & Insights
            </h2>
            <p className="text-muted-foreground">
              Stay updated with our latest developments.
            </p>
          </div>
          <Link
            to="/about"
            className="hidden md:inline-flex text-sm text-primary font-medium hover:underline"
          >
            View All News →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.article
              key={item.title}
              className="card-hover bg-card border border-border rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="p-6">
                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded mb-3 ${categoryColors[item.category] || "bg-muted text-muted-foreground"}`}
                >
                  {item.category}
                </span>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{item.date}</p>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.excerpt}
                </p>
                <Link
                  to="/about"
                  className="inline-block text-sm text-primary font-medium mt-4"
                >
                  Read more →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
