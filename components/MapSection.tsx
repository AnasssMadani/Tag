"use client";
import { Key, Briefcase, Wallet } from "lucide-react";
import {
    Map,
    MapMarker,
    MarkerContent,
    MarkerLabel,
    MarkerPopup,
    MapControls,
} from "@/components/ui/map";

const trackers = [
    {
        id: 1,
        name: "Clés Maison",
        label: "🔑 Clés",
        location: "Maarif, Casablanca",
        lastSeen: "il y a 2 min",
        color: "#4EFFC5",
        Icon: Key,
        lng: -7.6325,
        lat: 33.5895,
    },
    {
        id: 2,
        name: "Sac de travail",
        label: "💼 Sac",
        location: "Anfa, Casablanca",
        lastSeen: "il y a 15 min",
        color: "#7B5CF5",
        Icon: Briefcase,
        lng: -7.6560,
        lat: 33.5750,
    },
    {
        id: 3,
        name: "Portefeuille",
        label: "👛 Portefeuille",
        location: "Gauthier, Casablanca",
        lastSeen: "il y a 5 min",
        color: "#FFD166",
        Icon: Wallet,
        lng: -7.6180,
        lat: 33.5970,
    },
];

export default function MapSection() {
    return (
        <Map
            center={[-7.635, 33.585]}
            zoom={12.5}
            interactive={false}
            styles={{
                dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
            }}
        >
            {trackers.map((tracker) => (
                <MapMarker
                    key={tracker.id}
                    longitude={tracker.lng}
                    latitude={tracker.lat}
                >
                    <MarkerContent>
                        {/* Pulsing ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="w-10 h-10 rounded-full animate-ping"
                                style={{
                                    backgroundColor: tracker.color,
                                    opacity: 0.2,
                                    animationDuration: "2s",
                                }}
                            />
                        </div>
                        {/* Marker dot */}
                        <div
                            className="relative w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center z-10"
                            style={{ backgroundColor: tracker.color, boxShadow: `0 0 12px ${tracker.color}60` }}
                        >
                            <tracker.Icon size={10} className="text-[var(--primary-bg)]" />
                        </div>
                        <MarkerLabel position="bottom">
                            <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                style={{
                                    backgroundColor: `${tracker.color}20`,
                                    color: tracker.color,
                                    border: `1px solid ${tracker.color}30`,
                                }}
                            >
                                {tracker.label}
                            </span>
                        </MarkerLabel>
                    </MarkerContent>
                    <MarkerPopup className="w-52">
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${tracker.color}20` }}
                            >
                                <tracker.Icon size={14} style={{ color: tracker.color }} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{tracker.name}</p>
                                <p className="text-[10px] text-[var(--text-muted)]">{tracker.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[var(--text-secondary)]">
                                Vu {tracker.lastSeen}
                            </span>
                            <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                style={{
                                    backgroundColor: `${tracker.color}15`,
                                    color: tracker.color,
                                }}
                            >
                                Actif
                            </span>
                        </div>
                    </MarkerPopup>
                </MapMarker>
            ))}
        </Map>
    );
}
