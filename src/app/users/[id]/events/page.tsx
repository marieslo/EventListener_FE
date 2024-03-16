'use client'
import { useState, useEffect } from "react"
import axios from "axios";
import { SERVER_URL } from "../../../../../api";
import EventList from "@/Components/EventList/EventList";
import { Box, Center, Flex, Select } from "@chakra-ui/react";


export default function MyEvents() {

    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('joined');
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState<boolean>(false);

    //ЗАМЕНИТЬ НА ТОКЕН ПОСЛЕ АУТЕНТИФИКАЦИИ  - V
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setToken(token);
            fetchMyEvents(token); // Передаем токен в функцию fetchUser
        }
    }, [activeTab]);

    // async function fetchUser(token: string) {

    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken');
    //     if (token) {
    //       setToken(token);
    //       console.log(token)
    //     }
    //     if (token) {
    //     fetchMyEvents();
    // }
    //   }, [token, activeTab]);
     
    // useEffect(() => {
        
    // }, [activeTab]);


    async function fetchMyEvents(token: string) {
        try {
            const response = await axios.get(`${SERVER_URL}/users/profile/${activeTab}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const fetchedData = await response.data;
            activeTab === 'joined' ? setEvents(fetchedData.joinedEvents) : setEvents(fetchedData.savedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    return (
        <>
            <Flex direction={"column"} align={'center'} gap={'10px'} backgroundColor='white'>
                <Box w=''>
                    <Select defaultValue={'joined'} onChange={(e) => setActiveTab(e.target.value)}>
                        <option value='joined'>Joined events</option>
                        <option value='saved'>Saved events</option>
                    </Select>
                </Box>
                <Box ml=''>
                <EventList loading={loading} events={events} /></Box>
            </Flex >
        </>
    )
}