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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";

export default function CreateEvent() {
    // const [startDate, setStartDate] = useState(new Date());
    // const [isEndDate, setIsEndDate] = useState(false);
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const toast = useToast();

    const [addressObj, setAddressObj] = useState({
        city: '', street: '', place: ''
    });
    const [event, setEvent] = useState({
        topic: '',
        category: '',
        membersAmount: 1,
        budget: 1,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        address: {},
        creator: ''
    });

    function onSubmit(e: any) {
        e.preventDefault();
        event.address = addressObj;
        // if (event.startDateTime > event.endDateTime) {
        //     toast({
        //         title: `End time must be less then start date`,
        //         status: 'error',
        //         isClosable: true,
        //     })
        // }
        console.log(event);

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
                                        <NumberInput min={1} defaultValue={1}>
                                            <NumberInputField value={event.membersAmount}
                                                onChange={(e: any) => setEvent({ ...event, membersAmount: parseInt(e.target.value) })}
                                            />
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
                                        <NumberInput min={0} defaultValue={1}>
                                            <NumberInputField value={event.budget}
                                                onChange={(e: any) => setEvent({ ...event, budget: parseInt(e.target.value) })}
                                            />
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
                            {/* <FormControl>
                                <Checkbox colorScheme='red' isChecked={isEndDate} fontWeight="bold" size="sm" onChange={(e: any) => setIsEndDate(e.target.checked)}>Enter End Date</Checkbox>
                            </FormControl> */}
                            <FormControl>
                                <FormLabel fontWeight="bold" fontSize="xs">Start Time</FormLabel>
                                <DatePicker
                                    showIcon
                                    selected={event.startDateTime}
                                    onChange={(date: Date) => {
                                        setStartDateTime(date);
                                        setEvent({ ...event, startDateTime: date })
                                    }}
                                    timeFormat="p"
                                    dateFormat="dd-MM-yyyy h:mm aa"
                                    showTimeInput
                                    timeIntervals={15}
                                    customTimeInput={<CustomTimeInput />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="bold" fontSize="xs">End Time</FormLabel>
                                <DatePicker
                                    showIcon
                                    selected={event.endDateTime > event.startDateTime ? event.endDateTime : event.startDateTime}
                                    onChange={(date: Date) => {
                                        setEndDateTime(date);
                                        setEvent({ ...event, endDateTime: date })
                                    }}
                                    timeFormat="p"
                                    dateFormat="dd-MM-yyyy h:mm aa"
                                    showTimeInput
                                    minDate={event.startDateTime}
                                    timeIntervals={15}
                                    customTimeInput={<CustomTimeInput />}
                                />
                            </FormControl>
                            <Button mt="auto" colorScheme='red' alignSelf="end" type='submit'>Create</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </form>
    )
}