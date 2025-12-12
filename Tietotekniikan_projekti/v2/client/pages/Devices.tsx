import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { generateMockDevices } from "@/lib/gpsSimulator";
import { Device } from "@/components/MapView";
import { Smartphone, Plus, Edit2, Trash2 } from "lucide-react";

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    setDevices(generateMockDevices(5));
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Devices</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor your GPS devices</p>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" />
            Add Device
          </button>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="border border-border rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{device.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">ID: {device.id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-muted rounded-md transition-colors">
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-md transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Status</p>
                  <p className="text-sm mt-1">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        device.status === "online"
                          ? "bg-green-100 text-green-700"
                          : device.status === "idle"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">Current Speed</p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {device.speed.toFixed(1)} km/h
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">Last Update</p>
                  <p className="text-sm text-foreground mt-1">
                    {device.lastUpdate.toLocaleString()}
                  </p>
                </div>
              </div>

              <button className="w-full py-2 border border-border rounded-lg text-primary font-medium hover:bg-primary/5 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
