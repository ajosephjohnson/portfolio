'use client'

import { useEffect } from 'react';
import { useSprings, animated, easings, to } from '@react-spring/web';

import { getRandomIntegerInRange, getRandomXPosition } from '@/components/animations/helpers';
import { SeasonAnimationProps } from '@/components/animations';


const ANIMATION_DURATION = 9000;
const NUM_SNOWFLAKES = 250;
const WIND_STRENGTH = 10;
const SNOWFLAKE_SIZE = 10;
const SNOWFLAKE_OPACITY_MIN = 0.7; // Minimum opacity
const SNOWFLAKE_OPACITY_MAX = 1; // Maximum opacity
const DELAY_MIN = 0;
const DELAY_MAX = 1000;
const SIZE_VARIATION = 2;

export default function LightSnowfall({ contentHeight, contentWidth, isPageVisible }: SeasonAnimationProps) {
  // Only initialize if content dimensions are not zero.
  const isReady = contentHeight !== 0 && contentWidth !== 0;

  const [ springs, api ] = useSprings(isReady ? NUM_SNOWFLAKES : 0, index => {
    // Generates a random X position for each snowflake to start from.
    const x = getRandomXPosition(contentWidth, SNOWFLAKE_SIZE, WIND_STRENGTH);
    return {
      from: {
        x, // Start position for the X-axis.
        y: 0 - SNOWFLAKE_SIZE - (SNOWFLAKE_SIZE / 4), // Start position for the Y-axis (off-screen above the viewport with buffer).
      },
      to: {
        x, // End position for the X-axis (same as start).
        y: contentHeight - SNOWFLAKE_SIZE, // Start position for the Y-axis (off-screen above the viewport with buffer).
      },
      delay: index * getRandomIntegerInRange(DELAY_MIN, DELAY_MAX), // Staggered delay for each snowflake.
      config: {
        // Configuration for the spring physics.
        tension: 10,
        friction: 5,
        mass: 0.5,
        duration: ANIMATION_DURATION,
        easing: easings.linear,
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
    // Determines the frequency and direction of the "wind" affecting snowflake movement.
    const windInitialDirection = Math.random() < 0.5 ? -1 : 1;
    const sizeVariation = getRandomIntegerInRange(SNOWFLAKE_SIZE - SIZE_VARIATION, SNOWFLAKE_SIZE + SIZE_VARIATION);
    const snowflakeOpacity = getRandomIntegerInRange(SNOWFLAKE_OPACITY_MIN, SNOWFLAKE_OPACITY_MAX);

    return <animated.div
      key={i}
      style={{
        width: sizeVariation,
        height: sizeVariation,
        backgroundImage: `url('/animations/snowflakes/snowflake-${getRandomIntegerInRange(1, 12)}.svg')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',        
        position: 'absolute',
        willChange: 'transform',
        opacity: snowflakeOpacity,
        transform: to([ props.x, props.y ], (x, y) => {
          // Continuous rotation as the snowflake falls
          const rotation = y / contentHeight * 360;
          // Calculates the wind effect based on the snowflake's Y position.        
          const wind = WIND_STRENGTH * Math.sin(y / (contentWidth / 10));
          return `translateX(${wind * windInitialDirection}px) rotateZ(${rotation * windInitialDirection}deg)`;
        }),
        ...props,
      }}
    />
  });
}