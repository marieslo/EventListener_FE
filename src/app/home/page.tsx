'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import NavBar from '@/Components/NavBar/NavBar';
import Calendar from '@/Components/Calendar/Calendar';
import dynamic from 'next/dynamic';
import axios from 'axios';
import EventList from '@/Components/EventList/EventList';
import { SERVER_URL } from '../../../api';
import './Home.css';


  const DynamicMap = dynamic(() => import('@/Components/Map/Map'), { ssr: false });
  
  const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [events, setEvents] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const fetchEventData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/events`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchAddressData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/addresses`);
            setAddresses(response.data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        fetchEventData();
        fetchAddressData();
    }, []);

    const handleSearch = () => {};
return (
        <Flex className="home-container">
            <NavBar onSearch={handleSearch} isLoggedIn={isLoggedIn} userId={""} />
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
                 <Box p={4} position={{ base: 'relative', md: 'static' }}>
                        <Calendar/>
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
          <Box p={4} width="100%">
            <DynamicMap events={events} />
          </Box>
        </Flex>
         )}
      </Flex>
      </Flex>
    );
  };

export default Home;