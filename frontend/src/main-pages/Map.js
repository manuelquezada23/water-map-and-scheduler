import React, { useMemo, useState, useRef, useCallback } from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";
import PictureIcon from '../picture.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleMap, useLoadScript, Marker, MarkerClusterer } from "@react-google-maps/api";
import ReviewPopup from './ReviewPopup';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

function Map() {
  // Authentication:
  const auth = getAuth();
  const [isLoggedIn, setLogIn] = useState(false)
  const [wait, finishAwait] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogIn(true)
      finishAwait(true)
    } else {
      finishAwait(true)
    }
  });
  const navigate = useNavigate()
  
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyDErH86isLuYWxjCkmsE_bpyQ6f59PO2po"
  })
  // loading still
  if (!isLoaded) return <div>Loading...</div>;
  // map page:
  return (
    <div className="main-page-body">
      {(wait === false) &&
        <div></div>
      }
      {(wait === true && isLoggedIn === false) &&
        <div className="map-not-loggedin">
          <img src={logo} className="map-not-loggedin-logo" alt="logo" />
          <p className="map-not-loggedin-text">Log In or Sign Up to use our map!</p>
          <button onClick={() => { navigate("/login") }} className="map-not-loggedin-button">Get Started</button>
        </div>
      }
      {(wait === true && isLoggedIn === true) &&
      //map goes here:
        // <div className="map-loggedin">
        <MapPanel />
        // </div>
      }
    </div>
  );
}

function MapPanel() {
  const center = useMemo(()=>({lat: 41.8268, lng: -71.4025}), [])
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateBuildings(center), [center]);
  const [toggleSeen, setToggle] = useState(false)

  return (
      <div className='map-container'>
          <div className="controls">
            <input type="text"
              id="map-search"
              placeholder="Search"></input>
          </div>
          <GoogleMap id="google-map" zoom={15} center={center} onLoad={onLoad}>
            <Marker 
              position={{lat: 41.8268, lng: -71.4025}} 
              onClick={()=>setToggle(true)} 
            />
            <MarkerClusterer>
                {() =>
                  houses.map((house) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      // clusterer={clusterer}
                    />
                  ))
                }
             </MarkerClusterer>
            {/* {toggleSeen ? <ReviewPopup toggle={setToggle()} /> : null} */}
          </GoogleMap>
    </div>
  );
}

const generateBuildings = (position: google.maps.LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 10; i++) {
    console.log("house")
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};

export default Map
//   let LatLngLiteral = google.maps.LatLngLiteral;
//   let DirectionsResult = google.maps.DirectionsResult;
//   let MapOptions = google.maps.MapOptions;
//   const center = useMemo<LatLngLiteral>(
//     () => ({ lat: 43.45, lng: -80.49 }),
//     []
//   );

//   return (
//     <div className="container">
//       <div className="controls">
//         <h1>Commute?</h1>
//         <Places
//           setOffice={(position) => {
//             setOffice(position);
//             mapRef.current?.panTo(position);
//           }}
//         />
//         {!office && <p>Enter the address of your office.</p>}
//         {directions && <Distance leg={directions.routes[0].legs[0]} />}
//       </div>
//       <div className="map">
//         <GoogleMap
//           zoom={10}
//           center={center}
//           mapContainerClassName="map-container"
//           options={options}
//           onLoad={onLoad}
//         >
//           {directions && (
//             <DirectionsRenderer
//               directions={directions}
//               options={{
//                 polylineOptions: {
//                   zIndex: 50,
//                   strokeColor: "#1976D2",
//                   strokeWeight: 5,
//                 },
//               }}
//             />
//           )}

//           {office && (
//             <>
//               <Marker
//                 position={office}
//                 icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
//               />

//               <MarkerClusterer>
//                 {(clusterer) =>
//                   houses.map((house) => (
//                     <Marker
//                       key={house.lat}
//                       position={house}
//                       clusterer={clusterer}
//                       onClick={() => {
//                         fetchDirections(house);
//                       }}
//                     />
//                   ))
//                 }
//               </MarkerClusterer>
//             </>
//           )}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// }
