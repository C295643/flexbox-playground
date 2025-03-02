import { useRef } from "react";

export function useNextId(init: number) {
  const nextIdRef = useRef(init);

  function getNextId() {
    const id = nextIdRef.current;
    nextIdRef.current += 1;
    return id;
  }

  return getNextId;
}
