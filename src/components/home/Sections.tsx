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

export const IntroSection = ({ content }: { content: HomeSections["intro"] }) => {
  if (!content.display) return null;

  return (
    <Row fillWidth paddingX="l" paddingY="64" gap="48" s={{ direction: "column" }}>
      <Column flex={5} gap="20" horizontal="start">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading as="h2" className={styles.displayHeading} wrap="balance">
          {content.heading}
        </Heading>
        {content.body.map((paragraph, i) => (
          <Text
            key={i}
            variant="body-default-m"
            onBackground="neutral-weak"
            style={{ maxWidth: "56ch" }}
          >
            {paragraph}
          </Text>
        ))}
      </Column>

      <Column flex={4} className={styles.introMedia}>
        <img
          className={styles.introImage}
          src={content.image.src}
          alt={content.image.alt}
          loading="lazy"
          decoding="async"
        />
      </Column>
    </Row>
  );
};

export const ServicesSection = ({ content }: { content: HomeSections["services"] }) => {
  if (!content.display || content.items.length === 0) return null;

  return (
    <Column fillWidth paddingX="l" paddingY="64" gap="40">
      <Column gap="12">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading as="h2" className={styles.displayHeading}>
          {content.heading}
        </Heading>
      </Column>

      <Grid fillWidth columns="3" gap="32" m={{ columns: "1" }}>
        {content.items.map((item) => (
          <Column key={item.index} className={styles.serviceCard} gap="12">
            <span className={styles.serviceIndex}>{item.index}</span>
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

export const ShowcaseSection = ({ content }: { content: HomeSections["showcase"] }) => {
  if (!content.display || content.images.length === 0) return null;

  return (
    <Column className={styles.showcase} fillWidth paddingX="l" paddingY="64" gap="40">
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

      <Grid fillWidth columns="4" gap="16" m={{ columns: "2" }} s={{ columns: "1" }}>
        {content.images.map((image) => (
          <div key={image.src} className={styles.tile}>
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
          </div>
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
          <Button href={content.action.href} variant="primary" size="m" arrowIcon>
            {content.action.label}
          </Button>
        </Row>
      )}
    </Column>
  );
};
