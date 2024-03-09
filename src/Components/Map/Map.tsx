import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import tt, { NavigationControl } from '@tomtom-international/web-sdk-maps';
import './Map.css';

interface MapProps {
  userCity: string;
}

const Map: React.FC<MapProps> = ({ userCity }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<tt.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

    if (!apiKey) {
      console.error('TomTom API key is not provided.');
      return;
    }

    const map = tt.map({
      key: apiKey,
      container: mapContainerRef.current,
      zoom: 5,
      center: [32.7941, 34.9896], // Haifa
      language: 'en'
    });

    const navigationControl = new NavigationControl({
      showZoom: true,
      showPitch: false
    });

    map.addControl(navigationControl, 'top-left');

    const events = [
      { name: 'Technion - Israel Institute of Technology', address: 'Technion City, Haifa, Israel', coordinates: [32.7779, 35.0214] as [number, number] },
      { name: 'Bahai Gardens', address: 'Hatzionut Avenue, Haifa, Israel', coordinates: [32.8196, 34.9887] as [number, number] },
      { name: 'German Colony', address: 'Haifa, Israel', coordinates: [32.8156, 34.9937] as [number, number] }
    ];

    events.forEach(event => {
      const marker = new tt.Marker().setLngLat(event.coordinates);
      const popup = new tt.Popup({ offset: 35 }).setHTML(`<b>${event.name}</b><br>${event.address}`);
      marker.setPopup(popup).addTo(map);
      markersRef.current.push(marker);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="md"
      position="static"
      ref={mapContainerRef}
      style={{ width: '25vw', height: '70vh', marginRight: '50px' }} 
    />
  );
};

export default Map;