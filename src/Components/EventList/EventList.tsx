import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import EventItem from '@/Components/EventItem/EventItem';
import { CATEGORY_URLS } from '@/Components/SignUpModal/categories/categories_url';

interface Event {
  _id: string;
  creator: string;
  date: string;
  street: string;
  street_number: string;
  city: string;
  country: string;
  topic: string;
  place: string;
  category: string[];
  joinedBy: string[];
  savedBy: string[];
  membersAmount: number;
  budget: number;
  imageURL: string;
  lat: string;
  lon: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <Spinner color="red.500" size="xl" />;
  }

  return (
    <Box p={4} flex="1" overflowY="auto" maxHeight="calc(85vh - 100px)" display="flex" flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>
      {events.map(event => (
        <EventItem
          key={event._id}
          event={event}
          imageUrl={event.category ? (CATEGORY_URLS as Record<string, string>)[event.category[0]] : ''}
        />
      ))}
    </Box>
  );
};

export default EventList;