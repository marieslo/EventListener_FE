import React, { useEffect, useState } from 'react';

const MapComponent: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    useEffect(() => {
        // Получаем данные из локального хранилища
        const storedLocation = localStorage.getItem("location");
        if (storedLocation) {
            const { latitude, longitude } = JSON.parse(storedLocation);
            setLatitude(latitude);
            setLongitude(longitude);
            console.log('fetch', longitude, latitude)
        }
    }, []);

        return (
            <div>
                {/* Проверяем, есть ли координаты */}
                {latitude !== null && longitude !== null && (
                    <a
                        href={`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open Map
                    </a>
                )}
            </div>
        );
    };

export default MapComponent;
