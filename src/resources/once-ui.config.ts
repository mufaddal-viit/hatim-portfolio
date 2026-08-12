import {
  DisplayConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
} from "@/types";
import { home, person, social } from "./content";

// Visual theme lives in theme.config.ts — the single source of truth for
// colors, effects and chart styling. Re-exported here so existing imports
// from "@/resources" keep working.
import { dataStyle, effects, style } from "./theme.config";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "http://localhost:3000";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
// Example: "/work/my-private-case-study": true
const protectedRoutes: ProtectedRoutesConfig = {};

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

// High-contrast serif for oversized editorial headlines.
// Applied through the .font-display class, not as a global default.
const displaySerif = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
  display: displaySerif,
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

// default schema data — pulls from content.tsx so there's one source of truth
const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: person.name,
  description: home.description,
  email: person.email,
};

// social links for schema.org sameAs — derived from the social array in content.tsx
// to avoid duplication. Any social entry with a link is included automatically,
// so adding or removing a platform in content.tsx is all that's needed.
// The mailto: entry is excluded since sameAs expects profile URLs.
const sameAs: SameAsConfig = Object.fromEntries(
  social
    .filter((s) => s.link && !s.link.startsWith("mailto:"))
    .map((s) => [s.name.toLowerCase(), s.link]),
);

// social sharing configuration for blog posts
const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  schema,
  sameAs,
  socialSharing,
};

// Re-exported for convenience so `@/resources/once-ui.config` callers still
// resolve theme values. Defined in and owned by ./theme.config.
export { style, effects, dataStyle };
