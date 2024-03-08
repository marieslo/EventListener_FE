'use client'
import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import NavBar from "@/Components/NavBar/NavBar";
import EventButton from "@/Components/EventButton/EventButton";
import Calendar from "@/Components/Calendar/Calendar";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const handleSearch = () => {
      
    };

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            width="100%"
        >
            <Flex
                direction="row"
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <NavBar onSearch={handleSearch} isLoggedIn={isLoggedIn} />

                <Box p={4}>
                    <EventButton
                        id="1"
                        topic="Sample Event"
                        date="2024-03-07"
                        time="10:00 AM"
                        backgroundImageUrl="https://example.com/image.jpg"
                    />
                </Box>

  
                <Box p={4}>
                   <Calendar/>
                </Box>

   
                <Box p={4}>
                    {/* map */}
                </Box>
            </Flex>
        </Flex>
    );
}