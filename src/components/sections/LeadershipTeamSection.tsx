/**
 * Leadership Team section — kept for easy restore on the About page.
 * To add back: import LeadershipTeamSection from "@/components/sections/LeadershipTeamSection"
 * and render <LeadershipTeamSection /> in About.tsx (e.g. after Mission/Vision/Values, before Timeline).
 */
import { ProfileCarousel } from "@/components/ui/profile-card-testimonial-carousel";

const leaders = [
  { name: "Dr. Arjun Mehta", title: "Founder & CEO", description: "Leads XYP Quantum AI's vision for intelligent systems. PhD in Computer Science from IIT Bombay. Previously led AI research at a major tech firm.", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Dr. Priya Sharma", title: "CTO", description: "Architect of ZYLOENS platform. 15+ years in distributed systems and edge computing. Former principal engineer at Infosys.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Vikram Desai", title: "VP of Engineering", description: "Oversees product engineering and development. Background in building scalable SaaS platforms serving millions of users across India.", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Dr. Ananya Iyer", title: "Head of Quantum Research", description: "Pioneer in quantum error correction. Published 30+ papers. Former research lead at IISc Bengaluru.", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Raj Patel", title: "VP of Business Development", description: "Drives strategic partnerships and market expansion. 12+ years in enterprise technology sales across education and government sectors in India.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Neha Kulkarni", title: "VP of Product", description: "Shapes product strategy and user experience. Background in ed-tech product management with a focus on institutional solutions across Indian states.", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
];

export default function LeadershipTeamSection() {
  return (
    <section id="team" className="section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-section-sm lg:text-section mb-10 text-center">Leadership Team</h2>
        <ProfileCarousel profiles={leaders} />
      </div>
    </section>
  );
}
