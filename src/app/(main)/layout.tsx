import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { PointerFx } from "@/components/ui/PointerFx";
import { DiscoveryWidget } from "@/components/DiscoveryWidget";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#root" className="skip-link">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <Navigation />
      <main id="root" tabIndex={-1}>{children}</main>
      <ScrollToTop />
      <DiscoveryWidget />
      <RevealObserver />
      <PointerFx />
    </>
  );
}
