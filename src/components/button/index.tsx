import { ButtonProps } from "@/types";

export default function Button({ type, label, onClick }: ButtonProps) {
  return (
    <button
      className={`w-full h-[54px] px-[15px] rounded-[10px] ${
        type === "action" && "bg-primary"
      } ${type === "outline" && "border border-textColor"}`}
      onClick={onClick}
    >
      <p className="text-heading-6 font-bold text-center font-montserrat text-textColor">
        {label}
      </p>
    </button>
  );
}
