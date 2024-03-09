import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import React from "react";
import DragAndDropInput from "./DragPhoto";

const Step2: React.FC = () => {
  return (
    <Box pt="1.5rem">
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        <GridItem>
          <FormControl>
            <FormLabel>Add Profile Picture</FormLabel>
            <Flex justifyContent="center" alignItems="center">
  <DragAndDropInput />
</Flex>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Location</FormLabel>
            {/* КАРТА */}
          </FormControl>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Step2;
