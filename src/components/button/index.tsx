import { ButtonProps } from "@/types";

export default function Button({ type, label, onClick }: ButtonProps) {
  return (
    <button
      className={`w-full h-[54px] px-[15px] rounded-[10px] ${
        type === "action" ? "bg-[#2BD17E]" : ""
      } ${type === "outline" && "border border-[#FFFFFF]"}`}
      onClick={onClick}
    >
      <p className="text-base font-bold leading-6 text-center text-[#FFFFFF]">
        {label}
      </p>
    </button>
  );
}
