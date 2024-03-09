import React, { useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Image, Circle, Flex } from "@chakra-ui/react";

const DragAndDropInput: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center">
    <FormControl>
      <Box position="relative" width="9.5rem" height="9.5rem">
        <Circle size="100%" bg="gray.300" p={1} style={{ overflow: "hidden", borderRadius: "50%" }}>
          {previewImage ? (
            <Image src={previewImage} alt="Preview" borderRadius="50%" objectFit="cover" />
          ) : (
            <Button onClick={handleButtonClick} zIndex="1">
              Upload
            </Button>
          )}
        </Circle>
        <Input
          type="file"
          ref={inputRef}
          style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
          onChange={handleFileChange}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      </Box>
    </FormControl>
    </Flex>
  );
};

export default DragAndDropInput;
