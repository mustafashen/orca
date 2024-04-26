import L from "leaflet";
import ws_client from "./ws";
import { getMapBoundCoordinates } from "./utils";
import { Markers } from "./markers";

const map = L.map("map").setView([51.505, -0.09], 13);
const markers = new Markers(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

ws_client.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  if (!data.error) {
    markers.setMarker(data);
  } else {
    console.log(Error(data.error));
  }
};

map.on("moveend", () => {
  const { swLat, swLng, neLat, neLng } = getMapBoundCoordinates(map);
  const message = `[[[${swLat},${swLng}],[${neLat},${neLng}]]]`;
  ws_client.send(message);
});
