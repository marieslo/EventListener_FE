import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box, InputGroup, InputRightElement } from "@chakra-ui/react";

interface Step1Props {
    onNextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNextStep }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Validate form data and perform any necessary actions
        onNextStep(); // Move to the next step
    };

    const [show, setShow] = React.useState(false)
  const handleClick = () => {
    setShow(!show)}

    return (
        <Box pt="1.5rem">
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="e-mail" name="email" textTransform="lowercase" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel mt='0.5rem'>Password</FormLabel>
                <InputGroup size='md'>
                <Input type={show ? 'text' : 'password'} 
                placeholder="password" name="password" value={formData.password} onChange={handleChange} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel mt='0.5rem'>First Name</FormLabel>
                <Input type="text" name="firstName" placeholder="first name" value={formData.firstName} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel mt='0.5rem'>Last Name</FormLabel>
                <Input type="text" name="lastName" placeholder="last name" value={formData.lastName} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel mt='0.5rem'>Phone</FormLabel>
                <Input type="tel" name="phone" placeholder="phone number" value={formData.phone} onChange={handleChange} />
            </FormControl>
        </Box>
    );
};

export default Step1;
