import { person } from "@/resources";
import styles from "./BrandMark.module.scss";

/**
 * Centred brand lockup: a rectangular monogram mark above the wordmark.
 *
 * The mark is inline SVG rather than an image file so it inherits
 * `currentColor` and stays crisp at any density. Swap the paths for the
 * client's real logo when one is supplied — the layout does not change.
 */
export const BrandMark = ({ className }: { className?: string }) => (
  <span className={`${styles.lockup} ${className ?? ""}`}>
    <svg
      className={styles.mark}
      viewBox="0 0 40 26"
      role="img"
      aria-label={`${person.name} logo`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer frame */}
      <rect x="0.6" y="0.6" width="38.8" height="24.8" stroke="currentColor" strokeWidth="1.2" />
      {/* Three inner panes, echoing framed panels */}
      <rect x="5" y="5" width="8" height="16" fill="currentColor" opacity="0.9" />
      <rect x="16" y="5" width="8" height="16" fill="currentColor" opacity="0.55" />
      <rect x="27" y="5" width="8" height="16" fill="currentColor" opacity="0.9" />
    </svg>
    <span className={styles.wordmark}>{person.name}</span>
  </span>
);
