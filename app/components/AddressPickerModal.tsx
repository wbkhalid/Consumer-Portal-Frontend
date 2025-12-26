"use client";

import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, IconButton } from "@radix-ui/themes";
import { IoClose } from "react-icons/io5";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

type LatLng = { lat: number; lng: number };

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

interface AddressPickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectLocation: (location: LocationData) => void;
  initialLocation?: LatLng | null;
}

interface PlacesAutocompleteProps {
  setSelected: React.Dispatch<React.SetStateAction<LatLng | null>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddressPickerModal({
  onOpenChange,
  onSelectLocation,
  initialLocation,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelectLocation: (v: { lat: number; lng: number; address: string }) => void;
  initialLocation?: LatLng | null;
}) {
  const [selected, setSelected] = useState<LatLng | null>(null);
  const [address, setAddress] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
    libraries: ["places"],
  });

  // 🔥 Sync initial location
  useEffect(() => {
    if (initialLocation) {
      setSelected(initialLocation);
    }
  }, [initialLocation]);

  const center = useMemo(
    () => selected ?? { lat: 31.5204, lng: 74.3587 },
    [selected]
  );

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelected({ lat, lng });

    const geocoder = new google.maps.Geocoder();
    const res = await geocoder.geocode({ location: { lat, lng } });

    if (res.results[0]) {
      setAddress(res.results[0].formatted_address);
    }
  };

  const confirm = () => {
    if (!selected || !address) return;

    onSelectLocation({
      lat: selected.lat,
      lng: selected.lng,
      address,
    });
    onOpenChange(false);
  };

  if (!isLoaded) return null;

  return (
    <>
      <PlacesAutocomplete setSelected={setSelected} setAddress={setAddress} />

      <GoogleMap
        center={center}
        zoom={selected ? 15 : 10}
        mapContainerStyle={{ height: 300, width: "100%" }}
        onClick={handleMapClick}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>

      <Button
        className="mt-3 w-full"
        onClick={confirm}
        disabled={!selected || !address}
      >
        Confirm Location
      </Button>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected, setAddress }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setAddress(address);

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search address..."
      />
      <ComboboxPopover>
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
