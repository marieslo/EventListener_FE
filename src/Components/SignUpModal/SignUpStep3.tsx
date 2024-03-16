import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CATEGORY_URLS } from "./categories/categories_url";

interface Step3Props {
    onCategorySelection: (selectedCategories: string[]) => void;
}

const Step3: React.FC<Step3Props> = ({ onCategorySelection }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryClick = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(prevSelectedCategories =>
                prevSelectedCategories.filter(selectedCategory => selectedCategory !== category)
            );
        } else {
            setSelectedCategories(prevSelectedCategories => [...prevSelectedCategories, category]);
        }
    };

    useEffect(() => {
        onCategorySelection(selectedCategories);
    }, [selectedCategories, onCategorySelection]);

    return (
        <Box pt="1.5rem">
            <Grid templateColumns={{base:"repeat(1, 1fr)", md:"repeat(2, 1fr)"}} gap={4}>
                {Object.entries(CATEGORY_URLS).map(([category, url]) => (
                    <GridItem key={category}>
                        <Box position="relative" overflow="hidden" borderRadius="md">
                            <Box
                                width="100%"
                                height="10rem"
                                bg={selectedCategories.includes(category) ? 'rgba(34, 139, 34, 0.8)' : 'transparent'}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                onClick={() => handleCategoryClick(category)}
                                cursor="pointer"
                                position="relative"
                            >
                                {selectedCategories.includes(category) && (
                                    <Text color="white" fontWeight="bold" fontSize="4rem">✓</Text>
                                )}
                                {!selectedCategories.includes(category) && (
                                    <Image
                                        src={url}
                                        alt={category}
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                        transition="transform 0.2s"
                                        _hover={{ transform: "scale(1.1)" }}
                                        position="absolute"
                                        top="0"
                                        left="0"
                                    />
                                )}
                            </Box>
                            <Text
                                textAlign="center"
                                position="absolute"
                                bottom="0"
                                left="0"
                                right="0"
                                bg="rgba(0, 0, 0, 0.5)"
                                color="white"
                                fontWeight="bold"
                                py={2}
                            >
                                {category}
                            </Text>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};

export default Step3;
