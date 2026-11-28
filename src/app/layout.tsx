// Built by Harsh Mahajan (HM) — Creator & Builder | thedigitaltriangle.com
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "../styles/globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

// Holds page content back (never the nav) until the Geist weights are ready, so
// headlines don't paint in the fallback font and then jump when Geist arrives:
// measured on the hero, the fallback wraps to 5 lines where Geist needs 3, a
// 0.27 layout shift. Content shows as soon as the fonts load, or after 1.2s
// whichever is first, and is always visible with JavaScript off.
const FONT_GATE = `(function(){var d=document,h=d.documentElement,f=d.fonts;if(!f||!f.load)return;var done=function(){h.removeAttribute('data-fonts')};h.setAttribute('data-fonts','loading');setTimeout(done,1200);d.addEventListener('DOMContentLoaded',function(){Promise.all(['400','500','600','700'].map(function(w){return f.load(w+' 1em Geist')})).then(done,done)})})();`;

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@digitaltriangle",
  },
  verification: {
    google: 'IbE2uBfjNOlGrYua1yDkEu0u18IqbPbOEufYcwMRDaI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#07070a" />
        <link rel="manifest" href="/site.webmanifest" />
        <script dangerouslySetInnerHTML={{ __html: FONT_GATE }} />
        {/* Google Tag Manager — must be in <head> for GSC ownership verification */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PH59PPHG');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager noscript — immediately after <body> open as required */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PH59PPHG"
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
