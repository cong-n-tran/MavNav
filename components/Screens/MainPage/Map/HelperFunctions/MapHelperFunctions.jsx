// Decode the polyline points to latitude and longitude
// This is because the json response from google direction api attribute labled "overview_polyline"
// It is encoded that tells us the simplify route to the destination
export const decode = (t, e = 5) => {
  let points = [];
  let lat = 0, lng = 0, shift = 0, result = 0, byte = null, latitude_change, longitude_change;
  const factor = Math.pow(10, e);
  for (let i = 0; i < t.length;) {
    byte = null;
    shift = 0;
    result = 0;
    do {
      byte = t.charCodeAt(i++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += latitude_change;
    shift = 0;
    result = 0;
    do {
      byte = t.charCodeAt(i++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += longitude_change;
    points.push({ latitude: lat / factor, longitude: lng / factor });
  }
  return points;
};

// tbh idek what this is, i just found it on google
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const R = 6371e3; // Earth's radius in meters

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}
export const closestEntry = (currentLocation, buildingEntries) => {
  let closestEntry = null;
  let shortestDistance = Infinity;
  for (const [entryName, entryCoordinates] of Object.entries(buildingEntries)) {
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      entryCoordinates.latitude,
      entryCoordinates.longitude
    );
  
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestEntry = { name: entryName, coordinates: entryCoordinates };
    }
  }
  return closestEntry
}
// use to adjust the zoomlevel, given input
export const calculateZoomLevel = (distance) => {
  if (distance < 0.5) return 16; // Close up, zoom in more
  if (distance < 1) return 15; // Still close, zoom in slightly less
  if (distance < 3) return 14; // Medium close
  if (distance < 5) return 13; // Moderate zoom
  if (distance < 10) return 12; // Zoomed out a bit
  if (distance < 20) return 11; // Far, zoom out further
  return 10; // Very far, zoom out more
};

// returns the 360 direction of a start coordinate to end coordinate
export const calculateHeading = (start, end) => {
  return (
    (Math.atan2(end.lng - start.lng, end.lat - start.lat) * (180 / Math.PI) + 360) % 360
  );
};