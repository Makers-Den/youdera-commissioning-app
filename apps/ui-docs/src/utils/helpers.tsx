export function asyncTimeout(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function getRandomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * max) + min;
}
