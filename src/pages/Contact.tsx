import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Calendar, Handshake, Headphones, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

type QuickLinkType = "demo" | "pricing" | "support" | null;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeQuickLink, setActiveQuickLink] = useState<QuickLinkType>(null);
  const [quickLinkSubmitted, setQuickLinkSubmitted] = useState<QuickLinkType>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleQuickLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickLinkSubmitted(activeQuickLink);
    setActiveQuickLink(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Contact Us" description="Get in touch with XYP Quantum AI — Bengaluru, Karnataka, India. Request demos, partnerships, and support." path="/contact" />
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
              {/* Form Area — switches between default and quick link forms */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {submitted || quickLinkSubmitted ? (
                    <motion.div
                      key="success"
                      className="bg-primary/5 border border-primary/20 rounded-lg p-12 text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                      <p className="text-muted-foreground">We've received your request and will get back to you within 1-2 business days.</p>
                      <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => { setSubmitted(false); setQuickLinkSubmitted(null); setActiveQuickLink(null); }}
                      >
                        Submit Another Request
                      </Button>
                    </motion.div>
                  ) : activeQuickLink ? (
                    <motion.div
                      key={activeQuickLink}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">
                          {activeQuickLink === "demo" && "Book a Demo"}
                          {activeQuickLink === "pricing" && "Request Pricing"}
                          {activeQuickLink === "support" && "Technical Support"}
                        </h3>
                        <button
                          onClick={() => setActiveQuickLink(null)}
                          className="text-sm text-primary hover:underline"
                        >
                          ← Back to General Inquiry
                        </button>
                      </div>
                      <form onSubmit={handleQuickLinkSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                            <Input required placeholder="Rahul Sharma" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Email Address *</label>
                            <Input type="email" required placeholder="rahul@company.com" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                            <Input type="tel" placeholder="+91 98765 43210" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Company/Institution *</label>
                            <Input required placeholder="Your organization" />
                          </div>
                        </div>

                        {/* Demo-specific fields */}
                        {activeQuickLink === "demo" && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Preferred Demo Date *</label>
                                <Input type="date" required />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Number of Attendees</label>
                                <Input type="number" min={1} placeholder="e.g. 5" />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Product of Interest</label>
                              <Select>
                                <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="zyloens">ZYLOENS Platform</SelectItem>
                                  <SelectItem value="edge">XYP Edge Intelligence</SelectItem>
                                  <SelectItem value="smart">XYP Smart Devices</SelectItem>
                                  <SelectItem value="all">All Products</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}

                        {/* Pricing-specific fields */}
                        {activeQuickLink === "pricing" && (
                          <>
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Solution Needed *</label>
                              <Select>
                                <SelectTrigger><SelectValue placeholder="Select solution" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="education">Education Solutions</SelectItem>
                                  <SelectItem value="smartcity">Smart City</SelectItem>
                                  <SelectItem value="industrial">Industrial IoT</SelectItem>
                                  <SelectItem value="custom">Custom Solution</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Estimated Budget Range</label>
                                <Select>
                                  <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="5l">Under ₹5,00,000</SelectItem>
                                    <SelectItem value="25l">₹5,00,000 – ₹25,00,000</SelectItem>
                                    <SelectItem value="50l">₹25,00,000 – ₹50,00,000</SelectItem>
                                    <SelectItem value="50l+">₹50,00,000+</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Timeline</label>
                                <Select>
                                  <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="immediate">Immediate</SelectItem>
                                    <SelectItem value="1-3">1–3 Months</SelectItem>
                                    <SelectItem value="3-6">3–6 Months</SelectItem>
                                    <SelectItem value="6+">6+ Months</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Support-specific fields */}
                        {activeQuickLink === "support" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Issue Category *</label>
                              <Select>
                                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bug">Bug / Error</SelectItem>
                                  <SelectItem value="setup">Setup / Installation</SelectItem>
                                  <SelectItem value="account">Account / Billing</SelectItem>
                                  <SelectItem value="feature">Feature Request</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Priority</label>
                              <Select>
                                <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Additional Details</label>
                          <Textarea rows={4} placeholder="Tell us more about your request..." />
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                          Submit Request
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                            <Input required placeholder="Rahul Sharma" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Email Address *</label>
                            <Input type="email" required placeholder="rahul@company.com" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                            <Input type="tel" placeholder="+91 98765 43210" />
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Mail, label: "General Inquiries", value: "info@xypquantum.com" },
                      { icon: Phone, label: "Phone", value: "+91 6362 452 728" },
                      { icon: MapPin, label: "Headquarters", value: "Bengaluru, Karnataka\nIndia" },
                      { icon: Clock, label: "Business Hours", value: "Monday–Friday: 9AM–6PM IST" },
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
                    {([
                      { label: "Book a Demo", key: "demo" as QuickLinkType },
                      { label: "Request Pricing", key: "pricing" as QuickLinkType },
                      { label: "Technical Support", key: "support" as QuickLinkType },
                    ]).map((link) => (
                      <button
                        key={link.label}
                        onClick={() => {
                          setActiveQuickLink(link.key);
                          setSubmitted(false);
                          setQuickLinkSubmitted(null);
                        }}
                        className={`block text-sm hover:underline text-left ${activeQuickLink === link.key ? "text-primary font-semibold" : "text-primary"}`}
                      >
                        → {link.label}
                      </button>
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
                  action: "partnerships@xypquantum.com",
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
