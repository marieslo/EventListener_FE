'use client'

import { CATEGORY_URLS } from "@/Components/SignUpModal/categories/categories_url";
import { Avatar, Box, Flex, FormControl, FormLabel, Grid, Input, Circle, Image, WrapItem, Button, GridItem, Text, Switch, Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../../api";

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    imageURL: string;
    interests: string[];
    city: string;
}

const Profile: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [picture, setPicture] = useState<any>({ avatar: null });
    const [showInterests, setShowInterests] = useState(false);
    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')
    const [file, setFile] = useState<any>({ avatar: null });

    // formdata
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        imageURL: '',
        interests: [],
        city: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setToken(token);
            fetchUser(token); // Передаем токен в функцию fetchUser
        }
    }, []);

    async function fetchUser(token: string) {
        try {
            const response = await axios.get(`${SERVER_URL}/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData: User = response.data;

            userData.interests = userData.interests[0].split(',');

            setFormData(userData);
            console.log(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const handleSaveChanges = () => {
        console.log('saving changes');
    };

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryClick = (category: string) => {
        const updatedInterests = formData.interests.includes(category)
            ? formData.interests.filter((interest) => interest !== category)
            : [...formData.interests, category];
        setFormData({ ...formData, interests: updatedInterests });
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
    
             const pictureUrl = URL.createObjectURL(file);
             setPreviewImage(pictureUrl);
            setFile(file);
        }
    };

    return (
        <>
            <Box display='flex' width='100wv' minHeight='100vh' pt='5%' pb='5%' backgroundColor='#fbffec' justifyContent='center'>
                <Flex flexDirection="column" borderRadius='10px'
                    backgroundColor='white' width='fit-content' height='fit-content' p='20px'>
                    <Flex flexDirection='row' justifyContent='center' alignItems="center" gap='30px'>
                        <Flex flexDirection='column' gap='25px' alignItems="center">
                            <Avatar color='white' size='2xl' backgroundColor='red.500' name={`${formData.firstName} ${formData.lastName}`}
                            src={previewImage || formData.imageURL ||  undefined}
                            />
                            {/* Поле для выбора файла */}
                            <Input
                            ref={inputRef}
                                accept="image/*"
                                type="file"
                                name="avatar"
                                style={{ position: "absolute", width: "20%", height: "20%", opacity: 0, cursor: "pointer" }}
                                onChange={handleFileChange}
                            />
                            {/* Кнопка "Update" с обработчиком клика */}
                            <Button size='sm' width='fit-content' colorScheme="red">
                                Update <Input
                                ref={inputRef}
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
                                <Input type="email" value={formData.email ?? ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={formData.password ?? ''} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>First Name</FormLabel>
                                <Input type="text" value={formData.firstName ?? ''} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Last Name</FormLabel>
                                <Input type="text" value={formData.lastName ?? ''} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Phone</FormLabel>
                                <Input type="tel" value={formData.phone ?? ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>City</FormLabel>
                                <Input type="text" value={formData.city ?? ''} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
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

                            {/* Отображаем интересы пользователя */}
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
                        <Button mt='1rem' colorScheme="red" size='md' width='fit-content' onClick={handleSaveChanges}>Save Changes</Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    );

}

export default Profile;