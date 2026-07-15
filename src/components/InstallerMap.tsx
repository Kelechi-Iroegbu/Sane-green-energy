import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { type Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed, Star } from "lucide-react";

export type MapInstaller = {
  id: number;
  name: string;
  lga: string;
  rating: number;
  lat: number;
  lng: number;
};

function pinIcon(color: string, size = 30) {
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;background:${color};transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.35);border:2px solid white;"><div style="transform:rotate(45deg);width:${size * 0.32}px;height:${size * 0.32}px;border-radius:50%;background:white;"></div></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 2],
  });
}

const defaultIcon = pinIcon("oklch(0.42 0.1 150)");
const activeIcon = pinIcon("oklch(0.55 0.16 40)", 36);
const userIcon = pinIcon("oklch(0.55 0.18 250)", 26);

const ENUGU_CENTER: [number, number] = [6.5244, 7.5086];

export default function InstallerMap({
  installers,
  activeId,
  onSelect,
}: {
  installers: MapInstaller[];
  activeId: number | null;
  onSelect: (id: number) => void;
}) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [locateStatus, setLocateStatus] = useState<"idle" | "locating" | "denied" | "unsupported">("idle");

  const handleLocate = () => {
    if (!("geolocation" in navigator)) {
      setLocateStatus("unsupported");
      return;
    }
    setLocateStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserPosition(coords);
        setLocateStatus("idle");
        mapRef.current?.flyTo(coords, 12);
      },
      () => setLocateStatus("denied"),
      { timeout: 10000 },
    );
  };

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-border shadow-soft lg:h-[600px]">
      <MapContainer ref={mapRef} center={ENUGU_CENTER} zoom={9} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {installers.map((inst) => (
          <Marker
            key={inst.id}
            position={[inst.lat, inst.lng]}
            icon={inst.id === activeId ? activeIcon : defaultIcon}
            eventHandlers={{ click: () => onSelect(inst.id) }}
          >
            <Popup>
              <div className="text-sm font-semibold">{inst.name}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-current" /> {inst.rating.toFixed(1)} · {inst.lga}
              </div>
            </Popup>
          </Marker>
        ))}
        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="absolute right-3 top-3 z-[1000] flex flex-col items-end gap-1.5">
        <button
          type="button"
          onClick={handleLocate}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium shadow-soft hover:bg-secondary transition-colors"
        >
          <LocateFixed className="h-3.5 w-3.5" />
          {locateStatus === "locating" ? "Locating…" : "Locate me"}
        </button>
        {locateStatus === "denied" && (
          <span className="max-w-[180px] rounded-lg border border-border bg-card px-3 py-1.5 text-right text-[11px] text-muted-foreground shadow-soft">
            Location access denied — showing Enugu State instead.
          </span>
        )}
        {locateStatus === "unsupported" && (
          <span className="max-w-[180px] rounded-lg border border-border bg-card px-3 py-1.5 text-right text-[11px] text-muted-foreground shadow-soft">
            Location isn't supported on this device.
          </span>
        )}
      </div>
    </div>
  );
}
