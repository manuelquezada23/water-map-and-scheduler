import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, LatLngLiteral, InfoWindow } from "@react-google-maps/api";
import ReviewPopup from './ReviewPopup';
import { flushSync } from 'react-dom';
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
  //data
  const [buildingData, setBuildingData] = useState([])
  const [fountainData, setFountainData] = useState([])
  const [currentBldg, setBldg] = useState("")
  const [currentFnt, setFnt] = useState("")
  //map states
  const [currCenter, setCenter] = useState({lat: 41.8268, lng: -71.4025})
  const [currZoom, setZoom] = useState(17)
  const center = useMemo(()=>currCenter, [currCenter])
  const zoom = useMemo(()=>currZoom, [currZoom])
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  //search/toggle
  const [toggleSelected, setSelected] = useState(false)
  const [query, setQuery] = useState("")
  const [justClicked, setJustClicked] = useState(false)
  const [wait, setAwait] = useState(false)
  const [search, setSearch] = useState(0)

  function toBuilding(bldg) {
    setCenter({lat: parseFloat(bldg.Latitude), lng: parseFloat(bldg.Longitude)}); 
    setZoom(20)  //a bit buggy once zoom is changed?
    // set up the left panel to correspond
    setBldg(bldg.BuildingName) 
    setSelected(true)
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
              console.log("fetching")
              //loads the buildings
              fetch('http://localhost:4567/get-sql-rs', {
                method: 'POST',
                body: JSON.stringify({ sql: "SELECT * FROM buildings" }),
                headers: {
                  "Access-Control-Allow-Origin": "*"
                },
              }).then((response) => response.json())
                .then((data) => {
                  setAwait(false)
                  setBuildingData(processData(data["values"]))
                  setAwait(true)
                  // return data
              })
              //loads fountains
              fetch('http://localhost:4567/get-sql-rs', {
                method: 'POST',
                body: JSON.stringify({ sql: "SELECT * FROM fountains" }),
                headers: {
                  "Access-Control-Allow-Origin": "*"
                },
              }).then((response) => response.json())
                .then((data) => {
                  setAwait(false)
                  setFountainData(processData(data["values"]))
                  setAwait(true)
                  // return data
              })
        }
    });
  }, []);
  
  function processData(data) {
    const _data = [];
    for (var i = 0; i < data.length; i++) {
      _data.push(data[i].nameValuePairs)
    }
    return _data
  }

  const loadReviews = (event) => {
    setFnt(event.target.value)
    //load reviews for that fountain id
  }

  return (
      <div className='map-container'>
        {(!wait) && (wait === "") && <div>NOTHING TO SHOW</div>}
          <div className="controls">
            {(buildingData !== "") && (toggleSelected === false) && 
              <input type="text"
              id="map-search"
              placeholder="Search" onChange={event => setQuery(event.target.value)}/>

            }{(wait) && (toggleSelected === false) && buildingData.filter(bldg => {
                if (justClicked) {
                  setQuery("")
                  setJustClicked(false)
                }
                if (query === "") {
                  return bldg;
                } else if (bldg.BuildingName.toLowerCase().includes(query.toLowerCase())) {
                  return bldg;
                }}).map((bldg) => (
                  /**
                   * correct action when click on search input
                   */
                  <div className="search-box" key={bldg.PropertyCode} onClick={()=>{
                    toBuilding(bldg)
                  }}>
                    <p className='search-input'>{bldg.BuildingName}</p>
                  </div>
                )) }
              {(wait) && (toggleSelected === true) &&
                <div>
                  <p className="selected-bldg" onClick={()=>{
                    setSelected(false)
                    setJustClicked(true)
                  }}>{currentBldg}</p>
                  {buildingData.filter(bldg => {if (bldg.BuildingName === currentBldg){
                    return bldg
                  }}).map((bldg) => (
                      <div key={bldg.PropertyCode}> {/*they key of selected building */}
                        <select value={currentFnt} onChange={loadReviews}>
                          <option>Choose an option by nearest room:</option>
                          {fountainData.filter(fnt => {if (fnt.BuildingName === currentBldg){
                            return fnt
                          }}).map((fnt) => (
                            <option key={fnt.FountainID} value={fnt.FountainID}>{fnt.NearestRoom}</option>
                            )) }
                        </select>
                      </div>
                    )) }
                </div>
              }
          </div>
          {(wait) && (buildingData !== "") && 
          <GoogleMap id="google-map" zoom={zoom} center={center} onLoad={onLoad}>
            <MarkerClusterer>
                {() =>
                  buildingData.map((bldg, index) => (
                    <Marker
                      key={index}
                      position={{lat: parseFloat(bldg.Latitude), lng: parseFloat(bldg.Longitude)}}
                      onClick={()=>{    
                        toBuilding(bldg)       
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