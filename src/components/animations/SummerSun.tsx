'use client'

import { useState, useEffect, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';

import { SeasonAnimationProps } from '@/components/animations';


const SUN_SIZE = 50;
const ARC_MULTIPLIER = 1.75;
const COLOR_CHANGE_START = 0.70;

export default function SummerSun({ contentHeight, contentWidth }: SeasonAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ scrollY, setScrollY ] = useState(0);
  const [ animationStartScrollPosition, setAnimationStartScrollPosition ] = useState(0);

  // Only initialize if content dimensions are not zero.
  const isReady = contentHeight !== 0 && contentWidth !== 0;

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const containerRect = containerRef.current.getBoundingClientRect();

    setScrollY(scrollY);
    // Animation starts as soon as the section comes into view
    setAnimationStartScrollPosition(containerRect.top + scrollY - contentHeight);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    contentHeight
  ]);

  const [ spring ] = useSpring(() => {
    if (!isReady) {
      return null;
    }

    // Determine the progress of the scroll within the section, where 0 is the start and 1 is the end.
    const progress = (scrollY - animationStartScrollPosition) / contentHeight;

    // Map the progress to the sun's final x position.
    const endX = (contentWidth + 30) * progress;

    // The sun moves in a quarter-circle arc. The angle determines its vertical position.
    // It starts at 90 degrees (PI/2 radians) when progress is 0 (not scrolled) and ends at 0 degrees when progress is 1 (fully scrolled).
    const angle = (1 - progress) * (Math.PI / 2); // Subtract from PI/2 to start from the top.

    // The vertical position (Y-coordinate) of the sun at the end of the animation.
    // We use sine to calculate the position on the curve of the arc.
    // Then, we adjust the height using the ARC_MULTIPLIER to stretch or flatten the arc's shape.
    const endY = (contentHeight - (Math.sin(angle) * contentHeight)) / ARC_MULTIPLIER;


    // Adjust the color based on the user's scroll progress.
    // We will interpolate from bright yellow to a reddish sunset color.

    // Calculate the progress of the color transition.
    const colorProgress = Math.max(0, (progress - COLOR_CHANGE_START) / (1 - COLOR_CHANGE_START));

    const startColor = { r: 255, g: 219, b: 88 }; // Bright yellow color for the starting position of the sun.
    const endColor = { r: 255, g: 69, b: 0 };     // Reddish sunset color for the ending position of the sun.

    // Interpolate the red, green, and blue components of the color based on the colorProgress.
    // If colorProgress is 0, we are at the startColor. If it's 1, we are at the endColor.
    const r = startColor.r + (endColor.r - startColor.r) * colorProgress;
    const g = startColor.g + (endColor.g - startColor.g) * colorProgress;
    const b = startColor.b + (endColor.b - startColor.b) * colorProgress;

    const backgroundColor = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    const boxShadow = `0 0 30px 10px rgba(${r}, ${g}, ${b}, 0.7)`;

    return {
      from: {
        x: 0,
        y: 0,
        backgroundColor,
        boxShadow, 
      },
      to: {
        x: endX,
        y: endY,
        backgroundColor,
        boxShadow,
      },
      config: { tension: 200, friction: 30 }
    }
  }, [
    scrollY,
    animationStartScrollPosition,
    contentHeight,
    contentWidth,
    isReady,
  ]);

  return (
    <div ref={containerRef} className="absolute" style={{ height: contentHeight, width: contentWidth }}>
      {isReady && <animated.div
        className={`
          rounded-full
          absolute
          will-change-transform
        `}
        style={{
          width: SUN_SIZE,
          height: SUN_SIZE,
          ...spring,
        }}
      />}
    </div>
  );
}
