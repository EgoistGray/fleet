import useScrollElement from "@/hooks/useScrollElement";
import { motion } from "framer-motion";
import { useRef } from "react";

function computeOpacity(sectionNumber: number, progress: number) {
  const TOTAL_SECTION = 3;

  progress += 0.2; // some approximately accurate offset
  const sectionProgress = progress * TOTAL_SECTION - sectionNumber;

  if (sectionProgress >= 0 && sectionProgress < 1) return 1;
  return 0.1;
}

export default function PromotionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useScrollElement(containerRef);

  const skillTransitionClass =
    "text-tight text-8xl font-bold transition duration-200";

  return (
    <div
      className="h-full min-h-screen w-full bg-neutral-900 "
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl py-40 text-white ">
        <motion.div
          className={skillTransitionClass}
          style={{
            opacity: computeOpacity(0, scrollYProgress),
          }}
        >
          Our team comprises of industry experts with over 30-years of
          experience.
        </motion.div>
        <motion.div
          className={skillTransitionClass}
          style={{
            opacity: computeOpacity(1, scrollYProgress),
          }}
        >
          Fleet is designed carefully based of our issues and problems with
          current solutions.
        </motion.div>
        <motion.div
          className={skillTransitionClass}
          style={{
            opacity: computeOpacity(2, scrollYProgress),
          }}
        >
          We know our tools inside and out and are committed into bringing them
          for everyone to use.
        </motion.div>
      </div>
    </div>
  );
}
