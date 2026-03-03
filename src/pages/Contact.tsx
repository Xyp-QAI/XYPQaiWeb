import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Calendar, Handshake, Headphones, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import { useLocation } from "react-router-dom";

type QuickLinkType = "demo" | "pricing" | "support" | "work" | null;

// In production (e.g. Vercel) use same-origin /api/contact; in dev use local backend
const API_URL =
  import.meta.env.VITE_CONTACT_API_URL ??
  (import.meta.env.PROD ? "" : "http://localhost:3001");

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  domainInterest: string;
  experienceLevel: string;
  currentRole: string;
  availability: string;
  preferredDate: string;
  attendees: string;
  productOfInterest: string;
  solutionNeeded: string;
  budgetRange: string;
  timeline: string;
  issueCategory: string;
  priority: string;
}

const emptyForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  domainInterest: "",
  experienceLevel: "",
  currentRole: "",
  availability: "",
  preferredDate: "",
  attendees: "",
  productOfInterest: "",
  solutionNeeded: "",
  budgetRange: "",
  timeline: "",
  issueCategory: "",
  priority: "",
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeQuickLink, setActiveQuickLink] = useState<QuickLinkType>(null);
  const [quickLinkSubmitted, setQuickLinkSubmitted] = useState<QuickLinkType>(null);
  const [formData, setFormData] = useState<FormData>({ ...emptyForm });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const setSelect = (field: keyof FormData) => (value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // Auto-open the \"Apply to Work With Us\" track when navigated with #work-with-us
  useEffect(() => {
    if (location.hash === "#work-with-us") {
      setActiveQuickLink("work");
      setSubmitted(false);
      setQuickLinkSubmitted(null);
      setFormData({ ...emptyForm });
    }
  }, [location]);

  async function submitToBackend(formType: string) {
    setLoading(true);
    try {
      const payload = { ...formData, formType };

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      return true;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: err.message || "Could not submit your request. Please try again.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submitToBackend("general");
    if (ok) {
      setSubmitted(true);
      setFormData({ ...emptyForm });
    }
  };

  const handleQuickLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submitToBackend(activeQuickLink || "general");
    if (ok) {
      setQuickLinkSubmitted(activeQuickLink);
      setActiveQuickLink(null);
      setFormData({ ...emptyForm });
    }
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
        <section id="work-with-us" className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form Area */}
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
                          {activeQuickLink === "work" && "Apply to Work With Us"}
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
                            <Input required placeholder="Rahul Sharma" value={formData.fullName} onChange={set("fullName")} />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Email Address *</label>
                            <Input type="email" required placeholder="rahul@company.com" value={formData.email} onChange={set("email")} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                            <Input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={set("phone")} />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Company/Institution *</label>
                            <Input required placeholder="Your organization" value={formData.company} onChange={set("company")} />
                          </div>
                        </div>

                        {/* Demo-specific fields */}
                        {activeQuickLink === "demo" && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Preferred Demo Date *</label>
                                <Input type="date" required value={formData.preferredDate} onChange={set("preferredDate")} />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Number of Attendees</label>
                                <Input type="number" min={1} placeholder="e.g. 5" value={formData.attendees} onChange={set("attendees")} />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Product of Interest</label>
                              <Select value={formData.productOfInterest} onValueChange={setSelect("productOfInterest")}>
                                <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ZYLOENS Platform">ZYLOENS Platform</SelectItem>
                                  <SelectItem value="XYP Edge Intelligence">XYP Edge Intelligence</SelectItem>
                                  <SelectItem value="XYP Smart Devices">XYP Smart Devices</SelectItem>
                                  <SelectItem value="All Products">All Products</SelectItem>
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
                              <Select value={formData.solutionNeeded} onValueChange={setSelect("solutionNeeded")}>
                                <SelectTrigger><SelectValue placeholder="Select solution" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Education Solutions">Education Solutions</SelectItem>
                                  <SelectItem value="Smart City">Smart City</SelectItem>
                                  <SelectItem value="Industrial IoT">Industrial IoT</SelectItem>
                                  <SelectItem value="Custom Solution">Custom Solution</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Estimated Budget Range</label>
                                <Select value={formData.budgetRange} onValueChange={setSelect("budgetRange")}>
                                  <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Under ₹5,00,000">Under ₹5,00,000</SelectItem>
                                    <SelectItem value="₹5,00,000 – ₹25,00,000">₹5,00,000 – ₹25,00,000</SelectItem>
                                    <SelectItem value="₹25,00,000 – ₹50,00,000">₹25,00,000 – ₹50,00,000</SelectItem>
                                    <SelectItem value="₹50,00,000+">₹50,00,000+</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Timeline</label>
                                <Select value={formData.timeline} onValueChange={setSelect("timeline")}>
                                  <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Immediate">Immediate</SelectItem>
                                    <SelectItem value="1–3 Months">1–3 Months</SelectItem>
                                    <SelectItem value="3–6 Months">3–6 Months</SelectItem>
                                    <SelectItem value="6+ Months">6+ Months</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Work-with-us specific fields */}
                        {activeQuickLink === "work" && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Primary Domain of Interest *</label>
                                <Input
                                  required
                                  placeholder="e.g. AI & ML, Computer Vision, Edge / IoT, Platform, Research"
                                  value={formData.domainInterest}
                                  onChange={set("domainInterest")}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Experience Level *</label>
                                <Input
                                  required
                                  placeholder="e.g. Student / Fresher, 1–3 years, 6+ years"
                                  value={formData.experienceLevel}
                                  onChange={set("experienceLevel")}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Current Role / Status</label>
                              <Input
                                placeholder="e.g. Final-year student, Software Engineer"
                                value={formData.currentRole}
                                onChange={set("currentRole")}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Availability</label>
                              <Input
                                placeholder="e.g. Full-time from June, 20 hours/week, internship only"
                                value={formData.availability}
                                onChange={set("availability")}
                              />
                            </div>
                          </>
                        )}

                        {/* Support-specific fields */}
                        {activeQuickLink === "support" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Issue Category *</label>
                              <Select value={formData.issueCategory} onValueChange={setSelect("issueCategory")}>
                                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Bug / Error">Bug / Error</SelectItem>
                                  <SelectItem value="Setup / Installation">Setup / Installation</SelectItem>
                                  <SelectItem value="Account / Billing">Account / Billing</SelectItem>
                                  <SelectItem value="Feature Request">Feature Request</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Priority</label>
                              <Select value={formData.priority} onValueChange={setSelect("priority")}>
                                <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Low">Low</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                  <SelectItem value="Critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Additional Details</label>
                          <Textarea rows={4} placeholder="Tell us more about your request..." value={formData.message} onChange={set("message")} />
                        </div>
                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {loading ? "Submitting…" : "Submit Request"}
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
                            <Input required placeholder="Rahul Sharma" value={formData.fullName} onChange={set("fullName")} />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Email Address *</label>
                            <Input type="email" required placeholder="rahul@company.com" value={formData.email} onChange={set("email")} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                            <Input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={set("phone")} />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Company/Institution *</label>
                            <Input required placeholder="Your organization" value={formData.company} onChange={set("company")} />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Subject</label>
                          <Select value={formData.subject} onValueChange={setSelect("subject")}>
                            <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                              <SelectItem value="Demo Request">Demo Request</SelectItem>
                              <SelectItem value="Partnership">Partnership</SelectItem>
                              <SelectItem value="Support">Support</SelectItem>
                              <SelectItem value="Media Inquiry">Media Inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Message *</label>
                          <Textarea required rows={6} placeholder="Tell us about your needs..." value={formData.message} onChange={set("message")} />
                        </div>
                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {loading ? "Submitting…" : "Submit"}
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
                      { label: "Apply to Work With Us", key: "work" as QuickLinkType },
                    ]).map((link) => (
                      <button
                        key={link.label}
                        onClick={() => {
                          setActiveQuickLink(link.key);
                          setSubmitted(false);
                          setQuickLinkSubmitted(null);
                          setFormData({ ...emptyForm });
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
