import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'; 
import tt, { NavigationControl } from '@tomtom-international/web-sdk-maps';

interface MapProps {
  userCity: string;
}

const Map: React.FC<MapProps> = ({ userCity }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
  const [mapInstance, setMapInstance] = useState<tt.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !apiKey) return;

    const map = tt.map({
      key: apiKey,
      container: mapContainerRef.current!,
      zoom: 5,
      center: [32.7941, 34.9896], // Haifa
      language: 'en'
    });

    const navigationControl = new NavigationControl({
      showZoom: true,
      showPitch: false
    });

    map.addControl(navigationControl, 'top-left');
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, [apiKey]);

  const handleSearch = async () => {
    if (!searchQuery || !apiKey || !mapInstance) return;

    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${searchQuery}.json?key=${apiKey}`
      );
      const data = await response.json();

      if (data && data.results && data.results.length > 0) {
        const { lat, lon } = data.results[0].position;
        mapInstance.setCenter([lon, lat]).setZoom(12);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box>
      <Flex>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search address..."
          onKeyPress={handleKeyPress} 
          style={{ width: '500px', borderRadius: "5px", paddingLeft: '20px'}}
        />
        <IconButton
          aria-label="Search"
          colorScheme="red"
          icon={<SearchIcon />}
          onClick={handleSearch}
        />
      </Flex>
      <Box
        border="1px solid"
        borderColor="gray.200"
        color="gray.200"
        borderRadius="md"
        boxShadow="md"
        position="static"
        ref={mapContainerRef}
        style={{ width: '380px', height: '65vh', marginRight: '100px' }}
      />
    </Box>
  );
};

export default Map;