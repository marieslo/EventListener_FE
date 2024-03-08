import React, { useState } from 'react';
import { Flex, Box, FormControl, Input, Button, extendTheme, ChakraProvider, InputGroup, IconButton, Link } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SignUpModal from '@/Components/SignUpModal/SignUpModal';
import { Avatar } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

interface NavBarProps {
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'red',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontSize: '2xl',
      },
    },
    Button: {
      baseStyle: {
        color: 'red',
        paddingY: '10px',
      },
      variants: {
        solidRound: {
          border: '1px solid red',
        },
        outlineRound: {
          border: '1px solid red',
        },
      },
    },
  },
});

const NavBar: React.FC<NavBarProps> = ({ onSearch, isLoggedIn }) => {

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileClick = () => { };

  const handleSearchButtonClick = () => { 

  };

  return (
    <ChakraProvider theme={theme}>
      <header className='navbar-containter' style={{ position: 'fixed', top: 0, width: '100%', maxWidth: '100%', zIndex: 1000}}>
        <Flex as="nav" align="center" justify="space-around" p={4} flexWrap="wrap" pr={150} pl={6}>
          <Box>
            <Flex align="center">
              <div className="navbar-brand" style={{ color: 'red', fontSize: '4rem', marginRight: '2rem' }}>EventListener</div>
            </Flex>
          </Box>
          <Box flex="1" display={{ base: 'none', md: 'flex' }} justifyContent="center" alignItems="center">
            <FormControl mr={4} mb={4} mt={4}>
              <InputGroup
              minWidth='200px'>
                <Input
                minWidth='200px'
                maxWidth='720px'
                  type="text"
                  placeholder="Search..."
                  backgroundColor='#fff'
                  onChange={handleSearchChange}
                />
                <Link href={`/events/`} _hover={{ textDecoration: 'none' }}>
                  <IconButton
                    aria-label="Search"
                    colorScheme="red"
                    icon={<SearchIcon />}
                    onClick={handleSearchButtonClick} 
                  />
                </Link>
              </InputGroup>
            </FormControl>
          </Box>
          <Box>
            {isLoggedIn ? (
              <>
                <Avatar bg='red.500' icon={<AiOutlineUser fontSize='1.5rem' />} onClick={handleProfileClick} />
              </>
            ) : (
              <Button variant="outlineRound" marginLeft="10px" colorScheme="red" onClick={handleOpenModal} size="md" fontSize='xs'>
                Sign Up /
                <br /> Log In
              </Button>
            )}
          </Box>
        </Flex>
        <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </header>
      <Box display={{ base: 'block', md: 'none' }} pt="90px">
        <FormControl mr={4} mb={4} mt={4} textAlign="center">
          <InputGroup>
            <Input
              type="text"
              placeholder="Search..."
              backgroundColor='#fff'
              onChange={handleSearchChange}
            />
            <Link href={`/events/`} _hover={{ textDecoration: 'none' }}>
              <IconButton
                aria-label="Search"
                colorScheme="red"
                icon={<SearchIcon />}
                onClick={handleSearchButtonClick} 
              />
            </Link>
          </InputGroup>
        </FormControl>
      </Box>
    </ChakraProvider>
  );
};

export default NavBar;