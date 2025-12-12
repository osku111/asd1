import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { generateMockDevices, generateMockRoute } from "@/lib/gpsSimulator";
import { Device } from "@/components/MapView";
import { Route, Clock, MapPin, Zap } from "lucide-react";

interface RouteData {
  deviceId: string;
  deviceName: string;
  startTime: Date;
  endTime: Date;
  distance: number;
  duration: number;
  avgSpeed: number;
  maxSpeed: number;
  points: number;
}

export default function Routes() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [routes, setRoutes] = useState<RouteData[]>([]);

  useEffect(() => {
    const mockDevices = generateMockDevices(5);
    setDevices(mockDevices);

    // Generate mock routes for each device
    const mockRoutes: RouteData[] = mockDevices.map((device, index) => {
      const routePoints = generateMockRoute(device.id, 20);
      const duration = Math.random() * 240 + 30; // 30-270 minutes
      const distance = Math.random() * 100 + 20; // 20-120 km

      return {
        deviceId: device.id,
        deviceName: device.name,
        startTime: new Date(Date.now() - duration * 60000),
        endTime: new Date(),
        distance: distance,
        duration: duration,
        avgSpeed: (distance / (duration / 60)).toFixed(2) as any,
        maxSpeed: Math.random() * 60 + 40,
        points: routePoints.length,
      };
    });

    setRoutes(mockRoutes);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Routes</h1>
          <p className="text-muted-foreground mt-1">Track and analyze device routes and journeys</p>
        </div>

        {/* Routes Grid */}
        <div className="space-y-4">
          {routes.map((route) => (
            <div
              key={route.deviceId}
              className="border border-border rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{route.deviceName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {route.startTime.toLocaleString()} - {route.endTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Distance</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{route.distance.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">km</p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Duration</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{Math.floor(route.duration)}</p>
                  <p className="text-xs text-muted-foreground">minutes</p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Avg Speed</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{route.avgSpeed}</p>
                  <p className="text-xs text-muted-foreground">km/h</p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Max Speed</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{route.maxSpeed.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">km/h</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Route className="w-4 h-4" />
                View Route on Map
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
