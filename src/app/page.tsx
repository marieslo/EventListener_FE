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
import Character from "@/Components/Character/Character";
import { Address } from "@/Components/Map/Map";

interface Event {
  _id: string;
  creator: string;
  date: string;
  address: Address;
  topic: string;
  category: string[];
  joinedBy: string[];
  savedBy: string[];
  membersAmount: number;
  budget: number;
  imageURL: string;
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
        // direction={{ base: 'column', md: 'row' }}
        flexDirection='row'
        alignItems="center"
        justifyContent="space-between"
        width="fit-content"
        marginTop="4rem" 
        paddingLeft="50px"
        paddingRight="50px" 
      >
        {isMobile ? (
          <Box width="100%">
            <EventList events={events} />
          </Box>
        ) : (
          <>
            <Box width="40%">
              <DynamicMap events={addresses} />
            </Box>
            <Box justifyContent='space-around' alignItems='center' width="60%">
              <EventList events={events} />
            </Box>
            
          </>
        )}
      </Flex>
      <Box
              position="fixed"
              bottom="20px"
              right="20px"
              zIndex="999"
              fontSize="10px"
            >
              <Character text="Discover, create, and join events with us" />
            </Box>
    </Flex>
  );
};

export default Welcome;