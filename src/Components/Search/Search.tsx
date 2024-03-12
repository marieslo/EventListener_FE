import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, Input, InputGroup, IconButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, Text } from '@chakra-ui/react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const eventsResponse = await axios.get<Event[]>(`${SERVER_URL}/events`);
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    onSearchChange(query);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleOpenModal();
    }
  };

  return (
    <FormControl mr={4} mb={4} mt={4}>
      <InputGroup minWidth='200px'>
        <Input
          type="text"
          placeholder="Search..."
          backgroundColor='#fff'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          aria-label="Search"
          colorScheme="red"
          icon={<SearchIcon />}
          onClick={handleOpenModal}
        />
      </InputGroup>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <Box key={index} mt={2}>
                  <Text>{result}</Text>
                </Box>
              ))
            ) : (
              <Text>No results found</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};

export default Search;