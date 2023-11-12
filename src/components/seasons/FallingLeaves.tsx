'use client'

import { useEffect } from 'react';

import { useSprings, animated, easings, to } from '@react-spring/web';
import { getRandomIntegerInRange, getRandomXPosition } from './helpers';
import { SeasonalAnimationProps } from './SeasonalSection';
import LeafSvg from './LeafSvg';


const ANIMATION_DURATION = 9000;
const NUM_LEAVES = 100;
const WIND_STRENGTH = 50;
const LEAF_SIZE = 40;
const DELAY_MIN = 500;
const DELAY_MAX = 5000;
const LEAF_COLORS = [ 'fill-tan', 'fill-sienna', 'fill-peru' ];
const SIZE_VARIATION = 10;

export default function FallingLeaves({ contentHeight, contentWidth, isPageVisible }: SeasonalAnimationProps) {
  // Only initialize if content dimensions are not zero.
  const isReady = contentHeight !== 0 && contentWidth !== 0;

  const [ springs, api ] = useSprings(isReady ? NUM_LEAVES : 0, index => {
    // Generates a random X position for each leaf to start from.
    const x = getRandomXPosition(contentWidth, LEAF_SIZE, WIND_STRENGTH);
    return {
      from: {
        x, // Start position for the X-axis.
        y: 0 - LEAF_SIZE - (LEAF_SIZE / 4), // Start position for the Y-axis (off-screen above the viewport with buffer).
      },
      to: {
        x, // End position for the X-axis (same as start).
        y: contentHeight - LEAF_SIZE, // End position for the Y-axis (just above the bottom of the viewport).
      },
      delay: index * getRandomIntegerInRange(DELAY_MIN, DELAY_MAX), // Staggered delay for each leaf.
      config: {
        // Configuration for the spring physics.
        tension: 120,
        friction: 30,
        damping: 0.7,
        mass: 1.2,
        velocity: 0,
        clamp: false,
        bounce: 0.2,
        duration: ANIMATION_DURATION,
        easing: easings.easeInOutCubic,
      }
    };
  }, [
    contentHeight,
    contentWidth,
  ]);

  useEffect(() => {
    if (isPageVisible) {
      api.resume();
    } else {
      api.pause();
    }
  }, [ isPageVisible, api ]);

  return springs.map((props, i) => {
    // Determines the frequency and direction of the "wind" affecting leaf movement.
    const windFrequency = getRandomIntegerInRange(10, 15);
    const windInitialDirection = Math.random() < 0.5 ? -1 : 1;

    // color and size variations
    const randomColorIndex = Math.floor(Math.random() * LEAF_COLORS.length);
    const fillColorClass = LEAF_COLORS[ randomColorIndex ];
    const sizeVariation = getRandomIntegerInRange(LEAF_SIZE - SIZE_VARIATION, LEAF_SIZE + SIZE_VARIATION);

    return <animated.div
      key={i}
      style={{
        width: sizeVariation,
        height: sizeVariation,
        willChange: 'transform',
        position: 'absolute',
        transform: to([ props.y ], (y) => {
          // Calculates the wind effect based on the leaf's Y position.        
          const wind = WIND_STRENGTH * Math.sin(y / (contentWidth / windFrequency));
          return `translateX(${wind * windInitialDirection}px) rotateZ(${wind * windInitialDirection}deg) scaleX(${windInitialDirection * -1})`;
        }),
        ...props
      }} 
    >
      <LeafSvg colorClass={fillColorClass} />
    </animated.div>
  });
}