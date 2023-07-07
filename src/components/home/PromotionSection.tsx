import useScrollElement from "@/hooks/useScrollElement";
import { motion } from "framer-motion";
import { useRef } from "react";

function computeOpacity(sectionNumber: number, progress: number) {
  const TOTAL_SECTION = 3;

  progress += 0.1; // some approximately accurate offset
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
          We&apos;re currently rated the fastest shipping company in the world
        </motion.div>
        <motion.div
          className={skillTransitionClass}
          style={{
            opacity: computeOpacity(1, scrollYProgress),
          }}
        >
          We have validated more than 2,000{" "}
          <span className="italic">ghost warehouses and sorting center</span>{" "}
          with strict standard and guidelines
        </motion.div>
        <motion.div
          className={skillTransitionClass}
          style={{
            opacity: computeOpacity(2, scrollYProgress),
          }}
        >
          In total, our Fleet network has delivered over 100,000 parcels
          worldwide
        </motion.div>
      </div>
    </div>
  );
}
