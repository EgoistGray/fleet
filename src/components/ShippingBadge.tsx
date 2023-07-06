import { capitalize } from "@/utils/string";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiPackage, BiTime } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";

type ShippingBadgeProps = {
  status: "pending" | "processing" | "shipping" | "delivered";
};

export default function ShippingBadge({ status }: ShippingBadgeProps) {
  return (
    <div
      className={`flex w-3/4 min-w-[120px] select-none items-center justify-center gap-2  rounded-full px-4 py-2 font-medium text-white ${
        status === "pending"
          ? "bg-neutral-500 "
          : status === "processing"
          ? "bg-orange-500"
          : status === "shipping"
          ? "bg-blue-500"
          : "bg-green-500 "
      }`}
    >
      {status === "pending" ? (
        <BiTime size={24} />
      ) : status === "processing" ? (
        <BiPackage size={24} />
      ) : status === "shipping" ? (
        <FaShippingFast size={24} />
      ) : (
        <AiFillCheckCircle size={24} />
      )}{" "}
      {capitalize(status)}
    </div>
  );
}
