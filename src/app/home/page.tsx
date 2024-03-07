'use client'
import React, { useState } from "react";
import { Flex } from "@chakra-ui/layout";
import NavBar from "@/Components/NavBar/NavBar";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const handleSearch = () => {
    };

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <Flex
                direction="row"
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <NavBar onSearch={handleSearch} isLoggedIn={isLoggedIn} />
            </Flex>
        </Flex>
    );
}