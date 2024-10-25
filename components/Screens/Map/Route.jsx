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