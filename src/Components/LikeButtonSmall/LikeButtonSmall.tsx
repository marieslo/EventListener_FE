import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from "@chakra-ui/button";
import { FaHeart } from "react-icons/fa";
import { SERVER_URL } from "../../../api";
import './LikeButtonSmall.css';

export default function LikeButtonSmall({ eventId, isLiked, setIsLiked }: { eventId: string, isLiked: boolean, setIsLiked: any }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  async function handleSaveEvent() {
    try {
      await axios.put(
        `${SERVER_URL}/events/save/${eventId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setIsLiked(true);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  async function handleUnsaveEvent() {
    try {
      await axios.put(
        `${SERVER_URL}/events/unsave/${eventId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setIsLiked(false);
    } catch (error) {
      console.error('Error unsaving event:', error);
    }
  }

  const handleClick = () => {
    isLiked ? handleUnsaveEvent() : handleSaveEvent();
  };

  return (
    <Button onClick={handleClick} variant='' size="lg">
      <FaHeart 
        color={isLiked ? "#E53E3E" : '#718096'} 
        style={{ 
          fontSize: '30px',
          padding: '5px', 
        }} 
      />
    </Button>
  );
}