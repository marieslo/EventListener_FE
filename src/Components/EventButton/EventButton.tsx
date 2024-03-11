import React from 'react';
import { Box, Text, Image, Link, Icon } from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';

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

const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const EventButton: React.FC<EventButtonProps> = ({ event }) => {
  const { _id, date, address, topic, place, imageURL } = event;

  const formattedDateString = formattedDate(date);
  
  return (
    <Box
      width="250px" 
      height="250px" 
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      backgroundColor='#fff'
      position="relative"
      margin={8}
      textAlign="start"
    >
      <Image src={imageURL} alt={topic} width="100%" height="100%" objectFit="cover" />
      <Box 
        position="absolute" 
        bottom="0" 
        left="0" 
        right="0" 
        color="black" 
        bg="rgba(255, 255, 255, 0.9)" 
        p="1"
        pr='6' 
        pl='12' 
        display="flex"
        flexDirection="column"
      >
        <Text fontWeight="semibold" fontSize="sm">{formattedDateString}</Text>
        <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated fontSize="lg">{topic}</Text>
        <Text fontSize="xs">{place}</Text>
        <Text fontSize="xs">{address}</Text>
        <Link href={`/events/${_id}`} _hover={{ textDecoration: 'none' }}>
          <Icon 
            as={FiInfo} 
            color="grey" 
            boxSize={6}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            position="absolute"
            left="3"
            top='2'
          />
        </Link>
      </Box>
    </Box>
  );
};

export default EventButton;