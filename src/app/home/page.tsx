'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Box, useBreakpointValue, Text } from '@chakra-ui/react';
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
    const [loading, setLoading] = useState<boolean>(true);
    const [addresses, setAddresses] = useState<Event[]>([]);
    const [username, setUsername] = useState('')
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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const userCoordinates: any = localStorage.getItem("cityCoords");
    const userCoordObj = JSON.parse(userCoordinates);

    return (
        <Flex className="home-container" direction="column">
            <NavBar />
            {/* <Flex flexDirection='row' justifyContent='center'>
              <Text mb='0' mt='6rem' color='red.500'className="">
                    Hello, {username}
                </Text></Flex> */}
            
            <Flex
                flexDirection='row'
                alignItems="center"
                justifyContent="space-between"
                paddingLeft="40px"
                paddingRight="40px"
            >
                
                {isMobile ? (
                    <Box width="100%">
                        <EventList events={events} loading={loading} />
                    </Box>
                ) : (
                    <>
                        <Box flexGrow={2} width="30%" marginTop='125px' marginRight='20px' zIndex={0}>
                            <DynamicMap lonCenter={userCoordObj ? userCoordObj.latitude : 32.109333} latCenter={userCoordObj ? userCoordObj.longitude : 34.855499} height='72vh' events={addresses} isEventDetails={null} />
                        </Box>
                        <Box flexGrow={1} width="40%" marginTop='120px'>
                            <EventList events={events} loading={loading} />
                        </Box>
                    </>
                )}
                <Box
                    flexGrow={0}
                    marginTop='120px'
                >
                    <Calendar width="300px" />
                </Box>
            </Flex>
        </Flex>
    );
};

export default Home;