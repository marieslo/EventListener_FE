import { useState } from 'react';
import { Flex, Box, Text, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, Link } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<{ hour: number; title: string }[]>([]);

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
    const numDays = endDate.getDate();
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

        weekDays.push(
          <Box
          key={day.getDate()}
          flex="1"
          width='50px'
          height='50px'
          p={1}
          textAlign="center"
          color={isSelectedDay ? 'black' : isNonCurrentMonth ? 'gray.300' : 'gray.500'}
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
      hours.push(
        <Flex key={i} justifyContent="space-between" alignItems="center" border="1px solid" borderColor="gray.200" p={2}>
          <Box>
            <Text fontSize="sm" color="gray.500">{i}:00</Text>
            {events
              .filter(event => event.hour === i)
              .map((event, index) => (
                <Text key={index} mt={1}>
                  {event.title}
                </Text>
              ))}
          </Box>
          <Link href={`/events/create_event`} _hover={{ textDecoration: 'none' }}>
            <Button as="a" size="xs" colorScheme="red" variant="outline" leftIcon={<AddIcon />} ml={2}>
              Add Event
            </Button>
          </Link>
        </Flex>
      );
    }
    return (
      <Box maxHeight="360px" overflowY="auto">
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

  return (
    <Box border="1px solid" borderColor="gray.200" borderRadius="md" boxShadow="md" p={4} position="relative" top='60px'>
      <Flex direction="column" alignItems="center">
        <Flex alignItems="center" mt={4}>
          <IconButton icon={<ArrowBackIcon />} mb={6} variant='outline' onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} aria-label="Previous month" />
          <Text fontSize="xl" mx={4} color="red.500" mb={6}>
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
          <IconButton icon={<ArrowForwardIcon />} mb={6} variant='outline' onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} aria-label="Next month" />
        </Flex>
        {renderDays()}
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
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