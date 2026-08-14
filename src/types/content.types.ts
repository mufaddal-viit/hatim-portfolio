import { IconName } from "@/resources/icons";
import { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Languages spoken */
  languages?: string[];
  /**
   * BCP 47 language tag for the HTML lang attribute (e.g., 'en', 'ja', 'zh-TW').
   * Defaults to 'en' if not set.
   * See: https://www.iana.org/assignments/language-subtag-registry
   */
  locale?: string;
};

/**
 * Newsletter Section
 * @description The below information will be displayed on the Home page in Newsletter block
 */
export type Newsletter = {
  /** Whether to display the newsletter section */
  display: boolean;
  /** Title of the newsletter   */
  title: React.ReactNode;
  /** Description of the newsletter */
  description: React.ReactNode;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: React.ReactNode;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
}

/**
 * A single hero slideshow image.
 */
export type HeroSlide = {
  /** Path under /public, e.g. "/images/interior/hero-01.jpg" */
  src: `/images/${string}` | string;
  /** Describe the room, not the file — this is read aloud by screen readers. */
  alt: string;
};

/**
 * Split hero section on the home page.
 *
 * `headline` is a plain string rather than a ReactNode: it is rendered twice
 * (once solid, once as the outlined echo behind it) and the echo must be an
 * exact copy for the emboss effect to line up.
 */
export type HeroContent = {
  /** Small italic line above the headline, e.g. "Interior". */
  eyebrow: string;
  /** The oversized display word that breaks across the panel edge. */
  headline: string;
  /** Short supporting paragraph inside the panel. */
  lede: string;
  /** Primary call to action. Omit `href` to hide the button. */
  action: {
    label: string;
    href: string;
  };
  /** Slideshow images. One slide renders as a static photo. */
  slides: HeroSlide[];
  /** Social links shown at the foot of the panel. */
  socials: Array<{
    name: string;
    icon: IconName;
    link: string;
  }>;
};

/**
 * A statistic in the band beneath the hero.
 */
export type HomeStat = {
  /** Large figure, e.g. "120+". */
  value: string;
  /** Short caption beneath the figure. */
  label: string;
};

/**
 * A service / capability card on the home page.
 */
export type HomeService = {
  /** Two-digit index rendered as an editorial numeral, e.g. "01". */
  index: string;
  title: string;
  description: string;
};

/**
 * Home page section content, kept separate from `Home` (SEO/meta) so page
 * copy and metadata can evolve independently.
 */
export type HomeSections = {
  hero: HeroContent;
  stats: {
    display: boolean;
    items: HomeStat[];
  };
  intro: {
    display: boolean;
    /** Small label above the section heading. */
    eyebrow: string;
    /** Rendered in the display serif. */
    heading: string;
    /**
     * First paragraph sits under the heading in the centre column; every
     * paragraph after it moves to the right-hand column.
     */
    body: string[];
    /** Tall portrait photograph filling the left column. */
    image: {
      src: `/images/${string}` | string;
      alt: string;
    };
    /**
     * Landscape image closing the right-hand column, beneath its text.
     * Optional — without it the right column is text only and the layout
     * still holds.
     */
    secondaryImage?: {
      src: `/images/${string}` | string;
      alt: string;
    };
    /** Call to action closing the centre column. Omit to hide the button. */
    action?: { label: string; href: string };
  };
  services: {
    display: boolean;
    eyebrow: string;
    heading: string;
    items: HomeService[];
  };
  showcase: {
    display: boolean;
    eyebrow: string;
    /** Split across two lines in the reference ("PORT" / "FOLIO"). */
    heading: string;
    description: string;
    action: { label: string; href: string };
    images: Array<{
      src: `/images/${string}` | string;
      alt: string;
      caption: string;
      meta: string;
      /**
       * Filename (without extension) of the MDX in
       * `src/app/work/projects`. The tile links to `/work/<slug>`, so a slug
       * with no matching file will 404.
       */
      slug: string;
    }>;
  };
  cta: {
    display: boolean;
    heading: string;
    description: string;
    action: { label: string; href: string };
  };
};

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: React.ReactNode;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /** Skill tags */
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
}

/**
 * Blog page configuration.
 * @description Configuration for the Blog page, including metadata and navigation label.
 */
export interface Blog extends BasePageConfig {}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}

/**
 * Gallery page configuration.
 * @description Configuration for the Gallery page, including metadata, navigation label, and image list.
 */
export interface Gallery extends BasePageConfig {
  /** List of images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
    /** Image alt text */
    alt: string;
    /** Image orientation (horizontal/vertical) */
    orientation: string;
  }>;
}
