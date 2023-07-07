"use client";
import { clip01 } from "@/utils/clip";
import { useMotionValue } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

export default function useScrollElement(ref: RefObject<HTMLElement>) {
  const [scrollYProgress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const target = ref.current;
      const rect = target.getBoundingClientRect();
      const currentScrollPosition = window.scrollY;

      const viewport = window.innerHeight;
      // we want to start scrolling when 1/3 of the element is on screen
      const startOffset = viewport - target.clientHeight / 3;
      const endOffset = 0;

      const distFromTop = rect.top + currentScrollPosition;

      const from = Math.max(0, distFromTop - startOffset);
      const to = distFromTop + rect.height + endOffset;
      const distance = to - from;

      const progress = clip01((currentScrollPosition - from) / distance);

      setProgress(progress);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [ref, scrollYProgress]);

  return scrollYProgress;
}
export function useScrollMotion(ref: RefObject<HTMLElement>) {
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const target = ref.current;
      const rect = target.getBoundingClientRect();
      const currentScrollPosition = window.scrollY;

      const viewport = window.innerHeight;
      // we want to start scrolling when 1/3 of the element is on screen
      const startOffset = viewport - target.clientHeight / 3;
      const endOffset = 0;

      const distFromTop = rect.top + currentScrollPosition;

      const from = Math.max(0, distFromTop - startOffset);
      const to = distFromTop + rect.height + endOffset;
      const distance = to - from;

      const progress = clip01((currentScrollPosition - from) / distance);

      scrollYProgress.set(progress);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [ref, scrollYProgress]);

  return scrollYProgress;
}
