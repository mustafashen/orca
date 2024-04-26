import { Map } from "leaflet";

export function getMapBoundCoordinates(map: Map) {
  const bounds = map.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  const swLat = sw.lat.toFixed(4);
  const swLng = sw.lng.toFixed(4);
  const neLat = ne.lat.toFixed(4);
  const neLng = ne.lng.toFixed(4);
  return { swLat, swLng, neLat, neLng };
}
