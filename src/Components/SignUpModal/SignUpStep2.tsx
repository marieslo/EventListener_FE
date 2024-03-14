import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, ModalFooter, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import PictureInput from "./DragPhoto";
import axios from 'axios';


interface Step2Props {
    onNextStep: () => void;
    onPrevStep: () => void;
    onFileChange: (file: File) => void;
}

interface CityCoordinates {
    city: string;
    latitude: number;
    longitude: number;
}

const Step2: React.FC<Step2Props> = ({ onNextStep, onPrevStep, onFileChange }) => {
    const [city, setCity] = useState<string>("")
    const [cityCoords, setCityCoords] = useState<CityCoordinates | null>(null);
    const [error, setError] = useState<string>('');
    // const [location, setLocation] = useState<string>("");
    // const [userLocation, setUserLocation] = useState<string | null>(null);
    // const [latitude, setLatitude] = useState<number>(0);
    // const [longitude, setLongitude] = useState<number>(0);

    // useEffect(() => {
    //     const getUserLocation = () => {
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     const latitude = position.coords.latitude;
    //                     const longitude = position.coords.longitude;
    //                     const currentLocation = `${latitude}, ${longitude}`;
    //                     setUserLocation(currentLocation);
    //                     setLatitude(latitude);
    //                     setLongitude(longitude);
    //                     console.log(currentLocation);
    //                     console.log(latitude, longitude)
    //                     //вызываем фетч по кординатам
    //                     getCityFromCoordinates(latitude, longitude);
    //                 },
    //                 (error) => {
    //                     console.error("Error getting user location:", error);
    //                 }
    //             );
    //         } else {
    //             console.error("Geolocation is not supported by this browser.");
    //         }
    //     };

    //     getUserLocation();
    // }, []);

    // const getCityFromCoordinates = async (latitude: number, longitude: number) => {
    //     const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    //     try {
    //         const response = await fetch(apiUrl);
    //         const data = await response.json();

    //         if (data.address) {
    //             const location = data.display_name
    //             console.log("Location:", location);
    //             setLocation(location);
    //             //сохр локально локацию с координатами
    //             localStorage.setItem("location", JSON.stringify({ location, latitude, longitude }));

    //         } else {
    //             console.log("City not found.");

    //         }
    //     } catch (error) {
    //         console.error("Error fetching city data:", error);
    //     }
    // };


    // const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { value } = event.target;
    //     setLocation(value);
    // };

    const handlePrevStep = () => {
        onPrevStep();
    };

    const handleNextStep = () => {
        onNextStep();
    };


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

    // Функция для отправки запроса к API
    const fetchCityCoordinates = async (cityName: string) => {
        try {
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

    // const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newCity = e.target.value;
    //     setCity(newCity);
    //     console.log(newCity)

    //     debounce(() => {
    //         fetchCityCoordinates(newCity);
    //     }, 500)();
    // };

        const handleFileChange = (file: File) => {
            onFileChange(file); 
            console.log('Selected file:', file);
        };
    return (
        <Box pt="1.5rem">
            <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                <GridItem>
                    <FormControl>
                        <FormLabel>Add Profile Picture</FormLabel>
                        <Flex justifyContent="center" alignItems="center">
                            <PictureInput onChange={handleFileChange} />
                        </Flex>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input
                type="text"
                color='#4a5568'
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
                        {error && (
                <Alert mb='1rem' status="error" borderRadius='5px'>
                    <AlertIcon />
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}
                        {/* <div> */}
                {/* Проверяем, есть ли координаты */}
                {/* {latitude !== null && longitude !== null && (
                    <Box mt='1rem'>
                    <Link
                        href={`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        fontWeight='500'
                    >
                        Open Map
                    </Link>
                    </Box>
                )}
            </div> */}
                    </FormControl>
                </GridItem>
            </Grid>
            <ModalFooter>
                <Button onClick={handlePrevStep} mr={3}>
                    Previous
                </Button>
                <Button mr='-1.5rem' colorScheme='red' onClick={handleNextStep}>Next</Button>
            </ModalFooter>
        </Box>
    );
};


export default Step2;
