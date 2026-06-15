import { Metadata } from "next";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { HeroWorkflow } from "@/components/sections/Hero";
import { ConnectedStack } from "@/components/sections/ConnectedStack";
import { SystemsGrid } from "@/components/sections/SystemsGrid";
import { AISystemsPanel } from "@/components/sections/AISystemsPanel";
import { MetricsSection } from "@/components/sections/Metrics";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { CustomerTestimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: 'AI-Powered Growth Infrastructure',
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-0)" }}>

      {/* 1. Hero */}
      <div style={{ paddingTop: "64px" }}>
        <HeroWorkflow />
      </div>

      {/* 2. Trusted brands marquee */}
      <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "60px 0", overflow: "hidden" }}>
        <div className="shell" style={{ textAlign: "center", marginBottom: "24px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.16em", color: "var(--fg-3)", textTransform: "uppercase" }}>
            Growth partner to modern brands — D2C, ecommerce, founders
          </span>
        </div>
        <div className="marquee-wrap" style={{ overflow: "hidden" }}>
          <div className="marquee-track">
            {["Portronics", "Kajaria", "Innovations Venture Studio", "Ofis Square",
              "Portronics", "Kajaria", "Innovations Venture Studio", "Ofis Square",
              "Portronics", "Kajaria", "Innovations Venture Studio", "Ofis Square"
            ].map((b, i) => (
              <div key={i} className="brand-mark">{b}</div>
            ))}
          </div>
        </div>
        <style>{`
          .marquee-track {
            display: flex;
            gap: 64px;
            width: max-content;
            animation: marquee-scroll 30s linear infinite;
          }
          .brand-mark {
            font-size: clamp(20px, 2.4vw, 28px);
            letter-spacing: -0.025em;
            color: var(--fg-2);
            opacity: 0.7;
            font-weight: 500;
            white-space: nowrap;
            transition: opacity .2s, color .2s;
          }
          .brand-mark:hover { opacity: 1; color: var(--fg-0); }
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
        `}</style>
      </section>

      {/* 3. One connected stack — orbit */}
      <ConnectedStack />

      {/* 4. Seven systems */}
      <SystemsGrid />

      {/* 5. Six AI systems */}
      <AISystemsPanel />

      {/* 6. Metrics */}
      <MetricsSection />

      {/* 7. Case Studies */}
      <CaseStudies />

      {/* 7. Industries */}
      <IndustriesGrid />

      {/* 8. Testimonials */}
      <CustomerTestimonials />

      {/* 9. Pricing */}
      <Pricing />

      {/* 10. CTA */}
      <CTASection />

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
