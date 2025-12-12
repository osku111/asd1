import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { generateMockDevices } from "@/lib/gpsSimulator";
import { Device } from "@/components/MapView";
import { BarChart3, TrendingUp, Calendar, Download } from "lucide-react";

interface ReportData {
  deviceId: string;
  deviceName: string;
  totalDistance: number;
  totalTime: number;
  totalTrips: number;
  avgSpeed: number;
  maxSpeed: number;
  fuelConsumption: number;
}

export default function Reports() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [reports, setReports] = useState<ReportData[]>([]);

  useEffect(() => {
    const mockDevices = generateMockDevices(5);
    setDevices(mockDevices);

    // Generate mock reports for each device
    const mockReports: ReportData[] = mockDevices.map((device) => ({
      deviceId: device.id,
      deviceName: device.name,
      totalDistance: Math.random() * 5000 + 1000,
      totalTime: Math.random() * 10000 + 2000,
      totalTrips: Math.floor(Math.random() * 50 + 10),
      avgSpeed: Math.random() * 50 + 30,
      maxSpeed: Math.random() * 80 + 60,
      fuelConsumption: Math.random() * 500 + 100,
    }));

    setReports(mockReports);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Detailed analytics and statistics for all devices
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-4 flex-1">
            <input
              type="date"
              className="px-3 py-2 border border-border rounded-lg text-foreground bg-background"
              defaultValue={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            />
            <span className="text-muted-foreground">to</span>
            <input
              type="date"
              className="px-3 py-2 border border-border rounded-lg text-foreground bg-background"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Total Distance</p>
            <p className="text-2xl font-bold text-foreground mt-2">
              {reports.reduce((sum, r) => sum + r.totalDistance, 0).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">km</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Total Trips</p>
            <p className="text-2xl font-bold text-foreground mt-2">
              {reports.reduce((sum, r) => sum + r.totalTrips, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">trips</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Avg Speed</p>
            <p className="text-2xl font-bold text-foreground mt-2">
              {(reports.reduce((sum, r) => sum + r.avgSpeed, 0) / reports.length).toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">km/h</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Fuel Used</p>
            <p className="text-2xl font-bold text-foreground mt-2">
              {reports.reduce((sum, r) => sum + r.fuelConsumption, 0).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">liters</p>
          </div>
        </div>

        {/* Device Reports Table */}
        <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Device Performance Report</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Device</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Distance</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Trips</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Avg Speed</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Max Speed</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Fuel Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reports.map((report) => (
                  <tr key={report.deviceId} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{report.deviceName}</td>
                    <td className="px-6 py-4 text-foreground">{report.totalDistance.toFixed(1)} km</td>
                    <td className="px-6 py-4 text-foreground">{report.totalTrips}</td>
                    <td className="px-6 py-4 text-foreground">{report.avgSpeed.toFixed(1)} km/h</td>
                    <td className="px-6 py-4 text-foreground">{report.maxSpeed.toFixed(1)} km/h</td>
                    <td className="px-6 py-4 text-foreground">{report.fuelConsumption.toFixed(0)} L</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trend Info */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 flex items-center gap-4">
          <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground">Performance Insights</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your fleet has traveled 18,234 km over the past 30 days with an average speed of 42.5 km/h.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
