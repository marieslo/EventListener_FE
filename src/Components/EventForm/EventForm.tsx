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


function EventForm({ isOpen, onClose, setIsLoading, createEvent, updateEvent, isEditable, existedEvent, setEvent, isLoading }: { isOpen: any, onClose: any, setIsLoading: any, updateEvent: any, createEvent: any, isEditable: any, existedEvent: any, setEvent: any, isLoading: any }) {

    const [date, setDate] = useState(new Date());
    const [isAddressIncorrect, setIsAddressIncorrect] = useState(false);
    const toast = useToast();

    const [addressObj, setAddressObj] = useState({
        city: '', street: '', place: ''
    });

    const event: any = { ...existedEvent };

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    async function getCoordinates(addressString: string) {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${addressString}&format=geojson&accept-language=en`);
            if (response.data.features.length === 0) {
                setIsAddressIncorrect(true);
                toast({
                    title: "Address doesn't exist",
                    status: 'error',
                    isClosable: true,
                })
            } else {
                setIsAddressIncorrect(false);
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

    async function getAddressByCoordinates(coordinates: Array<number>) {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates[1]}&lon=${coordinates[0]}&format=geojson&accept-language=en`);
            addressObj.place = response.data.features[0].properties.address.house_number;
            addressObj.city = response.data.features[0].properties.address.city;
            addressObj.street = response.data.features[0].properties.address.road;
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

    useEffect(() => {
        if (isEditable) {
            getAddressByCoordinates(event.address.coordinates);
        }
    }, [])

    useEffect(() => {
        if (addressObj.city && addressObj.street && addressObj.place && !focused) {
            const addressStr = `${addressObj.city} ${addressObj.place} ${addressObj.street}`
            getCoordinates(addressStr);
        }
    }, [addressObj, focused])

    async function onSubmit(e: any) {
        e.preventDefault();
        if (!isAddressIncorrect) {
            if (isEditable) {
                await updateEvent(event);
                onClose();
            } else {
                await createEvent(event);
            }
        } else {
            toast({
                title: "Please check address",
                status: 'error',
                isClosable: true,
            })
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Container maxW='4xl'>
                <Flex direction="column">
                    {!isEditable && <Flex bg="red.500" justifyContent="center">
                        <Heading color="white" lineHeight="9rem">Create New Event</Heading>
                    </Flex>}
                    <Flex gap={10} justifyContent="center" mt={10}>
                        <Flex flexDirection="column" gap={5}>
                            <FormControl>
                                <FormLabel fontWeight="bold" fontSize="xs">Topic</FormLabel>
                                <Input required value={event.topic} onChange={(e: any) => setEvent({ ...event, topic: e.target.value })} type='text' variant='filled' />
                            </FormControl>
                            <FormControl>
                                <Select required value={event.category} onChange={(e: any) => setEvent({ ...event, category: new Array(e.target.value) })} variant='filled' placeholder='Select Category'>
                                    <option value='Sport'>Sport</option>
                                    <option value='Travel'>Travel</option>
                                    <option value='Party'>Party</option>
                                    <option value='Food'>Food</option>
                                    <option value='Culture'>Culture</option>
                                    <option value='Community'>Community</option>
                                </Select>
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
                                        <FormHelperText>Fees, ₪</FormHelperText>
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
                                        <Input required onMouseLeave={(e) => e.currentTarget.blur()} onFocus={onFocus} onBlur={onBlur} value={addressObj.city} onChange={(e: any) => setAddressObj({ ...addressObj, city: e.target.value })} type='text' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight="bold" fontSize="xs">Street</FormLabel>
                                        <Input required onMouseLeave={(e) => e.currentTarget.blur()} onFocus={onFocus} onBlur={onBlur} value={addressObj.street} onChange={(e: any) => setAddressObj({ ...addressObj, street: e.target.value })} type='text' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight="bold" fontSize="xs">Building or place</FormLabel>
                                        <Input required onMouseLeave={(e) => e.currentTarget.blur()} onFocus={onFocus} onBlur={onBlur} value={addressObj.place} onChange={(e: any) => setAddressObj({ ...addressObj, place: e.target.value })} type='text' />
                                    </FormControl>
                                </VStack>
                            </Box>
                        </Flex>

                        <Box display="flex" flexDirection="column" flexGrow={1}>
                            <FormControl>
                                <FormLabel fontWeight="bold" fontSize="xs">Date</FormLabel>
                                <DatePicker
                                    showIcon
                                    selected={new Date(event.date)}
                                    onChange={(date: Date) => {
                                        setDate(date);
                                        setEvent({ ...event, date: date })
                                    }}
                                    timeFormat="p"
                                    dateFormat="dd-MM-yyyy h:mm aa"
                                    showTimeSelect
                                    timeIntervals={15}
                                // customTimeInput={<CustomTimeInput />}
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
                                    <FormHelperText>Duration, min</FormHelperText>
                                </FormControl>
                            </Box>
                            <Button isLoading={isLoading} mt="auto" colorScheme='red' alignSelf="end" type='submit'>{isEditable ? "Save" : "Create"}</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </form>)
}

export default EventForm;