'use client'

import { useState, useEffect, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';

import { SeasonAnimationProps } from '@/components/animations';


const MOON_SIZE = 50;
const ARC_MULTIPLIER = 1.75;

export default function SummerMoon({ contentHeight, contentWidth }: SeasonAnimationProps) {
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
    contentHeight,
    handleScroll,
  ]);

  const [ spring ] = useSpring(() => {
    if (!isReady) {
      return null;
    }

    // Determine the progress of the scroll within the section, where 0 is the start and 1 is the end.
    const progress = (scrollY - animationStartScrollPosition) / contentHeight;

    // Map the progress to the moon's final x position.
    const endX = (contentWidth + 30) * progress;

    // The moon moves in a quarter-circle arc. The angle determines its vertical position.
    // It starts at 90 degrees (PI/2 radians) when progress is 0 (not scrolled) and ends at 0 degrees when progress is 1 (fully scrolled).
    const angle = (1 - progress) * (Math.PI / 2); // Subtract from PI/2 to start from the top.

    // The vertical position (Y-coordinate) of the moon at the end of the animation.
    // We use sine to calculate the position on the curve of the arc.
    // Then, we adjust the height using the ARC_MULTIPLIER to stretch or flatten the arc's shape.
    const endY = (contentHeight - (Math.sin(angle) * contentHeight)) / ARC_MULTIPLIER;

    return {
      from: {
        x: 0,
        y: 0,
      },
      to: {
        x: endX,
        y: endY,
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
          shadow-radiance-moon
        `}
        style={{
          background: `url('/animations/moon.svg') no-repeat center center`,
          backgroundSize: '118%',
          boxShadow: '0 0 30px 10px rgba(230, 230, 250, 0.7)',
          width: MOON_SIZE,
          height: MOON_SIZE,
          ...spring,
        }}
      />}
    </div>
  );
}
