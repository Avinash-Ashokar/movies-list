"use client";

import { CheckboxProps } from "@/types";
import { FaCheck } from "react-icons/fa";

export default function Checkbox({ isSelected, setIsSelected }: CheckboxProps) {
  return (
    <div className="flex items-center gap-8">
      <div
        onClick={() => setIsSelected((prevOption) => !prevOption)}
        className="w-[18px] h-[17px] rounded-[5px] bg-input flex justify-center items-center hover:cursor-pointer"
      >
        {isSelected && <FaCheck className="text-textColor w-[12px]" />}
      </div>
      <p className="text-body-small text-textColor">Remember me</p>
    </div>
  );
}
