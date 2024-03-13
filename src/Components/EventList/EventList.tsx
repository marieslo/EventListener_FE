import React from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import EventItem from '@/Components/EventItem/EventItem';
import { CATEGORY_URLS } from '@/Components/SignUpModal/categories/categories_url';
import { Address } from '../Map/Map';

interface Event {
  _id: string;
  creator: string;
  date: string;
  address: Address;
  topic: string;
  category: string[];
  joinedBy: string[];
  savedBy: string[];
  membersAmount: number;
  budget: number;
  imageURL: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <Spinner color="red.500" size="xl" />;
  }

  return (

    // <Box border='solid blue 5px'overflowY="auto" maxHeight="calc(85vh - 100px)" display="flex" flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>

    // </Box>

    <Flex alignSelf='center'> 
    <Box overflowY="auto" maxHeight="calc(85vh - 100px)" display="flex" flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>
      {events.map(event => (
        <EventItem
          key={event._id}
          event={event}
          imageUrl={event.category ? (CATEGORY_URLS as Record<string, string>)[event.category[0]] : ''}
        />
      ))}
    </Box>
    </Flex>
  );
};

export default EventList;