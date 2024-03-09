import React, { useState } from 'react';
import {Step,StepDescription,StepIcon,StepIndicator,StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Modal, ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button, Box} from "@chakra-ui/react";
import Step1 from './SignUpStep1';
import Step3 from './SignUpStep3';
import Step2 from './SignUpStep2';

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

    const handleReset = () => {
        setActiveStep(0);
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
                                <StepTitle>Add</StepTitle>
                                <StepDescription>Categories</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>

                    </Stepper>
                    {activeStep === 0 && <Step1 onNextStep={handleNextStep} />}
                    {activeStep === 1 && <Step2 onNextStep={handleNextStep} />}
                    {activeStep === 2 && <Step3 onNextStep={handleNextStep} />}

                    {/* ШАГИ ТУТ БЛЕАТЬ */}
                </ModalBody>
                <ModalFooter>
                    {activeStep !== 0 && (
                        <Button onClick={handlePrevStep} mr={3}>
                            Previous
                        </Button>
                    )}
                    {activeStep < 2 ? <Button colorScheme='red' onClick={handleNextStep}>Next</Button> : <Button colorScheme='red' onClick={onClose}>SignUp</Button>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SignUpModal;
