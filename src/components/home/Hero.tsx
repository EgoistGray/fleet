import { Button } from "@mantine/core";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AiOutlineRight } from "react-icons/ai";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // target: containerRef,
  });
  const parallaxY = useTransform(scrollYProgress, (val) => val * 500 * 4);
  return (
    <div
      className="w-ful relative h-full min-h-screen overflow-hidden"
      ref={containerRef}
    >
      <div className="fixed -z-20 aspect-square h-full w-full overflow-hidden opacity-100">
        <video
          src="/background.webm"
          className="h-full w-full object-cover "
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="fixed -z-10 aspect-square h-full w-full overflow-hidden  bg-white/70 backdrop-blur-md"></div>
      <motion.div
        className="mx-auto mt-10 flex h-full min-h-screen w-full max-w-2xl flex-col items-center justify-center"
        style={{
          translateY: parallaxY,
        }}
      >
        <div className="text-8xl font-bold tracking-tight">Ship it Fast.</div>
        <div className="text-8xl font-bold tracking-tight">
          Ship it <span className="underline">Right</span>.
        </div>
        <div className="mt-5 text-center text-4xl font-light">
          Manage your fleet with our highly extendable, simple, and smart system
        </div>
        <Button
          size="xl"
          className="mt-7 rounded-full"
          variant="outline"
          rightIcon={<AiOutlineRight />}
        >
          Join Today
        </Button>
      </motion.div>
    </div>
  );
}
