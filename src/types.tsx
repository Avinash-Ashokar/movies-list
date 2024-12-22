export interface Movie {
  title: string;
  year: string;
  imageUrl: string;
  id?: string;
}

export interface ButtonProps {
  type: string;
  label: string;
  onClick?: () => void;
}

export interface InputFieldProps {
  placeholderText: string;
  inputData: string;
  setInputData: (data: string) => void;
}
