'use client'
import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import NavBar from "@/Components/NavBar/NavBar";
import { useBreakpointValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import EventList from '@/Components/EventList/EventList';
import axios from 'axios';
import { SERVER_URL } from "../../api";
import '../app/home/Home.css';

interface Event {
    _id: string;
    creator: string;
    date: string;
    street: string;
    street_number: string;
    city: string;
    country: string;
    topic: string;
    place: string;
    category: string[];
    joinedBy: string[];
    savedBy: string[]; 
    membersAmount: number;
    budget: number;
    imageURL: string;
    lat: string;
    lon: string;
}

const DynamicMap = dynamic(() => import('@/Components/Map/Map'), { ssr: false });

const Welcome = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [addresses, setAddresses] = useState<Event[]>([]);

  const handleSearch = () => {};
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get<Event[]>(`${SERVER_URL}/events`);
        setEvents(eventsResponse.data);
        setAddresses(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex className="welcome-container" direction="column">
      <NavBar onSearch={handleSearch} />
      <Flex
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        width="100%"
        marginTop="120px" 
        paddingLeft="20px"
        paddingRight="20px" 
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="flex-start"
          justifyContent="flex-start"
          width="100%"
          marginBottom="20px"     
          marginLeft="120px" 
        >
          <Box width={{ base: "100%", md: "60%" }}>
            <EventList events={events} />
          </Box>
          <Box width={{ base: "100%", md: "40%" }}>
            <DynamicMap events={addresses} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Welcome;
