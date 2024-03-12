import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { SERVER_URL } from "../../../api";
import './LikeButtonSmall.css';

export default function LikeButtonSmall({ }) {

  //SAVED И ID ДЛЯ ПРИМЕРА, КНОПКА В КАРТОЧКЕ ДОЛЖНА ПОЛУЧАТЬ ПРОПС SAVED(TRUE/FALSE), ID(EVENT_ID)
  const [saved, setSaved] = useState(false);
  const id = '65edd50d86367fff02c0cf69';
  //ЗАМЕНИТЬ НА ТОКЕН ПОСЛЕ АУТЕНТИФИКАЦИИ
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0YXMxMkBnbWFpbC5jb20iLCJpZCI6IjY1ZWRiZTNlYzcyMzU3YWVkMjgxOGFjZSIsImlhdCI6MTcxMDE2NjMyNSwiZXhwIjoxNzEwMTY5OTI1fQ.Brj5UVH5XmFntp6ecLE07v06C9U-TaGAdEZcLxRIl6s'



  async function saveEvent() {
    try {
      await axios.put(`${SERVER_URL}/save/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  async function unsaveEvent() {
    try {
      await axios.put(`${SERVER_URL}/unsave/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  const handleClick = () => {
    saved ?
      unsaveEvent()
      :
      saveEvent()

    setSaved(prev => !prev);
  };

  return (
    <>
      <Button onClick={handleClick} variant=''>
        <svg xmlns="http://www.w3.org/2000/svg" className="svgStyle" fill={saved ? "#E53E3E" : 'none'} viewBox="0 0 24 24" stroke="#E53E3E"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      </Button>
    </>
  )
}