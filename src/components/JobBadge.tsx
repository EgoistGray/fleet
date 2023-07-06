import { capitalize } from "@/utils/string";
import { AiOutlineDollar } from "react-icons/ai";
import { MdOutlineSportsMotorsports } from "react-icons/md";

type JobBadgeProps = {
  job: "courier" | "cashier";
};

export default function JobBadge({ job }: JobBadgeProps) {
  return (
    <div
      className={`flex w-3/4 min-w-[120px] select-none items-center justify-center gap-2  rounded-full px-4 py-2 font-medium ${
        job === "courier"
          ? "bg-neutral-500 text-white"
          : "bg-green-500 text-white"
      }`}
    >
      {job === "courier" ? (
        <MdOutlineSportsMotorsports size={24} />
      ) : (
        <AiOutlineDollar size={24} />
      )}{" "}
      {capitalize(job)}
    </div>
  );
}
