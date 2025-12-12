import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { reverseGeocode } from "@/lib/geocoding";

export interface Device {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: "online" | "offline" | "idle";
  speed: number;
  lastUpdate: Date;
  color: string;
}

interface MapViewProps {
  devices: Device[];
  selectedDevice?: Device;
  routes?: Array<{ deviceId: string; points: [number, number][] }>;
}

const getMarkerColor = (status: "online" | "offline" | "idle") => {
  return status === "online" ? "#10b981" : status === "idle" ? "#eab308" : "#ef4444";
};

export default function MapView({ devices, selectedDevice, routes }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const routesRef = useRef<Map<string, L.Polyline>>(new Map());
  const addressCacheRef = useRef<Map<string, string>>(new Map());

  // Initialize map
  useEffect(() => {
    if (mapRef.current) return; // Already initialized

    const map = L.map("gps-map").setView([60.1699, 24.9384], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      // Cleanup
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers and routes
  useEffect(() => {
    if (!mapRef.current) return;

    // Update device markers
    devices.forEach((device) => {
      const existingMarker = markersRef.current.get(device.id);
      const cacheKey = `${device.latitude.toFixed(4)},${device.longitude.toFixed(4)}`;

      if (existingMarker) {
        // Update existing marker position
        existingMarker.setLatLng([device.latitude, device.longitude]);
        const popup = existingMarker.getPopup();
        if (popup) {
          // Try to get cached address or update popup
          if (addressCacheRef.current.has(cacheKey)) {
            popup.setContent(createPopupContent(device, addressCacheRef.current.get(cacheKey) || "Unknown location"));
          } else {
            // Load address asynchronously
            reverseGeocode(device.latitude, device.longitude).then((address) => {
              addressCacheRef.current.set(cacheKey, address);
              popup.setContent(createPopupContent(device, address));
            });
          }
        }
      } else {
        // Create new marker
        const color = getMarkerColor(device.status);
        const html = `
          <div style="width: 32px; height: 32px; background-color: ${color}; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">●</div>
        `;

        // Get address from cache or load it
        const address = addressCacheRef.current.get(cacheKey) || "Loading address...";

        const marker = L.marker([device.latitude, device.longitude], {
          icon: L.divIcon({
            html,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
            className: "custom-marker",
          }),
        })
          .addTo(mapRef.current)
          .bindPopup(createPopupContent(device, address));

        // Load address if not cached
        if (!addressCacheRef.current.has(cacheKey)) {
          reverseGeocode(device.latitude, device.longitude).then((addr) => {
            addressCacheRef.current.set(cacheKey, addr);
            const popup = marker.getPopup();
            if (popup) {
              popup.setContent(createPopupContent(device, addr));
            }
          });
        }

        markersRef.current.set(device.id, marker);
      }
    });

    // Remove markers for devices that no longer exist
    markersRef.current.forEach((marker, deviceId) => {
      if (!devices.find((d) => d.id === deviceId)) {
        mapRef.current?.removeLayer(marker);
        markersRef.current.delete(deviceId);
      }
    });
  }, [devices]);

  // Update routes
  useEffect(() => {
    if (!mapRef.current || !routes) return;

    routes.forEach((route) => {
      const existingRoute = routesRef.current.get(route.deviceId);

      if (existingRoute) {
        mapRef.current?.removeLayer(existingRoute);
        routesRef.current.delete(route.deviceId);
      }

      if (route.points.length > 1) {
        const polyline = L.polyline(route.points, {
          color: "#3b82f6",
          opacity: 0.5,
          weight: 2,
        }).addTo(mapRef.current);

        routesRef.current.set(route.deviceId, polyline);
      }
    });
  }, [routes]);

  // Update map center when selectedDevice changes
  useEffect(() => {
    if (!mapRef.current) return;

    if (selectedDevice) {
      mapRef.current.setView([selectedDevice.latitude, selectedDevice.longitude], 13);
    } else if (devices.length > 0) {
      const avgLat = devices.reduce((sum, d) => sum + d.latitude, 0) / devices.length;
      const avgLng = devices.reduce((sum, d) => sum + d.longitude, 0) / devices.length;
      mapRef.current.setView([avgLat, avgLng], 7);
    }
  }, [selectedDevice, devices]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-border shadow-sm">
      <div id="gps-map" style={{ width: "100%", height: "100%" }} className="leaflet-container" />
    </div>
  );
}

function createPopupContent(device: Device, address?: string): string {
  const statusColor =
    device.status === "online"
      ? "text-green-600"
      : device.status === "idle"
        ? "text-yellow-600"
        : "text-red-600";

  const statusColorHex =
    device.status === "online" ? "green" : device.status === "idle" ? "orange" : "red";

  return `
    <div style="min-width: 220px; font-family: Inter, sans-serif;">
      <h3 style="font-weight: bold; margin: 0 0 8px 0; font-size: 14px;">${device.name}</h3>
      <div style="margin: 8px 0; font-size: 12px; color: #666;">
        <p style="margin: 4px 0;"><span style="font-weight: 500;">Status:</span> <span style="color: ${statusColorHex}; font-weight: 500;">${device.status.charAt(0).toUpperCase() + device.status.slice(1)}</span></p>
        <p style="margin: 4px 0;"><span style="font-weight: 500;">Speed:</span> ${device.speed.toFixed(1)} km/h</p>
        ${address ? `<p style="margin: 4px 0;"><span style="font-weight: 500;">Address:</span></p><p style="margin: 4px 0; font-size: 11px;">${address}</p>` : ""}
        <p style="margin: 4px 0;"><span style="font-weight: 500;">Coordinates:</span></p>
        <p style="margin: 4px 0; font-family: monospace; font-size: 11px;">${device.latitude.toFixed(4)}°, ${device.longitude.toFixed(4)}°</p>
        <p style="margin: 4px 0;"><span style="font-weight: 500;">Last Update:</span></p>
        <p style="margin: 4px 0;">${device.lastUpdate.toLocaleTimeString()}</p>
      </div>
    </div>
  `;
}
