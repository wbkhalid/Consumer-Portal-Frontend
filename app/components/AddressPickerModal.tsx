"use client";
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@radix-ui/themes";

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

interface Props {
  onSelect: (location: LocationData) => void;
  onClose: () => void;
}

type LatLngLiteral = google.maps.LatLngLiteral;

export default function AddressPickerModal({ onSelect, onClose }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
    libraries: ["places"],
  });

  const [center, setCenter] = useState<LatLngLiteral>({
    lat: 31.5204,
    lng: 74.3587,
  });

  const [marker, setMarker] = useState<LatLngLiteral | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  if (!isLoaded) return null;

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const pos = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setMarker(pos);
    setCenter(pos);

    const results = await getGeocode({ location: pos });

    setSelectedLocation({
      lat: pos.lat,
      lng: pos.lng,
      address: results[0]?.formatted_address || `${pos.lat}, ${pos.lng}`,
    });
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-2!">
        <p className="font-semibold text-sm">Select Location</p>
        <IoClose className="cursor-pointer" onClick={onClose} />
      </div>

      {/* SEARCH */}
      <div className="p-2!">
        <PlacesAutocomplete
          onSelect={(loc) => {
            setCenter({ lat: loc.lat, lng: loc.lng });
            setMarker({ lat: loc.lat, lng: loc.lng });
            setSelectedLocation(loc);
          }}
        />
      </div>

      {/* MAP */}
      <GoogleMap
        center={center}
        zoom={14}
        onClick={handleMapClick}
        mapContainerStyle={{ height: 300, width: "100%" }}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>

      {/* FOOTER */}
      <div className="flex justify-between p-2!">
        <Button variant="soft" onClick={onClose} className="cursor-pointer!">
          Close
        </Button>

        <Button
          className="cursor-pointer!"
          disabled={!selectedLocation}
          onClick={() => {
            if (!selectedLocation) return;
            onSelect(selectedLocation);
            onClose();
          }}
        >
          Confirm Location
        </Button>
      </div>
    </>
  );
}

const PlacesAutocomplete = ({
  onSelect,
}: {
  onSelect: (loc: LocationData) => void;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    onSelect({
      lat,
      lng,
      address: results[0]?.formatted_address || address,
    });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search address"
        className="w-full border px-2! py-1! rounded-md"
      />

      <ComboboxPopover portal={false}>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
