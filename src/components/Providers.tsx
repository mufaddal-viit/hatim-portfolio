"use client";

import {
  DataThemeProvider,
  IconProvider,
  LayoutProvider,
  ThemeProvider,
  ToastProvider,
} from "@once-ui-system/core";
import { dataStyle, style } from "@/resources/theme.config";
import { iconLibrary } from "@/resources/icons";

/**
 * Client-side provider stack.
 *
 * Theme values come from theme.config.ts — the same source the pre-hydration
 * script in layout.tsx reads, which keeps server markup and client state in
 * agreement. The config is already strongly typed, so no casts are needed.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <ThemeProvider
        brand={style.brand}
        accent={style.accent}
        neutral={style.neutral}
        solid={style.solid}
        solidStyle={style.solidStyle}
        border={style.border}
        surface={style.surface}
        transition={style.transition}
        scaling={style.scaling}
      >
        <DataThemeProvider
          variant={dataStyle.variant}
          mode={dataStyle.mode}
          height={dataStyle.height}
          axis={dataStyle.axis}
          tick={dataStyle.tick}
        >
          <ToastProvider>
            <IconProvider icons={iconLibrary}>{children}</IconProvider>
          </ToastProvider>
        </DataThemeProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
