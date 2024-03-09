'use client'
import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import NavBar from "@/Components/NavBar/NavBar";
import { useBreakpointValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import EventList from '@/Components/EventList/EventList';
import '../app/home/Home.css'


const DynamicMap = dynamic(() => import('@/Components/Map/Map'), { ssr: false });

const Welcome = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const handleSearch = () => {};
    const isMobile = useBreakpointValue({ base: true, md: false });


    const events = [
        { id: "1", topic: "Встреча анонимных безработных", date: "2024-03-09", time: "10:00 AM", backgroundImageUrl: "https://example.com/image.jpg" },
        { id: "2", topic: "Sample Event 2", date: "2024-03-10", time: "10:00 AM", backgroundImageUrl: "https://example.com/image.jpg" },
        { id: "3", topic: "Sample Event 3", date: "2024-03-11", time: "10:00 AM", backgroundImageUrl: "https://example.com/image.jpg" },
        { id: "4", topic: "Sample Event 4", date: "2024-03-12", time: "10:00 AM", backgroundImageUrl: "https://example.com/image.jpg" },
        { id: "5", topic: "Sample Event 2", date: "2024-03-10", time: "10:00 AM", backgroundImageUrl: "https://example.com/image.jpg" },
        { id: "6", topic: "Sample Event 3", date: "2024-03-11", time: "10:00 AM", backgroundImageUrl: "https://example.com/image.jpg" },
        { id: "7", topic: "Sample Event 4", date: "2024-03-12", time: "10:00 AM", backgroundImageUrl: "https://example.com/image.jpg" }
    ];

    return (
        <Flex className="home-container"> 
            <NavBar onSearch={handleSearch} isLoggedIn={isLoggedIn} />
            <Flex
                direction={{ base: "column", md: "row" }}
                alignItems="flex-start"
                justifyContent="space-around"
                minHeight="100vh"
                width="80%"
                marginTop='150px'
                marginLeft='50px'
            >
                 {!isMobile && (
                 <Box p={5} position={{ base: 'relative', md: 'static' }}>
                        <div className="about-platform-text about-platform-text-1">
                        Welcome to our vibrant community!
                        </div>
                        <br/>
                        <div className="about-platform-text about-platform-text-2">
                        Our platform is your go-to destination for discovering, creating, and joining events that resonate with you.
                        </div>
                        <br/>
                        <div className="about-platform-text about-platform-text-3">
                        Ready to dive in and start exploring? 
                        <br/>
                        <br/>
                        Let's find the perfect event together!
                        </div>
                    </Box>
                 )}
                 <EventList events={events} />
                {!isMobile && (
                    <Flex    
                        direction={{ base: "row", md: "column" }}
                        alignItems="flex-start" 
                        justifyContent="flex-start"
                        width={{ base: "10%", md: "10%" }}
                        marginRight='50px'
                    >
                       <Box p={4} width={{ base: "100%", md: "40%" }}>
                            <DynamicMap userCity="Haifa" /> 
                        </Box>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}

export default Welcome;