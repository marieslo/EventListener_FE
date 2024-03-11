import React, { useEffect, useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Image, Circle, Flex, Avatar } from "@chakra-ui/react";
import * as base85 from 'base85';

interface PictureInputProps {
    onChange: (file: File) => void;
}

const PictureInput: React.FC<PictureInputProps> = ({ onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [file, setFile] = useState<any>({ avatar: null }); // Изменение типа formData на any

    useEffect(() => {
        const storedPicture = localStorage.getItem('picture');
        if (storedPicture) {
            setPreviewImage(storedPicture);
        }
    }, []);

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

         // Установка предварительного изображения
         const pictureUrl = URL.createObjectURL(file);
         setPreviewImage(pictureUrl);
 
         // Сохраняем URL-адрес файла в локальное хранилище
         localStorage.setItem('picture', pictureUrl);

        // Устанавливаем файл в состояние (необходимо ли это?)
        onChange(file);
        setFile(file);
    }
};

    



    return (
        <Flex justifyContent="center" alignItems="center">
            <FormControl>
                <Box position="relative" width="9.5rem" height="9.5rem">
                    <Circle size="100%" bg="gray.300" p={1} style={{ overflow: "hidden", borderRadius: "50%" }}>
                        {previewImage ? (
                            <Image onClick={handleButtonClick} src={previewImage} alt="Preview" borderRadius="50%" objectFit="cover" />
                        ) : (
                            <Button onClick={handleButtonClick} zIndex="1">
                                Upload
                            </Button>
                        )}
                    </Circle>
                    <Input
                        accept="image/*"
                        type="file"
                        name="avatar"
                        ref={inputRef}
                        style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                        onChange={handleFileChange} // Устанавливаем выбранный файл в состояние
                    />

                </Box>
            </FormControl>
        </Flex>
    );
};

export default PictureInput;
