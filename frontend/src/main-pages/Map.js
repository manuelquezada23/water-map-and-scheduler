import React, { useMemo, useState, useRef, useCallback } from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, LatLngLiteral, InfoWindow } from "@react-google-maps/api";
import ReviewPopup from './ReviewPopup';
import Data from "/Users/mayafleischer/Desktop/cs32/term-project-cpelling-ehinds3-mfleisc1-mquezad1/frontend/src/mock-data.json"
/**This needs to be db of all the buildings */

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
        <MapPanel />
      }
    </div>
  );
}

function MapPanel() {
  const center = useMemo(()=>({lat: 41.8268, lng: -71.4025}), [])
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateBuildings(center), [center]);
  const [toggleSelected, setSelected] = useState(false)
  const [query, setQuery] = useState("")
  const [currentBldg, setBldg] = useState("")

  return (
      <div className='map-container'>
          <div className="controls">
            {(toggleSelected === false) && 
              <input type="text"
              id="map-search"
              placeholder="Search" onChange={event => setQuery(event.target.value)}/>

            }{(toggleSelected === false) && Data.filter(bldg => {
                if (query === "") {
                  return bldg;
                } else if (bldg.name.toLowerCase().includes(query.toLowerCase())) {
                  return bldg;
                }}).map((bldg, index) => (
                  /**
                   * correct action when click on search input
                   */
                  <div className="search-box" key={index} onClick={()=>{
                    setBldg(bldg.name)
                    setSelected(true)
                  }}>
                    <p className='search-input'>{bldg.name}</p>
                  </div>
                )) }
              {(toggleSelected === true) &&
                <div>
                  <p className="selected-bldg" onClick={()=>{
                    setSelected(false)
                  }}>{currentBldg}</p>
                  {Data.filter(bldg => {if (bldg.name === currentBldg){
                    return bldg
                  }}).map((bldg, index) => (
                      <div key={index} onClick={()=>{
                        setBldg(bldg.name)
                        setSelected(true)
                        // figure out how to zoom to that pin on the map
                      }}>
                        <select>
                          <option>Choose an option:</option>
                          {/* this here will iterate through the different 
                            water fountains at the building and they will be options
                            It will also then set the onClick?? */}
                          <option>{bldg.name}</option>
                        </select>
                      </div>
                    )) }
                </div>
              }
          </div>
          <GoogleMap id="google-map" zoom={15} center={center} onLoad={onLoad}>
            <MarkerClusterer>
                {() =>
                  houses.map((house) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      onClick={()=>{         
                        // <InfoWindow content="hello"/>
                        //pop up of the building list (on the left ??)
                        console.log(house.lat)
                      }}
                    />
                  ))
                }
             </MarkerClusterer>
            {/* {toggleSeen ? <ReviewPopup toggle={setToggle()} /> : null} */}
          </GoogleMap>
    </div>
  );
  
}

const generateBuildings = (position) => {
  const _houses = [];
  for (let i = 0; i < 10; i++) {
    const direction = Math.random() < 0.5 ? -75 : 75;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
      bldg: "building name",
      //other info that we need for the building
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
