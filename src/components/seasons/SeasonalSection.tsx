'use client'

import { useRef, useLayoutEffect, useState } from "react";
import { Seasons, FallingSnow, FallingLeaves } from "./";


export default function SeasonalSection({
  season,
  children,
}: {
  season: Seasons;
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

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
  }

  return <section className="overflow-hidden relative">
    {seasonEffect}
    <div ref={contentRef}>{children}</div>
  </section>;
}
