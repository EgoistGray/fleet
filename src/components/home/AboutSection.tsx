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
          The fastest-growing decentralized logistics and transportation
          services
        </h2>
        <div className="mx-auto  my-12 h-2 w-12 rounded-full bg-black" />
        <p className=" text-4xl leading-10 text-neutral-800">
          Fleet&apos;s team consists of world-class engineers and managers with
          over 30-years of experience in the field. We are committed into
          creating a{" "}
          <span className="font-bold">
            better, smarter and faster delivery services&nbsp;
          </span>
          compared to what conventional company could offer. <br /> <br />
          During our time in the industry, we recognized that logistics services
          are hard and expensive to operate. Delivery can take days or even
          months to operate due to{" "}
          <span className="font-bold">
            insufficient sorting center and warehouses.
          </span>
          <br />
          <br />
          With Fleet, we introduced a system where anyone who has been validated
          can contribute to our ever increasing{" "}
          <span className="italic"> ghost warehouses and sorting center,</span>
          &nbsp;
          <span className="font-bold">
            reducing our overall delivery time and cost.
          </span>
        </p>
        <Link
          href={"/about"}
          className="my-5 flex w-fit cursor-pointer items-center  gap-3 py-3  text-4xl uppercase text-neutral-900 no-underline transition duration-100 hover:opacity-50"
        >
          Learn More <AiOutlineRight />
        </Link>
      </SectionContent>
    </Section>
  );
}
