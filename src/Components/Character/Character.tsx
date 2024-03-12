import React from 'react';
import { Flex, Image, Text, Box } from '@chakra-ui/react';
import './Character.css'; 

interface CharacterProps {
  text: string;
}

const Character: React.FC<CharacterProps> = ({ text }) => {

  return (
    <Flex align="center"> 
      <Text
        position="absolute"
        marginTop="-70px"
        top="40%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="xs"
        textAlign="center"
        fontFamily="Calistoga, serif"
        className="fade-in-animation print-animation"
        color='#E53E3E'        
      >
        {text}
      </Text>
      <Box ml={3} className="animation">
        <Image src="https://res.cloudinary.com/diunuo4xf/image/upload/v1710235202/EventListener/logo-big_without_bg_hclucu.png" alt="Character" width="60px" /> 
      </Box>
    </Flex>
  );
};

export default Character;