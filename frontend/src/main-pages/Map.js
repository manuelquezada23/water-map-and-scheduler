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
import { IoCalendarSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";

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
  const [query, setQuery] = useState("")
  const [justClicked, setJustClicked] = useState(false)
  const [wait, setAwait] = useState(false)
  const [user, setCurrentUser] = useState()
  const [rating, setRating] = useState(0) // initial rating value
  const [recs, setRecs] = useState(false)
  const [waitForReview, setWaitForReview] = useState(true)

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
    // other logic
  }

  //search or schedule
  const [search, setSearch] = useState(0) //0 means not chosen, 1 is by schedule, 2 is by search

  function toBuilding(bldg) {
    setCenter({ lat: parseFloat(bldg.Latitude), lng: parseFloat(bldg.Longitude) });
    setBldg(bldg)
    setZoom(19.5)
    mapRef.current.setZoom(19.5)
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
    setWaitForReview(false)
    fetch('http://localhost:4567/get-sql-rs', {
      method: 'POST',
      body: JSON.stringify({ sql: "INSERT INTO reviews VALUES ('" + user.uid + "', '" + currentFnt + "', '" + review + "', '" + (rating / 20) + "', '" + user.displayName + "')" }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }).then(() => {
      let new_review_data = reviewData.slice();
      new_review_data.push({ FountainID: currentFnt, Rating: (rating / 20), Review: review, UserID: user.uid })
      console.log(new_review_data)
      setReviewData(new_review_data)
      setWaitForReview(true)
    })
  }

  function findRecommendationLoc() {
    setRecs(false)
    fetch('http://localhost:4567/get-fountains-location', {
      method: 'POST',
      body: JSON.stringify({ building: currentBldg.PropertyCode }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }).then((response) => response.json())
      .then((data) => {
        var _recs = []
        _recs.push({
          fntID: data.nameValuePairs["first"]
        })
        _recs.push({
          fntID: data.nameValuePairs["second"]
        })
        _recs.push({
          fntID: data.nameValuePairs["third"]
        })
        setRecs(_recs)
      }).catch((data) => {
        "response data should be 'failed'"
        console.log("info not available" + data);
      })
  }

  function findRecommendationSched() {
    setRecs(false)
    fetch('http://localhost:4567/get-fountains-schedule', {
      method: 'POST',
      body: JSON.stringify({ user: user.uid }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }).then((response) => response.json())
      .then((data) => {
        var _recs = []
        _recs.push({
          fntID: data.nameValuePairs["first"]
        })
        _recs.push({
          fntID: data.nameValuePairs["second"]
        })
        _recs.push({
          fntID: data.nameValuePairs["third"]
        })
        setRecs(_recs)
      }).catch((data) => {
        "response data should be 'failed'"
        console.log("info not available" + data);
      })
  }

  const loadReviews = (event) => {
    setFnt(event.target.value) //fountain id
    setFntSelected(true)
    //load reviews for that fountain id
  }

  return (
    <div className='map-container'>
      {(!wait) && (wait === "") && <div>NOTHING TO SHOW</div>}
      <div className="map-leftSide">
        {(search === 1) && (toggleSelected === false) &&
          <div style={{ display: "flex", flexDirection: "row" }}>
            <a className="search-close" onClick={() => {
              setSearch(0)
              setFntSelected(false)
            }}>
              <IoCloseCircleSharp size={30} />
            </a>

            <input type="text"
              className="map-searchBar"
              id="map-search"
              placeholder="Search" onChange={event => setQuery(event.target.value)} />
          </div>

        }
        <div className="controls">
          {(search === 0) &&
            <div className="controls-buttons">
              <div className="controls-button" onClick={() => {
                setSearch(2)
                findRecommendationSched()
              }}>
                <IoCalendarSharp style={{marginRight: 10, marginBottom: 5}} size={30} />
                Find fountain by schedule
              </div>
              <div className="controls-button" onClick={() => setSearch(1)}>
                <IoSearchSharp style={{marginRight: 10, marginBottom: 5}} size={30} />
                Search for a fountain
              </div>
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
          {(search === 2) && (wait) && (toggleSelected === false) &&
            <div className='test'>
              {recs === false &&
                <div>
                  <p>No fountains available, try searching.</p>
                  <button onClick={() => setSearch(1)}>Search</button>
                </div>
              }
              {recs !== false &&
                <div>
                  <p>3 closest fountains:</p>
                  {recs.map((rec, index) => (
                    <div>
                      <p>Fountain id: {rec.fntID}</p>
                      <p>Nearest room: {rec.fntID}</p>
                      <p>Buildinig: {rec.fntID}</p>
                      <p>Average rating: {rec.fntID}</p>
                    </div>
                  ))}
                </div>
              }
            </div>
          }
          {(wait) && (toggleSelected === true) &&
            <div className="building-info">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <a className="building-close" onClick={() => {
                  setSelected(false)
                }}>
                  <IoCloseCircleSharp size={30} />
                </a>
                <p className="selected-bldg" onClick={() => {
                  //i.e. if they x out (should make a button) -- not intuitive
                  setSelected(false)
                  setJustClicked(true)
                  setFntSelected(false)
                }}>{currentBldg.BuildingName}</p>
              </div>
              {buildingData.filter(bldg => {
                if (bldg.BuildingName === currentBldg.BuildingName) {
                  return bldg
                }
              }).map((bldg) => (
                <div key={bldg.PropertyCode}> {/*they key of selected building */}
                  <select id="map-dropdown" className="map-dropdown" value={currentFnt} onChange={loadReviews}>
                    <option>Choose an option by nearest room:</option>
                    {fountainData.filter(fnt => {
                      if (fnt.BuildingName === currentBldg.BuildingName) {
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
                  {console.log(toggleFntSelected)}
                  {waitForReview &&
                    <div className="reviews-view">
                      {console.log(reviewData)}
                      {reviewData.filter(review => {
                        if (review.FountainID === parseFloat(currentFnt)) {
                          return review
                        }
                      }).map((review, index) => (
                        <div className="review-view">
                          <img className="review-view-image" src={PictureIcon}></img>
                          <div className="review-author-info">
                            <p className="review-view-name">{review.Name}</p>
                            <div className="review-view-stars">
                              <Rating
                                size={15}
                                fillColor={"#5393C6"}
                                allowHalfIcon={true}
                                initialValue={review.Rating}
                                readonly={true}
                              />
                            </div>
                            <p className="review-view-text">{review.Review}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                  <PopUp trigger={
                    <button className="map-review-button">
                      Add a review
                    </button>
                  } arrow={false} position="top left">
                    {close => (
                      <div className="editSchedulePopUpView">
                        <div className="mapPopUp">
                          <p className="building-name">{currentBldg.BuildingName}</p>
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
              <p className="cannot-find-fountains">Can't find fountains you want?</p>
              <p className="recommendations-button" onClick={() => {
                setSelected(false)
                setSearch(2)
                findRecommendationLoc()
              }
              }>Get Recommendations</p>
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