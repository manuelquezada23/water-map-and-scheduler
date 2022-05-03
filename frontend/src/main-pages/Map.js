// import { React, useState, useMemo, useCallback, useRef } from "react";
// import {
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   Circle,
//   MarkerClusterer,
// } from "@react-google-maps/api";
// import Places from "./places";
// import Distance from "./distance";

export default function Map() {
  // let LatLngLiteral = google.maps.LatLngLiteral;
  // let DirectionsResult = google.maps.DirectionsResult;
  // let MapOptions = google.maps.MapOptions;
  // const center = useMemo<LatLngLiteral>(
  //   () => ({ lat: 43.45, lng: -80.49 }),
  //   []
  // );

  return (
    <div className="main-page-body">
      <h1>map here</h1>
    </div>
  );
}

// export default function Map() {
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