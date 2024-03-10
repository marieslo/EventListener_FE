import React, { useState } from 'react';
import { Flex, Box, Button, extendTheme, ChakraProvider, Avatar, Link } from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineLogin, AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai'; 
import SignUpModal from '@/Components/SignUpModal/SignUpModal';
import Search from '@/Components/Search/Search';

interface NavBarProps {
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
  userId: string; 
}

const handleLogout = () => {
  
};

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

const NavBar: React.FC<NavBarProps> = ({ onSearch, isLoggedIn, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <header className='navbar-containter' style={{ position: 'fixed', top: 0, width: '100%', maxWidth: '100%', zIndex: 1000}}>
        <Flex as="nav" align="center" justify="space-around" p={4} flexWrap="wrap" pr={150} pl={6}>
          <Box>
            <Flex align="center">
              <div className="navbar-brand" style={{ color: 'red', fontSize: '4rem', marginRight: '2rem', marginLeft: '50px' }}>EventListener</div>
            </Flex>
          </Box>
          <Box flex="1" display={{ base: 'none', md: 'flex' }} justifyContent="center" alignItems="center">
            <Search onSearchChange={onSearch} searchResults={undefined} />
          </Box>
          <Box>
            {isLoggedIn ? (
              <>
                <Link href={`/events/create_event`} _hover={{ textDecoration: 'none' }}>
                  <Button as="a" size="xs" colorScheme="red" variant="outline" leftIcon={<AiOutlinePlus />} ml={2}>
                    Add Event
                  </Button>
                </Link>
                <Link href={`/users/${userId}`} _hover={{ textDecoration: 'none' }}>
                  <Avatar bg='red.500' icon={<AiOutlineUser fontSize='1.5rem' />} />
                </Link>
                <Link href="#" onClick={handleLogout} _hover={{ textDecoration: 'none' }} ml={2}>
                <Avatar bg='red.500' icon={<AiOutlineLogout fontSize='1.5rem' />} />
              </Link>
              </>
            ) : (
              <>
                <Button variant="outlineRound" backgroundColor='white' marginLeft="10px" colorScheme="red" onClick={handleOpenModal} size="md" fontSize='xs' borderRadius="full" p={2} >
                  <AiOutlineLogin style={{ transform: 'rotate(-90deg)', fontSize: '1.5rem' }} /> 
                </Button>
              </>
            )}
          </Box>
        </Flex>
        <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </header>
    </ChakraProvider>
  );
};

export default NavBar;