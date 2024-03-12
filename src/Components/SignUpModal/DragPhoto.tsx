import React, { useEffect, useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Image, Circle, Flex, Avatar } from "@chakra-ui/react";
import * as base85 from 'base85';

interface User {
    firstName: string;
    lastName: string;
}
interface PictureInputProps {
    onChange: (file: File) => void;
}

const PictureInput: React.FC<PictureInputProps> = ({ onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [file, setFile] = useState<any>({ avatar: null }); // Изменение типа formData на any

    useEffect(() => {
        const userFromStorage = localStorage.getItem('user');
        
        if (userFromStorage) {
           const user: User = JSON.parse(userFromStorage);
        setFormData(user); 
        }
  
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

    const [formData, setFormData] = useState<User>({
        firstName: '',
        lastName: '',
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

         const pictureUrl = URL.createObjectURL(file);
         setPreviewImage(pictureUrl);
         localStorage.setItem('picture', pictureUrl);
        onChange(file);
        setFile(file);
    }
};


    return (
        <Flex justifyContent="center" alignItems="center">
            <FormControl>
                <Box position="relative" width="9.5rem" height="9.5rem">
                    <Circle size="90%" bg="gray.300" p={1} style={{ overflow: "hidden", borderRadius: "50%" }}>
                        {previewImage ? (

                            <Avatar onClick={handleButtonClick} color='white' size='2xl' backgroundColor='red.500' name={`${formData.firstName} ${formData.lastName}`}
                            src={previewImage}/>
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
