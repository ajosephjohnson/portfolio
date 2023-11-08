import { useSprings, animated, easings, to } from '@react-spring/web';
import { getRandomIntegerInRange, getRandomXPosition } from './helpers';
import { SeasonalSectionProps } from './SeasonalSection';


const ANIMATION_DURATION = 750;
const NUM_RAINDROPS = 500;
const RAINDROP_WIDTH = 2;
const RAINDROP_HEIGHT = 10;
const DELAY_MIN = 100;
const DELAY_MAX = 100;
const WIND_STRENGTH = -200;
const ROTATION_FACTOR = -0.15;

export default function LightRainfall({ contentHeight, contentWidth }: SeasonalSectionProps) {
  // Only initialize if content dimensions are not zero.
  const isReady = contentHeight !== 0 && contentWidth !== 0;

  const [ springs ] = useSprings(isReady ? NUM_RAINDROPS : 0, index => {
    const xStart = getRandomXPosition(contentWidth, RAINDROP_WIDTH, 0);
    const xEnd = xStart + WIND_STRENGTH;
    const rotation = WIND_STRENGTH * ROTATION_FACTOR;
    return {
      from: {
        x: xStart, // Start position for the X-axis.
        y: 0 - RAINDROP_HEIGHT, // Start position for the Y-axis (off-screen above the viewport).
        rotateZ: rotation, // Rotation angle.
      },
      to: {
        x: xEnd, // End position for the X-axis.
        y: contentHeight + RAINDROP_HEIGHT, // End position for the Y-axis (off-screen below the viewport)
        rotateZ: rotation, // Rotation angle.
      },
      delay: index * getRandomIntegerInRange(DELAY_MIN, DELAY_MAX), // Staggered delay for each raindrop.
      config: {
        duration: ANIMATION_DURATION,
        easing: easings.linear,
      }
    };
  }, [
    contentHeight,
    contentWidth,
  ]);

  return springs.map((props, i) => {
    return <animated.div
      key={i}
      style={{
        height: RAINDROP_HEIGHT,
        width: RAINDROP_WIDTH,
        backgroundColor: '#ADD8E6',
        position: 'absolute',
        willChange: 'transform',
        ...props,
      }}
    />
  });
}