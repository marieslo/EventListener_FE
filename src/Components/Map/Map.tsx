import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import axios from 'axios';

interface Event {
  _id: string;
  creator: string;
  date: string;
  street: string;
  street_number: string;
  city: string;
  country: string;
  topic: string;
  place: string;
  category: string[];
  joinedBy: string[];
  savedBy: string[];
  membersAmount: number;
  budget: number;
  imageURL: string;
}

interface MapProps {
  events: Event[];
}

const Map: React.FC<MapProps> = ({ events }) => {
  const mapContainerRef = useRef<any>(null);
  const [coordinates, setCoordinates] = useState<{ [key: string]: { lat: string, lon: string } }>({});
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapInitialized) {
      setMapInitialized(true);
      const fetchCoordinates = async () => {
        const newCoordinates: { [key: string]: { lat: string, lon: string } } = {};

        try {
          for (const event of events) {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(event.street)} ${encodeURIComponent(event.street_number)} ${encodeURIComponent(event.city)} ${encodeURIComponent(event.country)}&format=json`);
            const data = response.data;
            if (data.length > 0) {
              newCoordinates[event._id] = { lat: data[0].lat, lon: data[0].lon };
            }
          }
          setCoordinates(newCoordinates);
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };

      fetchCoordinates();
    }
  }, [events, mapInitialized]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <Box>
      <div style={{ width: '400px', height: '65vh', marginTop: '50px', borderRadius: '5px' }} ref={mapContainerRef}>
        <MapContainer center={[32.7941, 34.9896]} zoom={12} style={{ width: '100%', height: '100%', border: '1px', borderRadius: '5px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {events.map(event => {
            const { lat, lon } = coordinates[event._id] || { lat: '', lon: '' };
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lon);
            if (!isNaN(latitude) && !isNaN(longitude)) {
              return (
                <Marker
                  position={[latitude, longitude]}
                  icon={
                    new L.Icon({
                      iconUrl: 'https://res.cloudinary.com/diunuo4xf/image/upload/v1710009519/EventListener/letter-e2_gyn0sw.png',
                      iconSize: [30, 30],
                      iconAnchor: [10, 10],
                    })
                  }
                  key={event._id}
                >
                  <Popup>
                    <strong>{event.topic}</strong>
                    <br />
                    {formatDate(event.date)} 
                    <br />
                    {event.city}, {event.street} {event.street_number}
                  </Popup>
                </Marker>
              );
            } else {
              console.error(`Invalid latitude or longitude for event '${event.topic}'`);
              return null;
            }
          })}
        </MapContainer>
      </div>
    </Box>
  );
};

export default Map;