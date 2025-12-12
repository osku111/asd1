// Mock addresses for demo purposes
const MOCK_ADDRESSES: Record<string, string> = {
  "60.1699,24.9384": "Pohjoisranta 2, Helsinki, Finland",
  "61.4978,23.7603": "Hämeenkatu 13, Tampere, Finland",
  "60.4518,22.2666": "Aurakatu 8, Turku, Finland",
  "64.2008,27.7241": "Hallituskatu 7, Oulu, Finland",
  "62.2411,25.7482": "Cygnaeuksenkatu 12, Jyväskylä, Finland",
};

const FINNISH_CITIES = [
  { name: "Helsinki", lat: 60.1699, lng: 24.9384, address: "Helsinki, Finland" },
  { name: "Tampere", lat: 61.4978, lng: 23.7603, address: "Tampere, Finland" },
  { name: "Turku", lat: 60.4518, lng: 22.2666, address: "Turku, Finland" },
  { name: "Oulu", lat: 64.2008, lng: 27.7241, address: "Oulu, Finland" },
  { name: "Jyväskylä", lat: 62.2411, lng: 25.7482, address: "Jyväskylä, Finland" },
  { name: "Espoo", lat: 60.2052, lng: 24.655, address: "Espoo, Finland" },
  { name: "Lahti", lat: 60.9827, lng: 25.6581, address: "Lahti, Finland" },
  { name: "Kuopio", lat: 62.8921, lng: 27.6787, address: "Kuopio, Finland" },
  { name: "Vaasa", lat: 63.0955, lng: 21.6121, address: "Vaasa, Finland" },
  { name: "Turku", lat: 60.4518, lng: 22.2666, address: "Turku, Finland" },
];

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  // Mock: find nearest city
  const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  
  if (MOCK_ADDRESSES[key]) {
    return MOCK_ADDRESSES[key];
  }

  // Find closest city
  let closest = FINNISH_CITIES[0];
  let minDistance = Infinity;

  for (const city of FINNISH_CITIES) {
    const distance = Math.sqrt(
      Math.pow(lat - city.lat, 2) + Math.pow(lng - city.lng, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closest = city;
    }
  }

  return closest.address;
}

export function searchByAddress(query: string): Array<{ name: string; lat: number; lng: number; address: string }> {
  const lowerQuery = query.toLowerCase();
  return FINNISH_CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(lowerQuery) ||
      city.address.toLowerCase().includes(lowerQuery)
  );
}

export function searchDevicesByAddress(
  devices: Array<{ id: string; name: string; latitude: number; longitude: number }>,
  query: string
): typeof devices {
  const lowerQuery = query.toLowerCase();
  return devices.filter((device) =>
    device.name.toLowerCase().includes(lowerQuery)
  );
}
