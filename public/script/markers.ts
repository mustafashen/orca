import L, { Map } from "leaflet";
import { PositionReport } from "./types";
import { vesselStatusCodes } from "./constants";

export class Markers {
  private map: Map;
  private markerState = {};

  constructor(map: Map) {
    this.map = map;
  }

  createPopupContent(data: PositionReport) {
    const {
      MetaData: { ShipName },
      Message: {
        PositionReport: { Latitude, Longitude },
      },
    } = data;

    return `
      <div class="popup-ctn">
        <div class="popup-header">
          <h2>${ShipName}</h2>
          </div>
          <div class="popup-body">
            <p>Latitude: ${Latitude}</p>
            <p>Longitude: ${Longitude}</p>
            <p>COG: ${data.Message.PositionReport.Cog}</p>
            <p>SOG: ${data.Message.PositionReport.Sog}</p>
            <p>Navigational Status: ${
              vesselStatusCodes[data.Message.PositionReport.NavigationalStatus]
            }</p>
            <p>Timestamp: ${data.Message.PositionReport.Timestamp}</p>
          </div>
        </div>
      </div>`;
  }

  setMarker(data: PositionReport) {
    const markerLatitude = data.Message.PositionReport.Latitude;
    const markerLongitude = data.Message.PositionReport.Longitude;
    if (markerLatitude && markerLongitude) {
      const latLng = L.latLng(markerLatitude, markerLongitude);
      const marker = this.markerState[data.MetaData.ShipName.trim()];
      const boatIcon = L.divIcon({
        html: `<svg transform="rotate(${data.Message.PositionReport.Cog})" viewBox="0 0 24 24" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><path id="secondary" d="M17.16,20.79,12,17.37,6.84,20.79a1.14,1.14,0,0,1-1.77-1.23l6-15.92a1,1,0,0,1,1.88,0l6,15.92A1.14,1.14,0,0,1,17.16,20.79Z" style="fill: rgb(44, 169, 188); stroke-width: 2;"></path><path id="primary" d="M17.16,20.79,12,17.37,6.84,20.79a1.14,1.14,0,0,1-1.77-1.23l6-15.92a1,1,0,0,1,1.88,0l6,15.92A1.14,1.14,0,0,1,17.16,20.79Z" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>`,
        iconSize: [25, 25],
        iconAnchor: [12.5, 12.5],
        className: "marker-ctn",
      });
      if (marker) {
        marker.instance.setLatLng(latLng, {}).update();
        marker.data = data;
      } else {
        this.markerState[data.MetaData.ShipName.trim()] = {
          instance: L.marker(latLng, {
            icon: boatIcon,
          })
            .bindPopup(this.createPopupContent(data))
            .addTo(this.map),
          data: data,
        };
      }
    }
  }
}
