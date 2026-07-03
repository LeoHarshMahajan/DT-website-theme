import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div id="root">{children}</div>
      <ScrollToTop />
    </>
  );
}
