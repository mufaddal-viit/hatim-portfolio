"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton, useTheme } from "@once-ui-system/core";
import { THEME_FALLBACK } from "@/resources/theme.config";

type ResolvedTheme = "light" | "dark";

/**
 * Light/dark switch.
 *
 * The active mode is read from the `data-theme` attribute rather than from
 * `useTheme()`, because the config default may be "system" — only the DOM
 * knows what that actually resolved to after the init script ran.
 *
 * Rendering is deferred until mount: on the server there is no resolved theme,
 * so committing to one would risk showing the wrong icon and a hydration
 * mismatch. A placeholder holds the layout to avoid a shift.
 */
export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ResolvedTheme>(THEME_FALLBACK);

  useEffect(() => {
    const resolved = document.documentElement.getAttribute("data-theme");
    setCurrentTheme(resolved === "light" || resolved === "dark" ? resolved : THEME_FALLBACK);
    setMounted(true);
  }, [theme]);

  const nextTheme: ResolvedTheme = currentTheme === "light" ? "dark" : "light";

  if (!mounted) {
    return <ToggleButton prefixIcon="dark" aria-hidden disabled />;
  }

  return (
    <ToggleButton
      prefixIcon={currentTheme === "dark" ? "light" : "dark"}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
