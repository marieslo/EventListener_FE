'use client'

import "react-datepicker/dist/react-datepicker.css";
import {
    Box,
    Container,
    Input,
    Stack,
    VStack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    Heading,
    Checkbox,
    Flex,
    Button,
    Spacer,
    Center,
    useToast,
    InputGroup,
    Image,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { SERVER_URL } from '../../../../api';
import EventForm from "../../../Components/EventForm/EventForm"
import EditEventModal from '@/Components/EditEventModal/EditEventModal';
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import('@/Components/NavBar/NavBar'), { ssr: false });

export default function CreateEvent() {
    // const [startDate, setStartDate] = useState(new Date());
    // const [isEndDate, setIsEndDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [addressObj, setAddressObj] = useState({
        city: '', street: '', place: ''
    });
    //const [geoJSON, setGeoJSON] = useState({});
    const [event, setEvent] = useState({
        topic: '',
        category: '',
        membersAmount: 2,
        budget: 0,
        date: date,
        duration: 60,
        address: {},
        creator: ''
    });

    const [token, setToken] = useState<any>('');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, []);

    async function createEvent(event: any) {
        try {
            setIsLoading(true);
            const response: any = await axios.post(`${SERVER_URL}/events`, JSON.stringify(event), config);
            toast({
                title: "Event created",
                status: 'success',
                isClosable: true,
            })
        } catch (error: any) {
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <NavBar />
            <Flex justifyContent='center' mt='15rem' mb='-5rem'>
                <Image height='50vh' src='https://kartinkof.club/uploads/posts/2022-05/1653708558_39-kartinkof-club-p-chlen-veselii-kartinki-39.jpg' alt='Dick Pick' />
                </Flex>
            
            <EventForm isLoading={isLoading} isOpen={null} onClose={null} setIsLoading={setIsLoading} createEvent={createEvent} updateEvent={null} isEditable={false} existedEvent={event} setEvent={setEvent} />
        </>
    )
}