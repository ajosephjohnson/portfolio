'use client'

import { useRef } from "react";

import { useDarkMode, useContentDimensions, usePageVisibility } from "@/hooks";
import { SeasonAnimation } from "@/components/animations";
import { Container, Sections } from "@/components";


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
    <section id={name} className="overflow-hidden relative">
      <SeasonAnimation section={name} props={animationProps} />
      <div className="min-h-screen min-w-screen overflow-hidden" ref={ref}>
        <Container>{children}</Container>
      </div>
    </section>
  );
}


