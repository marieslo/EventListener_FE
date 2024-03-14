'use client'

import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import EventForm from '../EventForm/EventForm';

function EditEventModal({ isLoading, isOpen, onClose, setIsLoading, createEvent, updateEvent, isEditable, existedEvent, setEvent }: { isOpen: any, onClose: any, setIsLoading: any, updateEvent: any, createEvent: any, isEditable: any, existedEvent: any, setEvent: any, isLoading: any }) {
    return (
        <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="red.500">
                    <Heading color="white"> Edit Event</Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <EventForm
                        isLoading={isLoading}
                        isOpen={isOpen}
                        onClose={onClose}
                        setIsLoading={setIsLoading}
                        createEvent={null}
                        updateEvent={updateEvent}
                        isEditable={true}
                        existedEvent={existedEvent}
                        setEvent={setEvent} />
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditEventModal;