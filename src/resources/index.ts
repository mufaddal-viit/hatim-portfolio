// Content — identity, copy and page data
export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
} from "./content";

// Home page sections — copy and imagery for the landing page
export { homeSections } from "./home.content";

// Theme — colors, effects and chart styling (single source of truth)
export {
  style,
  effects,
  dataStyle,
  themeDataAttributes,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
  THEME_FALLBACK,
} from "./theme.config";

// Site config — routing, SEO, fonts and integrations
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
} from "./once-ui.config";
