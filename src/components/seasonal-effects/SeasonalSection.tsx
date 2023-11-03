'use client'

import { useRef, useLayoutEffect, useState } from "react";
import FallingLeaves from "./FallingLeaves";
import { Seasons } from "./Seasons";

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

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  let seasonEffect = null;
  switch (season) {
    case Seasons.Fall:
      seasonEffect = <FallingLeaves contentHeight={contentHeight} contentWidth={contentWidth} />;
      break;
  }

  return <>
    {seasonEffect}
    <div ref={contentRef}>{children}</div>
  </>;
}
