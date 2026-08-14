import { Column, Meta, Schema } from "@once-ui-system/core";
import { about, baseURL, home, person } from "@/resources";
import { homeSections } from "@/resources/home.content";
import { Reveal } from "@/components";
import {
  CtaSection,
  Hero,
  IntroSection,
  ServicesSection,
  ShowcaseSection,
} from "@/components/home";
import styles from "./page.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

/**
 * Home page.
 *
 * A composition of sections, each driven by `home.content.ts` — no copy is
 * hardcoded here. Every section can be toggled via its `display` flag.
 *
 * The page is a server component; only <Hero> is a client component, because
 * it owns slideshow state.
 */
export default function Home() {
  return (
    <Column className={styles.page} fillWidth horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Stats render as a glass bar inside the hero, over the photograph. */}
      <Hero
        content={homeSections.hero}
        stats={homeSections.stats.display ? homeSections.stats.items : []}
      />

      {/*
        Every section below the hero fades up as it scrolls into view. The
        hero itself is excluded — it is already on screen at load, so a
        scroll reveal there would either fire instantly (pointless) or delay
        the first thing the visitor sees (worse).

        <Reveal> renders a plain full-width div, so it does not disturb the
        layout: the intro still sits outside `.content` and keeps its
        full-bleed gutter, and the showcase keeps its edge-to-edge espresso
        band.
      */}
      <Reveal className={styles.revealBlock}>
        <IntroSection content={homeSections.intro} />
      </Reveal>

      <Reveal className={styles.revealBlock}>
        <Column className={styles.content} fillWidth horizontal="center">
          <ServicesSection content={homeSections.services} />
        </Column>
      </Reveal>

      <Reveal className={styles.revealBlock}>
        <ShowcaseSection content={homeSections.showcase} />
      </Reveal>

      <Reveal className={styles.revealBlock}>
        <Column className={styles.content} fillWidth horizontal="center">
          <CtaSection content={homeSections.cta} />
        </Column>
      </Reveal>
    </Column>
  );
}
