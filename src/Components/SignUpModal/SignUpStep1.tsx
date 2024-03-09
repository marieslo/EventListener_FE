import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box, InputGroup, InputRightElement, Alert, AlertIcon, AlertTitle, AlertDescription, ModalFooter } from "@chakra-ui/react";



interface Step1Props {
    onNextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNextStep }) => {
    const [error, setError] = useState("")
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

    const handleNextStep = () => {
        // Validation
        const email = formData.email.trim();
        const firstName = formData.firstName.trim();
        const lastName = formData.lastName.trim();
        if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
            setError("Invalid e-mail");
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError("Invalid password");
            return;
        }
        if (firstName.length < 2 ) {
            setError("Invalid first name");
            return;
        }
        if (lastName.length < 2 ) {
            setError("Invalid last name"); 
            return; 
        }
        const phoneRegex = /^\+?[0-9]{11,}$/;
    if (!phoneRegex.test(formData.phone)) {
        setError("Invalid phone number");
        return;
    }
        localStorage.setItem('user', JSON.stringify(formData));//пишем юзера в локальное хранилище
        console.log('user', JSON.stringify(formData))
        onNextStep(); // Переход к следующему шагу, если нет ошибки

    };

    const [show, setShow] = React.useState(false)
  const handleClick = () => {
    setShow(!show)}

    return (
        <Box pt="1.5rem">
            {error && (
                <Alert mb='1rem' status="error" borderRadius='5px'>
                    <AlertIcon />
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" color='#4a5568' placeholder="e-mail" name="email" textTransform="lowercase" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel mt='0.5rem'>Password</FormLabel>
                <InputGroup size='md'>
                <Input type={show ? 'text' : 'password'} 
                placeholder="password" color='#4a5568' name="password" value={formData.password} onChange={handleChange} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel mt='0.5rem'>First Name</FormLabel>
                <Input type="text" name="firstName" color='#4a5568' placeholder="first name" value={formData.firstName} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel mt='0.5rem'>Last Name</FormLabel>
                <Input type="text" name="lastName" placeholder="last name" color='#4a5568' value={formData.lastName} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel mt='0.5rem'>Phone</FormLabel>
                <Input type="tel" name="phone" placeholder="phone number" color='#4a5568' value={formData.phone} onChange={handleChange} />
            </FormControl>
            <ModalFooter>
            <Button mr='-1.5rem' colorScheme='red' onClick={handleNextStep}>Next</Button>
            </ModalFooter>
            
        </Box>
        
    );
};

export default Step1;
