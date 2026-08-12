import {
  THEME_FALLBACK,
  THEME_STORAGE_KEY,
  style,
  themeDataAttributes,
} from "@/resources/theme.config";

/**
 * Applies the theme to <html> before the browser paints.
 *
 * Without this, the page renders with default styling and then snaps to the
 * correct theme once React hydrates — the "theme flash". Running synchronously
 * in <head> means the first paint is already correct.
 *
 * This must stay an inline script: an external file would be fetched
 * asynchronously and lose the race against first paint. It reads its values
 * from theme.config.ts, so it can't drift from the ThemeProvider.
 */
export const ThemeInitScript = () => {
  const script = `
(function () {
  try {
    var root = document.documentElement;
    var attributes = ${JSON.stringify(themeDataAttributes)};

    // Apply configured defaults.
    Object.keys(attributes).forEach(function (key) {
      root.setAttribute('data-' + key, attributes[key]);
    });

    // Let a stored preference override any default.
    Object.keys(attributes).forEach(function (key) {
      var stored = localStorage.getItem('data-' + key);
      if (stored) root.setAttribute('data-' + key, stored);
    });

    // Resolve color mode: stored choice, else config, else system preference.
    var storedTheme = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = storedTheme || '${style.theme}';
    if (theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', '${THEME_FALLBACK}');
  }
})();
`.trim();

  return <script id="theme-init" dangerouslySetInnerHTML={{ __html: script }} />;
};
