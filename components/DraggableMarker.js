import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import * as L from "leaflet";
import "leaflet-defaulticon-compatibility";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";

const DraggableMarker = ({ newSet }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const markerRef = useRef(null);
  const [draggable, setDraggable] = useState(true);
  const [newPosition, setNewPosition] = useState({
    lat: 38.754082999999994,
    lng: 35.288086,
  });
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    const lat = Number(localStorage.getItem("lat"));
    const lng = Number(localStorage.getItem("lng"));
    setNewPosition({ lat: lat, lng: lng });
  }, [markerPosition]);

  useEffect(() => {
    newSet(markerPosition);
  }, [markerPosition, newPosition]);



  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          localStorage.setItem("lat", marker._latlng.lat);
          localStorage.setItem("lng", marker._latlng.lng);
          setMarkerPosition(marker._latlng);
        }
      },
    }),
    []
  );

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }
  if (!window) {
    return null;
  }

  return (
    <MapContainer
      center={newPosition}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: 300, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={newPosition}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span>Konumunuz</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DraggableMarker;
