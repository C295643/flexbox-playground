export function generateRandomSize() {
  return {
    width: Math.floor(Math.random() * 100) + 50,
    height: Math.floor(Math.random() * 100) + 50,
  };
}