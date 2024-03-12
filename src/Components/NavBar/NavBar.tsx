import React, { useState, useEffect } from 'react';
import { Flex, Box, IconButton, ChakraProvider, Avatar, Link, Button, useToast, Image, Tooltip } from '@chakra-ui/react';
import { AiOutlineLogin, AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai'; 
import SignUpModal from '@/Components/SignUpModal/SignUpModal';
import Search from '@/Components/Search/Search';
import useLocalStorage from '@/Hooks/useLocalStorage';

interface User {
  _id: string;
  imageURL: string;
}

interface NavBarProps {
  onSearch: (query: string) => void;
  user?: User; 
}

const NavBar: React.FC<NavBarProps> = ({ onSearch, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useLocalStorage<boolean>('isLoggedIn', false);
  const toast = useToast();

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    localStorage.clear();
    setLoggedIn(false);
  };

  const handleAddEventClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Please log in to create an event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      <Link href={`/events/create_event`} _hover={{ textDecoration: 'none' }}/>
    }
  };

  return (
    <ChakraProvider>
      <header className='navbar-container'>
        <Box position="fixed" width="100%" top="0">
          <Flex
            as="nav"
            align="center"
            justify="space-around"
            p={4}
            flexWrap="wrap"
            pr={150}
            pl={6}
            zIndex={1000}
          >
            <Box>
              <Flex align="center">
                <img
                  src="https://res.cloudinary.com/diunuo4xf/image/upload/v1710235202/EventListener/logo-big_without_bg_hclucu.png"
                  alt="EventListener Logo"
                  style={{ height: '50px', marginRight: '10px' }}
                />
                <div className="navbar-brand" style={{ color: '#E53E3E', fontSize: '4rem', marginRight: '2rem' }}>
                  EventListener
                </div>
              </Flex>
            </Box>
            <Box flex="1" display={{ base: 'none', md: 'flex' }} justifyContent="center" alignItems="center">
              <Search onSearchChange={onSearch} searchResults={undefined} />
            </Box>
            {isLoggedIn ? (
            <Flex alignItems="center">
              <Link href={`/home`} >
                <Tooltip label="Home" placement="bottom">
                  <Image src="https://res.cloudinary.com/diunuo4xf/image/upload/v1710258603/icons8-home-67_1_sd77pa.png" alt="Home" boxSize="34px" position='sticky' marginTop='1px' />
                </Tooltip>
              </Link>
                  <Link href={`/users/${user?._id}`}  ml={2}>
                    <Tooltip label="Profile" placement="bottom">
                      <Avatar bg='red.500' src={user?.imageURL} size="sm" />
                    </Tooltip>
                  </Link>
                  <Tooltip label="Log Out" placement="bottom">
                    <Link href="/" onClick={handleLogout}  ml={2}>
                      <Avatar bg='red.500' icon={<AiOutlineLogout fontSize='1.5rem' />} size="sm" />
                    </Link>
                  </Tooltip>
            </Flex>
              ) : (
                <Tooltip label="Log In / Sign Up" placement="bottom">
                  <Link>
                    <IconButton
                      as="a"
                      colorScheme="red"
                      icon={<AiOutlineLogin style={{ transform: 'rotate(-90deg)', fontSize: '1.5rem' }} />}
                      size="sm"
                      fontSize='md'
                      borderRadius="full"
                      m={1}
                      aria-label="Login"
                      onClick={handleOpenModal}
                      bg="red.500"
                    />
                  </Link>
                </Tooltip>
              )}
          </Flex>
        </Box>
        <Box marginTop="70px" display="flex" justifyContent="center" width="100%">
          <Button
            as="a"
            size="md"
            colorScheme="red"
            leftIcon={<AiOutlinePlus />}
            width="100%"
            onClick={handleAddEventClick}
            borderRadius='5px'
          >
            Add Event
          </Button>
        </Box>
        <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </header>
    </ChakraProvider>
  );
};

export default NavBar;