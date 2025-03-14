import { ObjectValues } from "./types";

export const ContainerType = {
  MAIN: "MAIN",
  CONTAINER: "CONTAINER",
  ITEM: "ITEM",
} as const;

export type ContainerType = ObjectValues<typeof ContainerType>;
