import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import MapView from "@/components/MapView";
import { generateMockDevices, generateMockRoute } from "@/lib/gpsSimulator";
import { Device } from "@/components/MapView";
import { MapPin, Activity, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export default function Dashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>();
  const [routes, setRoutes] = useState<Array<{ deviceId: string; points: [number, number][] }>>([]);
  const settings = getSettings();

  useEffect(() => {
    // Generate initial mock devices
    const mockDevices = generateMockDevices(5);
    setDevices(mockDevices);

    // Generate routes for each device
    const mockRoutes = mockDevices.map((device) => ({
      deviceId: device.id,
      points: generateMockRoute(device.id),
    }));
    setRoutes(mockRoutes);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDevices((prevDevices) =>
        prevDevices.map((device) => ({
          ...device,
          latitude: device.latitude + (Math.random() - 0.5) * 0.01,
          longitude: device.longitude + (Math.random() - 0.5) * 0.01,
          speed: Math.max(0, device.speed + (Math.random() - 0.5) * 10),
          lastUpdate: new Date(),
          status: ["online", "offline", "idle"][Math.floor(Math.random() * 3)] as "online" | "offline" | "idle",
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onlineDevices = devices.filter((d) => d.status === "online").length;
  const totalDistance = devices.reduce((sum, d) => sum + d.speed * 0.083, 0); // Rough approximation

  // Filter routes based on settings
  const visibleRoutes = settings.showDeviceRoutes ? routes : [];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{t("dashboard.title")}</h1>
          <p className="text-muted-foreground">
            {t("dashboard.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("dashboard.totalDevices")}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{devices.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("dashboard.onlineDevices")}</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{onlineDevices}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("dashboard.avgSpeed")}</p>
                <p className="text-3xl font-bold text-primary mt-2">
                  {(totalDistance / Math.max(1, devices.length)).toFixed(0)} km/h
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Map and Device List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3 h-96 lg:h-[500px] rounded-lg border border-border overflow-hidden bg-card shadow-sm">
            <MapView
              devices={settings.showDeviceMarkers ? devices : []}
              selectedDevice={selectedDevice}
              routes={visibleRoutes}
            />
          </div>

          {/* Device List */}
          <div className="lg:col-span-1 h-96 lg:h-[500px] flex flex-col border border-border rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h2 className="font-semibold text-foreground">{t("nav.devices")}</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device)}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-border transition-colors hover:bg-muted",
                    selectedDevice?.id === device.id && "bg-primary/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full mt-1.5 flex-shrink-0",
                        device.status === "online"
                          ? "bg-green-500"
                          : device.status === "idle"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{device.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {device.speed.toFixed(1)} km/h
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Devices Table */}
        <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">{t("dashboard.allDevices")}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">{t("devices.status")}</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">{t("devices.speed")}</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">{t("devices.location")}</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">{t("devices.lastUpdate")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {devices.map((device) => (
                  <tr key={device.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-block px-2 py-1 rounded text-xs font-medium",
                          device.status === "online"
                            ? "bg-green-100 text-green-700"
                            : device.status === "idle"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        )}
                      >
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground">{device.speed.toFixed(1)} km/h</td>
                    <td className="px-6 py-4 text-foreground text-xs font-mono">
                      {device.latitude.toFixed(4)}, {device.longitude.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {device.lastUpdate.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
