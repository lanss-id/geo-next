"use client"

import React, { useEffect, useState } from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import conturePointData from "@/public/ConturePoint.json";
import TableInfo from './TableInfo';
import Image from 'next/image';
import SearchBar from './SearchBar';

const LocationAggregatorMap= () => {
    const [popupInfo, setPopupInfo] = useState<{ info: any, coordinates: any, index: any } | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleMarkerClick = (info: any, coordinates: any, index: any) => {
        setPopupInfo({ info, coordinates, index });
        setIsPopupOpen(true);
        setSelectedOption(`Titik Pengujian ${index}`);
    };
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }
    const handleSearchSelect = (info: any, coordinates: any, index: any) => {
        setPopupInfo({ info, coordinates, index });
        setIsPopupOpen(true);
    };
    const handleOptionChange = (option: any) => {
        setSelectedOption(option);
    };

    useEffect(() => {
    const locations = document.querySelectorAll('.location');
    locations.forEach(location => {
        location.addEventListener('click', (event) => {
            locations.forEach(l => l.classList.remove('active'));
            (event.currentTarget as HTMLElement).classList.add('active');
        });
    });
}, []);
    return (
        <div className="relative w-full h overflow-y-auto">
            <div className='flex justify-center'>
                <SearchBar onSelect={handleSearchSelect} selectedOption={selectedOption} onOptionChange={handleOptionChange}  />
            </div>
            <div className='relative w-[1800px] h-[1096px]'>
                {/* <Image
                    src="/map-geo.png"
                    alt="map"
                    layout='fill'
                    objectFit='cover'
                    className='opacity-25'
                /> */}
                <Image
                    src="/final-map.png"
                    alt="map"
                    layout='fill'
                    objectFit='cover'
                />
                {conturePointData.data.map((point, index) => (
                    <div key={`location-${point.coordinates.join('-')}`}  className={`location location-${index + 1} ${selectedOption === `Titik Pengujian ${index + 1}` ? 'active' : ''}`}>
                        <button
                            className="point"
                            onClick={() => handleMarkerClick(point.info, point.coordinates, index + 1)}
                        />
                    </div>
                ))}

                {popupInfo && (
                    <div className={`popup sticky top-0 left-0 h-full overflow-y-auto bg-white shadow-lg z-50 w-80 max-w-[80%] transition-transform duration-300 ${isPopupOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <button 
                            onClick={togglePopup}
                            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-3"
                        >
                            {isPopupOpen ? '✕' : '☰'}
                        </button>
                        <TableInfo info={popupInfo.info} index={popupInfo.index} />
                    </div>
                )}
                {popupInfo && (
                    <button 
                        onClick={togglePopup}
                        className="absolute top-4 left-4 bg-white hover:bg-gray-100 shadow-md rounded-full py-2 px-3 z-50"
                    >
                        {isPopupOpen ? '✕' : '☰'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LocationAggregatorMap;
