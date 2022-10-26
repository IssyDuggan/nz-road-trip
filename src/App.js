import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import campsites from "./data/DOC_Campsites.json"

function createIcon() {
  return new L.Icon({
    iconUrl: require("./data/sites.png"),
    iconSize: 40
  });
};

const PopupData = (sites) => {
  return (
    <div>
      {/* configure popup */}
      <h2>{sites.properties.name}</h2>
      <h3>{sites.properties.place}</h3>
      <h4>{"Category: " + sites.properties.campsiteCategory}</h4>
      <p1>{sites.properties.introduction}</p1><br></br>
      <img src={sites.properties.introductionThumbnail} /><br></br>
      <p1>{sites.properties.facilities}</p1><br></br>
      <p1>{"Booking available: " + sites.properties.bookable}</p1><br></br>
      <a href={sites.properties.staticLink}>Find out more</a>
    </div>
  )

}



function App() {

  // filter the data
  const filteredSites = campsites.features.filter(sites =>

    // Only open campsites
    sites.properties.status === "OPEN"
  )

  // console.log(campsites.features)
  return (
    <MapContainer center={[-40.900, 174.885]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        // satellite tiles 

        // url='https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'
        // attribution='<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>'
        // apikey='choisirgeoportail'
        // style='normal'
        // format='image/jpeg'

        // Google tiles
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />

      {filteredSites.map(sites => (
        <Marker
          //locate key and coords in geojson object

          key={sites.properties.OBJECTID}
          icon={createIcon()}
          position={[sites.geometry.coordinates[1],
          sites.geometry.coordinates[0]]}>

          <Popup position={[sites.geometry.coordinates[1],
          sites.geometry.coordinates[0]]}>
            {PopupData(sites)}

            {/* Make seperate components */}
          </Popup>
        </Marker>

      ))
      }
    </MapContainer>
  );
}

export default App;
