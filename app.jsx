/* global React, ReactDOM, Nav, Hero, TrustedBrands, Ecosystem, SystemsGrid, Workflow, Metrics, CaseStudies, Industries, Testimonials, Pricing, CTA, Footer, TweaksPanel, useTweaks, TweakSection, TweakRadio */

const { useEffect, useState } = React;

/* ------------------------------------------------------------------
   APP — orchestrates the homepage + tweaks
------------------------------------------------------------------ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "workflow",
  "bgTone": "matte"
}/*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Theme — initialise from URL param (?theme=light) or localStorage, default dark
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("theme");
    if (fromUrl === "light" || fromUrl === "dark") return fromUrl;
    try {
      const saved = localStorage.getItem("dt-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return "dark";
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    try { localStorage.setItem("dt-theme", theme); } catch (e) {}
  }, [theme]);

  // Apply background tone to body
  useEffect(() => {
    const map = { matte: "", black: "black", graphite: "graphite", offblack: "offblack" };
    document.body.dataset.bg = map[t.bgTone] ?? "";
  }, [t.bgTone]);

  const onToggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  return (
    <>
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <Hero variant={t.heroVariant} />
        <TrustedBrands />
        <Ecosystem />
        <SystemsGrid />
        <Workflow />
        <Metrics />
        <CaseStudies />
        <Industries />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection title="Hero centerpiece" subtitle="Three live variants of the homepage hero visual.">
          <TweakRadio
            value={t.heroVariant}
            onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "workflow", label: "AI workflow" },
              { value: "dashboard", label: "Live dashboard" },
              { value: "stack", label: "Layered cards" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Background tone" subtitle="Switch the base black across the whole site.">
          <TweakRadio
            value={t.bgTone}
            onChange={(v) => setTweak("bgTone", v)}
            options={[
              { value: "matte", label: "Matte" },
              { value: "black", label: "True black" },
              { value: "graphite", label: "Graphite" },
              { value: "offblack", label: "Off-black" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

