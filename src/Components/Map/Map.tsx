import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { SearchIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import tt, { NavigationControl, Marker } from '@tomtom-international/web-sdk-maps';

interface MapProps {
  userCity: string;
  addresses: {
    city: string;
    street: string;
    place: string;
    lon: string;
    lat: string;
  }[];
}

const Map: React.FC<MapProps> = ({ userCity, addresses }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
  const [mapInstance, setMapInstance] = useState<tt.Map | null>(null);
  const markersRef = useRef<tt.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || !apiKey) return;

    const map = tt.map({
      key: apiKey,
      container: mapContainerRef.current!,
      zoom: 8,
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
      const marker = new Marker().setLngLat(event.coordinates);
      const popup = new tt.Popup({ offset: 35 }).setHTML(`<b>${event.name}</b><br>${event.address}`);
      marker.setPopup(popup).addTo(map);
      markersRef.current.push(marker);
    });

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

  const handleZoomIn = () => {
    if (mapInstance) {
      const currentZoom = mapInstance.getZoom();
      mapInstance.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      const currentZoom = mapInstance.getZoom();
      mapInstance.setZoom(currentZoom - 1);
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
          style={{ width: '380px', borderRadius: "5px", padding: '10px' }}
        />
        <IconButton
          aria-label="Search"
          colorScheme="red"
          icon={<SearchIcon />}
          onClick={handleSearch}
        />
        <IconButton
          aria-label="Zoom In"
          colorScheme="grey"
          icon={<AddIcon />}
          onClick={handleZoomIn}
        />
        <IconButton
          aria-label="Zoom Out"
          colorScheme="grey"
          icon={<MinusIcon />}
          onClick={handleZoomOut}
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