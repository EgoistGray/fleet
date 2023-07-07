import { motion, useTransform } from "framer-motion";
import { type StaticImageData } from "next/image";
import { useRef } from "react";
import { useScrollMotion } from "../hooks/useScrollElement";

export default function ParallaxImage({
  src: img,
  className = "",
  imgClassName = "",
}: {
  src: string | StaticImageData;
  className?: string;
  imgClassName?: string;
}) {
  const ref = useRef(null);
  const scrollYProgress = useScrollMotion(ref);

  // const springScroll = useSpring(scrollYProgress);
  const translateY = useTransform(
    scrollYProgress,
    (val) => `${(val / 7) * -85}%`
  );

  const src = typeof img === "string" ? img : img.src;

  return (
    <div ref={ref} className={`overflow-hidden rounded-xl ${className}`}>
      <motion.div
        className={`h-[150%] w-full bg-cover bg-center will-change-transform ${imgClassName}`}
        style={{
          backgroundImage: `url(${src})`,
          translateY: translateY,
        }}
      />
    </div>
  );
}
