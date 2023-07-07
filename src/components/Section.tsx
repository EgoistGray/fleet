import { type ComponentProps } from "react";

export default function Section({
  className = "",
  children,
}: ComponentProps<"section">) {
  return (
    <section className={` h-full min-h-screen w-full ${className}`}>
      {children}
    </section>
  );
}

export function SectionContent({
  className = "",
  children,
}: ComponentProps<"section">) {
  return (
    <div className={`mx-auto max-w-7xl py-40 ${className}`}>{children}</div>
  );
}
