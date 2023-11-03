'use client'

import { useSprings, animated, easings, to } from '@react-spring/web';


const ANIMATION_DURATION = 9000;
const NUM_LEAVES = 300;
const WIND_STRENGTH = 50;
const LEAF_DIMENSION = 40;

export default function FallingLeaves({
  contentHeight,
  contentWidth,
}: {
  contentHeight: number,
  contentWidth: number,
}) {
  // Only initialize leaves if content dimensions are non-zero; otherwise, set to zero.
  const readyLeaves = contentHeight === 0 || contentWidth === 0 ? 0 : NUM_LEAVES;

  const [ springs ] = useSprings(readyLeaves, index => {
    // Generates a random X position for each leaf to start from.
    const x = randomXPosition(contentWidth);
    return {
      from: {
        x, // Start position for the X-axis.
        y: 1 - LEAF_DIMENSION - (LEAF_DIMENSION / 4), // Start position for the Y-axis (off-screen above the viewport with buffer).
      },
      to: {
        x, // End position for the X-axis (same as start).
        y: contentHeight - LEAF_DIMENSION, // End position for the Y-axis (just above the bottom of the viewport).
      },
      delay: index * getRandomIntegerInRange(250, 2000), // Staggered delay for each leaf.
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

  return springs.map((props, i) => {
    // Determines the frequency and direction of the "wind" affecting leaf movement.
    const windFrequency = getRandomIntegerInRange(10, 15);
    const windInitialDirection = Math.random() < 0.5 ? -1 : 1;
  
    return <animated.div
      key={i}
      style={{
        width: LEAF_DIMENSION,
        height: LEAF_DIMENSION,
        background: "url('/leaf.svg') no-repeat center center",
        backgroundSize: 'cover',
        willChange: 'transform',
        position: 'absolute',
        transform: to([ props.y ], (y) => {
          // Calculates the wind effect based on the leaf's Y position.        
          const wind = WIND_STRENGTH * Math.sin(y / (contentWidth / windFrequency));
          return `translateX(${wind * windInitialDirection}px) rotateZ(${wind * windInitialDirection}deg)`;
        }),
        ...props
      }} 
    />
  });
};

// Helper function to calculate a random starting X position for a leaf.
function randomXPosition(contentWidth: number) {
  // Avoid starting a leaf directly at the edges
  return getRandomIntegerInRange(LEAF_DIMENSION / 2, contentWidth - (LEAF_DIMENSION / 2));
}

// Helper function to get a random integer within a range (inclusive).
function getRandomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}