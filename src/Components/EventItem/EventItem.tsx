import React, { useState } from 'react';
import { Box, Text, Image, Link } from '@chakra-ui/react';
import LikeButtonSmall from '../LikeButtonSmall/LikeButtonSmall';
import useLocalStorage from '@/Hooks/useLocalStorage';
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
  const { _id, date, topic } = event;

  const [showDetails, setShowDetails] = useState(false);
  const [token] = useLocalStorage<string>('token', '');
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
      <Box position="absolute" top="5px" left="180px" width="100%" height="100%">
      <LikeButtonSmall eventId={_id} token={token} />
      </Box>
      <Link
        href={`/events/${_id}`}
        _hover={{ textDecoration: 'underline', color: 'red.700', fontSize: 'lg' }} 
      >
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p="1"
          pr="6"
          pl="12"
          display="flex"
          flexDirection="column"
          opacity={showDetails ? 1 : 0}
          transition="opacity 0.3s ease"
          bg="rgba(255, 255, 255, 0.9)"
          zIndex={0}
        >
          <Text
            fontWeight="semibold"
            fontSize="sm"
            cursor="pointer"
            transition="opacity 0.3s ease"
            opacity={showDetails ? 1 : 0}
          >
            {formattedDateString}
          </Text>
          <Text
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            fontSize="lg"
            cursor="pointer"
            transition="opacity 0.3s ease"
            opacity={showDetails ? 1 : 0}
          >
            {topic}
          </Text>
        </Box>
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p="1"
          pr="6"
          pl="12"
          display="flex"
          flexDirection="column"
          bg="rgba(255, 255, 255, 0.9)"
          transition="opacity 0.3s ease"
          color='red.500'
        >
          <Text fontWeight="semibold" fontSize="sm">
            {formattedDateString}
          </Text>
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated fontSize="lg">
            {topic}
          </Text>
        </Box>
      </Link>
      <Image src={imageUrl} alt={topic} width="100%" height="100%" objectFit="cover" />
    </Box>
  );
};

export default EventItem;