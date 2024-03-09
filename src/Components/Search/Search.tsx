import React, { useState } from 'react';
import { FormControl, Input, InputGroup, IconButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchProps {
  onSearchChange: (query: string) => void;
  searchResults: string[] | undefined;
}

const Search: React.FC<SearchProps> = ({ onSearchChange, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          placeholder="Search event..."
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