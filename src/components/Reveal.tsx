"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered reveal wrapper.
 *
 * Wrap a section and it fades up as it enters the viewport. Children marked
 * `data-reveal-child` follow in sequence — see `[data-reveal]` in custom.css,
 * which owns every transition in this effect. Nothing here sets inline styles
 * beyond the stagger origin, so the motion stays in one place.
 *
 * Why not once-ui's `RevealFx`: it reveals on a mount timer rather than on
 * scroll, so every section below the fold would finish animating before the
 * reader ever reached it.
 *
 * Three deliberate safety properties, because a reveal that fails leaves the
 * page blank rather than merely unanimated:
 *
 *  1. The observer disconnects after the first intersection. These are
 *     entrances, not scroll-linked effects; re-hiding content the reader has
 *     already seen because they scrolled up is disorienting.
 *  2. If `IntersectionObserver` is missing, or the reader prefers reduced
 *     motion, the content is shown immediately and never animates.
 *  3. With JavaScript disabled the component never mounts, so the `<noscript>`
 *     override in the root layout reveals everything. The hidden state is only
 *     ever applied by markup this component renders.
 */
export const Reveal = ({
  children,
  className,
  /** Milliseconds to hold before this section starts, for sequencing. */
  delay = 0,
  /**
   * Fraction of the element that must be visible before it fires. Tall
   * sections need a small value — a full-height section can never reach a
   * high ratio on a short viewport, and would stay hidden forever.
   */
  threshold = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      {
        /*
         * Bottom inset so a section starts moving once it is genuinely in
         * view rather than the instant its first pixel clears the fold —
         * animating at the very edge of the screen reads as a glitch.
         */
        rootMargin: "0px 0px -10% 0px",
        threshold,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shown, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal=""
      data-reveal-shown={shown ? "" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
};
