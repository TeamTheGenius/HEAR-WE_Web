import { useRef, useState } from 'react';
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { validateFileSize } from '../lib/fileValidation';

export const useFileInput = <T extends FieldValues>(register: UseFormRegister<T>, fieldName: Path<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previousFile, setPreviousFile] = useState<File>();

  const handleFileInputRef = (element: HTMLInputElement) => {
    register(fieldName).ref(element);
    inputRef.current = element;
  };

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      if (!previousFile) return;

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(previousFile);

      if (inputRef.current) {
        inputRef.current.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
      return;
    }

    setPreviousFile(selectedFile);
  };

  const validateFirstFileSize = (files: FileList | undefined) => {
    const file = files?.[0];
    if (!file) return true;
    return validateFileSize(file, 5, 'MB');
  };

  const fileRegister = register(fieldName, {
    validate: { fileSize: validateFirstFileSize },
    onChange: handleFileChange,
  });

  return {
    handlers: {
      handleInputClick,
      handleFileChange,
      handleFileInputRef,
    },
    fileRegister,
  };
};
