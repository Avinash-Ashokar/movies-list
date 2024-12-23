"use client";

import { CheckboxProps } from "@/types";
import { FaCheck } from "react-icons/fa";

export default function Checkbox({ isSelected, setIsSelected }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2 w-[134px]">
      <div
        onClick={() => setIsSelected((prevOption) => !prevOption)}
        className="w-[18px] h-[17px] rounded-[5px] bg-[#224957] flex justify-center items-center hover:cursor-pointer"
      >
        {isSelected && <FaCheck className="text-[#FFFFFF] w-[12px]" />}
      </div>
      <p className="text-sm font-normal leading-6 text-[#FFFFFF]">
        Remember me
      </p>
    </div>
  );
}
