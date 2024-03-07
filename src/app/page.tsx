'use client'

import { Box, Flex, Heading} from "@chakra-ui/layout"
import SignUpModal from "@/Components/SignUpModal/SignUpModal"
import { useState } from "react";
import { Button } from "@chakra-ui/button";

export default function Welcome () {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    return (<Flex       direction="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh">
      <Heading color="red" textAlign="center">Welcome!</Heading>
      <Button colorScheme="red" variant="solid" onClick={handleOpenModal} mt="4">
  Open Modal
</Button>
      <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Flex>
    )
}