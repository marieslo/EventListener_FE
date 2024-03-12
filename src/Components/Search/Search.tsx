import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FormControl, Input, InputGroup, IconButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, Text, Popover, PopoverTrigger, Button, PopoverArrow, PopoverHeader, PopoverBody, PopoverContent, PopoverCloseButton, Flex, Link } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { SERVER_URL } from '../../../api';

interface SearchProps {
  onSearchChange: (query: string) => void;
  searchResults: string[] | undefined;
}

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

const Search: React.FC<SearchProps> = ({ onSearchChange, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const initialFocusRef = useRef<any>()
  const [isOpen, setIsOpen] = useState<boolean>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get<Event[]>(`${SERVER_URL}/events`);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    onSearchChange(query);
  };

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //   }
  // };

  return (
    <FormControl mr={4} mb={4} mt={4}>
      <Popover initialFocusRef={initialFocusRef} isOpen={isOpen} placement='bottom-start'
      >
        <PopoverTrigger>
          <InputGroup minWidth='200px'>
            <Input
              type="text"
              placeholder="Search..."
              backgroundColor='#fff'
              value={searchTerm}
              onChange={handleInputChange}
              // onKeyPress={handleKeyPress}
              ref={initialFocusRef}
              onBlur={() => setIsOpen(false)}
              onFocus={() => setIsOpen(true)}
            />
            {/* <IconButton
              aria-label="Search"
              colorScheme="red"
              icon={<SearchIcon />}
              onClick={}
            /> */}
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent w={400}>
          {filteredEvents.map(event => (
            <Box key={event._id} m={2} zIndex={'20'}>
              <Flex justify={'space-between'}>
                <Link href={`/events/${event._id}`} _hover={{ color: '#E53E3E' }}>
                  {event.topic}
                </Link>
                <Text></Text>
                <Text color={'grey'}>{event.city}</Text>
              </Flex>
            </Box>
          ))}
        </PopoverContent>
      </Popover>
    </FormControl>
  );
};

export default Search;