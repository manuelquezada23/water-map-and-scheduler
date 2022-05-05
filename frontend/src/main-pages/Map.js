import React, { useState } from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";
import PictureIcon from '../picture.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Map() {
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
        <div className="map-loggedin">
          <div className='popup-box'>
            <div className='review-popup'>
              <p className="building-name">Sciences Library</p>
              <div className='author-box'>
                <img className="review-image" src={PictureIcon} alt="review"></img>
                <div className="stars">
                  <p className="author">Jane Doe</p>
                  {/* <p className="author">stars</p> */}
                  <p>star rating</p>
                </div>
              </div>
              <textarea className="review-box" placeholder="What did you think?" type="text" required />
              <div className="review-submit">
                <button className="review-submit-button">Post</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

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

//               <Circle center={office} radius={15000} options={closeOptions} />
//               <Circle center={office} radius={30000} options={middleOptions} />
//               <Circle center={office} radius={45000} options={farOptions} />
//             </>
//           )}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// }

// // const generateHouses = (position: google.maps.LatLngLiteral) => {
// //   const _houses: Array<LatLngLiteral> = [];
// //   for (let i = 0; i < 100; i++) {
// //     const direction = Math.random() < 0.5 ? -2 : 2;
// //     _houses.push({
// //       lat: position.lat + Math.random() / direction,
// //       lng: position.lng + Math.random() / direction,
// //     });
// //   }
// //   return _houses;
// // };