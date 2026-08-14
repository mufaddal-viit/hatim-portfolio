import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  Background,
  Column,
  Flex,
  Meta,
  opacity,
  RevealFx,
  SpacingToken,
} from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers, ThemeInitScript } from "@/components";
import { baseURL, effects, fonts, home, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang={person.locale ?? "en"}
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
        fonts.display.variable,
      )}
    >
      <head>
        <ThemeInitScript />
        {/*
          Scroll reveals start hidden and are un-hidden by <Reveal>, which
          needs JavaScript to mount. Without this the whole page below the
          hero would render blank for anyone with scripting disabled, and for
          crawlers that do not execute JS.
        */}
        <noscript>
          <style>{`[data-reveal],[data-reveal] [data-reveal-child]{opacity:1!important;transform:none!important;translate:none!important}`}</style>
        </noscript>
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <RevealFx fill position="absolute">
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </RevealFx>
          {/*
            The header is rendered after the content and positioned over it
            (position: fixed via .position), so full-bleed pages start at
            y=0 and the frosted nav pill has something to blur.

            No padding here: pages own their horizontal rhythm. Inner pages
            apply their own gutters via the `.pageInset` helper.
          */}
          <Flex zIndex={0} fillWidth horizontal="center" flex={1}>
            <RouteGuard>{children}</RouteGuard>
          </Flex>
          <Header />
          <Footer />
        </Column>
      </Providers>
    </Flex>
  );
}
