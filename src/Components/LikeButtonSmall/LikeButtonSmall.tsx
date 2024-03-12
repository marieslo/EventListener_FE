import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useState} from "react"; 
import { SERVER_URL } from "../../../api";
import './LikeButtonSmall.css';
import { FaHeart } from "react-icons/fa";
import useLocalStorage from '../../Hooks/useLocalStorage';

interface LikeButtonSmallProps {
  eventId: string;
  token: string; 
}

const LikeButtonSmall: React.FC<LikeButtonSmallProps> = ({ eventId }) => {
  const [saved, setSaved] = useState(false);
  const [token] = useLocalStorage<string>('token', ''); 

  async function saveEvent() {
    try {
      await axios.put(`${SERVER_URL}/save/${eventId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSaved(true);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  async function unsaveEvent() {
    try {
      await axios.put(`${SERVER_URL}/unsave/${eventId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSaved(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  const handleClick = () => {
    saved ? unsaveEvent() : saveEvent();
    setSaved(prev => !prev);
  };

  return (
    <Button onClick={handleClick} variant='' size="lg">
      <FaHeart 
        color={saved ? "#E53E3E" : '#718096'} 
        style={{ 
          fontSize: '34px',
          padding: '5px'
        }} 
      />
    </Button>
  );
}

export default LikeButtonSmall;