// Importing ButtonProps type for type safety
import { ButtonProps } from "@/types";

// Default Button component definition
export default function Button({ type, label, onClick }: ButtonProps) {
  return (
    <button
      // Button styling based on the type prop
      className={`w-full h-[54px] px-[15px] rounded-[10px] ${
        type === "action" && "bg-primary" // Apply primary background for action type
      } ${type === "outline" && "border border-textColor"}`} // Apply border for outline type
      onClick={onClick} // Click event handler
    >
      <p className="text-heading-6 font-bold text-center font-montserrat text-textColor">
        {label}
      </p>
    </button>
  );
}
