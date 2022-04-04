import { useEffect, useState } from 'react';

import { off, on } from '@/utils/eventListener';

const useScrollingUp = () => {
  const [prevScroll, setPrevScroll] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    let currScroll;
    //if it is SSR then check you are now on the client and window object is available
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
