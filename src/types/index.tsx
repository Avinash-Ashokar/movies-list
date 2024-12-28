// Importing User type from Firebase authentication
import { User } from "firebase/auth";

// Interface representing a Movie object
export interface Movie {
  title: string; // Title of the movie
  year: string; // Release year of the movie
  imageUrl: string; // URL of the movie's image
  id?: string; // Optional unique identifier for the movie
}

// Interface for Button component properties
export interface ButtonProps {
  type: string; // Type of the button (e.g., "action", "outline")
  label: string; // Label text displayed on the button
  onClick?: () => void; // Optional click event handler
  loading?: boolean;
}

// Interface for InputField component properties
export interface InputFieldProps {
  placeholderText: string; // Placeholder text for the input field
  inputData: string; // Current value of the input field
  setInputData: (data: string) => void; // Function to update input data
  type?: string; // Optional type of the input (e.g., "text", "password")
  hasError: string; // Error message if there's an error
}

// Interface for Checkbox component properties
export interface CheckboxProps {
  isSelected: boolean; // Indicates if the checkbox is selected
  setIsSelected: (selected: boolean | ((prev: boolean) => boolean)) => void; // Function to update selection state
}

// Interface for UpdateMovie component properties
export interface UpdateMovieProps {
  headerTitle: string; // Title displayed in the header
  selectedMovieData?: Movie | null; // Optional data of the selected movie
}

// Interface for ImageUpload component properties
export interface ImageUploadProps {
  imageFile: string; // The file path or URL of the uploaded image
  setImageFile: (data: string) => void; // Function to update the image file
  hasError: string; // Error message if there's an error with the image upload
}

// Interface for user state context properties
export interface userStateContextProps {
  user: User | null; // Current user object or null if not logged in
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to update user state
}
