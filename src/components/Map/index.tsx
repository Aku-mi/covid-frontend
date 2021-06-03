import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { Coord, MapParams } from "./interfaces";

const libraries: ["drawing"] = ["drawing"];

export const Map: React.FC<MapParams> = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "MAPS_API_KEY",
    libraries,
  });

  const [select, setSelect] = useState<Coord | null>(null);

  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerStyle={props.mapOptions.containerStyle}
        zoom={props.mapOptions.zoom}
        center={props.mapOptions.center}
        options={props.mapOptions.options}
      >
        {props.coordsM &&
          props.coordsM.map((m, i) => (
            <Marker
              key={i}
              position={m}
              options={props.markerOptions}
              onClick={() => setSelect(m)}
              icon={{
                url: m.icon || "/images/rojo.png",
                scaledSize: new (window as any).google.maps.Size(20, 20),
                origin: new (window as any).google.maps.Point(0, 0),
                anchor: new (window as any).google.maps.Point(10, 10),
              }}
            />
          ))}

        {select ? (
          <InfoWindow
            position={{ lat: select.lat, lng: select.lng }}
            onCloseClick={() => setSelect(null)}
          >
            <div>
              <p>{select.inf}</p>
              <p>{select.inf1}</p>
              <p>{select.inf2}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    );
  } else {
    return <div>Map is not ready!</div>;
  }
};
