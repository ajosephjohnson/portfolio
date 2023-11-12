import { RefObject, useLayoutEffect, useState } from "react";

// Detect system dark mode changes
export default function useContentDimensions<T extends HTMLElement>(ref: RefObject<T>) {
  const [ contentHeight, setContentHeight ] = useState(0);
  const [ contentWidth, setContentWidth ] = useState(0);
  
  // useLayoutEffect is used over useEffect because we need to measure the 
  // dimensions of the DOM element as soon as it is rendered but before the 
  // browser paints. This ensures that we have the exact measurements to use before 
  // the season animations start.
  useLayoutEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.offsetHeight);
      setContentWidth(ref.current.offsetWidth);
    }
  }, []);

  return {
    ref,
    contentHeight,
    contentWidth
  };
}