'use client'

import React, { useState, useEffect, useRef } from 'react';

import { animated, useSprings } from '@react-spring/web';
import { SeasonalSectionProps } from './SeasonalSection';
import { getRandomFloatInRange, getRandomIntegerInRange } from './helpers';


const FLOWER_SIZE = 50;
const NUM_FLOWERS = 10;
const FLOWER_GROWTH_SCALE = .86;
const MIN_SLANT = -15;
const MAX_SLANT = 15;
const MIN_DELAY = .75;
const MAX_DELAY = 1.25;
const MIN_SCALE = 1;
const MAX_SCALE = 1.50;
const SEGMENT_OVERLAP = .3;

interface FlowerStyles {
  x: number;
  slant: number;
  delay: number;
  scale: number;
}

export default function GrowingFlowers({ contentHeight, contentWidth }: SeasonalSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll position state
  const [ scrollY, setScrollY ] = useState(0);
  const [ animationStartScrollPosition, setAnimationStartScrollPosition ] = useState(0);

  // State for growing positions and styles of each flower
  const [ flowerStyles, setFlowerStyles ] = useState<Array<FlowerStyles>>([]);

  // Only initialize if content dimensions are not zero.
  const isReady = contentHeight !== 0 && contentWidth !== 0;

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const containerRect = containerRef.current.getBoundingClientRect();

    // Set the current scroll position
    setScrollY(scrollY);
    // Set the scroll position that will trigger the start of the animation
    setAnimationStartScrollPosition(containerRect.top + scrollY);
  };

  useEffect(() => {
    // Set initial values for scroll position
    handleScroll();

    // This will trigger every time the user scrolls
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up the scroll listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    contentHeight
  ]);

  const getFlowerStyles = (index: number) => {
    if (flowerStyles[index]) {
      return flowerStyles[index];
    }

    // Divide the contentWidth into equal segments based on the number of flowers.
    const segmentWidth = contentWidth / NUM_FLOWERS;

    // Offset allows overlap while still maintaining a generally even spread.
    const segmentOffset = segmentWidth * SEGMENT_OVERLAP;

    // Determine the segment in which this flower will be placed.
    const segmentStart = segmentWidth * index;

    // Apply offsets to the segment range.
    const xMin = segmentStart - segmentOffset;
    const xMax = segmentStart + segmentWidth + segmentOffset - FLOWER_SIZE;

    // Store initial flower growing positions and styles
    const x = getRandomIntegerInRange(xMin, xMax);
    const slant = getRandomIntegerInRange(MIN_SLANT, MAX_SLANT);
    const delay = getRandomFloatInRange(MIN_DELAY, MAX_DELAY);
    const scale = getRandomFloatInRange(MIN_SCALE, MAX_SCALE);

    setFlowerStyles((prevState) => {
      const newState = [ ...prevState ];
      newState[ index ] = { x, slant, delay, scale };
      return newState;
    });

    return { x, slant, delay, scale };
  };

  // React-spring animations
  const [ springs ] = useSprings(isReady ? NUM_FLOWERS : 0, index => {
    const { x, slant, delay, scale: scaleVariation } = getFlowerStyles(index);

    // This will calculate a value between 0 and 1 based on scroll position.
    const animationHasStarted = scrollY >= animationStartScrollPosition;
    const halfContentHeight = contentHeight / 2;
    const distanceScrolledBeyondContent = scrollY - animationStartScrollPosition;

    // scale will reach 1 when user has scrolled halfway through the content
    const scale = animationHasStarted
      ? Math.min(distanceScrolledBeyondContent / halfContentHeight, 1)
      : 0;

    // Calculate the new y position based on the scale.
    // It starts at the initial position and moves upwards as it scales.
    const baseY = contentHeight - FLOWER_SIZE;
    const y = baseY - scale * FLOWER_SIZE * FLOWER_GROWTH_SCALE;

    return {
      from: {
        x,  
        y: baseY,
        transform: `scale(0) rotate(0deg)`,
      },
      to: {
        x,
        y,
        transform: `scale(${scale * scaleVariation}) rotate(${slant}deg)`,
      },
      config: {
        // Configuration for the spring physics.
        tension: 150 * delay,
        friction: 10,
      }
    };
  }, [
    scrollY,
    animationStartScrollPosition,
    contentHeight,
    contentWidth,
    flowerStyles,
  ]);

  return (
    <div ref={containerRef} className="absolute" style={{ height: contentHeight, width: contentWidth }}>
      {springs.map((props, i) => (
        <animated.div key={i} style={{
          background: "url('/flower.svg') no-repeat center center",
          backgroundSize: 'cover',
          width: FLOWER_SIZE,
          height: FLOWER_SIZE * 2,
          position: 'absolute',
          willChange: 'transform',
          ...props,
        }} />
      ))}
    </div>
  );
}
