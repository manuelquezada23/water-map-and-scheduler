import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, LatLngLiteral, InfoWindow } from "@react-google-maps/api";
import PictureIcon from '../picture.png'
import { flushSync } from 'react-dom';
import PopUp from 'reactjs-popup';
import { IoCloseCircleSharp } from "react-icons/io5";
import { Rating } from 'react-simple-star-rating'

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

  const { isLoaded } = useLoadScript({
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
  const [reviewData, setReviewData] = useState([])
  const [currentBldg, setBldg] = useState("")
  const [currentFnt, setFnt] = useState("")
  const [review, setReview] = useState("")
  //map states
  const [currCenter, setCenter] = useState({ lat: 41.8268, lng: -71.4025 })
  const [currZoom, setZoom] = useState(17)
  const center = useMemo(() => currCenter, [currCenter])
  const zoom = useMemo(() => currZoom, [currZoom])
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  //search/toggle
  const [toggleSelected, setSelected] = useState(false) //building selected
  const [toggleFntSelected, setFntSelected] = useState(false) //fountain selected
  // const [toggleReview, setReviewToggle] = useState(false) //review input or not
  const [query, setQuery] = useState("")
  const [justClicked, setJustClicked] = useState(false)
  const [wait, setAwait] = useState(false)
  const [user, setCurrentUser] = useState()
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
    // other logic
  }

  //search or schedule
  const [search, setSearch] = useState(0) //0 means not chosen, 1 is by schedule, 2 is by search

  function toBuilding(bldg) {
    setCenter({ lat: parseFloat(bldg.Latitude), lng: parseFloat(bldg.Longitude) });
    setZoom(20)  //a bit buggy once zoom is changed?
    // set up the left panel to correspond
    setBldg(bldg.BuildingName)
    setSelected(true)
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
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
            console.log("buildings", data)
            setBuildingData(processData(data["values"]))
            setAwait(true)
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
            console.log("fountains", data)
            setFountainData(processData(data["values"]))
            setAwait(true)
          })
        //loads reviews
        fetch('http://localhost:4567/get-sql-rs', {
          method: 'POST',
          body: JSON.stringify({ sql: "SELECT * FROM reviews" }),
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        }).then((response) => response.json())
          .then((data) => {
            setAwait(false)
            console.log("reviews", data)
            setReviewData(processData(data["values"]))
            setAwait(true)
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

  function sendReview() {
    //loads reviews
    fetch('http://localhost:4567/get-sql-rs', {
      method: 'POST',
      body: JSON.stringify({ sql: "INSERT INTO reviews VALUES ('" + user.uid + "', '" + currentFnt + "', '" + review + "', '" + (rating / 20) + "')" }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }).then((data) => {
      console.log("added: ", data)
    })
  }

  function findUsername(id) {
    // let name = "";
    fetch('http://localhost:4567/get-sql-rs', {
      method: 'POST',
      body: JSON.stringify({ sql: "SELECT Name FROM users WHERE UserID='" + id + "'" }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }).then((response) => response.json()).then((data) => {
      const name = processData(data["values"])
      return name["0"].Name;
    })
  }

  const loadReviews = (event) => {
    setFnt(event.target.value) //fountain id
    setFntSelected(true)
    // setFnt(event.target.id);
    //load reviews for that fountain id
  }

  return (
    <div className='map-container'>
      {(!wait) && (wait === "") && <div>NOTHING TO SHOW</div>}
      <div className="map-leftSide">
        {(search === 1) && (toggleSelected === false) &&
          <input type="text"
            className="map-searchBar"
            id="map-search"
            placeholder="Search" onChange={event => setQuery(event.target.value)} />

        }
        <div className="controls">
          {(search === 0) &&
            <div>
              <button onClick={() => setSearch(2)}>Find fountain by schedule</button>
              {/*what happens if they want to fill up by schedule?
                  somehow the correct fountain should be found and it should jump to there 
                  (should be easy enough) */}
              <button onClick={() => setSearch(1)}>Search for a fountain</button>
            </div>
          }
          {(search === 1) && (wait) && (toggleSelected === false) && buildingData.filter(bldg => {
            if (justClicked) {
              setQuery("")
              setJustClicked(false)
            }
            if (query === "") {
              return bldg;
            } else if (bldg.BuildingName.toLowerCase().includes(query.toLowerCase())) {
              return bldg;
            }
          }).map((bldg) => (
            /**
             * correct action when click on search input
             */
            <div className="search-box" key={bldg.PropertyCode} onClick={() => {
              toBuilding(bldg)
            }}>
              <p className='search-input'>{bldg.BuildingName}</p>
            </div>
          ))}
          {(wait) && (toggleSelected === true) &&
            <div className="building-info">
              <p className="selected-bldg" onClick={() => {
                //i.e. if they x out (should make a button) -- not intuitive
                setSelected(false)
                setJustClicked(true)
                setFntSelected(false)
              }}>{currentBldg}</p>
              {buildingData.filter(bldg => {
                if (bldg.BuildingName === currentBldg) {
                  return bldg
                }
              }).map((bldg) => (
                <div key={bldg.PropertyCode}> {/*they key of selected building */}
                  <select className="map-dropdown" value={currentFnt} onChange={loadReviews}>
                    <option>Choose an option by nearest room:</option>
                    {fountainData.filter(fnt => {
                      if (fnt.BuildingName === currentBldg) {
                        return fnt
                      }
                    }).map((fnt) => (
                      <option key={fnt.FountainID} value={fnt.FountainID}>{fnt.NearestRoom}</option>
                    ))}
                  </select>
                </div>
              ))}
              {(toggleFntSelected) &&
                <div>
                  {/* {findUsername} */}
                  <div className="reviews-view">
                    {reviewData.filter(review => {
                      if (review.FountainID === parseFloat(currentFnt)) {
                        return review
                      }
                    }).map((review, index) => (
                      <div className="review-view">
                        <img className="review-view-image" src={PictureIcon}></img>
                        <div className="review-author-info">
                          <p className="review-view-name">{findUsername(review.UserID)}</p>
                          <div className="review-view-stars">
                            <Rating
                              size={15}
                              fillColor={"#5393C6"}
                              allowHalfIcon={true}
                              initialValue={review.rating}
                            />
                          </div>
                          <p className="review-view-text">{review.Review}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <PopUp trigger={
                    <button className="map-review-button">
                      Add a review
                    </button>
                  } arrow={false} position="top left">
                    {close => (
                      <div className="editSchedulePopUpView">
                        <div className="mapPopUp">
                          <p className="building-name">{currentBldg}</p>
                          <div className='author-box'>
                            <img className="review-image" src={PictureIcon}></img>
                            <div className="stars">
                              <p className="author">{user.displayName}</p>
                              <div className="star-rating-view">
                                <Rating
                                  onClick={handleRating}
                                  ratingValue={rating}
                                  size={20}
                                  fillColor={"#5393C6"}
                                  allowHalfIcon={true}
                                />
                              </div>
                            </div>
                          </div>
                          <textarea className="review-box" placeholder="What did you think?" type="text" onChange={(e) => { setReview(e.target.value) }} required />
                          <div className="review-submit">
                            <button className="review-submit-button" onClick={(e) => {
                              e.preventDefault()
                              sendReview();
                              close()
                            }}>Post</button>
                          </div>
                          <a className="close" onClick={close}>
                            <IoCloseCircleSharp size={30} />
                          </a>
                        </div>
                      </div>
                    )}
                  </PopUp>
                </div>}
            </div>
          }
        </div>
      </div>
      {(wait) &&
        //Map
        <GoogleMap id="google-map" zoom={zoom} center={center} onLoad={onLoad}>
          <MarkerClusterer>
            {() =>
              buildingData.map((bldg, index) => (
                <Marker
                  key={index}
                  position={{ lat: parseFloat(bldg.Latitude), lng: parseFloat(bldg.Longitude) }}
                  onClick={() => {
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