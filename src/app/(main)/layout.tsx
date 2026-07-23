import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { DiscoveryWidget } from "@/components/DiscoveryWidget";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div id="root">{children}</div>
      <ScrollToTop />
      <DiscoveryWidget />
    </>
  );
}
