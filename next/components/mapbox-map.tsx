"use client";
import React, { use, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from "@/lib/utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Simple geocoding fetch
async function geocodeAddress(address: string): Promise<[number, number] | null> {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.features && data.features.length > 0) {
    return data.features[0].center;
  }
  return null;
}

const MapboxMap = ({
  className,
}: {
  className?: string;
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!mapContainerRef.current) return;

      // Check if Mapbox token is available
      let coords: [number, number] | null = null;
      if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
        const _coords = process.env.NEXT_PUBLIC_EARNEST_COORDINATES?.split(",").map(Number);
        if (_coords && _coords.length === 2) {
          coords = _coords as [number, number];
        } else {
          console.error("Invalid coordinates in environment variable");
        }
      }
      // If coordinates are not provided, fetch them
      if (!coords && process.env.NEXT_PUBLIC_EARNEST_ADDRESS) {
        console.log("Fetching coordinates of :", process.env.NEXT_PUBLIC_EARNEST_ADDRESS);
        coords = await geocodeAddress(process.env.NEXT_PUBLIC_EARNEST_ADDRESS);
      }
      // If coordinates are still not available, log an error
      if (!coords) {
        console.error("Failed to geocode address");
        return;
      }
      if (cancelled) return;

      mapboxgl.accessToken = MAPBOX_TOKEN;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coords,
        zoom: 16,
      });

      new mapboxgl.Marker()
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup().setText("Earnest Office"))
        .addTo(mapRef.current);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
    }
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className={cn("w-full h-full", className)}
    />
  );
};

export default MapboxMap;