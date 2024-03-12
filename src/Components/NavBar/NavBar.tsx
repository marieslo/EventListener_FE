import React, { useState, useEffect } from 'react';
import { Flex, Box, IconButton, ChakraProvider, Avatar, Link, Button } from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineLogin, AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai'; 
import SignUpModal from '@/Components/SignUpModal/SignUpModal';
import Search from '@/Components/Search/Search';
import { BiHome } from 'react-icons/bi';

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
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <ChakraProvider>
      <header className='navbar-containter' style={{ position: 'fixed', top: 0, width: '100%', maxWidth: '100%', zIndex: 1000}}>
        <Flex as="nav" align="center" justify="space-around" p={4} flexWrap="wrap" pr={150} pl={6}>
          <Box>
            <Flex align="center" >
              <img src="https://res.cloudinary.com/diunuo4xf/image/upload/v1710235202/EventListener/logo-big_without_bg_hclucu.png" alt="EventListener Logo" style={{ height: '50px', marginRight: '20px' }} />
              <div className="navbar-brand" style={{ color: '#E53E3E', fontSize: '4rem', marginRight: '2rem'}}>EventListener</div>
            </Flex>
          </Box>
          <Box flex="1" display={{ base: 'none', md: 'flex' }} justifyContent="center" alignItems="center">
            <Search onSearchChange={onSearch} searchResults={undefined} />
          </Box>
          <Box>
            <Link href={`/home`} _hover={{ textDecoration: 'bold', color: '#C53030' }}>
              <Button
                as="a"
                colorScheme="red"
                leftIcon={<BiHome />}
                mt='4px'
                size="lg"
                fontSize='xl'
                borderRadius="full"
                m={1}
                bg="white"
                color="red.500"
              >
              </Button>
            </Link>
            <Link href={`/users/${user?._id}`} _hover={{ textDecoration: 'bold', color: '#C53030' }}>
              <Avatar bg='white' color='red.500' src={user?.imageURL} icon={<AiOutlineUser fontSize='1.5rem' />} m={1} />
            </Link>
            <Link href="#" onClick={handleLogout} _hover={{ textDecoration: 'bold', color: '#C53030' }} ml={2}>
              <Avatar bg='white' color='red.500' icon={<AiOutlineLogout fontSize='1.5rem' />} m={1} />
            </Link>
            {!isLoggedIn && (
              <IconButton 
                as="a"
                colorScheme="red" 
                icon={<AiOutlineLogin style={{ transform: 'rotate(-90deg)', fontSize: '1.5rem' }} />} 
                mt='4px' 
                size="md" 
                fontSize='md' 
                borderRadius="full" 
                m={1}
                aria-label="Login" 
                onClick={handleOpenModal}
                bg="white"
                color="red.500" 
              >
              </IconButton>
            )}
          </Box>
        </Flex>
        <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </header>
      <Box pt="70px"> 
        <Link href={`/events/create_event`} _hover={{ textDecoration: 'bold', color: '#C53030' }}>
          <Button as="a" size="md" colorScheme="red" leftIcon={<AiOutlinePlus />} width='100vw'>
            Add Event
          </Button>
        </Link>
      </Box>
    </ChakraProvider>
  );
};

export default NavBar;