import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Calendar, Handshake, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero
          title="Get in Touch"
          subtitle="Let's discuss how we can work together"
        />

        {/* Contact Form + Info */}
        <section className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <motion.div
                    className="bg-primary/5 border border-primary/20 rounded-lg p-12 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                    <p className="text-muted-foreground">We've received your message and will get back to you within 1-2 business days.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                        <Input required placeholder="John Smith" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email Address *</label>
                        <Input type="email" required placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                        <Input type="tel" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Company/Institution *</label>
                        <Input required placeholder="Your organization" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Subject</label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="demo">Demo Request</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="media">Media Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Message *</label>
                      <Textarea required rows={6} placeholder="Tell us about your needs..." />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Submit
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Mail, label: "General Inquiries", value: "info@xypquantum.ai" },
                      { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                      { icon: MapPin, label: "Headquarters", value: "123 Innovation Drive\nSan Jose, CA 95134" },
                      { icon: Clock, label: "Business Hours", value: "Monday–Friday: 9AM–6PM EST" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Book a Demo", href: "/contact" },
                      { label: "Request Pricing", href: "/products" },
                      { label: "Technical Support", href: "/contact" },
                    ].map((link) => (
                      <Link key={link.label} to={link.href} className="block text-sm text-primary hover:underline">
                        → {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="section-alt section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  title: "Schedule a Product Demo",
                  description: "See ZYLOENS in action with a personalized demonstration.",
                  action: "Book Demo →",
                },
                {
                  icon: Handshake,
                  title: "Partnership Opportunities",
                  description: "Explore collaboration possibilities with our team.",
                  action: "partnerships@xypquantum.ai",
                },
                {
                  icon: Headphones,
                  title: "Technical Support",
                  description: "Access documentation, FAQs, and support resources.",
                  action: "Visit Support Center →",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-card border border-border rounded-lg p-8 text-center card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <span className="text-sm text-primary font-medium">{item.action}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
