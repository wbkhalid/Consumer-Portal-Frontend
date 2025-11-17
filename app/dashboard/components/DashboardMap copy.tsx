"use client";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect } from "react";

export const complaints = [
  {
    id: 1,
    title: "Water Leakage Issue",
    address: "Model Town, Lahore",
    lat: 31.4827,
    lng: 74.3294,
  },
  {
    id: 2,
    title: "Street Light Not Working",
    address: "Johar Town, Lahore",
    lat: 31.4674,
    lng: 74.2662,
  },
  {
    id: 3,
    title: "Garbage Not Collected",
    address: "Bahria Town, Lahore",
    lat: 31.3847,
    lng: 74.2409,
  },
  {
    id: 4,
    title: "Sewerage Overflow",
    address: "Gulberg III, Lahore",
    lat: 31.5204,
    lng: 74.3587,
  },
  {
    id: 5,
    title: "Road Broken",
    address: "Cantt, Lahore",
    lat: 31.5207,
    lng: 74.3996,
  },
];

const provincesData = [
  {
    name: "Punjab",
    fillColor: "#FFC107",
    fillOpacity: 0.3,
    paths: [
      // Punjab ke boundary ke bohat saray coordinates yahan ainge
      { lat: 34.02, lng: 72.82 },
      { lat: 33.5, lng: 71.8 },
      { lat: 32.0, lng: 71.0 },
      { lat: 29.5, lng: 70.0 },
      { lat: 28.0, lng: 70.5 },
      { lat: 29.0, lng: 72.0 },
      { lat: 30.0, lng: 74.0 },
      { lat: 32.5, lng: 75.0 },
      // ... aur bohat saray coordinates
    ],
  },
];

const ProvincesLayer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const polygons = provincesData.map((province) => {
      const polygon = new window.google.maps.Polygon({
        paths: province.paths,
        strokeColor: "#000", // Border ka color
        strokeOpacity: 0.8,
        strokeWeight: 2, // Border ki motai
        fillColor: province.fillColor,
        fillOpacity: province.fillOpacity,
      });

      // Polygon ko map par set karein
      polygon.setMap(map);
      return polygon;
    });

    // Cleanup function: Jab component unmount ho to polygons ko map se hata dein
    return () => {
      polygons.forEach((polygon) => {
        polygon.setMap(null);
      });
    };
  }, [map]); // Yeh effect tab chalega jab map ready ho jayega

  return null; // Yeh component UI mein kuch render nahi karta
};

const DashboardMap = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
        <Map
          defaultCenter={{ lat: 31.5204, lng: 74.3587 }}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          defaultZoom={8}
          mapTypeId="satellite"
          disableDefaultUI
        >
          <ProvincesLayer />
          {complaints.map((complaint) => (
            <AdvancedMarker
              position={{ lat: complaint?.lat, lng: complaint?.lng }}
            >
              <Image
                src="/images/marker.png"
                width={24}
                height={24}
                alt="marker"
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default DashboardMap;
