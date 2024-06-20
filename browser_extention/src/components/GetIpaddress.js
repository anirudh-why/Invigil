// import React from 'react';

// const GetIpaddress = () => {
//     let IpAdd="";
//     function getAdd(){
//         console.log(IpAdd);
//         fetch(`https://ipapi.co/${IpAdd}/json/`)
//       .then(response => {
//         console.log(response);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(locationData => {
//         console.log(locationData);
//         const { city, region, country, latitude, longitude } = locationData;
//         console.log(`User's Location: ${city}, ${region}, ${country}`);
//         console.log(`User's Coordinates: ${latitude}, ${longitude}`);
//       })
//       .catch(error => {
//         console.error('Error fetching geolocation data:', error);
//       });
//     }
//   function getUserGeolocation() {
//     console.log("Fetching IP address...");
//     fetch('https://api.ipify.org?format=json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         IpAdd=data.ip;
//         console.log(`User's IP Address: ${data.ip}`);
//         // Fetch location based on IP
//       })
//       getAdd();
//   }

//   return (
//     <div>
//       <button onClick={getUserGeolocation}>Get IP Address and Location</button>
//     </div>
//   );
// };

// export default GetIpaddress;




// import React from 'react';

// const GetIpaddress = () => {
//     function getAdd(ipAddress) {
//         // console.log(ipAddress);
//         fetch(`https://freeipapi.com/api/json/${ipAddress}`)
//             .then(response => {
//                 // console.log(response);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(locationData => {
//                 // console.log(locationData);
//                 const { cityName, countryName, regionName } = locationData;
//                 console.log(`User's Location: ${cityName}, ${countryName}, ${regionName}`);
//                 // console.log(`User's Coordinates: ${latitude}, ${longitude}`);
//             })
//             .catch(error => {
//                 console.error('Error fetching geolocation data:', error);
//             });
//     }

//     function getUserGeolocation() {
//         // console.log("Fetching IP address...");
//         fetch('https://api.ipify.org?format=json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 const ipAddress = data.ip;
//                 console.log(`User's IP Address: ${ipAddress}`);
//                 getAdd(ipAddress);
//             })
//             .catch(error => {
//                 console.error('Error fetching IP address:', error);
//             });
//     }

//     return (
//         <div>
//             <button onClick={getUserGeolocation}>Get IP Address and Location</button>
//         </div>
//     );
// };

// export default GetIpaddress;
