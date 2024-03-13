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
import Character from '@/Components/Character/Character';
import { Address } from '@/Components/Map/Map';

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

const Home = () => {
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
    <Flex className="home-container" direction="column">
      <NavBar onSearch={handleSearch} />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="flex-start"
        width="100%"
        marginTop="20px"
        marginBottom="20px"
        paddingLeft="40px"
        paddingRight="40px"
      >
        {isMobile ? (
          <Box width="100%">
            <EventList events={events} />
          </Box>
        ) : (
          <>
            <Box width="20%">
              <DynamicMap events={addresses} />
            </Box>
            <Box width="80%">
              <EventList events={events} />
            </Box>
          </>
        )}
        <Box
          width={{ base: "100%", md: "18%" }}
          marginLeft={{ base: "0", md: "20px" }}
          marginRight={'30px'}
        >
          <Calendar />
        </Box>
      </Flex>
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="999"
        fontSize="10px"
      >
        <Character text="Hello, [username]" />
      </Box>
    </Flex>
  );
};

export default Home;