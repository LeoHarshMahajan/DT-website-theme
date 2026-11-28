# Digital Triangle visual prompt pack

The art direction behind the images on the site, so any new creative (blog covers, solution
art, social, ads) matches. Works with `gpt-image-2` (what the site and Content Engine use),
Higgsfield, Midjourney or Gemini.

## The look
**Premium 3D, glass and light, on near-black.** One glowing subject, generous dark negative
space, depth of field. It should feel like an Apple keynote slide, not stock art.

| Element | Rule |
|---|---|
| Background | Deep near-black `#07070a`, never grey, never pure black with banding |
| Light | Electric blue `#4b6bff`, violet `#8b5cf6`, magenta `#c026d3`. Blue to violet to magenta across the subject |
| Materials | Glass, translucent slabs, soft volumetric glow, fine particles |
| Composition | Subject in the right two-thirds; left third calm and dark so a headline can sit over it |
| Format | 3:2 landscape (1536x1024). Export WebP, quality ~80 (about 40-90 KB) |

## The hard "never" list (add to every prompt)
`No text, letters, numbers, logos, watermarks, people, faces, hands, maps, country outlines or flags.`
- **People and hands:** AI renders them wrong in uncanny ways, and real clients shouldn't be implied.
- **Maps and flags:** generators get India's borders wrong. Publishing an incorrect map of India is a
  legal problem, not just a visual one.
- **Text:** generators mangle lettering, and a misspelt word on a hero image is worse than none.

## Base prompt (paste, then add the concept)
```
{CONCEPT}. Premium editorial 3D render, glass and soft volumetric glow, shallow depth of field.
Deep near-black background (#07070a) lit by electric blue (#4b6bff), violet (#8b5cf6) and
magenta (#c026d3). The main subject sits in the right two-thirds; the left third is calm dark
negative space for overlaid text. Absolutely no text, letters, numbers, logos, watermarks,
people, faces, hands, maps or flags.
```

## Concepts used on the site (src: `public/art/`)
| Page | Concept |
|---|---|
| Organic growth | A luminous branching tree of light growing from one bright root toward search-beam rays |
| Performance | Ascending glass bars rising to the right, particles converging through a funnel into the tallest |
| AI & automation | Constellation of glass spheres linked by glowing pathways around a bright core |
| Content & social | Cascade of floating rounded glass screens at different depths with drifting sparks |
| Brand & creative | A faceted crystal prism splitting one white beam into blue, violet and magenta, glass shards around it |
| Analytics | Layered translucent glass slabs of a 3D grid with a bright trend line rising across them |
| Retention | A smooth glowing ring of light with small spheres orbiting and returning |

## Adding a new image
1. Write the concept as one visual metaphor (a single subject, not a scene).
2. Generate at 1536x1024, check it for text, people, maps, flags and the left-third negative space.
3. Convert to WebP (~80) and drop it in `public/art/`. Name it `solution-<slug>.webp` or `<area>-<slug>.webp`.
4. On a solution page use `<PageHeroArt src="/art/..." />` as the first child of the `.page-hero` section.

## Video (Higgsfield and similar)
Not on the site yet. When we add it: muted, looping, 6-10 seconds, same palette, 1080p H.264 under
2 MB, with a WebP poster frame, `playsInline`, and `preload="none"` below the fold. Use the same
concept list above so the motion version of each page's art matches its still.

## Light theme
The art is drawn on near-black, so it is hidden on the light theme (`html.light .hero-art`). If the
light theme matters for a page, make a separate light variant rather than inverting these.
