import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, ModalFooter } from "@chakra-ui/react";
import PictureInput from "./DragPhoto";


interface Step2Props {
    onNextStep: () => void;
    onPrevStep: () => void;
    onFileChange: (file: File) => void;
}

const Step2: React.FC<Step2Props> = ({ onNextStep, onPrevStep, onFileChange }) => {
    const [location, setLocation] = useState<string>("");
    const [userLocation, setUserLocation] = useState<string | null>(null);
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const currentLocation = `${latitude}, ${longitude}`;
                        setUserLocation(currentLocation);
                        setLatitude(latitude);
                        setLongitude(longitude);
                        console.log(currentLocation);
                        console.log(latitude, longitude)
                        //вызываем фетч по кординатам
                        getCityFromCoordinates(latitude, longitude);
                    },
                    (error) => {
                        console.error("Error getting user location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        getUserLocation();
    }, []);

    const getCityFromCoordinates = async (latitude: number, longitude: number) => {
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.address) {
                const location = data.display_name
                console.log("Location:", location);
                setLocation(location);
                //сохр локально локацию с координатами
                localStorage.setItem("location", JSON.stringify({ location, latitude, longitude }));

            } else {
                console.log("City not found.");

            }
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };


    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setLocation(value);
    };

    const handlePrevStep = () => {
        onPrevStep();
    };

    const handleNextStep = () => {
        onNextStep();
    };

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
                        <FormLabel>Location</FormLabel>
                        <Input
                            type="text"
                            color='#4a5568'
                            placeholder="Enter city name"
                            value={location}
                            onChange={handleLocationChange}
                        />
                        {/* MAP HERE ? */}
                        <div>
                {/* Проверяем, есть ли координаты */}
                {latitude !== null && longitude !== null && (
                    <a
                        href={`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open Map
                    </a>
                )}
            </div>
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
