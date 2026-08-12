"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton, Row, Text } from "@once-ui-system/core";
import type { HeroContent, HomeStat } from "@/types";
import { BrandMark } from "../BrandMark";
import styles from "./Hero.module.scss";

const AUTOPLAY_MS = 6500;

/**
 * Split hero — text panel left, photography right, headline breaking across
 * the seam so the two halves read as a single composition.
 *
 * Client component because it owns slideshow state. Autoplay pauses on hover
 * and focus, and is disabled entirely under prefers-reduced-motion.
 *
 * `stats` renders as a frosted glass bar across the foot of the hero.
 */
export const Hero = ({
  content,
  stats = [],
}: {
  content: HeroContent;
  stats?: HomeStat[];
}) => {
  const { eyebrow, headline, lede, action, slides, socials } = content;
  const slideCount = slides.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  const goTo = useCallback(
    (next: number) => setIndex(((next % slideCount) + slideCount) % slideCount),
    [slideCount],
  );

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || slideCount < 2 || reducedMotion.current) return;
    const id = window.setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, paused, slideCount, goTo]);

  return (
    <section
      className={styles.hero}
      /*
       * The headline's font size is computed from its length, so a longer
       * word scales down instead of overflowing. Passing the count as a
       * custom property keeps the arithmetic in CSS, where it can also
       * respond to breakpoints.
       */
      style={{ "--headline-chars": headline.length } as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ------------------------------------------------------- text panel */}
      <div className={styles.panel}>
        {/*
          Mobile brand lockup. Rendered here, in normal flow, so it scrolls
          away with the hero instead of following the viewport. Hidden on
          desktop, where the nav pill already sits at the top.
        */}
        <div className={styles.mobileBrand}>
          <BrandMark />
        </div>

        <span className={styles.eyebrow}>{eyebrow}</span>

        <div className={styles.headlineWrap}>
          {/* Decorative outlined echo — hidden from assistive tech. */}
          <span className={styles.headlineGhost} aria-hidden="true">
            {headline}
          </span>
          <h1 className={styles.headline}>{headline}</h1>
        </div>

        <Text className={styles.lede} variant="body-default-m" onBackground="brand-weak">
          {lede}
        </Text>

        {/*
          Action and socials share a row. On desktop the socials detach to
          the panel foot; on mobile they stay here, right-aligned opposite
          the button, matching the reference layout.
        */}
        <div className={styles.panelFooter}>
          {action?.href && (
            <div className={styles.actions}>
              {/*
                The built-in `arrowIcon` points right and cannot be restyled,
                so the arrow is rendered inline instead: it starts pointing up
                and rotates 90° clockwise (to the right) on hover. Inline SVG
                inherits currentColor and stays crisp at any size.
              */}
              <Button href={action.href} variant="secondary" size="m" weight="default">
                <span className={styles.actionInner}>
                  {action.label}
                  <svg
                    className={styles.actionArrow}
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M8 13.5V3M8 3L3.5 7.5M8 3l4.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Button>
            </div>
          )}

          {socials.length > 0 && (
            <Row className={styles.socials} gap="8">
              {socials.map((s) => (
                <IconButton
                  key={s.name}
                  href={s.link}
                  icon={s.icon}
                  tooltip={s.name}
                  size="s"
                  variant="ghost"
                />
              ))}
            </Row>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------- photography */}
      <div className={styles.media}>
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`${styles.slide} ${i === index ? styles.slideActive : ""}`}
            aria-hidden={i !== index}
          >
            {/* Plain <img>: the slide stack cross-fades absolutely-positioned
                layers, which next/image's wrapper markup complicates. The
                first slide is eager + high priority to protect LCP. */}
            <img
              className={styles.slideImage}
              src={slide.src}
              alt={slide.alt}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
            />
          </div>
        ))}

        <div className={styles.mediaScrim} />

        {slideCount > 1 && (
          <>
            {/* Counter and arrows grouped bottom-left, beneath the stats bar. */}
            <div className={styles.slideNav}>
              <div className={styles.counter} aria-live="polite" aria-atomic="true">
                <span className={styles.counterNum}>
                  {String(index + 1).padStart(2, "0")}/{String(slideCount).padStart(2, "0")}
                </span>
                <span className={styles.counterTrack} aria-hidden="true">
                  <span
                    className={styles.counterFill}
                    style={{ width: `${((index + 1) / slideCount) * 100}%` }}
                  />
                </span>
              </div>

              <div className={styles.controls}>
                <IconButton
                  icon="chevronLeft"
                  variant="secondary"
                  size="m"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous slide"
                />
                <IconButton
                  icon="chevronRight"
                  variant="secondary"
                  size="m"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next slide"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/*
        Frosted stats bar. Rendered as a sibling of both halves so it can
        span the full hero width rather than being clipped by .media.
      */}
      {stats.length > 0 && (
        <dl className={styles.statsBar}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
};
