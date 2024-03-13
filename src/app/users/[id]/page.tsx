'use client'

import { CATEGORY_URLS } from "@/Components/SignUpModal/categories/categories_url";
import { Avatar, Box, Flex, FormControl, FormLabel, Grid, Input, Circle, Image, WrapItem, Button, GridItem, Text, Switch, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    imageURL: string;
    interests: string[];
}

const Profile: React.FC = () => {
    const [previewImage, setPreviewImage] = useState<string>('');
    const [picture, setPicture] = useState<any>({ avatar: null });
    const [showInterests, setShowInterests] = useState(false);
    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')

    // formdata
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        imageURL: '',
        interests: []
    });

    // если нет данных в локальном хранилище
    const mockUser: User = {
        email: 'example@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123-456-7890',
        imageURL: 'example.jpg',
        interests: ['Sport', 'Travel', 'Food']
    };

    useEffect(() => {
        const userFromStorage = localStorage.getItem('user');
        const user: User = userFromStorage ? JSON.parse(userFromStorage) : mockUser;
        console.log('Interests from localStorage:', user.interests);
        setFormData(user);
    }, []);

    async function fetchUser() {
        try {
            const response = await axios.get(`/users/${user_id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                //fetch USERA тут!!!
            );
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }


    const handleSaveChanges = () => {
        localStorage.setItem('user', JSON.stringify(formData));
    };

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryClick = (category: string) => {
    // Проверяем, есть ли категория в текущем списке интересов пользователя
    const index = formData.interests.indexOf(category);

    if (index !== -1) {
        // Если категория уже выбрана, удаляем её из массива
        const updatedInterests = [...formData.interests];
        updatedInterests.splice(index, 1);
        setFormData({ ...formData, interests: updatedInterests });
    } else {
        // Если категория еще не выбрана, добавляем её в массив
        setFormData({ ...formData, interests: [...formData.interests, category] });
    }
    };
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                setPreviewImage(imageDataUrl); // Установка предварительного изображения
                setPicture(imageDataUrl); // Сохранение изображения в formData
                setFormData(prevState => ({
                    ...prevState, // сохраняем все предыдущие значения состояния
                    picture: imageDataUrl // обновляем только свойство picture
                }));
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
        <>
            <Box display='flex' width='100wv'  minHeight='100vh' pt='5%' pb='5%' backgroundColor='#fbffec' justifyContent='center'>
                <Flex flexDirection="column" borderRadius='10px'
                    backgroundColor='white' width='fit-content' height='fit-content' p='20px'>
                    <Flex flexDirection='row' justifyContent='center' alignItems="center" gap='30px'>
                    <Flex flexDirection='column' gap='25px' alignItems="center">
            <Avatar color='white' size='2xl' backgroundColor='red.500' name={`${formData.firstName} ${formData.lastName}`} src={formData.imageURL ? formData.imageURL : previewImage} />
            {/* Поле для выбора файла */}
            <Input
                        accept="image/*"
                        type="file"
                        name="avatar"
                        style={{ position: "absolute", width: "20%", height: "20%", opacity: 0, cursor: "pointer" }}
                        onChange={handleFileChange}
                    />
            {/* Кнопка "Update" с обработчиком клика */}
            <Button size='sm' width='fit-content' colorScheme="red">
                Update <Input
                        accept="image/*"
                        type="file"
                        name="avatar"
                        style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                        onChange={handleFileChange}
                    />
            </Button>
        </Flex>
                        {/* Поля с данными пользователя */}
                        <Box mt={4}>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>First Name</FormLabel>
                                <Input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Last Name</FormLabel>
                                <Input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Phone</FormLabel>
                                <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            </FormControl>
                        </Box>
                    </Flex>
                    <Flex pt='1rem' alignItems='center' mb={4}>
                        <Switch
                        pl='1rem'
                            colorScheme="red"
                            size="lg"
                            isChecked={showInterests}
                            onChange={() => setShowInterests(!showInterests)}
                        />
                        <Text fontWeight='bold' ml={2}>Show my interests</Text>
                    </Flex>
                    {/* Грид контейнер с интересами пользователя */}
                    {showInterests && (
                    <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
                        
                            {/* Отображаем интересы пользователя */ }
                        {Object.entries(CATEGORY_URLS).map(([category, url]) => (
                                <GridItem key={category}>
                                    <Box position="relative" overflow="hidden" borderRadius="md">
                                        {formData.interests.includes(category) ? (
                                            <Box
                                                width="100%"
                                                height="10rem"
                                                bg="rgba(34, 139, 34, 0.8)"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                cursor="pointer"
                                                position="relative"
                                                onClick={() => handleCategoryClick(category)}
                                            >
                                                <Text color="white" fontWeight="bold" fontSize="4rem">✓</Text>
                                            </Box>
                                        ) : (
                                            <Box
                                                width="100%"
                                                height="10rem"
                                                bg="transparent"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                cursor="pointer"
                                                position="relative"
                                                onClick={() => handleCategoryClick(category)}
                                            >
                                                <Image
                                                    src={url}
                                                    alt={category}
                                                    width="100%"
                                                    height="100%"
                                                    objectFit="cover"
                                                    transition="transform 0.2s"
                                                    _hover={{ transform: "scale(1.1)" }}
                                                    position="absolute"
                                                    top="0"
                                                    left="0"
                                                />
                                            </Box>
                                        )}
                                        <Text
                                            textAlign="center"
                                            position="absolute"
                                            bottom="0"
                                            left="0"
                                            right="0"
                                            bg="rgba(0, 0, 0, 0.5)"
                                            color="white"
                                            fontWeight="bold"
                                            py={2}
                                        >
                                            {category}
                                        </Text>
                                    </Box>
                                </GridItem>
                            ))}
                        
                    </Grid>
                    )}
                    <Flex flexDirection='row' justifyContent='flex-end'>
                        <Button mt='1rem' colorScheme="red" size='md' width='fit-content'onClick={handleSaveChanges}>Save Changes</Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    );

}

export default Profile;