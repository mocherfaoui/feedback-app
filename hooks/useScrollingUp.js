/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { off, on } from '@/utils/eventListener';

const useScrollingUp = () => {
  const [prevScroll, setPrevScroll] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true);
  //if it is SSR then check you are now on the client and window object is available
  const handleScroll = () => {
    let currScroll;
    if (typeof window !== 'undefined') {
      currScroll = window.scrollY;
    }
    const isScrolled =
      (prevScroll > currScroll && currScroll > 70) || currScroll < 70;
    setScrollingUp(isScrolled);
    setPrevScroll(currScroll);
  };
  useEffect(() => {
    on(window, 'scroll', handleScroll, { passive: true });
    return () => {
      off(window, 'scroll', handleScroll, { passive: true });
    };
  }, [prevScroll, handleScroll]);
  return { scrollingUp, setScrollingUp };
};

export default useScrollingUp;
