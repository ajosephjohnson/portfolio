'use client'

import { useRef, useLayoutEffect, useState, useEffect } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [ contentHeight, setContentHeight ] = useState(0);
  const [ contentWidth, setContentWidth ] = useState(0);
  const [ isDarkMode, setIsDarkMode ] = useState(false);

  // Detect system dark mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDarkMode(e.matches);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // useLayoutEffect is used over useEffect because we need to measure the 
  // dimensions of the DOM element as soon as it is rendered but before the 
  // browser paints. This ensures that we have the exact measurements to use before 
  // the season animations start.
  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  const sectionProps = {
    contentHeight,
    contentWidth,
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
    <div ref={contentRef}>{children}</div>
  </section>;
}

export interface SeasonalSectionProps {
  contentHeight: number,
  contentWidth: number,
}
