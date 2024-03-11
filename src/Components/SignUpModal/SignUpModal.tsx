import React, { useState } from 'react';
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box } from "@chakra-ui/react";
import Step1 from './SignUpStep1';
import Step2 from './SignUpStep2';
import Step3 from './SignUpStep3';
import Link from 'next/link';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleNextStep = () => {
        setActiveStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        setActiveStep(prevStep => prevStep - 1);
    };


    const handleCategorySelection = (selectedCategories: string[]) => {
        console.log("Selected categories:", selectedCategories);
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.interests = selectedCategories;
        localStorage.setItem('user', JSON.stringify(currentUser));
        console.log(currentUser);
    };

    const [file, setFile] = useState<File | null>(null); // Состояние для хранения файла

    const handleFileChange = (file: File) => {
        console.log('File changed:', file);
        setFile(file);
    };

    const handleSignUpButtonClick = async () => {
        try {
            // Получение данных пользователя из локального хранилища
            const userData = localStorage.getItem('user');
            if (!userData) {
                console.error('User data is not available');
                return;
            }

            // Создание формата
            const formData = new FormData();
            const userDataParsed = JSON.parse(userData);
            formData.append('email', userDataParsed.email);
            formData.append('password', userDataParsed.password);
            formData.append('firstName', userDataParsed.firstName);
            formData.append('lastName', userDataParsed.lastName);
            formData.append('phone', userDataParsed.phone);
            formData.append('interests', userDataParsed.interests);

            // Добавление файла в formData, если он был выбран
            if (file) {
                formData.append('file', file);
            }

            // Отправка запроса на сервер
            const signupResponse = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                body: formData,
            });

            if (!signupResponse.ok) {
                console.error('Failed to register user');
                return;
            }

            //токен
            const responseJson = await signupResponse.json();
            const accessToken = responseJson.access_token;
            localStorage.setItem('accessToken', accessToken);

            console.log('User registered successfully');
            onClose();
        } catch (error) {
            console.error('Error during user registration:', error);
        } finally {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width='fit-content'>
                <Box backgroundColor='red.500' borderRadius='2px' mb='1rem'>
                    <ModalHeader color='white' >Sign Up</ModalHeader>
                    <ModalCloseButton color='white' /></Box>
                <ModalBody>
                    <Stepper size='lg' colorScheme='red' index={activeStep}>
                        <Step>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                            <Box flexShrink='0'>
                                <StepTitle>Profile</StepTitle>
                                <StepDescription>Details</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>
                        <Step>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                            <Box flexShrink='0'>
                                <StepTitle>Picture</StepTitle>
                                <StepDescription>and Location</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>
                        <Step>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                            <Box flexShrink='0'>
                                <StepTitle>Choose</StepTitle>
                                <StepDescription>Categories</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>

                    </Stepper>
                    {activeStep === 0 && <Step1 onNextStep={handleNextStep} />}
                    {activeStep === 1 && <Step2 onFileChange={handleFileChange} onNextStep={handleNextStep} onPrevStep={handlePrevStep} />}
                    {activeStep === 2 && <Step3 onCategorySelection={handleCategorySelection} />}
                </ModalBody>

                {activeStep === 2 && (
                    <>
                        <ModalFooter>
                            <Button onClick={handlePrevStep} mr={3}>
                                Previous
                            </Button>
                            <Link href="/home" passHref>
                                <Button onClick={handleSignUpButtonClick} colorScheme="red" as="a">SignUp</Button>
                            </Link>
                        </ModalFooter>
                    </>
                )}

            </ModalContent>
        </Modal>
    );
};

export default SignUpModal;
