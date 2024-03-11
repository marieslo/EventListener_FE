import { useState } from 'react';
import { Input, Button, ModalBody, FormLabel, Flex } from '@chakra-ui/react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Link from 'next/link';

interface AuthResponse {
    success: boolean;
    error?: string;
}

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response: AxiosResponse<{ access_token: string }> = await axios.post('http://localhost:3000/auth/login', {
                email: email,
                password: password
            });
            const accessToken = response.data.access_token;

            localStorage.setItem('accessToken', accessToken);

            console.log('Login successful'); 
            onClose();
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Login failed:', axiosError.message);
        }
    };

    return (
        <ModalBody>
            <FormLabel mt='0.5rem'>E-mail</FormLabel>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                mb="3"
                color='#4a5568'
            />
            <FormLabel mt='0.5rem'>Password</FormLabel>
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                mb="3"
                color='#4a5568'
            />
            <Flex flexDirection='row' justifyContent='flex-end'>
            <Link href="/home" passHref><Button mt='1rem' mb='1rem' colorScheme="red" onClick={handleLogin}>Login</Button></Link>
            </Flex>

        </ModalBody>
    );
};

export default LoginModal;
