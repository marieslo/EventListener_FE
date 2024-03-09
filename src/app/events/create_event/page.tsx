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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomDatePicker from '@/Components/create_event_components/DatePickerComponent';
import { setHours, setMinutes } from 'date-fns';

export default function CreateEvent() {
    // const [startDate, setStartDate] = useState(new Date());
    const [isEndDate, setIsEndDate] = useState(false);
    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 16),
    );

    const [endDate, setEndDate] = useState(
        setHours(setMinutes(new Date(), 30), 16),
    );

    const [addressObj, setAddressObj] = useState({
        city: '', street: '', place: ''
    });
    const [event, setEvent] = useState({
        topic: '',
        category: '',
        membersAmount: 2,
        budget: 0,
        startTime: startDate,
        endTime: endDate,
        address: addressObj,
        creator: ''
    });

    function onSubmit(e: any) {
        e.preventDefault();
        console.log(event);
    }

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
                                    <option value='1'>Category 1</option>
                                    <option value='2'>Category 2</option>
                                    <option value='3'>Category 3</option>
                                    <option value='4'>Category 4</option>
                                    <option value='5'>Category 5</option>
                                    <option value='6'>Category 6</option>
                                </Select>
                                <FormHelperText>Event Category</FormHelperText>
                            </FormControl>
                            <Box display="flex" gap={5}>
                                <Box maxW={20}>
                                    <FormControl>
                                        <NumberInput value={event.membersAmount} onChange={(e: any) => setEvent({ ...event, membersAmount: e.target.value })} defaultValue={2} min={2}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormHelperText>Members</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box maxW={20}>
                                    <FormControl>
                                        <NumberInput min={0} value={event.budget} onChange={(e: any) => setEvent({ ...event, budget: e.target.value })}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormHelperText>Budget</FormHelperText>
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
                                        <Input value={addressObj.city} onChange={(e: any) => setAddressObj({ ...addressObj, city: e.target.value })} type='text' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight="bold" fontSize="xs">Street</FormLabel>
                                        <Input value={addressObj.street} onChange={(e: any) => setAddressObj({ ...addressObj, street: e.target.value })} type='text' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight="bold" fontSize="xs">Building or place</FormLabel>
                                        <Input value={addressObj.place} onChange={(e: any) => setAddressObj({ ...addressObj, place: e.target.value })} type='text' />
                                    </FormControl>
                                </VStack>
                            </Box>
                        </Flex>
                        <Box display="flex" flexDirection="column">
                            <FormControl>
                                <Checkbox colorScheme='red' isChecked={isEndDate} fontWeight="bold" size="sm" onChange={(e: any) => setIsEndDate(e.target.checked)}>Enter End Date</Checkbox>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="bold" fontSize="xs">Start Time</FormLabel>
                                <CustomDatePicker date={startDate} setDate={setStartDate} />
                            </FormControl>
                            {isEndDate && <FormControl>
                                <FormLabel fontWeight="bold" fontSize="xs">End Time</FormLabel>
                                <CustomDatePicker date={endDate} setDate={setEndDate} />
                            </FormControl>}
                            <Button mt="auto" colorScheme='red' alignSelf="end" type='submit'>Create</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </form>
    )
}