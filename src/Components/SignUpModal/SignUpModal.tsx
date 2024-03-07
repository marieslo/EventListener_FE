import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Grid, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
    location: string;
    interests: string[];
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        location: '',
        interests: []
    });

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleConfirm = () => {
        // Handle confirmation logic
        // Open login modal
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInterestToggle = (interest: string) => {
        const updatedInterests = formData.interests.includes(interest)
            ? formData.interests.filter(item => item !== interest)
            : [...formData.interests, interest];
        setFormData({ ...formData, interests: updatedInterests });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {step === 1 && (
                        <form>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input name="name" value={formData.name} onChange={handleChange} />
                            </FormControl>
                            {/* Other form fields */}
                        </form>
                    )}
                    {step === 2 && (
                        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                            {/* Render interests */}
                        </Grid>
                    )}
                    {step === 3 && (
                        <p>Confirmation message</p>
                    )}
                </ModalBody>

                <ModalFooter>
                    {step > 1 && <Button onClick={handlePrevious}>Previous</Button>}
                    {step < 3 && <Button ml={3} onClick={handleNext}>Next</Button>}
                    {step === 3 && <Button ml={3} onClick={handleConfirm}>Confirm</Button>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SignUpModal;
