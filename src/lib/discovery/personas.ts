// route -> { persona, opener, goal }. Add a route here to add a persona — no rebuild.
export type Persona = { persona: string; opener: string; goal: string };

const PERSONAS: Record<string, Persona> = {
  '/pricing': {
    persona: 'Objection handler',
    opener: "Pricing questions? I can size an approach for your business in two minutes — what are you working on?",
    goal: 'Handle pricing objections directly, then push to book a call.',
  },
  '/solutions/performance': {
    persona: 'Paid media specialist',
    opener: "Looking at paid performance? Tell me your site and I'll check what's actually costing you conversions.",
    goal: 'Go deep on paid media / performance marketing gaps.',
  },
  '/solutions/organic-growth': {
    persona: 'SEO / organic specialist',
    opener: "Thinking about organic growth? Share your site and I'll spot what's holding back your rankings.",
    goal: 'Go deep on SEO / organic growth gaps.',
  },
  '/solutions/content-social': {
    persona: 'Content & social specialist',
    opener: "Content and social strategy on your mind? Let's start with your site or a profile link.",
    goal: 'Go deep on content/social gaps.',
  },
  '/solutions/ai-automation': {
    persona: 'AI & automation specialist',
    opener: "Exploring AI/automation for your business? Share your site and I'll flag the low-hanging fruit.",
    goal: 'Go deep on AI/automation opportunities.',
  },
};

const DEFAULT_PERSONA: Persona = {
  persona: 'Discovery',
  opener: "Hey — I'm the Digital Triangle discovery assistant. What are you trying to grow right now?",
  goal: 'Figure out what they need and route them to the right service.',
};

export function getPersona(path: string): Persona {
  return PERSONAS[path] ?? DEFAULT_PERSONA;
}
