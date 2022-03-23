/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { off, on } from '@/utils/eventListener';

const useScrollingUp = () => {
  let prevScroll;
  //if it is SSR then check you are now on the client and window object is available
  if (typeof window !== 'undefined') {
    prevScroll = window.scrollY;
  }
  const [scrollingUp, setScrollingUp] = useState(false);
  const handleScroll = () => {
    let currScroll;
    if (typeof window !== 'undefined') {
      currScroll = window.scrollY;
    }
    const isScrolled = currScroll === 0 ? false : prevScroll > currScroll;

    setScrollingUp(isScrolled);
    prevScroll = currScroll;
  };
  useEffect(() => {
    on(window, 'scroll', handleScroll, { passive: true });
    return () => {
      off(window, 'scroll', handleScroll, { passive: true });
    };
  }, []);
  return { scrollingUp, setScrollingUp };
};

export default useScrollingUp;
