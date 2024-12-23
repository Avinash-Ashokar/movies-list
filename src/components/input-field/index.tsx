import { InputFieldProps } from "@/types";
import { useEffect } from "react";

export default function InputField({
  placeholderText,
  inputData,
  setInputData,
}: InputFieldProps) {
  const handleInputChange = (value: string) => {
    setInputData(value);
  };

  return (
    <div>
      <input
        placeholder={placeholderText}
        value={inputData}
        onChange={(e) => handleInputChange(e.target.value)}
        className="bg-[#224957] min-w-full sm:w-[300px] h-[45px] rounded-[10px] px-4 focus:outline-none text-sm text-[#FFFFFF] font-normal leading-6"
      />
    </div>
  );
}
