import { Column, Meta, Schema } from "@once-ui-system/core";
import { about, baseURL, home, person } from "@/resources";
import { homeSections } from "@/resources/home.content";
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

      <Column className={styles.content} fillWidth horizontal="center">
        <IntroSection content={homeSections.intro} />
        <ServicesSection content={homeSections.services} />
      </Column>

      <ShowcaseSection content={homeSections.showcase} />

      <Column className={styles.content} fillWidth horizontal="center">
        <CtaSection content={homeSections.cta} />
      </Column>
    </Column>
  );
}
