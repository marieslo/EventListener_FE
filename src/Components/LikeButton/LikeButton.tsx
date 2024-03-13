import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../api";
import './LikeButton.css';

export default function LikeButton({ id, isLiked, setIsLiked }: { id: string, isLiked: boolean, setIsLiked: any }) {

    //SAVED И ID ДЛЯ ПРИМЕРА, КНОПКА В КАРТОЧКЕ ДОЛЖНА ПОЛУЧАТЬ ПРОПС SAVED(TRUE/FALSE), ID(EVENT_ID)
    const [saved, setSaved] = useState(isLiked);
    const [token, setToken] = useState<any>('');

    //ЗАМЕНИТЬ НА ТОКЕН ПОСЛЕ АУТЕНТИФИКАЦИИ
    //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0YXMxMkBnbWFpbC5jb20iLCJpZCI6IjY1ZWRiZTNlYzcyMzU3YWVkMjgxOGFjZSIsImlhdCI6MTcxMDE2NjMyNSwiZXhwIjoxNzEwMTY5OTI1fQ.Brj5UVH5XmFntp6ecLE07v06C9U-TaGAdEZcLxRIl6s'

    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, []);

    async function saveEvent() {
        try {
            await axios.put(`${SERVER_URL}/events/save/${id}`, {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (error) {
            console.error('Error saving event:', error);
        }
    }

    async function unsaveEvent() {
        try {
            await axios.put(`${SERVER_URL}/events/unsave/${id}`, {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (error) {
            console.error('Error saving event:', error);
        }
    }

    const handleClick = () => {
        isLiked ?
            unsaveEvent()
            :
            saveEvent()
        // setSaved(prev => !prev);
        setIsLiked((prev: any) => !prev);
    };

    return (
        <>
            <Button onClick={handleClick} colorScheme='gray' variant='solid'>
                <Flex align={'center'} justify={'center'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="svgStyle" fill={isLiked ? "#E53E3E" : 'none'} viewBox="0 0 24 24" stroke="#E53E3E"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Like
                </Flex>
            </Button>
        </>
    )
}