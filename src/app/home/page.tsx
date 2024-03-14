'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import Calendar from '@/Components/Calendar/Calendar';
import dynamic from 'next/dynamic';
import axios from 'axios';
import EventList from '@/Components/EventList/EventList';
import { SERVER_URL } from '../../../api';
import './Home.css';
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
const NavBar = dynamic(() => import('@/Components/NavBar/NavBar'), { ssr: false });

const Home = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [addresses, setAddresses] = useState<Event[]>([]);
    const [username, setUsername]=useState('')
    const handleSearch = () => { };
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
      const username = localStorage.getItem('userName');
      if (username) {
        setUsername(username);
      }
    }, []);
    
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
                // direction={{ base: 'column', md: 'row' }}
                flexDirection='row'
                alignItems="center"
                justifyContent="space-between"
                // width="100%"
                // marginTop="20px"
                // marginBottom="20px"
                paddingLeft="40px"
                paddingRight="40px"
            >
                 <Box className="welcome-text">
                 Hello, {username}
                </Box> 
                {isMobile ? (
                    <Box width="100%">
                        <EventList events={events} />
                    </Box>
                ) : (
                    <>
                        <Box flexGrow={2} marginTop='110px' marginRight='50px' zIndex={0}>
                            <DynamicMap height='65vh' events={addresses} isEventDetails={null} />
                        </Box>
                        <Box flexGrow={1} width="40%" marginTop='120px'>
                            <EventList events={events} />
                        </Box>
                    </>
                )}
                <Box
                    flexGrow={0}
                    marginTop='-80px'
                    //width={{ base: "100%", md: "18%" }}
                    // marginLeft={{ base: "0", md: "20px" }}
                    // marginRight={'30px'}
                >
                    <Calendar width="300px" />
                </Box>
            </Flex>
            <Box
                position="fixed"
                bottom="20px"
                right="20px"
                zIndex="999"
                fontSize="10px"
            >
            </Box>
        </Flex>
    );
};

export default Home;
