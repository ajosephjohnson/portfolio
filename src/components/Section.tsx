'use client'

import { useRef } from "react";

import { useDarkMode, useContentDimensions, usePageVisibility } from "@/hooks";
import { SeasonAnimation } from "@/components/animations";
import { Sections } from "@/components";


export default function Section({
  name,
  children,
}: {
  name: Sections,
  children: React.ReactNode,
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { contentHeight, contentWidth } = useContentDimensions(ref);
  const isPageVisible = usePageVisibility();
  const isDarkMode = useDarkMode();

  const animationProps = {
    contentHeight,
    contentWidth,
    isPageVisible,
    isDarkMode,
  };

  return (
    <section id={name} className="overflow-hidden relative sky-gradient dark:border-night-sky-mid border-day-sky-mid border-b-2 text-white">
      <SeasonAnimation section={name} props={animationProps} />
      <div className="min-h-screen min-w-screen" ref={ref}>{children}</div>
    </section>
  );
}


