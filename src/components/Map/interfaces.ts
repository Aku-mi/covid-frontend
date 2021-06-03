export interface Coord {
  lat?: number;
  lng?: number;
  icon?: string;
  inf?: string;
  inf1?: string;
  inf2?: string;
}

export interface MapOptions {
  containerStyle: object;
  zoom: number;
  options: object;
  center: Coord;
}

export interface MapParams {
  coordsM: Coord[];
  mapOptions: MapOptions;
  markerOptions?: object;
}
