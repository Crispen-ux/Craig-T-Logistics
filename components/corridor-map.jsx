"use client";
import dynamic from "next/dynamic";

const Inner = dynamic(() => import("./corridor-map-inner"), {
  ssr: false,
  loading: () => <div className="map-frame animate-pulse" aria-hidden="true" />,
});

export default function CorridorMap(props) {
  return <Inner {...props} />;
}
