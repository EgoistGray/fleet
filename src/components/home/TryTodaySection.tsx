import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import Section, { SectionContent } from "../Section";

export default function TryTodaySection() {
  return (
    <Section className=" bg-neutral-800 text-white">
      <SectionContent className="">
        <h1 className="mb-10 max-w-3xl text-8xl">
          Interested in joining the Fleet?
        </h1>
        <div className="max-w-3xl text-2xl">
          We have beta trial open right now! Come and join our ever-expanding
          &nbsp;<span className="italic">fleets and delivery services</span>{" "}
        </div>
        <Link
          href={"/auth/register"}
          className=" my-5 flex w-fit cursor-pointer items-center gap-3  py-3 text-4xl  uppercase  text-white no-underline transition duration-100 hover:opacity-50"
        >
          Sign up
          <AiOutlineRight />
        </Link>
      </SectionContent>
    </Section>
  );
}
