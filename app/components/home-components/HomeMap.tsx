"use client";

import { ComplaintsListType } from "../../page";
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
import Cookies from "js-cookie";

const HomeMap = ({ data }: { data: ComplaintsListType[] }) => {
  // const lat = Cookies.get("lat") ?? 31.5204;
  // const long = Cookies.get("long") ?? 74.3587;
  //  31.5204, lng: 74.3587

  return (
    <div className=" w-full h-[450px] rounded-2xl overflow-hidden shadow-sm border-2  border-[#E5E7EB] col-span-12">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
        <Map
          defaultCenter={{
            lat: 31.5204,
            lng: 74.3587,
          }}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          defaultZoom={9}
          mapTypeId="hybrid"
          disableDefaultUI
          fullscreenControl={true}
          mapTypeControl={false}
        >
          <Markers complaints={data} />
        </Map>
      </APIProvider>
    </div>
  );
};

interface Props {
  complaints: ComplaintsListType[];
}

const Markers = ({ complaints }: Props) => {
  const map = useMap();
  const [selectedComplaint, setSelectedComplaint] =
    useState<ComplaintsListType | null>(null);

  const [markers, setMarkers] = useState<{ [id: number]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener("click", () => {
      setSelectedComplaint(null);
    });

    return () => listener.remove();
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
          key={complaint?.complaintId}
          position={{ lat: complaint?.lattitude, lng: complaint?.longitude }}
          ref={(marker) => setMarkerRef(marker, complaint.complaintId)}
          onClick={() => setSelectedComplaint(complaint)}
        >
          <Image
            src="/images/gradient-marker.png"
            width={24}
            height={24}
            alt="marker"
          />
        </AdvancedMarker>
      ))}

      {selectedComplaint && (
        <InfoWindow
          position={{
            lat: selectedComplaint?.lattitude,
            lng: selectedComplaint?.longitude,
          }}
          onCloseClick={() => setSelectedComplaint(null)}
          pixelOffset={[0, -15]}
        >
          <div
            style={{
              backgroundColor: "var(--primary)",
              // border: "1px solid #1BCEF5",
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
              {selectedComplaint?.address}
            </div>

            <div
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: "11px",
                marginTop: "2px",
              }}
            >
              {selectedComplaint?.title}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default HomeMap;
