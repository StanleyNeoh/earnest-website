'use client'

import { shortenFileName } from "@/lib/utils";
import { useState } from "react";

export function MultiFileField({
  id,
  name,
  required = false,
}: {
  id: string;
  name: string;
  required?: boolean;

}) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const uniqueFiles = selectedFiles.filter(
        (file) => !files.some((existingFile) => existingFile.name === file.name)
      );
      const updatedFiles = [...files, ...uniqueFiles];

      // Update the input element's file list
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (inputElement) {
        inputElement.files = dataTransfer.files;
      }

      setFiles(updatedFiles);
    }
  };

  const handleFileRemove = (fileName: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(file => file.name !== fileName);

      // Update the input element's file list
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (inputElement) {
        inputElement.files = dataTransfer.files;
      }

      return updatedFiles;
    });

    // Prevent page scroll to top
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  };

  return (
    <div className="space-y-4">
      <input
        id={id}
        name={name}
        required={required}
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {files.length > 0 && (
        <div>
          <ul className="mt-2 space-y-2">
            {files.map((file) => (
              <li key={file.name} className="flex items-center justify-between text-gray-700">
                <span>
                  {shortenFileName(file.name, 50)}
                </span>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleFileRemove(file.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}