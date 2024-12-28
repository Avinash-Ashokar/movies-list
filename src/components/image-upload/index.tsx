// src/components/image-upload/index.tsx

"use client"; // Indicates that this component is a client component in Next.js

import Image from "next/image"; // Importing Image component from Next.js

import React, { useCallback } from "react"; // Importing React and useCallback hook
import { useDropzone } from "react-dropzone"; // Importing useDropzone for drag-and-drop functionality
import { ImageUploadProps } from "@/types"; // Importing types for props
import { DownloadIcon } from "../../../public"; // Importing download icon

// ImageUpload component definition
const ImageUpload = ({
  imageFile, // Current image file
  setImageFile, // Function to set the image file
  hasError, // Error message if any
}: ImageUploadProps) => {
  // Callback function to handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]; // Get the first accepted file
      if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file
        reader.onload = (e) => {
          const result = e.target?.result; // Get the result of the file read
          if (typeof result === "string") {
            setImageFile(result); // Set the image file if result is a string
          }
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    },
    [setImageFile] // Dependency array for useCallback
  );

  // Setting up the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, // Function to call on file drop
    accept: {
      "image/*": [], // Accept all image types
    },
    multiple: false, // Only allow single file upload
  });

  return (
    <div className="h-[372px] w-full sm:w-[473px] sm:h-[504px] rounded-[10px] bg-[#224957]">
      <div
        {...getRootProps()} // Spread dropzone props
        className={`
          border-2 border-dashed border-textColor
          ${
            hasError ? "border border-red-500" : ""
          } // Conditional error styling
          flex flex-col items-center justify-center
          w-full h-full cursor-pointer rounded-[10px]
          transition-colors duration-200
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50" // Styling when dragging over
              : "border-gray-300 hover:border-gray-400" // Default styling
          }
        `}
      >
        <input {...getInputProps()} /> {/* Hidden input for file upload */}
        {imageFile ? ( // Check if an image file is present
          <img
            src={imageFile} // Display the uploaded image
            alt="Preview" // Alt text for the image
            className="w-full h-full object-cover p-16" // Styling for the image
          />
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-3">
            <Image
              src={DownloadIcon} // Display download icon
              alt="Download Icon" // Alt text for the icon
              width={16} // Icon width
              height={16} // Icon height
            />
            <p className="text-body-small font-normal font-montserrat text-textColor">
              Upload or Drop an image here {/* Instruction text */}
            </p>
          </div>
        )}
      </div>
      {hasError && ( // Display error message if exists
        <p className="text-body-xs font-regular font-montserrat text-error">
          {hasError} {/* Error message */}
        </p>
      )}
    </div>
  );
};

export default ImageUpload; // Exporting the ImageUpload component
