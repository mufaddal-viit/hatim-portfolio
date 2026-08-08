# Portfolio

A personal portfolio site with an MDX-based content system for projects and blog posts, plus an about / CV page and a photo gallery.

Built with [Next.js](https://nextjs.org) (App Router), React 19, TypeScript and Sass. Requires Node.js v18.17+.

## Getting started

**1. Install dependencies**
```
npm install
```

**2. Run the dev server**
```
npm run dev
```

The site runs at http://localhost:3000.

**3. Set the site details**

Edit `src/resources/content.tsx` — this is the single source of truth for name, role,
avatar, email, timezone, social links, and all page copy.

**4. Set the site config**

Edit `src/resources/once-ui.config.ts` — domain, which pages are enabled, theme and
style tokens, background effects, and fonts.

> **Set `baseURL` before deploying.** It currently points at `http://localhost:3000` and
> drives all SEO meta tags, Open Graph images, the sitemap and schema data.

## Where things live

| What | Where |
| --- | --- |
| Name, role, bio, socials, page copy | `src/resources/content.tsx` |
| Domain, enabled routes, theme, effects | `src/resources/once-ui.config.ts` |
| Social icon registry | `src/resources/icons.ts` |
| CSS variable overrides | `src/resources/custom.css` |
| Blog posts | `src/app/blog/posts/*.mdx` |
| Work projects | `src/app/work/projects/*.mdx` |
| Images | `public/images/` |
| Shared components | `src/components/` |

## Adding content

Create a new `.mdx` file in `src/app/blog/posts` or `src/app/work/projects`. Routes,
the sitemap and the RSS feed all pick it up automatically. Use an existing file as a
frontmatter reference.

## Configuration notes

**Enabling and disabling pages** — toggle any route in the `routes` object in
`once-ui.config.ts`. Disabled routes are removed from the header nav too.

**Social links** — add or remove entries in the `social` array in `content.tsx`.
Entries with an empty `link` are hidden. Icons are registered in `src/resources/icons.ts`;
import a new one from `react-icons` to add a platform. The schema.org `sameAs` data is
derived from this array automatically.

**Newsletter** — set `newsletter.display` to `true` in `content.tsx` and add your
Mailchimp form action URL to `mailchimp.action` in `once-ui.config.ts`.

**Booking link** — set `about.calendar.display` to `true` and add a link to show the
"Schedule a call" button on the about page.

**Password-protected pages** — add a route to `protectedRoutes` in `once-ui.config.ts`
and set `PAGE_ACCESS_PASSWORD` in `.env` (see `.env.example`).

## Scripts

```
npm run dev      # start the dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

## Deploying

Deploys to any Next.js host. On [Vercel](https://vercel.com), import the repository and
it builds with zero configuration.

Before going live: set `baseURL` in `once-ui.config.ts` to the production domain, and add
`PAGE_ACCESS_PASSWORD` as an environment variable if password protection is used.

## Licensing

This site is built on the Magic Portfolio template by Once UI, distributed under
**CC BY-NC 4.0** — which requires attribution and does not permit commercial use.

The template's footer attribution has been removed from this project. To use this site
commercially and without attribution, purchase a [Once UI Pro](https://once-ui.com/pricing)
license, which extends the terms to the [Dopler CC](https://dopler.app/license) license.

See `LICENSE` for the current template terms.
