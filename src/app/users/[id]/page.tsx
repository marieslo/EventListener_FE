'use client'

import { CATEGORY_URLS } from "@/Components/SignUpModal/categories/categories_url";
import { Avatar, Box, Flex, FormControl, FormLabel, Grid, Input, Circle, Image, WrapItem, Button, GridItem, Text, Switch, Heading, InputGroup, InputRightElement, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../../api";
import { AnyCnameRecord } from "dns";
import MyEvents from "./events/page";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import('@/Components/NavBar/NavBar'), { ssr: false });

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    imageURL: string;
    interests: string[];
    city: string;
    file: '';
}
interface CityCoordinates {
    city: string;
    latitude: number;
    longitude: number;
}

const Profile: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [picture, setPicture] = useState<any>({ avatar: null });
    const [showInterests, setShowInterests] = useState(false);
    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')
    const [file, setFile] = useState<any>({ avatar: null });
    const [city, setCity] = useState<string>("")
    const [cityCoords, setCityCoords] = useState<CityCoordinates | null>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState(false);

    // formdata
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        imageURL: '',
        interests: [],
        city: '',
        file: '',
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

    async function handleSaveChanges(token: string) {

        try {
            setSuccess(false);
            const formDataToSend = new FormData();
            formDataToSend.append('file', file);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('city', city);
            console.log(city)
            formDataToSend.append('interests', formData.interests.join(','));

            const response = await axios.put(`${SERVER_URL}/users/profile`, formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(formData);
            setSuccess(true);

        } catch (error: any) {
            console.error('Error saving changes', error)
        }

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
            console.log('new avater', file)
        }
    };

    const [show, setShow] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }

    const handleFocus = () => {
        if (city) {
            console.log('onfocus');
        }
    };

    const handleBlur = () => {
        if (city) {
            fetchCityCoordinates(city);
        }
    };

    const fetchCityCoordinates = async (cityName: string) => {
        try {
            setError('');
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${cityName}&format=geojson&accept-language=en`);
            const data = response.data;
            if (data.features.length > 0) {
                const coordinates = data.features[0].geometry.coordinates;
                const coords: CityCoordinates = {
                    city: cityName,
                    latitude: coordinates[1],
                    longitude: coordinates[0]
                };
                setCityCoords(coords);
                // Сохранение координат города в локальное хранилище
                localStorage.setItem('cityCoords', JSON.stringify(coords));
                localStorage.setItem('city', city)
                console.log(city, coords)
            } else {
                setError('City not found');
            }
        } catch (error) {
            console.error('Error fetching city coordinates:', error);
            setError('Error fetching city coordinates');
        }
    };

    const [password, setPassword] = useState('');
    return (
        <>
            <NavBar />
            <Box display='flex' width='100wv' backgroundColor='red.50' minHeight='100vh' pt={130} pb='5%' justifyContent={{base:'flex-start', md:'center'}}>
                <Flex className='AAA' boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)" backgroundColor='white' width='fit-content' borderRadius='10px' height='fit-content' flexDirection={{base:'column', md:'row'}}>
                <Flex flexDirection="column" borderRadius='10px'
                    backgroundColor='white' width={{base:'100%', md:'fit-content'}} height='fit-content' p='20px' mr={{base:0, md:'2rem'}}>
                    <Flex flexDirection={{base:'column', md:'row'}} justifyContent='center' alignItems="center" gap={{base:0,md:'30px'}}>
                        <Flex flexDirection='column' gap={{base:'10px',md:'25px'}} alignItems="center">
                            <Avatar color='white' size='2xl' backgroundColor='red.500' name={`${formData.firstName} ${formData.lastName}`}
                                src={previewImage || formData.imageURL || undefined}
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

                                <FormLabel>New Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setFormData({ ...formData, password: e.target.value });
                                        }}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
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
                                {/* <Input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} /> */}
                                <Input
                                    type="text"
                                    color='#4a5568'
                                    placeholder="Enter city name"
                                    value={formData.city || city}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setFormData({ ...formData, city: newValue });
                                        setCity(newValue);
                                    }}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />

                            </FormControl>
                            {error && (
                                <>
                                    <Alert mt='1rem' status="error" borderRadius='5px'>
                                        <AlertIcon />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                </>
                            )}
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
                        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={4} mt={4}>

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
                        <Button mt='1rem' colorScheme="red" size='md' width='fit-content' onClick={() => handleSaveChanges(token)}>Save Changes</Button>
                    </Flex>
                </Flex>
                <Flex width={{base:'100%', md:'fit-content'}} maxWidth='fit-content' backgroundColor='white'  borderRadius='10px' p={'20px'} height='100%'>
                    <MyEvents />
                    </Flex>
                    </Flex>

            </Box>
            {success && (
                <Alert status="success" borderRadius='5px' mb='1rem'>
                    <AlertIcon />
                    Profile updated
                </Alert>
            )}
        </>
    );

}

export default Profile;