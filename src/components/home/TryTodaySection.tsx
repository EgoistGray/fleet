import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import Section, { SectionContent } from "../Section";

export default function TryTodaySection() {
  return (
    <Section className=" bg-neutral-800 text-white">
      <SectionContent className="">
        <h1 className="mb-10 text-8xl">
          Don&apos;t Miss Out! <br /> Try it today!
        </h1>
        <div className="text-2xl">
          We have beta trial open right now, be one of the first to experience
          this rising software.
        </div>
        <Link
          href={"/dashboard/employee"}
          className=" my-5 flex cursor-pointer items-center gap-3  py-3 text-4xl  uppercase  text-white no-underline transition duration-100 hover:opacity-50"
        >
          Sign up
          <AiOutlineRight />
        </Link>
      </SectionContent>
    </Section>
  );
}
