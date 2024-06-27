"use client"

import React, { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import { TextLayer, ScatterplotLayer, } from '@deck.gl/layers';
import {ContourLayer} from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import "mapbox-gl/dist/mapbox-gl.css";
import {
    lightingEffect,
    INITIAL_VIEW_STATE,
} from "@/lib/mapconfig";

import polygonData from "@/public/polygonMaps.json";
import conturePointData from "@/public/ConturePoint.json";
import TableInfo from './TableInfo';
import Image from 'next/image';

interface PolygonInfo {
    "Muka Tanah": number;
    "Very Soft": number;
    "Soft": number;
    "Medium": number;
    "Stiff": number;
    "Hard": number;
}

// interface PolygonData {
//   coordinates: number[][];
//   info: PolygonInfo;
//   color: string;
// }

const LocationAggregatorMap = () => {
    // const [layers, setLayers] = useState<any[]>([]);
    const [popupInfo, setPopupInfo] = useState<{ info: any, coordinates: any, index: any } | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // useEffect(() => {
    //     // const maxHardValue = Math.max(...Object.values(polygonData).map((p: PolygonData) => p.info.Hard));

    //     // const polygonLayers = Object.keys(polygonData).map((key: string) => {
    //     //     const { coordinates, info } = polygonData[key as keyof typeof polygonData];
    //     //     const hardValue = info.Hard;
    //     //     const opacity = (hardValue / maxHardValue) * 0.8;
    //     //     const color = [179, 78, 0, Math.round(opacity * 130)];

    //     //     return new PolygonLayer({
    //     //         id: `polygon-layer-${key}`,
    //     //         data: [{ coordinates }],
    //     //         getPolygon: (d: { coordinates: number[][] }) => d.coordinates,
    //     //         getFillColor: () => color as any,
    //     //         wireframe: true,
    //     //         pickable: true,
    //     //         onClick: () => setPopupInfo({ info: polygonData[key as keyof typeof polygonData].info, coordinates, index: key }),
    //     //     });
    //     // });
        
    //     const textLayers = Object.keys(polygonData).map((key: string) => {
    //         const { coordinates } = polygonData[key as keyof typeof polygonData];
    //         const center = coordinates.reduce((acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]], [0, 0]).map(val => val / coordinates.length);
    //         return new TextLayer({
    //             id: `text-layer-${key}`,
    //             data: [{ position: center, text: `Pengujian ${key}` }],
    //             getPosition: d => d.position,
    //             getText: d => d.text,
    //             getSize: 12,
    //             getColor: [0, 0, 0, 255],
    //         });
    //     });
    //     const pointLayer = new ScatterplotLayer<any>({
    //         id: 'scatterplot-layer',
    //         data: conturePointData.data,
    //         getPosition: (d: { coordinates: number[] }) => d.coordinates as [number, number],
    //         getFillColor: [255, 140, 0],
    //         getRadius: 100,
    //         pickable: true,
    //         onClick: (info: any) => setPopupInfo({ info: info.object.info, coordinates: info.object.coordinates, index: info.index }),
    //     });
    //     setLayers([ pointLayer, ...textLayers]);
    // }, []);
    const handleMarkerClick = (info: any, coordinates: any, index: any) => {
        setPopupInfo({ info, coordinates, index });
        setIsPopupOpen(true);
    };
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }
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
            {/* <DeckGL
                effects={[lightingEffect]}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={layers}
            >
                <Map
                    mapboxAccessToken={process.env.NEXT_PUBLIC_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/mapbox/light-v11"
                >
                </Map>
            </DeckGL> */}
            <div className='relative w-[1856px] h-[989px]'>
                <Image
                    src="/maps-fullconture.png"
                    alt="map"
                    layout='fill'
                    objectFit='cover'
                />
                {conturePointData.data.map((point, index) => (
                    <div key={`location-${point.coordinates.join('-')}`}  className={`location location-${index + 1}`}>
                        
                        <button
                            className="point"
                            onClick={() => handleMarkerClick(point.info, point.coordinates, index + 1)}
                        />
                        <button
                            className="point-label block -ml-8" 
                            onClick={() => handleMarkerClick(point.info, point.coordinates, index + 1)}
                        >
                            Pengujian {index + 1}
                        </button>
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
