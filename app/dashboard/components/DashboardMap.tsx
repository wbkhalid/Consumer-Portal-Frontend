"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";

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

const DashboardMap = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
        <Map
          defaultCenter={{ lat: 31.5204, lng: 74.3587 }}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          defaultZoom={6}
          mapTypeId="satellite"
          disableDefaultUI
        >
          <Markers complaints={complaints} />
        </Map>
      </APIProvider>
    </div>
  );
};

type Complaint = {
  id: number;
  title: string;
  address: string;
  lat: number;
  lng: number;
};

type Props = { complaints: Complaint[] };

const Markers = ({ complaints }: Props) => {
  const map = useMap();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );

  const [markers, setMarkers] = useState<{ [id: number]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, id: number) => {
    if (marker && markers[id]) return;
    if (!marker && !markers[id]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [id]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[id];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {complaints.map((complaint) => (
        <AdvancedMarker
          key={complaint.id}
          position={{ lat: complaint.lat, lng: complaint.lng }}
          ref={(marker) => setMarkerRef(marker, complaint.id)}
          onClick={() => setSelectedComplaint(complaint)}
        >
          <Image src="/images/marker.png" width={24} height={24} alt="marker" />
        </AdvancedMarker>
      ))}

      {selectedComplaint && (
        <InfoWindow
          position={{
            lat: selectedComplaint.lat,
            lng: selectedComplaint.lng,
          }}
          onCloseClick={() => setSelectedComplaint(null)}
        >
          <div
            style={{
              backgroundColor: "#002344",
              border: "1px solid #1BCEF5",
              borderRadius: 0,
              padding: "4px 8px",
              minWidth: "120px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#E5E5EF",
                fontSize: "10px",
              }}
            >
              {selectedComplaint.address}
            </div>

            <div
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: "11px",
                marginTop: "2px",
              }}
            >
              {selectedComplaint.title}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default DashboardMap;
