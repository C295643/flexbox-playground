export const generateRandomSize = () => {
  const width = Math.floor(Math.random() * (300 - 100) + 100);
  const height = Math.floor(Math.random() * (200 - 100) + 100);
  
  return {
    width: `${width}px`,
    height: `${height}px`,
  };
};