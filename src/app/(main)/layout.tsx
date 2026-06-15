import { Navigation } from "@/components/Navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div id="root">{children}</div>
    </>
  );
}
