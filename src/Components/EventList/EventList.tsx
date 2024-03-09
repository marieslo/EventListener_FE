import React from 'react';
import { Box } from '@chakra-ui/react';
import EventButton from '@/Components/EventButton/EventButton';

interface EventListProps {
  events: {
    id: string;
    topic: string;
    date: string;
    time: string;
    backgroundImageUrl: string;
  }[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <Box p={4} flex="1" overflowY="auto" maxHeight="calc(85vh - 100px)" display="flex" flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>
      {events.map(event => (
        <EventButton
          key={event.id}
          id={event.id}
          topic={event.topic}
          date={event.date}
          time={event.time}
          backgroundImageUrl={event.backgroundImageUrl}
        />
      ))}
    </Box>
  );
};

export default EventList;