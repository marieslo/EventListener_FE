import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useBreakpointValue } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import './Calendar.css';
import axios from 'axios';
import { SERVER_URL } from '../../../api';

interface JoinedEvent {
    date: Date;
    topic: string;
    duration: number;
    startTime: Date;
}

const Calendar: React.FC<{ width: string }> = ({ width }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);

    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await axios.get<{ joinedEvents: JoinedEvent[] }>(`${SERVER_URL}/users/profile/joined`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('Response:', response.data.joinedEvents);
                    setJoinedEvents(response.data.joinedEvents.map(event => ({
                        date: new Date(event.date),
                        topic: event.topic,
                        duration: event.duration,
                        startTime: new Date(event.date)
                    })));
                }
            } catch (error) {
                console.error('Error fetching joined events:', error);
            }
        };
        fetchJoinedEvents();
    }, []);

    const handleOpenModal = (day: Date) => {
        setSelectedDay(day);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDay(null);
    };

    const renderDays = () => {
        const days = [];
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const firstDayOfWeek = startDate.getDay();
        let currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() - firstDayOfWeek);

        while (currentDate <= endDate) {
            const weekDays = [];
            for (let i = 0; i < 7; i++) {
                const day = new Date(currentDate);
                const isToday = isSameDay(day, new Date());
                const isSelectedDay = selectedDay && isSameDay(day, selectedDay);
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const isNonCurrentMonth = !isCurrentMonth;
                const eventsForDay = joinedEvents.filter(event => isSameDay(event.date, day));

                weekDays.push(
                    <Box
                        key={day.getDate()}
                        flex="1"
                        p={2}
                        textAlign="center"
                        color={isSelectedDay ? 'black' : isToday ? 'black' : isNonCurrentMonth ? 'gray.300' : eventsForDay.length > 0 ? 'red.500' : 'gray.500'}
                        cursor="pointer"
                        onClick={() => handleOpenModal(day)}
                    >
                        <div style={{ borderBottom: "1px solid", borderColor: "gray.200" }}>
                            <Text fontSize="xs" fontWeight="bold">
                                {day.toLocaleDateString('en-US', { weekday: 'short' })}
                            </Text>
                            <Text fontSize="xs">
                                {day.toLocaleDateString('en-US', { day: 'numeric' })}
                            </Text>
                            {eventsForDay.map((event, index) => (
                                <Text key={index} fontSize="xs" color="red.500">
                                    {/* {event.topic} */}
                                </Text>
                            ))}
                        </div>
                    </Box>
                );
                currentDate.setDate(currentDate.getDate() + 1);
            }
            days.push(<Flex key={currentDate.getTime()}>{weekDays}</Flex>);
        }
        return days;
    };

    const renderHours = () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            const eventsInHour = joinedEvents.filter(event => event.date.getHours() === i);
            hours.push(
                <Flex key={i} justifyContent="space-between" alignItems="center" border="1px solid" borderColor="gray.200" p={1}>
                    <Box>
                        <Text fontSize="sm" color="gray.500">{i}:00</Text>
                        {eventsInHour.map((event, index) => (
                            <Box key={index} mt={1}>
                                <Text>{event.topic}</Text>
                                <Text fontSize="xs" color="gray.500">Duration: {event.duration} minutes</Text>
                            </Box>
                        ))}
                    </Box>
                </Flex>
            );
        }
        return (
            <Box maxHeight="250px" overflowY="auto">
                {hours}
            </Box>
        );
    };
    
    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    return isMobile ? null : (
        <Box ml={4} className='calendar-container' width={width} border="1px solid" borderColor="gray.200" borderRadius="md" boxShadow="md" p={1} position="sticky" backgroundColor='#fff'>
            <Flex direction="column" alignItems="center">
                <Flex alignItems="center">
                    <IconButton icon={<ArrowBackIcon />} mb={6} variant='outline' onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} aria-label="Previous month" />
                    <Text fontSize="xl" mx={4} color="red.500" mb={6}>
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Text>
                    <IconButton icon={<ArrowForwardIcon />} mb={6} variant='outline' onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} aria-label="Next month" />
                </Flex>
                {renderDays()}
                <Modal isOpen={modalOpen} onClose={handleCloseModal}>
                    <ModalOverlay />
                    <ModalContent
                        style={{
                            fontFamily: 'Calistoga, serif',
                            paddingBottom: '20px',
                            marginTop: '200px',
                            width: '350px'
                        }}
                    >
                        <ModalHeader color="red.500">
                            {selectedDay?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {renderHours()}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Flex>
        </Box>
    );
};

export default Calendar;