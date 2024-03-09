import React from 'react';
import { Box } from '@chakra-ui/react';
import EventButton from '@/Components/EventButton/EventButton';
import { CATEGORY_URLS } from '@/Components/SignUpModal/categories/categories_url';

interface EventListProps {
  events: {
    id: string;
    topic: string;
    date: string;
    time: string;
    backgroundImageUrl: string;
    category?: string; 
  }[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  if (!events || !Array.isArray(events)) {
    return null;
  }


  const categories = Object.keys(CATEGORY_URLS);
  const fakeEvents = Array.from({ length: 7 }, (_, index) => {
    const categoryIndex = index % categories.length;
    return {
      id: `event-${index + 1}`,
      topic: `Event ${index + 1}`,
      date: '2024-03-15',
      time: '10:00 AM',
      backgroundImageUrl: 'https://example.com/image.jpg',
      category: categories[categoryIndex],
    };
  });

  return (
    <Box p={4} flex="1" overflowY="auto" maxHeight="calc(85vh - 100px)" display="flex" flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>
      {fakeEvents.map(event => (
        <EventButton
          key={event.id}
          id={event.id}
          topic={event.topic}
          date={event.date}
          time={event.time}
          backgroundImageUrl={event.category ? (CATEGORY_URLS as Record<string, string>)[event.category] : ''}
        />
      ))}
    </Box>
  );
};

export default EventList;