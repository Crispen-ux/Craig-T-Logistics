"use client";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, Tooltip, useMap } from "react-leaflet";

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 9);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds.pad(0.3), { animate: true });
  }, [map, points]);
  return null;
}

export default function CorridorMapInner({ points = [], route = null, className = "", label = "Map of routes" }) {
  const [line, setLine] = useState(null);

  const center = useMemo(() => {
    if (!points.length) return { lat: -29.5, lng: 25.5 };
    const lat = points.reduce((s, p) => s + p.lat, 0) / points.length;
    const lng = points.reduce((s, p) => s + p.lng, 0) / points.length;
    return { lat, lng };
  }, [points]);

  useEffect(() => {
    if (!route || points.length !== 2) {
      setLine(null);
      return;
    }
    let alive = true;
    const [a, b] = points;
    const url = `https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive) return;
        const coords = j?.routes?.[0]?.geometry?.coordinates;
        if (coords) setLine(coords.map(([lng, lat]) => [lat, lng]));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [route, points]);

  return (
    <div className={`map-frame relative ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={points.length > 1 ? 6 : 7}
        scrollWheelZoom={false}
        className="h-full w-full"
        aria-label={label}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {line && <Polyline positions={line} pathOptions={{ color: "#FFB81C", weight: 5, opacity: 0.9 }} />}
        {points.map((p) => (
          <CircleMarker
            key={`${p.lat}-${p.lng}`}
            center={[p.lat, p.lng]}
            radius={8}
            pathOptions={{
              color: line ? "#10222E" : "#FFB81C",
              weight: 3,
              fillColor: line ? "#FFB81C" : "#0B3A5B",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>{p.name}</strong>
              {p.note ? <div style={{ fontSize: 12, opacity: 0.75 }}>{p.note}</div> : null}
            </Popup>
            <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
              {p.name}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
      {!line && points.length === 2 && (
        <span className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink shadow-soft">
          Route geometry by OSRM · OpenStreetMap
        </span>
      )}
    </div>
  );
}
