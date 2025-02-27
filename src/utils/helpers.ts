import { ContainerType } from "@/types/Container";

export function generateRandomSize() {
  return {
    width: Math.floor(Math.random() * 100) + 200,
    height: Math.floor(Math.random() * 100) + 200,
  };
}

export const generateRandomColor = () => {
  const lightColors = [
    "#ff9999",
    "#ffb399",
    "#ffcc99",
    "#ffe699",
    "#ffff99",
    "#e6ff99",
    "#ccff99",
    "#b3ff99",
    "#99ff99",
    "#99ffb3",
    "#99ffcc",
    "#99ffe6",
    "#99ffff",
    "#99e6ff",
    "#99ccff",
    "#99b3ff",
    "#9999ff",
    "#b399ff",
    "#cc99ff",
    "#e699ff",
    "#ff99ff",
    "#ff99e6",
    "#ff99cc",
    "#ff99b3",
    "#ff9999",
  ];
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  return lightColors[randomIndex];
};

export const backgroundColors: Partial<
  Record<ContainerType, React.CSSProperties>
> = {
  MAIN: { backgroundColor: "#E8E8E8" },
  CONTAINER: { backgroundColor: "#C0C0C0" },
};

export const containerBorders: Partial<Record<ContainerType, string>> = {
  MAIN: "#E8E8E8",
  CONTAINER: "#C0C0C0",
};
