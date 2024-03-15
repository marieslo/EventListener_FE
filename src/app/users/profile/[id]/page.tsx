import { Avatar, Box, Flex } from "@chakra-ui/react";

export default function OtherUser() {
    return (



        <Box display='flex' width='100wv' backgroundColor='white' minHeight='100vh' pt='5%' pb='5%' justifyContent='center'>
            <Flex flexDirection="column" borderRadius='10px'
                backgroundColor='white' width='fit-content' height='fit-content' p='20px' boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)">
                    <Avatar color='white' size='2xl' backgroundColor='red.500' name={`${formData.firstName} ${formData.lastName}`}
                                src={formData.imageURL || undefined}
                            />

                
            </Flex>
        </Box>)
}