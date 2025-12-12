import { Device } from "@/components/MapView";

// Simulate GPS coordinates with random walk
export function generateRandomWalkCoordinates(
  initialLat: number,
  initialLng: number,
  step: number = 0.001
): [number, number] {
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomDistance = (Math.random() - 0.5) * 2 * step;

  const cosAngle = Math.cos(randomAngle);
  const sinAngle = Math.sin(randomAngle);

  const deltaLat = randomDistance * cosAngle;
  const deltaLng = randomDistance * sinAngle * Math.cos((initialLat * Math.PI) / 180);

  return [
    Math.max(-90, Math.min(90, initialLat + deltaLat)),
    Math.max(-180, Math.min(180, initialLng + deltaLng)),
  ];
}

export function generateMockDevices(count: number = 5): Device[] {
  const devices: Device[] = [];
  const cities = [
    { name: "Helsinki", lat: 60.1699, lng: 24.9384 },
    { name: "Tampere", lat: 61.4978, lng: 23.7603 },
    { name: "Turku", lat: 60.4518, lng: 22.2666 },
    { name: "Oulu", lat: 64.2008, lng: 27.7241 },
    { name: "Jyväskylä", lat: 62.2411, lng: 25.7482 },
  ];

  const statuses: Array<"online" | "offline" | "idle"> = ["online", "offline", "idle"];
  const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-red-500"];

  for (let i = 0; i < count; i++) {
    const city = cities[i % cities.length];
    const [newLat, newLng] = generateRandomWalkCoordinates(city.lat, city.lng);

    devices.push({
      id: `device-${i + 1}`,
      name: `${city.name} Tracker ${i + 1}`,
      latitude: newLat,
      longitude: newLng,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      speed: Math.random() * 120,
      lastUpdate: new Date(Date.now() - Math.random() * 300000),
      color: colors[i % colors.length],
    });
  }

  return devices;
}

export function generateMockRoute(deviceId: string, points: number = 20): [number, number][] {
  const startLat = 60.1699 + (Math.random() - 0.5) * 0.5;
  const startLng = 24.9384 + (Math.random() - 0.5) * 0.5;

  const route: [number, number][] = [[startLat, startLng]];

  for (let i = 1; i < points; i++) {
    const lastPoint = route[route.length - 1];
    const [newLat, newLng] = generateRandomWalkCoordinates(lastPoint[0], lastPoint[1], 0.0005);
    route.push([newLat, newLng]);
  }

  return route;
}
