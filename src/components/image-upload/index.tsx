"use client";

import Image from "next/image";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageUploadProps } from "@/types";
import { DownloadIcon } from "../../../public";

const ImageUpload = ({
  imageFile,
  setImageFile,
  hasError,
}: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === "string") {
            setImageFile(result);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [setImageFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div className="h-[372px] w-full sm:w-[473px] sm:h-[504px] rounded-[10px] bg-[#224957]">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed border-textColor
          ${hasError ? "border border-red-500" : ""}
          flex flex-col items-center justify-center
          w-full h-full cursor-pointer rounded-[10px]
          transition-colors duration-200
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
      >
        <input {...getInputProps()} />
        {imageFile ? (
          <img
            src={imageFile}
            alt="Preview"
            className="w-full h-full object-cover p-16"
          />
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-3">
            <Image
              src={DownloadIcon}
              alt="Download Icon"
              width={16}
              height={16}
            />
            <p className="text-body-small font-normal font-montserrat text-textColor">
              Upload or Drop an image here
            </p>
          </div>
        )}
      </div>
      {hasError && (
        <p className="text-body-xs font-regular font-montserrat text-error">
          {hasError}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
