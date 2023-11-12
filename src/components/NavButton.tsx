"use client";

const SCROLL_DURATION = 2000;

export default function NavButton({
  season,
  className,
}: {
  season: string,
  className: string,
}) {
  const smoothScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const target = document.getElementById(season);
      if (!target) {
        return;
      }

      // Calculate the position and distance for scrolling
      const targetPosition = target.getBoundingClientRect().top + window.scrollY; // Updated position of the target element
      const startPosition = window.scrollY; // Current scroll position
      const distance = targetPosition - startPosition; // Distance to scroll

      if (distance === 0) {
        return;
      }

      let startTime = 0; // Start time of the animation

      /**
       * Performs the animation for smooth scrolling.
       * 
       * This function is called recursively using requestAnimationFrame to create a smooth scrolling effect.
       * 
       * @param currentTime - The current time provided by requestAnimationFrame.
       * @remarks
       * The function calculates the elapsed time since the animation started and uses the `ease` function to
       * determine the next scroll position. It then scrolls the window to this position. If the total duration
       * of the animation has not yet been reached, it calls itself again using requestAnimationFrame to continue
       * the animation, creating a loop until the duration is met.
       */
      const animation = (currentTime: number) => {
        if (startTime === 0) {
          startTime = currentTime; // Initialize start time if not already set
        }
        const timeElapsed = currentTime - startTime; // Calculate elapsed time since the animation started
        const run = ease(timeElapsed, startPosition, distance, SCROLL_DURATION); // Calculate the next scroll position
        window.scrollTo(0, run); // Scroll the window to the calculated position
        if (timeElapsed < SCROLL_DURATION) {
          requestAnimationFrame(animation); // Continue the animation if the total duration hasn't been reached
        }
      };

      /**
       * Eases the animation for smooth scrolling.
       * 
       * This uses a combination of "ease-in" and "ease-out" quadratic functions.
       * 
       * @param {number} elapsedTime - The time that has elapsed since the start of the animation.
       * @param {number} startValue - The starting scroll position.
       * @param {number} changeInValue - The total distance to be moved or the total change in the scroll position.
       * @param {number} duration - The total time the scrolling animation should take.
       * @returns {number} The next position to which the window should scroll.
       */
      const ease = (elapsedTime: number, startValue: number, changeInValue: number, duration: number): number => {
        // Normalizing the elapsed time relative to half of the duration.
        elapsedTime /= duration / 2;

        // For the first half of the animation duration:
        if (elapsedTime < 1) {
          // Calculate a quadratic easing out value.
          return (changeInValue / 2) * elapsedTime * elapsedTime + startValue;
        }

        // Adjusting for the second half of the duration.
        elapsedTime--;

        // Calculate a quadratic easing in value for the second half.
        return (-changeInValue / 2) * (elapsedTime * (elapsedTime - 2) - 1) + startValue;
      };

      // Start the animation
      requestAnimationFrame(animation);
    };

  return (
    <button
      onClick={smoothScroll}
      className={className}
    >
      {season.charAt(0).toUpperCase() + season.slice(1)}
    </button>
  );
}
