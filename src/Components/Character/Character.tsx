import React from 'react';
import { Flex, Image, Box, Text } from '@chakra-ui/react';
import './Character.css'; 

interface CharacterProps {
  text: string;
}

const Character: React.FC<CharacterProps> = ({ text }) => {
  const bubbleWidth = text.length * 3 + 5;

  return (
    <Flex align="center">
      <Box ml={4} className="float-animation">
        <Image src="https://res.cloudinary.com/diunuo4xf/image/upload/v1710235199/EventListener/character_moc9li.png" alt="Character" width="80px" />
      </Box>
      <Box className="character-bubble" position="relative" marginTop="-120px" height="auto" width={`${bubbleWidth}px`}>
        <Image src="https://res.cloudinary.com/diunuo4xf/image/upload/v1710235206/EventListener/speech-bubble_kcjyul.png" alt="Speech Bubble" />
        <Text
          position="absolute"
          top="40%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="#000"
          fontSize="xs"
          textAlign="center"
          fontFamily="Calistoga, serif"
          className="fade-in-animation print-animation"
        >
          {text}
        </Text>
      </Box>
    </Flex>
  );
};

export default Character;