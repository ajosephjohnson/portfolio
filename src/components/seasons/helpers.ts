// Helper function to calculate a random starting X position for an animated element.
export function randomXPosition(contentWidth: number, size: number, windStrength: number) {
  // Subtracts the maximum wind effect from the edges so that no x-axis overflow is possible
  const windBuffer = size / 2 + windStrength;
  return getRandomIntegerInRange(windBuffer, contentWidth - windBuffer)
}
  
// Helper function to get a random integer within a range (inclusive).
export function getRandomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}