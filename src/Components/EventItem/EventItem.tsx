import React, { useState } from 'react';
import { Box, Text, Image, Link, Icon } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

interface Event {
  _id: string;
  date: string;
  street: string;
  street_number: string;
  city: string;
  country: string;
  topic: string;
  place: string;
  imageURL: string;
}

interface EventItemProps {
  event: Event;
  imageUrl: string;
}

const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const EventItem: React.FC<EventItemProps> = ({ event, imageUrl }) => {
  const { _id, date, country, city, street, street_number, topic, place } = event;

  const [showDetails, setShowDetails] = useState(false);

  const formattedDateString = formattedDate(date);

  return (
    <Box
      width="250px"
      height="250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      backgroundColor="#fff"
      position="relative"
      margin={8}
      textAlign="start"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <Link href={`/events/${_id}`} _hover={{ textDecoration: 'none' }}>
        <Icon
          as={FaInfoCircle}
          boxSize={6}
          color="red.500"
          position="absolute"
          top="2"
          right="2"
          zIndex="1"
        />
      </Link>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        color="#E53E3E"
        bg="rgba(255, 255, 255, 0.9)"
        p="1"
        pr="6"
        pl="12"
        display="flex"
        flexDirection="column"
        opacity={showDetails ? 0 : 1}
        transition="opacity 0.3s ease"
      >
        <Text fontWeight="semibold" fontSize="sm">
          {formattedDateString}
        </Text>
        <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated fontSize="lg">
          {topic}
        </Text>
      </Box>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        color="#E53E3E"
        bg="rgba(255, 255, 255, 0.9)"
        p="1"
        pr="6"
        pl="12"
        display="flex"
        flexDirection="column"
        opacity={showDetails ? 1 : 0}
        transition="opacity 0.3s ease"
      >
        <Text fontWeight="semibold" fontSize="sm">
          {formattedDateString}
        </Text>
        <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated fontSize="lg">
          {topic}
        </Text>
        <Text fontSize="xs">{place}</Text>
        <Text fontSize="xs">{city}</Text>
        <Text fontSize="xs">{street}</Text>
        <Text fontSize="xs">{street_number}</Text>
      </Box>
      <Image src={imageUrl} alt={topic} width="100%" height="100%" objectFit="cover" />
    </Box>
  );
};

export default EventItem;