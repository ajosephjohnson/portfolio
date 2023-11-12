'use client'

import { useRef } from "react";

import useDarkMode from "@/hooks/useDarkMode";
import useContentDimensions from "@/hooks/useContentDimensions";
import usePageVisibility from "@/hooks/usePageVisibility";
import {
  Seasons,
  FallingSnow,
  FallingLeaves,
  GrowingFlowers,
  LightRainfall,
  SummerSun,
  SummerMoon,
} from "./";


export default function SeasonalSection({
  season,
  children,
}: {
  season: Seasons;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { contentHeight, contentWidth } = useContentDimensions(ref);
  const isPageVisible = usePageVisibility();
  const isDarkMode = useDarkMode();

  const sectionProps = {
    contentHeight,
    contentWidth,
    isPageVisible,
  };

  let seasonEffect = null;
  switch (season) {
    case Seasons.Fall:
      seasonEffect = <FallingLeaves { ...sectionProps } />;
      break;
    case Seasons.Winter:
      seasonEffect = <FallingSnow { ...sectionProps } />;
      break;
    case Seasons.Spring:
      seasonEffect = <>
        <LightRainfall { ...sectionProps } />
        <GrowingFlowers { ...sectionProps } />
      </>;
      break;
    case Seasons.Summer:
      seasonEffect = isDarkMode
        ? <SummerMoon { ...sectionProps } />
        : <SummerSun { ...sectionProps } />;
      break;
  }

  return <section className="overflow-hidden relative sky-gradient">
    {seasonEffect}
    <div ref={ref}>{children}</div>
  </section>;
}

export interface SeasonalSectionProps {
  contentHeight: number;
  contentWidth: number;
  isPageVisible: boolean;
}
