function calculateScore(angle, targetY) {
  const gravity = 9.81; 
  const initialVelocity = 50; // m/s, initial velocity of the cannonball
  const targetX = 100; // Fixed x position of the target

  const angleRadians = angle * Math.PI / 180;

  const timeOfFlight = (2 * initialVelocity * Math.sin(angleRadians)) / gravity;


  const maxHeight = (initialVelocity * initialVelocity * Math.sin(angleRadians) * Math.sin(angleRadians)) / (2 * gravity);


  const horizontalDistance = initialVelocity * Math.cos(angleRadians) * timeOfFlight;


  const deltaY = Math.abs(targetY - maxHeight);


  const proximityScore = deltaY < 5 ? 100 : Math.max(0, 100 - (deltaY * 10));

  const hitTarget = Math.abs(targetY - maxHeight) < 2;

  return {
    proximityScore: proximityScore,
    hitTarget: hitTarget,
    timeOfFlight: timeOfFlight,
    horizontalDistance: horizontalDistance
  };
}


const angle = 45; // Angle in degrees
const targetY = 30; // Target position on the y-axis
const score = calculateScore(angle, targetY);
console.log(score);
