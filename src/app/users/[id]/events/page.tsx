'use client'
import { useState, useEffect } from "react"
import axios from "axios";
import { SERVER_URL } from "../../../../../api";
import EventList from "@/Components/EventList/EventList";
import { Box, Center, Flex, Select } from "@chakra-ui/react";


export default function MyEvents() {

    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('joined');

    //ЗАМЕНИТЬ НА ТОКЕН ПОСЛЕ АУТЕНТИФИКАЦИИ
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR3ZWluZXJ0QGdtYWlsLmNvbSIsImlkIjoiNjVlZjE3NmZhNTdmMGFmODM5MGY2NzUxIiwiaWF0IjoxNzEwMzI2NTc3LCJleHAiOjE3MTAzMzAxNzd9.ykhu-a_I-sag03SfDKJ82kUA0w2Vi2FfRe1bEO2ghGw'

    useEffect(() => {
        fetchMyEvents();
    }, [activeTab]);


    async function fetchMyEvents() {
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
            <Flex direction={"column"} align={'center'} gap={'10px'}>
                <Box w='200px'>
                    <Select defaultValue={'joined'} onChange={(e) => setActiveTab(e.target.value)}>
                        <option value='joined'>Joined events</option>
                        <option value='saved'>Saved events</option>
                    </Select>
                </Box>
                <EventList events={events} />
            </Flex >
        </>
    )
}