'use client'

import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../../../api";
import { AbsoluteCenter, Avatar, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, CircularProgress, CircularProgressLabel, Container, Divider, Flex, FormControl, FormLabel, Heading, Image, Stack, StackDivider, Tag, TagLabel, Text, useDisclosure, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { redirect, useParams, useRouter } from 'next/navigation';
import moment from 'moment';
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import('@/Components/NavBar/NavBar'), { ssr: false });

interface User {
    firstName: string;
    lastName: string;
    imageURL: string;
    interests: string[];
    city: string;
    createdAt: string;
}

export default function OtherUser() {
    const router = useRouter();
    const { id } = useParams<any>();

    const [formData, setFormData] = useState<User>({
        firstName: '',
        lastName: '',
        imageURL: '',
        interests: [],
        city: '',
        createdAt: ''
    });


    useEffect(() => {
        fetchOtherUser();
    }, []);

    async function fetchOtherUser() {
        try {
            const response = await axios.get(`${SERVER_URL}/users/${id}`);
            console.log(id)

            const userData: User = response.data;
            userData.interests = userData.interests[0].split(',');
            setFormData(userData);
            console.log(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    return (
        <>
            <NavBar />
            <Box display='flex' width='100vw' backgroundColor='red.50' minHeight='100vh' pt={150} pb='5%' justifyContent='center'>
                <Flex flexDirection="column" borderRadius='10px' backgroundColor='white' width='fit-content' height='fit-content' p='20px' boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)">
                    <Flex flexDirection='row' justifyContent='center' alignItems='center'><Avatar
                        color='white'
                        size='2xl'
                        backgroundColor='red.500'
                        name={`${formData.firstName} ${formData.lastName}`}
                        src={formData.imageURL || undefined}
                    /></Flex>

                    <Box mt={4} textAlign="center">
                        <FormControl>
                            <Flex flexDirection='row' justifyContent='space-between'>
                                <FormLabel fontWeight="bold">Name:</FormLabel>
                                <Text >{formData.firstName} {formData.lastName}</Text>
                            </Flex>
                            <Flex flexDirection='row' justifyContent='space-between'>
                                <FormLabel fontWeight="bold">City:</FormLabel>
                                <Text >{formData.city}</Text>
                            </Flex>
                            <Flex flexDirection='row' justifyContent='space-between'>
                                <FormLabel fontWeight="bold">Interests:</FormLabel>
                                <Text >{formData.interests.join(', ')}</Text>
                            </Flex>
                            <Flex flexDirection='row' justifyContent='space-between'>
                                <FormLabel fontWeight="bold">Event Listener Since:</FormLabel>

                                <Text >{moment(formData.createdAt).format("MMMM YYYY")}</Text>

                            </Flex>

                        </FormControl>
                    </Box>
                </Flex>
            </Box>
        </>
    );
}