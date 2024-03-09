import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  addresses: {
    place: string;
    lon: string;
    lat: string;
  }[];
}

const Map: React.FC<MapProps> = ({ addresses }) => {
  const mapContainerRef = useRef<any>(null);

  return (
    <Box>
    <div style={{ width: '380px', height: '65vh', marginRight: '100px', borderRadius: '5px' }} ref={mapContainerRef}>
        <MapContainer center={[32.7941, 34.9896]} zoom={8} style={{ width: '100%', height: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {addresses.map(({ lat, lon, place }, index) => (
            <Marker
              position={[parseFloat(lat), parseFloat(lon)]}
              icon={
                new L.Icon({
                  iconUrl: 'https://res.cloudinary.com/diunuo4xf/image/upload/v1710009519/pet-adoption/letter-e2_gyn0sw.png',
                  iconSize: [30, 30],
                  iconAnchor: [10, 10],
                })
              }
              key={place}
            >
              <Popup>{"Event " + (index + 1)}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Box>
  );
};

export default Map;