'use client'

import { useRef } from "react";

import useDarkMode from "@/hooks/useDarkMode";
import useContentDimensions from "@/hooks/useContentDimensions";
import usePageVisibility from "@/hooks/usePageVisibility";
import {
  FallingSnow,
  FallingLeaves,
  GrowingFlowers,
  LightRainfall,
  SummerSun,
  SummerMoon,
  Seasons,
} from "./";


export interface SeasonalAnimationProps {
  contentHeight: number;
  contentWidth: number;
  isPageVisible: boolean;
  isDarkMode: boolean;
}

function SeasonalAnimation({
  season,
  props,
}: {
  season: Seasons,
  props: SeasonalAnimationProps,
}) {
  switch (season) {
    case Seasons.Fall:
      return <FallingLeaves { ...props } />;
    case Seasons.Winter:
      return <FallingSnow { ...props } />;
    case Seasons.Spring:
      return <>
        <LightRainfall { ...props } />
        <GrowingFlowers { ...props } />
      </>;
    case Seasons.Summer:
      return props.isDarkMode
        ? <SummerMoon { ...props } />
        : <SummerSun { ...props } />;
    default:
      return null;
  }
}

export default function SeasonalSection({
  season,
  children,
}: {
  season: Seasons,
  children: React.ReactNode,
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { contentHeight, contentWidth } = useContentDimensions(ref);
  const isPageVisible = usePageVisibility();
  const isDarkMode = useDarkMode();

  const seasonalAnimationProps = {
    contentHeight,
    contentWidth,
    isPageVisible,
    isDarkMode,
  };

  return <section id={season} className="overflow-hidden relative sky-gradient">
    <SeasonalAnimation season={season} props={seasonalAnimationProps} />
    <div ref={ref}>{children}</div>
  </section>;
}
