import React, { useMemo, useState, useRef, useCallback } from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, LatLngLiteral, InfoWindow } from "@react-google-maps/api";
import ReviewPopup from './ReviewPopup';
// import Data from "../mock-data.json"
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
      // map goes here:
        <MapPanel />
      }
    </div>
  );
}

function MapPanel() {
  const [currCenter, setCenter] = useState({lat: 41.8268, lng: -71.4025})
  const [currZoom, setZoom] = useState(17)
  const center = useMemo(()=>currCenter, [currCenter])
  const zoom = useMemo(()=>currZoom, [currZoom])
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const [toggleSelected, setSelected] = useState(false)
  const [query, setQuery] = useState("")
  const [justClicked, setJustClicked] = useState("false")
  const [currentBldg, setBldg] = useState("")
  const [wait, setAwait] = useState(false)
  const [currData, setData] = useState("")

  const data = useRef(getData())
  console.log(data)

  function toBuilding(bldg) {
    setCenter({lat: bldg.lat, lng: bldg.lng});   
    setZoom(20)  //a bit buggy once zoom is changed?
    // set up the left panel to correspond
    setBldg(bldg.building_name) 
    setSelected(true)
  }

  function getData() {
    console.log("fetching")
    fetch('http://localhost:4567/get-sql-rs', {
      method: 'POST',
      body: JSON.stringify({ sql: "SELECT * FROM buildings" }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }).then((response) => response.json())
      .then((data) => {
        setAwait(false)
        console.log("logging")
        console.log(data)
        data =  processData(data["values"])
        setAwait(true)
        return data
    })
  }
  
  function processData(data) {
    const _data = [];
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].nameValuePairs)
      _data.push(data[i].nameValuePairs)
    }
    // setData(_data)
    return _data
  }

  return (
      <div className='map-container'>
        {(!wait) && (wait === "") && <div>NOTHING TO SHOW</div>}
          <div className="controls">
            {(data !== "") && (toggleSelected === false) && 
              <input type="text"
              id="map-search"
              placeholder="Search" onChange={event => setQuery(event.target.value)}/>

            }{(wait) && (data !== "") && (toggleSelected === false) && data.filter(bldg => {
                if (justClicked) {
                  setQuery("")
                  setJustClicked(false)
                }
                if (query === "") {
                  return bldg;
                } else if (bldg.BuildingName.toLowerCase().includes(query.toLowerCase())) {
                  return bldg;
                }}).map((bldg, index) => (
                  /**
                   * correct action when click on search input
                   */
                  <div className="search-box" key={index} onClick={()=>{
                    toBuilding(bldg)
                  }}>
                    <p className='search-input'>{bldg.BuildingName}</p>
                  </div>
                )) }
              {(wait) && (data !== "") && (toggleSelected === true) &&
                <div>
                  <p className="selected-bldg" onClick={()=>{
                    setSelected(false)
                    setJustClicked(true)
                  }}>{currentBldg}</p>
                  {data?.filter(bldg => {if (bldg.BuildingName === currentBldg){
                    return bldg
                  }}).map((bldg, index) => (
                      <div key={index}>
                        <select>
                          <option>Choose an option:</option>
                          {/* this here will iterate through the different 
                            water fountains at the building and they will be options
                            It will also then set the onClick?? */}
                          <option>{bldg.BuildingName}</option>
                        </select>
                      </div>
                    )) }
                </div>
              }
          </div>
          {(wait) && (data !== "") && 
          <GoogleMap id="google-map" zoom={zoom} center={center} onLoad={onLoad}>
            <MarkerClusterer>
                {() =>
                  data.map((bldg) => (
                    <Marker
                      key={bldg.id}
                      position={bldg}
                      onClick={()=>{    
                        toBuilding(bldg)       
                        // <InfoWindow content="hello"/>
                        //pop up of the building list (on the left ??)
                      }}
                    />
                  ))
                }
             </MarkerClusterer>
          </GoogleMap>
          }       
    </div>
  );
  
}

export default Map



// //obsolete
// const generateBuildings2 = (position) => {
//   const _houses = [];
//   for (let i = 0; i < 10; i++) {
//     const direction = Math.random() < 0.5 ? -75 : 75;
//     _houses.push({
//       lat: position.lat + Math.random() / direction,
//       lng: position.lng + Math.random() / direction,
//       bldg: "building name",
//       //other info that we need for the building
//     });
//   }
//   console.log(_houses)
//   // const _houses = 
//   return _houses;
// };