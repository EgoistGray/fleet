import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import Section, { SectionContent } from "../Section";

export default function AboutSection() {
  return (
    <Section className=" bg-white/95">
      <SectionContent>
        <h1 className="text-center font-bold uppercase tracking-tight text-neutral-700">
          About Fleet
        </h1>
        <h2
          className="relative rounded-full text-center text-5xl font-thin
            uppercase text-neutral-600 before:absolute before:-bottom-10 "
        >
          The world&apos;s most extendable logistics management web application
        </h2>
        <div className="mx-auto  my-12 h-2 w-12 rounded-full bg-black" />
        <p className=" text-4xl leading-10 text-neutral-800">
          Fleet is our attempt of bringing complex logistics management tools
          into the <span className="font-bold">open-source market.</span> <br />{" "}
          <br />
          It is built by using popular open-source web application framework,
          such as NextJS, Prisma, TailwindCSS, and NextAuth to enable any of our
          client to{" "}
          <span className="font-bold">
            {" "}
            easily extend and modify our product.
          </span>
          <br />
          <br />
          Like the Blender Foundation, we are committed to turning Fleet into an{" "}
          <span className="font-bold">
            industry standard tool accessible by anyone.
          </span>
        </p>
        <Link
          href={"/about"}
          className="my-5 flex cursor-pointer items-center  gap-3 py-3  text-4xl uppercase text-neutral-900 no-underline transition duration-100 hover:opacity-50"
        >
          Learn More <AiOutlineRight />
        </Link>
      </SectionContent>
    </Section>
  );
}
