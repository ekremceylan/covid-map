import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";
import { ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://ismailarilik.com/react-covid-maps/geo.json";

const Main = () => {
  const [geo, setGeo] = useState();
  return (
    <div className="h-[calc(100vh-74px)] bg-zinc-800 text-white overflow-hidden flex flex-col justify-center items-center md:pt-20 wrapper">
      <h1 className="px-6 mt-20">
        Detay Görüntüle {}
        {geo?.properties?.name ? geo.properties.name : "(ülke seçin)"}
      </h1>

      <ComposableMap
        height={1000}
        projectionConfig={{ rotate: [-10, 0, 0], scale: 287 }}
      >
        <ZoomableGroup>
          <Graticule stroke="gray" strokeWidth={0.3} />
          <Sphere stroke="gray" strokeWidth={0.6} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Link to={`/detail?code=${geo.id}`}>
                  {" "}
                  {}
                  <Geography
                    onMouseEnter={() => setGeo(geo)}
                    onMouseLeave={() => setGeo(null)}
                    style={{
                      default: {
                        fill: "#EEE",
                      },
                      hover: {
                        fill: "rgb(54 197 94)",
                      },
                    }}
                    key={geo.rsmKey}
                    geography={geo}
                  />
                </Link>
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Main;
