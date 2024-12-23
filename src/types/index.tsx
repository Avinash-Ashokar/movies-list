import { User } from "firebase/auth";

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

export interface CheckboxProps {
  isSelected: boolean;
  setIsSelected: (selected: boolean | ((prev: boolean) => boolean)) => void; // Updated type
}

export interface UpdateMovieProps {
  headerTitle: string;
  selectedMovieData?: Movie | null;
}

export interface ImageUploadProps {
  imageFile: string;
  setImageFile: (data: string) => void; // Add this line to define setImageFile
}

export interface userStateContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
