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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <Flex className="home-container">
      <NavBar onSearch={handleSearch} isLoggedIn={isLoggedIn} userId={""} />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="space-around"
        minHeight="100vh"
        width="80%"
        marginTop="150px"
        marginLeft="50px"
      >
        {!isMobile && (
          <Box p={4} position={{ base: 'relative', md: 'static' }}>
            <Box p={5} position={{ base: 'relative', md: 'static' }}>
              <div className="about-platform-text about-platform-text-1">
                Welcome to our vibrant community.
              </div>
              <br/>
              <div className="about-platform-text about-platform-text-2">
              Ready to dive in and start exploring? 
              </div>
              <br/>
              <div className="about-platform-text about-platform-text-3">
                Let's find the perfect event together!
              </div>
            </Box>
          </Box>
        )}
        <EventList events={events} />
        {!isMobile && (
          <Box p={4} width="100%">
            <DynamicMap events={addresses} />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Welcome;