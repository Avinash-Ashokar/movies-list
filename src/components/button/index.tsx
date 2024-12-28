// Importing ButtonProps type for type safety
import { ButtonProps } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Default Button component definition
export default function Button({ type, label, onClick, loading }: ButtonProps) {
  return (
    <button
      // Button styling based on the type prop and loading state
      className={`w-full h-[54px] px-[15px] rounded-[10px] ${
        type === "action" && "bg-primary" // Apply primary background for action type
      } ${type === "outline" && "border border-textColor"} ${
        loading && "cursor-not-allowed opacity-50"
      }`} // Disable cursor and reduce opacity when loading
      onClick={!loading ? onClick : undefined} // Prevent click event when loading
      disabled={loading} // Disable button when loading
    >
      {loading ? ( // Show loading spinner when loading
        <div className="flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin h-6 w-6 text-primary" />{" "}
        </div> // Replace with your loading spinner component
      ) : (
        <p className="text-heading-6 font-bold text-center font-montserrat text-textColor">
          {label}
        </p>
      )}
    </button>
  );
}
