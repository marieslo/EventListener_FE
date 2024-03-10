import React, { useEffect, useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Image, Circle, Flex, Avatar } from "@chakra-ui/react";

const PictureInput: React.FC = () => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<any>({ avatar: null }); // Изменение типа formData на any
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.picture && parsedUser.picture) {
                setPreviewImage(parsedUser.picture);
            }
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
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                setPreviewImage(imageDataUrl); // Установка предварительного изображения
                setAvatar(imageDataUrl); // Сохранение изображения в formData
                const userString = localStorage.getItem('user');
                let user = userString ? JSON.parse(userString) : {};

                // Добавляем новую запись picture
                user.picture = imageDataUrl;

                // Сохраняем обновленный объект в localStorage
                localStorage.setItem('user', JSON.stringify(user));

                console.log('picture', JSON.stringify({ avatar: imageDataUrl }))
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
                        accept="image/*"
                        type="file"
                        name="avatar"
                        ref={inputRef}
                        style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                        onChange={handleFileChange}
                    />
                </Box>
            </FormControl>
        </Flex>
    );
};

export default PictureInput;
