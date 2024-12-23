import { InputFieldProps } from "@/types";

export default function InputField({
  placeholderText,
  inputData,
  setInputData,
  type = "text",
}: InputFieldProps) {
  const handleInputChange = (value: string) => {
    setInputData(value);
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholderText}
        value={inputData}
        onChange={(e) => handleInputChange(e.target.value)}
        className="h-[45px] min-w-full text-body-small font-regular font-montserrat bg-input focus:bg-input rounded-[10px] px-16 focus:outline-none placeholder:text-textColor"
      />
    </div>
  );
}
