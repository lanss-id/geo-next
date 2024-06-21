"use client"

import React, { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import { PolygonLayer, TextLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import "mapbox-gl/dist/mapbox-gl.css";
import {
    lightingEffect,
    INITIAL_VIEW_STATE,
} from "@/lib/mapconfig";

import polygonData from "@/public/polygonMaps.json";
import TableInfo from './TableInfo';

interface PolygonInfo {
    "Muka Tanah": number;
    "Very Soft": number;
    "Soft": number;
    "Medium": number;
    "Stiff": number;
    "Hard": number;
}

interface PolygonData {
  coordinates: number[][];
  info: PolygonInfo;
  color: string;
}

const LocationAggregatorMap = () => {
    const [layers, setLayers] = useState<any[]>([]);
    const [popupInfo, setPopupInfo] = useState<{info: any, coordinates: any, index: any} | null>(null);

    useEffect(() => {
        const maxHardValue = Math.max(...Object.values(polygonData).map((p: PolygonData) => p.info.Hard));

        const polygonLayers = Object.keys(polygonData).map((key: string) => {
            const { coordinates, info } = polygonData[key as keyof typeof polygonData];
            const hardValue = info.Hard;
            const opacity = (hardValue / maxHardValue) * 0.8;
            const color = [179, 78, 0, Math.round(opacity * 130)];

            return new PolygonLayer({
                id: `polygon-layer-${key}`,
                data: [{ coordinates }],
                getPolygon: (d: { coordinates: number[][] }) => d.coordinates,
                getFillColor: () => color as any,
                wireframe: true,
                pickable: true,
                onClick: () => setPopupInfo({ info: polygonData[key as keyof typeof polygonData].info, coordinates, index: key }),
            });
        });
        
        const textLayers = Object.keys(polygonData).map((key: string) => {
            const { coordinates } = polygonData[key as keyof typeof polygonData];
            const center = coordinates.reduce((acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]], [0, 0]).map(val => val / coordinates.length);
            return new TextLayer({
                id: `text-layer-${key}`,
                data: [{ position: center, text: `Pengujian ${key}` }],
                getPosition: d => d.position,
                getText: d => d.text,
                getSize: 12,
                getColor: [0, 0, 0, 255],
            });
        });
        setLayers([...polygonLayers, ...textLayers]);
    }, []);

    return (
        <div>
            <DeckGL
                effects={[lightingEffect]}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={layers}
            >
                <Map
                    mapboxAccessToken={process.env.NEXT_PUBLIC_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/mapbox/light-v11"
                />
            </DeckGL>
            {popupInfo && (
                <div className="popup absolute top-4 left-4">
                    <TableInfo info={popupInfo.info} index={popupInfo.index} />
                </div>
            )}
        </div>
    );
};

export default LocationAggregatorMap;
