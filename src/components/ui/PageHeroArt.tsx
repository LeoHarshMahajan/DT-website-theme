import Image from 'next/image';

/**
 * Decorative hero artwork for a .page-hero section (render it as the section's
 * first child). Fades in from the left so the headline stays readable, is
 * hidden below 900px and on the light theme (the art is drawn on near-black),
 * and is never the LCP candidate: it is lazy and the headline paints first.
 */
export function PageHeroArt({ src }: { src: string }) {
  return (
    <div className="hero-art" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1100px) 62vw, 55vw"
        style={{ objectFit: 'cover', objectPosition: 'center right' }}
      />
    </div>
  );
}
