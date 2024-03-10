'use client'
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { AbsoluteCenter, Avatar, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Divider, Flex, Heading, Image, Stack, StackDivider, Tag, TagLabel, Text, useToast } from "@chakra-ui/react";

export default function PetDetailsPage() {

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
                    src={`https://res.cloudinary.com/dvora9zgj/image/upload/v1709927250/EventListener/uribu8yo4gv98xnq55ff.jpg`} alt=''
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
                    Event topic
                </Heading>
                {/* </Box> */}
            </Box>

            <Box display="flex" flexGrow={2} alignSelf="center" p="8">
                <Card>
                    <CardHeader>
                        <Stack flexDirection="row" alignItems="baseline">
                            <Flex gap='4' alignItems="center" flexWrap='wrap'>
                                <Text fontSize="4xl">
                                    Creator:
                                </Text>
                                {/* <Box justifySelf="center"> */}
                                <Avatar src='https://bit.ly/broken-link' />
                                {/* </Box> */}
                                <Box display="flex" flexDirection="column">
                                    <Heading size='sm'>Loh Yebanii</Heading>
                                    <Text>+79123454455</Text>
                                </Box>
                            </Flex>
                            {/* {pet.status_name === 'adopted' &&
                                <Box>
                                    <Badge mr="2" colorScheme='pink'>{pet.status_name}</Badge>
                                </Box>}
                            {pet.status_name === 'fostered' &&
                                <Box>
                                    <Badge colorScheme='yellow'>{pet.status_name}</Badge>
                                </Box>}
                            {pet.status_name === 'available' &&
                                <Box>
                                    <Badge colorScheme='green'>{pet.status_name}</Badge>
                                </Box>} */}

                        </Stack>
                        <Box>
                            <Divider />
                        </Box>
                    </CardHeader>
                    <CardBody>
                        {/* <Stack direction="row" spacing="2" wrap="wrap">
                            <Tag size='lg' borderRadius='full'>
                                <TagLabel>{pet.type_name}</TagLabel>
                            </Tag>
                            <Tag size='lg' borderRadius='full'>
                                <TagLabel>{pet.breed_name}</TagLabel>
                            </Tag>
                            {pet.hypoallergenic === 1 && <Tag size='lg' borderRadius='full'>
                                <TagLabel>{'Hypoallergenic'}</TagLabel>
                            </Tag>}
                            <Tag size='lg' borderRadius='full'>
                                <TagLabel>{pet.color}</TagLabel>
                            </Tag>
                            <Tag size='lg' borderRadius='full'>
                                <LiaRulerVerticalSolid />
                                <TagLabel>{`${pet.height}cm`}</TagLabel>
                            </Tag>
                            <Tag size='lg' borderRadius='full'>
                                <GiWeight />
                                <TagLabel>{`${pet.weight}kg`}</TagLabel>
                            </Tag>
                        </Stack>
                        <Box position='relative' padding='10'>
                            <Divider />
                            <AbsoluteCenter bg='white' px='4'>
                                <Text fontSize="3xl">About</Text>
                            </AbsoluteCenter>
                        </Box>
                        {/* <Heading size="md">Bio</Heading> */}
                        <Stack spacing="5">
                            <Stack spacing="5" direction="row" wrap="wrap">
                                <Tag size='lg' borderRadius='full'>
                                    <QuestionOutlineIcon />
                                    <TagLabel ml={2}>100$</TagLabel>
                                </Tag>
                                <Tag size='lg' borderRadius='full'>
                                    <QuestionOutlineIcon />
                                    <TagLabel ml={2}>5 ppl</TagLabel>
                                </Tag>
                            </Stack>
                            <Flex gap={5}>
                                <Image src='gibbresh.png' fallbackSrc='https://via.placeholder.com/300' />
                                <Card>
                                    <CardHeader textAlign="center" bg="red.500">
                                        <Heading color="white" size='md'>SEPTEMBER</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Stack divider={<StackDivider />} spacing='4'>
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Heading size='xs' textTransform='uppercase'>
                                                    Wednesday
                                                </Heading>
                                                <Text pt='2' fontSize='6xl'>
                                                    09
                                                </Text>
                                                <Heading size='md' textTransform='uppercase'>
                                                    2001
                                                </Heading>
                                            </Box>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            </Flex>
                            <Box>
                                <Heading size="md">Members:</Heading>
                                <Stack direction='row' mt={5}>
                                    <Avatar src='https://bit.ly/broken-link' />
                                    <Avatar src='https://bit.ly/broken-link' />
                                    <Avatar src='https://bit.ly/broken-link' />
                                    <Avatar src='https://bit.ly/broken-link' />
                                    <Avatar src='https://bit.ly/broken-link' />
                                    <Avatar src='https://bit.ly/broken-link' />
                                </Stack>
                            </Box>
                        </Stack>
                    </CardBody>
                    <CardFooter justifyContent="end">
                        <Stack direction='row' spacing={4}>
                            <Button onClick={() => console.log('enter')} colorScheme='red' variant='solid'>
                                Join
                            </Button>
                            <Button onClick={() => console.log('enter')} colorScheme='gray' variant='solid'>
                                Leave
                            </Button>
                        </Stack>
                    </CardFooter>
                </Card>
            </Box>
        </Flex>
    )
}