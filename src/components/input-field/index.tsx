import { InputFieldProps } from "@/types";

export default function InputField({
  placeholderText, // Placeholder text for the input field
  inputData, // Current value of the input field
  setInputData, // Function to update the inputData state
  type = "text", // Type of the input field, default is "text"
  hasError, // Error message or boolean indicating if there's an error
}: InputFieldProps) {
  // Function to handle input changes
  const handleInputChange = (value: string) => {
    setInputData(value); // Update the inputData state with the new value
  };

  return (
    <div>
      <input
        type={type} // Set the input type
        placeholder={placeholderText} // Set the placeholder text
        value={inputData} // Bind the input value to inputData
        onChange={(e) => handleInputChange(e.target.value)} // Handle input changes
        className={`h-[45px] min-w-full text-body-small font-regular font-montserrat bg-input focus:bg-input rounded-[10px] px-16 focus:outline-none placeholder:text-textColor ${
          hasError ? "focus:outline focus:outline-1 focus:outline-error" : "" // Apply error styles if hasError is true
        } ${hasError ? "border border-red-500" : ""}`} // Apply border styles if hasError is true
      />
      {hasError && ( // Conditionally render error message if hasError is true
        <p className="text-body-xs font-regular font-montserrat text-error">
          {hasError}
        </p>
      )}
    </div>
  );
}
