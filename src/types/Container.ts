import { ObjectValues } from "./types";

export const ContainerType = {
  MAIN: 'MAIN',
  CONTAINER: 'CONTAINER',
  ITEM: 'ITEM',
} as const;

export type ContainerType = ObjectValues<typeof ContainerType>;

export const ContainerResetClass = {
  MAIN: 'container-main',
  CONTAINER: 'container',
  ITEM: 'item',
} as const;

export type ContainerResetClass = ObjectValues<typeof ContainerResetClass>;
