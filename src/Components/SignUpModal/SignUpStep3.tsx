import { Box, Grid, GridItem, Image, Text, useStyleConfig } from "@chakra-ui/react";
import React from "react";
import { CATEGORY_URLS } from "./categories/categories_url";

const Step3: React.FC = () => {
  const styles = useStyleConfig("Step3");

  return (
    <Box pt="1.5rem" sx={styles}>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {Object.entries(CATEGORY_URLS).map(([category, url]) => (
          <GridItem key={category}>
            <Box position="relative" overflow="hidden" borderRadius="md">
              <Image
                src={url}
                alt={category}
                width="100%"
                height="10rem"
                objectFit="cover"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
              />
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
