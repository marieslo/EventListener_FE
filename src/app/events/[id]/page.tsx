'use client'
import { QuestionOutlineIcon, TimeIcon } from '@chakra-ui/icons';
import { AbsoluteCenter, Avatar, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, CircularProgress, CircularProgressLabel, Container, Divider, Flex, Heading, Image, Stack, StackDivider, Tag, TagLabel, Text, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../api';
import { CATEGORY_URLS } from '@/Components/SignUpModal/categories/categories_url';
import LikeButton from '@/Components/LikeButton/LikeButton';
import '../../../Components/LikeButton/LikeButton.css';
import dynamic from 'next/dynamic';

export default function EventDetailsPage() {

    const DynamicMap = dynamic(() => import('@/Components/Map/Map'), { ssr: false });

    const [event, setEvent] = useState<any>({});
    const { id } = useParams<any>();
    const toast = useToast();
    const [isEditable, setIsEditable] = useState();
    const [token, setToken] = useState<any>('');
    const [isLiked, setIsLiked] = useState<any>(false);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };


    async function fetchEvent() {
        try {
            const response = await axios.get(`${SERVER_URL}/events/${id}`);
            setEvent(response.data);
            setIsLiked(getLikeStatus(response.data, "65ec73aa9c2220f255c707f4"));
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
            })
        }
    }

    async function joinEvent() {
        try {
            const response: any = await axios.put(`${SERVER_URL}/events/join/${id}`, {}, config);
            toast({
                title: "You joined the event",
                status: 'success',
                isClosable: true,
            })
        } catch (error: any) {
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
            })
        }
    }

    async function leaveEvent() {
        try {
            const response = await axios.delete(`${SERVER_URL}/events/leave/${id}`, config);
            toast({
                title: "You left the event",
                status: 'success',
                isClosable: true,
            })
        } catch (error: any) {
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
            })
        }
    }


    function handleJoin(e: any) {
        console.log(token);
        joinEvent();
    }

    function handleLeave(e: any) {
        leaveEvent();
    }

    function handleEdit(e: any) {

    }


    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
        fetchEvent();
    }, []);

    // useEffect(() => {
    //     if (event) {
    //         setIsLiked(getLikeStatus("65ec73aa9c2220f255c707f4"));
    //     }
    // }, [event]);

    function getLikeStatus(event: any, id: any) {
        console.log(event.savedBy.indexOf(id) === -1 ? false : true);
        return event.savedBy.indexOf(id) === -1 ? false : true;
    }

    const categoryKey: string = event.category;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return (

        <Flex flexDirection="column">
            <Box position="relative" display="flex" h="512px" justifyContent="center" alignItems="center">
                {/* <Box maxW='md' h="auto"> */}
                <Image
                    // blockSize="auto"
                    objectFit="cover"
                    // maxInlineSize="100%"
                    width="100%"
                    h="100%"
                    src={CATEGORY_URLS[categoryKey as keyof typeof CATEGORY_URLS]} alt=''
                />
                <Heading
                    size="2xl"
                    textAlign="center"
                    position="absolute"
                    lineHeight="150px"
                    top="40%"
                    left="0"
                    right="0"
                    bg="rgba(50, 50, 0, 0.75)"
                    color="white"
                    py={2}
                >
                    {event.topic}
                </Heading>
                {/* </Box> */}
            </Box>

            {event.creator && <Box display="flex" alignSelf="center" p="8">
                <Card width="2xl">
                    <CardHeader>
                        {/* <Stack flexDirection="row" alignItems="baseline"> */}
                        <Flex gap='4' alignItems="center" flexWrap='wrap'>
                            <Text fontSize="4xl">
                                Creator:
                            </Text>
                            {/* <Box justifySelf="center"> */}
                            <Avatar src={event.creator.imageURL} />
                            {/* </Box> */}
                            <Box display="flex" flexDirection="column">
                                <Heading size='sm'>{event.creator.firstName + " " + event.creator.lastName}</Heading>
                                <Text>{event.creator.email}</Text>
                                <Text>{event.creator.phone}</Text>
                            </Box>
                            <Box ml="auto">
                                <CircularProgress alignSelf="end" size='75px' value={(event.joinedBy.length / event.membersAmount) * 100} color='red.500'>
                                    <CircularProgressLabel>{event.joinedBy.length}</CircularProgressLabel>
                                </CircularProgress>
                            </Box>
                        </Flex>
                        <Box>
                            <Divider />
                        </Box>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing="5">
                            <Stack spacing="5" direction="row" wrap="wrap">
                                <Flex flexDirection="column">
                                    <Heading size="md">Vacant: </Heading>
                                    <Tag mt={2} size='lg' borderRadius='full' bg='red.500'>
                                        <TagLabel color="white" fontSize="2xl" ml={2}>{event.membersAmount === event.joinedBy.length ? 'There is no places' : event.membersAmount - event.joinedBy.length} / {event.membersAmount}</TagLabel>
                                    </Tag>
                                </Flex>
                                <Flex flexDirection="column">
                                    <Heading size="md">Fees: </Heading>
                                    <Tag mt={2} size='lg' borderRadius='full' bg='red.500'>
                                        <TagLabel color="white" fontSize="2xl" ml={2}>{event.budget}$</TagLabel>
                                    </Tag>
                                </Flex>
                                <Flex flexDirection="column">
                                    <Tag mt="auto" size='lg' borderRadius='full'>
                                        <TagLabel fontSize="2xl" ml={2}>{event.category}</TagLabel>
                                    </Tag>
                                </Flex>
                                <Tag mt="auto" size='lg' borderRadius='full'>
                                    <TimeIcon />
                                    <TagLabel fontSize="2xl" ml={2}>{event.duration} min</TagLabel>
                                </Tag>
                                <Box ml="auto" alignSelf="end">
                                    <LikeButton setIsLiked={setIsLiked} isLiked={isLiked} id={id} />
                                </Box>
                            </Stack>
                            <Flex gap={5}>
                                <Box>
                                    <DynamicMap events={[event]} />
                                </Box>
                                <Flex flexDirection="column" flexGrow={2}>
                                    <Card flex={1}>
                                        <CardHeader textAlign="center" bg="red.500">
                                            <Heading color="white" size='md'>{monthNames[new Date(event.date).getMonth()]}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Stack divider={<StackDivider />} spacing='4'>
                                                <Box display="flex" flexDirection="column" alignItems="center">
                                                    <Heading size='xs' textTransform='uppercase'>
                                                        {weekDays[new Date(event.date).getDay()]}
                                                    </Heading>
                                                    <Text pt='2' fontSize='6xl'>
                                                        {new Date(event.date).getDay()}
                                                    </Text>
                                                    <Heading size='md' textTransform='uppercase'>
                                                        {new Date(event.date).getFullYear()}
                                                    </Heading>
                                                </Box>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                    <Flex flex={1}></Flex>
                                </Flex>
                            </Flex>
                            <Box>
                                <Heading size="md">Members:</Heading>
                                <Stack direction='row' mt={5}>
                                    {event.joinedBy.map((member: any) => {
                                        return <Avatar key={member._id} src={member.imageURL} />
                                    })}
                                </Stack>
                            </Box>
                        </Stack>
                    </CardBody>
                    <CardFooter justifyContent="end">
                        <Stack direction='row' spacing={4}>
                            <Button onClick={handleJoin} colorScheme='red' variant='solid'>
                                Join
                            </Button>
                            <Button onClick={handleLeave} colorScheme='gray' variant='solid'>
                                Leave
                            </Button>
                            <Button onClick={handleEdit} colorScheme='red' variant='ghost'>
                                Edit
                            </Button>
                        </Stack>
                    </CardFooter>
                </Card>
            </Box>}
        </Flex>
    )
}