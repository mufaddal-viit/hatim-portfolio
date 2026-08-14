import { Button, Column, Grid, Heading, Row, Text } from "@once-ui-system/core";
import type { HomeSections } from "@/types";
import styles from "./Sections.module.scss";

/**
 * Home page sections beneath the hero.
 *
 * All server components — they render static content and hold no state, so
 * none of this ships JavaScript to the browser.
 */

/**
 * Small uppercase label above every section heading.
 * `onDark` switches it for use on the espresso showcase band, where the
 * neutral-weak token would be nearly invisible.
 */
const Eyebrow = ({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) => (
  <Text
    className={`${styles.eyebrow} ${onDark ? styles.eyebrowOnDark : ""}`}
    onBackground={onDark ? undefined : "neutral-weak"}
    variant="label-default-s"
  >
    {children}
  </Text>
);

/**
 * Three-column intro: portrait photograph, then the heading and its opening
 * paragraph, then a column stacking the remaining copy over a second image.
 *
 * The heading is set once, solid. The hero's outlined echo is deliberately
 * not repeated here — that emboss is the hero's signature, and reusing it a
 * screen later would spend the effect rather than build on it.
 *
 * Full-bleed by design: the section is rendered outside the page's `.content`
 * wrapper and sets its own thin gutter, so the two photographs sit close to
 * the viewport edges instead of inside the shared 40px rhythm.
 */
export const IntroSection = ({
  content,
}: {
  content: HomeSections["intro"];
}) => {
  if (!content.display) return null;

  /* First two paragraphs anchor the centre column; the rest carry the right. */
  const lead = content.body.slice(0, 2);
  const rest = content.body.slice(2);

  return (
    <Column className={styles.introSection} fillWidth paddingY="64">
      <div className={styles.intro}>
        <figure className={styles.introPhoto}>
          <img
            className={styles.introImage}
            src={content.image.src}
            alt={content.image.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className={styles.introHead}>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className={styles.introHeading}>{content.heading}</h2>
        </div>

        {lead.length > 0 && (
          <div className={styles.introLead}>
            {lead.map((paragraph, i) => (
              <Text
                key={i}
                variant="body-default-m"
                onBackground="neutral-weak"
              >
                {paragraph}
              </Text>
            ))}

            {content.action?.href && (
              <Row className={styles.introAction} paddingTop="8">
                <Button
                  href={content.action.href}
                  variant="secondary"
                  size="m"
                  weight="default"
                  arrowIcon
                >
                  {content.action.label}
                </Button>
              </Row>
            )}
          </div>
        )}

        <div className={styles.introAside}>
          {rest.length > 0 && (
            <div className={styles.introAsideText}>
              {rest.map((paragraph, i) => (
                <Text
                  key={i}
                  variant="body-default-m"
                  onBackground="neutral-weak"
                >
                  {paragraph}
                </Text>
              ))}
            </div>
          )}

          {content.secondaryImage && (
            <figure className={styles.introAsideMedia}>
              <img
                className={styles.introImage}
                src={content.secondaryImage.src}
                alt={content.secondaryImage.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          )}

          {/*
            Decorative illustration closing the right column: it absorbs the
            space between the second photograph and the services section that
            would otherwise sit empty. Purely ornamental, so it is a bare div
            with aria-hidden rather than an <img> needing alt text.
          */}
          {/* <div className={styles.introBackdrop} aria-hidden="true" /> */}
        </div>
      </div>
    </Column>
  );
};

export const ServicesSection = ({
  content,
}: {
  content: HomeSections["services"];
}) => {
  if (!content.display || content.items.length === 0) return null;

  return (
    <Column fillWidth paddingX="l" paddingY="64" gap="40">
      <Column gap="12">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading as="h2" className={styles.displayHeading}>
          {content.heading}
        </Heading>
      </Column>

      {/*
        One card per service, all on a single row. The column count tracks the
        number of items rather than being hardcoded, so adding a fifth service
        does not silently orphan it onto a second row the way a fixed "3" did
        with four items.
      */}
      <Grid
        fillWidth
        columns={
          String(Math.min(content.items.length, 4)) as "1" | "2" | "3" | "4"
        }
        gap="20"
        m={{ columns: "2" }}
        s={{ columns: "1" }}
      >
        {/*
          Alignment alternates along the row — odd cards read from the left,
          even cards from the right — so the four cards form a zigzag rather
          than four identical left-aligned blocks. Index parity drives it, so
          the rhythm survives adding or reordering services.
        */}
        {content.items.map((item, i) => (
          <Column
            key={item.index}
            className={`${styles.serviceCard} ${
              i % 2 === 1 ? styles.serviceCardAlt : ""
            }`}
            gap="12"
            /* Sequenced entrance — see [data-reveal-child] in custom.css. */
            data-reveal-child=""
            style={{ "--reveal-i": i } as React.CSSProperties}
          >
            <Heading as="h3" variant="heading-strong-m">
              {item.title}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {item.description}
            </Text>
          </Column>
        ))}
      </Grid>
    </Column>
  );
};

export const ShowcaseSection = ({
  content,
}: {
  content: HomeSections["showcase"];
}) => {
  if (!content.display || content.images.length === 0) return null;

  return (
    <Column
      className={styles.showcase}
      fillWidth
      paddingX="l"
      paddingY="64"
      gap="40"
    >
      <Row fillWidth gap="40" horizontal="between" s={{ direction: "column" }}>
        <Column flex={1} gap="12">
          <Eyebrow onDark>{content.eyebrow}</Eyebrow>
          <h2 className={styles.showcaseHeading}>{content.heading}</h2>
        </Column>
        <Column flex={1} gap="20" horizontal="start">
          <Text className={styles.showcaseBody} variant="body-default-m">
            {content.description}
          </Text>
          {content.action.href && (
            <Row className={styles.showcaseAction}>
              <Button
                href={content.action.href}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                {content.action.label}
              </Button>
            </Row>
          )}
        </Column>
      </Row>

      <Grid
        fillWidth
        columns="4"
        gap="16"
        m={{ columns: "2" }}
        s={{ columns: "1" }}
      >
        {/*
          The whole tile is the link, not just the caption — a 3:4 photograph
          with a tiny text target underneath is a poor hit area on touch. The
          arrow is decorative and hidden from assistive tech; the accessible
          name comes from the caption inside the anchor.
        */}
        {content.images.map((image, i) => (
          <a
            key={image.src}
            className={styles.tile}
            href={`/work/${image.slug}`}
            /* Sequenced entrance — see [data-reveal-child] in custom.css. */
            data-reveal-child=""
            style={{ "--reveal-i": i } as React.CSSProperties}
          >
            <img
              className={styles.tileImage}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
            <Column className={styles.tileCaption} gap="2">
              <Text variant="label-strong-s">{image.caption}</Text>
              <Text variant="body-default-xs" style={{ opacity: 0.78 }}>
                {image.meta}
              </Text>
            </Column>

            <span className={styles.tileArrow} aria-hidden="true">
              <svg viewBox="0 0 16 16" focusable="false">
                <path
                  d="M4 12L12 4M12 4H5.5M12 4v6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        ))}
      </Grid>
    </Column>
  );
};

export const CtaSection = ({ content }: { content: HomeSections["cta"] }) => {
  if (!content.display) return null;

  return (
    <Column
      className={styles.cta}
      fillWidth
      paddingX="l"
      paddingY="64"
      gap="20"
      horizontal="center"
      align="center"
    >
      <Heading as="h2" className={styles.displayHeading} wrap="balance">
        {content.heading}
      </Heading>
      <Text
        variant="body-default-m"
        onBackground="neutral-weak"
        style={{ maxWidth: "52ch" }}
      >
        {content.description}
      </Text>
      {content.action.href && (
        <Row paddingTop="8">
          <Button
            href={content.action.href}
            variant="primary"
            size="m"
            arrowIcon
          >
            {content.action.label}
          </Button>
        </Row>
      )}
    </Column>
  );
};
