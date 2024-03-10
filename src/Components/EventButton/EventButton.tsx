import React from 'react';
import { Box, Text, Image, Link } from '@chakra-ui/react';

interface Event {
  _id: string;
  date: string;
  address: string;
  topic: string;
  place: string;
  imageURL: string;
}

interface EventButtonProps {
  event: Event;
  imageUrl: string;
}

const EventButton: React.FC<EventButtonProps> = ({ event }) => {
  const { _id, date, address, topic, place, imageURL } = event;

  const formattedDate = new Date(date).toLocaleDateString(); 
  return (
    <Link href={`/events/${_id}`} _hover={{ textDecoration: 'none' }}>
      <Box
        width="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        backgroundColor='#fff'
        position="relative"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
        margin={4}
      >
        <Image src={imageURL} alt={topic} width="100%" height="175px" objectFit="cover" />

        <Box p="6">
          <Text color="gray.500" fontWeight="semibold" mb={2}>
            {formattedDate}
          </Text>
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated mb={2}>
            {topic}
          </Text>
          <Text color="gray.600">{place}</Text>
          <Text color="gray.600">{address}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default EventButton;