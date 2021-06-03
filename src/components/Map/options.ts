import { MapOptions } from "./interfaces";
import { styles } from "./MapStyles/";

export const mapOptions: MapOptions = {
  containerStyle: {
    width: "100%",
    height: "76vh",
  },
  zoom: 12,
  center: {
    lat: 10.9878,
    lng: -74.7889,
  },
  options: {
    styles,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    mapTypeControl: false,
  },
};
