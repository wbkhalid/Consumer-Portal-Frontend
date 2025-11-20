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
import { ComplaintsListType } from "../page";
import Link from "next/link";
import { formatDate } from "../../utils/utils";

const DashboardMap = ({ data }: { data: ComplaintsListType[] }) => {
  const dashboardDropdownItems = [
    {
      label: "CPC",
      link: "https://cpc.punjabpak.com/dashboard",
    },
    {
      label: "Market Grading",
      link: "https://pricemonitoring.pfa.gop.pk/MandiGrading/GradingDashboard?Pamra=Pamra",
    },
    {
      label: "Premises",
      link: "https://pricemonitoring.pfa.gop.pk/AgencyPremises/PremisesDashboard?Pamra=Pamra",
    },
    {
      label: "Mandi",
      link: "https://pricemonitoring.pfa.gop.pk/PamraMarket/MandiDashboard?Pamra=Pamra",
    },
  ];
  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
          <Map
            defaultCenter={{ lat: 31.5204, lng: 74.3587 }}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
            defaultZoom={7}
            mapTypeId="hybrid"
            disableDefaultUI
            fullscreenControl={true}
            mapTypeControl={false}
          >
            <Markers complaints={data} />
          </Map>
        </APIProvider>
      </div>

      {/* 🔥 Add z-index so it appears on top */}
      <div className="absolute top-1 left-1 z-50 flex gap-4 items-center bg-(--primary) text-white p-1!">
        {dashboardDropdownItems.map((item) => (
          <Link
            key={item.label}
            href={item.link}
            className={`
        p-2!  text-sm
        ${item.label === "CPC" ? "bg-(--primary-bg)" : "bg-transparent"}
        text-white
      `}
          >
            {item.label}
          </Link>
        ))}
      </div>
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
            src="/images/green-marker.png"
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
          {/* <img src="/images/division-card.png" alt="complain-img" /> */}
          <div className="bg-(--primary) border border-[#1BCEF5] py-1! px-2! text-white text-[10px]">
            <div className="flex gap-3 justify-between items-center">
              <p className="font-semibold">{selectedComplaint?.title}</p>
              <p>{formatDate(selectedComplaint?.createdAt)}</p>
            </div>
            <p className="my-0.5!">{selectedComplaint?.address}</p>
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-2 bg-(--primary-bg) p-1! items-center">
                <p className="w-20 whitespace-nowrap">Shop Phone #</p>
                <p className="flex-1">{selectedComplaint?.phoneNumber}</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex gap-2 bg-(--primary-bg) p-1! items-center">
                  <p className="w-20 whitespace-nowrap">Section Category</p>
                  <p className="flex-1 flex gap-1 flex-wrap">
                    {selectedComplaint?.sectionCategories?.map((cat, i) => (
                      <span key={i}>
                        {cat}
                        {i !== selectedComplaint?.sections?.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="flex gap-2 bg-(--primary-bg) p-1! items-center">
                  <p className="w-20 whitespace-nowrap">Section</p>
                  <p className="flex-1 flex gap-1 flex-wrap">
                    {selectedComplaint?.sections?.map((sec, i) => (
                      <span key={i}>
                        {sec}
                        {i !== selectedComplaint?.sections?.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 bg-(--primary-bg) p-1! items-center">
                <p className="w-20 whitespace-nowrap">Category</p>
                <p className="flex-1">{selectedComplaint?.category}</p>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default DashboardMap;
