import React from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import EventButton from '@/Components/EventButton/EventButton';
import { CATEGORY_URLS } from '@/Components/SignUpModal/categories/categories_url';

interface Event {
  _id: string;
  creator: string;
  date: string;
  category: string[]; 
  joinedBy: string[];
  membersAmount: number;
  budget: number;
  imageURL: string;
  lat: string;
  lon: string;
  place: string;
  topic: string;
  address: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  if (!events) {
    return <Spinner color="red.500" size="xl" />;
  }
  if (events.length === 0) {
    return <Text>No events available</Text>;
  }

  return (
    <Box p={4} flex="1" overflowY="auto" maxHeight="calc(85vh - 100px)" display="flex" marginLeft='100px' flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>
      {events.map(event => (
        <EventButton
          key={event._id}
          event={event}
          imageUrl={event.category ? (CATEGORY_URLS as Record<string, string>)[event.category[0]] : ''}
        />
      ))}
    </Box>
  );
};

export default EventList;