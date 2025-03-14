import { ContainerGroup } from "@/app/page";
import { deepClone } from "@/utils/containerUtils";
import { useState } from "react";

export function useStateWithDeepClone<T extends ContainerGroup>(
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, T] {
  const [state, setState] = useState<T>(initialValue);
  const deepClonedState = deepClone(state) as T;
  return [state, setState, deepClonedState];
}
