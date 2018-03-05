// import React from 'react';
// import ReactDOM from 'react-dom';
// // import AxiosReq from './axiosReq';
// import axios from 'axios';

// const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?";


// class Auth extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             loggedIn: false,
//             user: {},
//             userText: '',
//             lat: '',
//             lon: '',
//             restaurants: []

//         }
//         this.signIn = this.signIn.bind(this);
//         this.signOut = this.signOut.bind(this);
//         this.submitTest = this.submitTest.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.addRest = this.addRest.bind(this);
//         this.submit = this.submit.bind(this);
//         this.getCoords = this.getCoords.bind(this);
//         this.zomatoSearch = this.zomatoSearch.bind(this);
//     }
//     componentDidMount() {
//         firebase.auth().onAuthStateChanged((res) => {
//             console.log(res);
//             if (res) {
//                 this.setState({
//                     loggedIn: true,
//                     user: res
//                 })
//             } else {
//                 this.setState({
//                     loggedIn: false,
//                     user: {}
//                 })
//             }
//         });
//     }
//   zomatoSearch(lat, lon) {
//     axios
//       .get(`https://developers.zomato.com/api/v2.1/search`, {
//         headers: {
//           "user-key": `53314a8415a07eafa4656461b1c6272d`
//         },
//         params: {
//           // q: 'toronto'      

//           'lat': lat,
//           'lon': lon,
//           radius: '50',

//           sort: 'real_distance'
//         }
//       })
//       .then(({ data }) => {
//         console.log(data);
//         // const restRes = data.restaurants[4].restaurant.name;
//         // // console.log(restRes);
//         // const restAdd = data.restaurants[4].restaurant.location.address;

//         // const newList = {

//         // };

//         const newArray = Array.from(this.state.restaurants);

//         data.restaurants.forEach(eatingPlace => {
//           // console.log(eatingPlace.restaurant.name);
//           // console.log(eatingPlace.restaurant.location.address);

//           const restObj = { name: eatingPlace.restaurant.name, address: eatingPlace.restaurant.location.address };
//           newArray.push(restObj);
//         });

//         console.log(newArray);

//         this.setState({ restaurants: newArray });
//       });
//   }
//     signIn(e) {
//         const provider = new firebase.auth.GoogleAuthProvider();

//         provider.setCustomParameters({
//             prompt: 'select_account'
//         })

//         firebase.auth().signInWithPopup(provider)
//             .then((user) => {
//                 console.log(user);
//             })
//     }

//     signOut(e) {
//         firebase.auth().signOut();
//     }

//     handleChange(e) {
//         this.setState({
//             [e.target.id]: e.target.value
//         })
//     }

//     addRest(e) {
//         e.preventDefault();

//         const dbRef = firebase.database().ref()

//         dbRef.push()

//         this.setState({
//             userText: ''
//         })
//     }
//     getCoords(address) {
//         console.log(address);
//         axios
//             .get(`${googleURL}`, {
//                 params: {
//                     key: "AIzaSyDNBpAAUuUkRyioDLQUQW_DZYIb1PiY85Q",
//                     address: address
//                 }
//             })
//             .then(({ data }) => {

//                 // console.log(data.results[0].geometry.location.lat);
//                 console.log(data.results[0].geometry.location.lng);
//                 axios
//                     .get(`https://developers.zomato.com/api/v2.1/search`, {
//                         headers: {
//                             "user-key": `53314a8415a07eafa4656461b1c6272d`
//                         },
//                         params: {
//                             // q: 'toronto'      

//                             lat: data.results[0].geometry.location.lat,
//                             lon: data.results[0].geometry.location.lng,
//                             radius: '50',

//                             sort: 'real_distance'
//                         }
//                     }).then((response) => {
//                         console.log(response.data.restaurants);
//                         let newArray = Array.from(this.state.restaurants);

//                         newArray = response.data.restaurants.map(eatingPlace => {
//                             // console.log(eatingPlace.restaurant.name);
//                             // console.log(eatingPlace.restaurant.location.address);

//                             return { 
//                                 name: eatingPlace.restaurant.name, 
//                                 address: eatingPlace.restaurant.location.address,
//                                 lat: eatingPlace.restaurant.location.latitude,
//                                 lon: eatingPlace.restaurant.location.longitude
//                             };
//                         });
                        
//                         this.setState({
//                             restaurants: newArray,
//                             lat: data.results[0].geometry.location.lat,
//                             lon: data.results[0].geometry.location.lng
//                         });
//                     });
                
                
//                 // console.log(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
                

//             });
  
//     }
//     submit(e) {
//         e.preventDefault();
//         // const inputResult = `googlecall.com/v1/?query=${inputValue}`
//         const inputResult = this.state.userText;
//         const coords = {};

//         this.getCoords(inputResult)
//         // this.zomatoSearch(this.state.lat, this.state.lon);
//     }
//     render() {
//     return (
//         <div>

//             <form onSubmit={this.submit}>
//                  <input type="text" id="userText" value={this.state.userText} onChange={this.handleChange} onSubmit={this.submitTest} />
//                  <label htmlFor="userSearch">Type City or Address</label>
//                  <input type="submit" value="submit" onSubmit={this.submitTest} />
//             </form>
      
//             <button onClick={this.signIn}>Sign in</button>
//             <button onClick={this.signOut}>Sign Out</button>
//         </div>
//     )
// }
//         submitTest() {
//             console.log("test")
//         }
// }

// export default Auth; 