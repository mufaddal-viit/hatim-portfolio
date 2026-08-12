import type { HomeSections } from "@/types";
import { person, social } from "./content";

/**
 * ---------------------------------------------------------------------------
 * HOME PAGE CONTENT
 * ---------------------------------------------------------------------------
 * All copy and imagery for the redesigned home page. Kept separate from
 * content.tsx (identity + SEO) so page sections can be reordered or disabled
 * without touching site-wide data.
 *
 * Every section has a `display` flag — set it to false to remove the section
 * from the page entirely.
 */
export const homeSections: HomeSections = {
  /**
   * Split hero. `headline` is intentionally one short word: it is rendered at
   * display scale and must break out of the panel onto the photograph, which
   * only works with a short, wide word.
   */
  hero: {
    eyebrow: "Interior",
    headline: "DESIGNER",
    lede: "We will be able to make your life comfortable and your interior really beautiful.",
    action: {
      label: "Projects",
      href: "/work",
    },
    slides: [
      {
        src: "/images/interior/hero-01.jpg",
        alt: "Bright living room with a cream sectional sofa and layered neutral textiles",
      },
      {
        src: "/images/interior/hero-02.jpg",
        alt: "Formal sitting room with tall shuttered windows and a marble fireplace",
      },
      {
        src: "/images/interior/hero-03.jpg",
        alt: "Warm studio corner with a tan leather armchair and open shelving",
      },
    ],
    // Reuses the site-wide social list so links are configured in one place.
    // Any entry with a link is shown; fill in the URLs in content.tsx.
    socials: social.filter((s) => Boolean(s.link)),
  },

  stats: {
    display: true,
    items: [
      { value: "120+", label: "Projects delivered" },
      { value: "14", label: "Years of practice" },
      { value: "8", label: "Design awards" },
      { value: "98%", label: "Client retention" },
    ],
  },

  intro: {
    display: true,
    eyebrow: "About us",
    heading: "Spaces shaped around the way you actually live",
    body: [
      `We are a design company with a lot of experience. We have been engaged in interior design for more than 10 years — we always want for the end to find a solution for the space, and cater simply by virtue of vital importance.`,
      `From concept to final handover, every project is treated as a single continuous conversation: proportion, light, material and detail resolved together rather than in isolation.`,
    ],
    image: {
      src: "/images/interior/detail-01.jpg",
      alt: "Close detail of a styled console table with ceramics and dried stems",
    },
  },

  services: {
    display: true,
    eyebrow: "What we do",
    heading: "Services",
    items: [
      {
        index: "01",
        title: "Quality",
        description:
          "Feel the comfort of our furniture for yourself. Every specification is chosen for how it wears, not just how it photographs.",
      },
      {
        index: "02",
        title: "Beauty",
        description:
          "Unique design and interesting interior solutions, developed around the proportions and light of your particular space.",
      },
      {
        index: "03",
        title: "Delivery",
        description:
          "We develop the design project, coordinate the redevelopment and perform turnkey finishing works, complete with materials and furniture.",
      },
    ],
  },

  showcase: {
    display: true,
    eyebrow: "Selected work",
    heading: "PORTFOLIO",
    description:
      "Look at our work. We try to maintain a balance of aesthetics and convenience in our projects, combining functionality and wellbeing to fit each space.",
    action: {
      label: "View all projects",
      href: "/work",
    },
    images: [
      {
        src: "/images/interior/space-01.jpg",
        alt: "Sunlit living room with tan leather sofa and a gallery wall",
        caption: "Apartment on the Hill",
        meta: "Residential — 2024",
      },
      {
        src: "/images/interior/space-02.jpg",
        alt: "Minimal bedroom with warm oak panelling and soft linen bedding",
        caption: "House in Regina",
        meta: "Residential — 2024",
      },
      {
        src: "/images/interior/space-03.jpg",
        alt: "Open-plan kitchen and dining space with pale stone surfaces",
        caption: "Riverside Residence",
        meta: "Residential — 2023",
      },
      {
        src: "/images/interior/space-04.jpg",
        alt: "Study nook with built-in shelving and a wide picture window",
        caption: "Garden Studio",
        meta: "Workspace — 2023",
      },
    ],
  },

  cta: {
    display: true,
    heading: "Let's talk about your space",
    description: `Tell ${person.firstName} about the room, the building, or the whole house. First conversations are free and there is no obligation to continue.`,
    action: {
      label: "Start a conversation",
      href: `mailto:${person.email}`,
    },
  },
};
