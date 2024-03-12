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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { SERVER_URL } from '../../../../api';

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
    const [focused, setFocused] = React.useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
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

    useEffect(() => {
        if (addressObj.city && addressObj.street && addressObj.place && !focused) {
            const addressStr = `${addressObj.city}+${addressObj.place}+${addressObj.street}`
            getCoordinates(addressStr);
        }
    }, [addressObj, focused])

    async function onSubmit(e: any) {
        e.preventDefault();
        console.log(event);
        await createEvent(event);
    }

    async function getCoordinates(addressString: string) {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${addressString}&format=geojson`);
            if (response.data.features.length === 0) {
                toast({
                    title: "Address doesn't exist",
                    status: 'error',
                    isClosable: true,
                })
            } else {
                setEvent({ ...event, address: response.data.features[0].geometry })
            }
        } catch (err: any) {
            toast({
                title: err.message,
                status: 'error',
                isClosable: true,
            })
        } finally {
            setIsLoading(false);
        }
    }

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

    const CustomTimeInput: any = ({ date, value, onChange }: { date: any, value: any, onChange: any }) => (
        <Input
            value={value}
            type="time"
            onChange={(e) => onChange(e.target.value)}
            style={{ border: "solid 1px pink" }}
        />
    );

    return (
        <form onSubmit={onSubmit}>
            <Container maxW='4xl'>
                <Flex direction="column">
                    <Flex bg="red.500" justifyContent="center">
                        <Heading color="white" lineHeight="9rem">Create New Event</Heading>
                    </Flex>
                    <Flex gap={10} justifyContent="center" mt={10}>
                        <Flex flexDirection="column" gap={5}>
                            <FormControl>
                                <FormLabel fontWeight="bold" fontSize="xs">Topic</FormLabel>
                                <Input required value={event.topic} onChange={(e: any) => setEvent({ ...event, topic: e.target.value })} type='text' variant='filled' />
                            </FormControl>
                            <FormControl>
                                <Select required value={event.category} onChange={(e: any) => setEvent({ ...event, category: e.target.value })} variant='filled' placeholder='Select Category'>
                                    <option value='Sport'>Sport</option>
                                    <option value='Travel'>Travel</option>
                                    <option value='Party'>Party</option>
                                    <option value='Food'>Food</option>
                                    <option value='Culture'>Culture</option>
                                    <option value='Community'>Community</option>
                                </Select>
                                <FormHelperText>Event Category</FormHelperText>
                            </FormControl>
                            <Box display="flex" gap={5}>
                                <Box maxW={20}>
                                    <FormControl>
                                        <InputGroup>
                                            <NumberInput
                                                min={2}
                                                defaultValue={2}
                                                onChange={(strValue: any) => setEvent({ ...event, membersAmount: parseInt(strValue) })}
                                                value={event.membersAmount}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </InputGroup>
                                        <FormHelperText>Max Members</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box maxW={20}>
                                    <FormControl>
                                        <NumberInput
                                            min={0}
                                            defaultValue={0}
                                            value={event.budget}
                                            onChange={(strValue: any) => setEvent({ ...event, budget: parseInt(strValue) })}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormHelperText>Fees</FormHelperText>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Flex>
                        <Flex flexDirection="column">
                            <Box display="flex" flexDirection="column">
                                {/* <Heading ml={10} size="md">Address</Heading> */}
                                <VStack>
                                    <FormControl>
                                        <FormLabel fontWeight="bold" fontSize="xs">City</FormLabel>
                                        <Input required onFocus={onFocus} onBlur={onBlur} value={addressObj.city} onChange={(e: any) => setAddressObj({ ...addressObj, city: e.target.value })} type='text' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight="bold" fontSize="xs">Street</FormLabel>
                                        <Input required onFocus={onFocus} onBlur={onBlur} value={addressObj.street} onChange={(e: any) => setAddressObj({ ...addressObj, street: e.target.value })} type='text' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight="bold" fontSize="xs">Building or place</FormLabel>
                                        <Input required onFocus={onFocus} onBlur={onBlur} value={addressObj.place} onChange={(e: any) => setAddressObj({ ...addressObj, place: e.target.value })} type='text' />
                                    </FormControl>
                                </VStack>
                            </Box>
                        </Flex>
                        <Box display="flex" flexDirection="column">
                            <FormControl>
                                <FormLabel fontWeight="bold" fontSize="xs">Date</FormLabel>
                                <DatePicker
                                    showIcon
                                    selected={event.date}
                                    onChange={(date: Date) => {
                                        setDate(date);
                                        setEvent({ ...event, date: date })
                                    }}
                                    timeFormat="p"
                                    dateFormat="dd-MM-yyyy h:mm aa"
                                    showTimeInput
                                    timeIntervals={15}
                                    customTimeInput={<CustomTimeInput />}
                                />
                            </FormControl>
                            <Box maxW={20} mt={4}>
                                <FormControl>
                                    <NumberInput
                                        min={1}
                                        defaultValue={60}
                                        value={event.duration}
                                        onChange={(strValue: any) => setEvent({ ...event, duration: parseInt(strValue) })}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormHelperText>Duration</FormHelperText>
                                </FormControl>
                            </Box>
                            <Button isLoading={isLoading} mt="auto" colorScheme='red' alignSelf="end" type='submit'>Create</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </form>
    )
}