import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MapContainer from './google';

const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA2f5SWWUhBul0ey99wAJtcEMU_wLCu61Q",
    authDomain: "dude-wheres-my-food.firebaseapp.com",
    databaseURL: "https://dude-wheres-my-food.firebaseio.com",
    projectId: "dude-wheres-my-food",
    storageBucket: "dude-wheres-my-food.appspot.com",
    messagingSenderId: "351310641968"
};
firebase.initializeApp(config);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userText: '',
            restaurants: [],
            coordinates: {}
        }
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.getCoords = this.getCoords.bind(this);
    }
    signIn(e) {
        const provider = new firebase.auth.GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: 'select_account'
        })

        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                console.log(user);
            })
    }

    signOut(e) {
        firebase.auth().signOut();
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    getCoords(address) {
        axios
            .get(`${googleURL}`, {
                params: {
                    key: "AIzaSyDNBpAAUuUkRyioDLQUQW_DZYIb1PiY85Q",
                    address: address
                }
            })
            .then(({ data }) => {
                // console.log(data.results[0].geometry.location.lat);
                // console.log(data.results[0].geometry.location.lng);
                axios
                    .get(`https://developers.zomato.com/api/v2.1/search`, {
                        headers: {
                            "user-key": `53314a8415a07eafa4656461b1c6272d`
                        },
                        params: {
                            // q: 'toronto'      

                            lat: data.results[0].geometry.location.lat,
                            lon: data.results[0].geometry.location.lng,
                            radius: '500',

                            sort: 'real_distance'
                        }
                    }).then((response) => {
                        let newArray = Array.from(this.state.restaurants);

                        newArray = response.data.restaurants.map(eatingPlace => {
                            // console.log(eatingPlace.restaurant.name);
                            // console.log(eatingPlace.restaurant.location.address);

                            return {
                                name: eatingPlace.restaurant.name,
                                address: eatingPlace.restaurant.location.address,
                                latitude: eatingPlace.restaurant.location.latitude,
                                longitude: eatingPlace.restaurant.location.longitude
                            };
                        });

                        this.setState({
                            restaurants: newArray,
                            lat: data.results[0].geometry.location.lat,
                            lon: data.results[0].geometry.location.lng,
                            coordinates: {
                                lat: data.results[0].geometry.location.lat,
                                lng: data.results[0].geometry.location.lng
                            }
                        });

                    });
            });
    }
    submit(e) {
        e.preventDefault();
        // const inputResult = `googlecall.com/v1/?query=${inputValue}`
        const inputResult = this.state.userText;
        const coords = {};

        this.getCoords(inputResult);
        // this.zomatoSearch(this.state.lat, this.state.lon);
    }
    render() {

        return <div>
            <form onSubmit={this.submit} className="wrapper">
            <h1>snackerYou</h1>
              <label htmlFor="userSearch">Type City or Address</label>
              <input type="text" id="userText" value={this.state.userText} onChange={this.handleChange} />
              <input type="submit" value="submit" />
            </form>

            <button className="authButton" onClick={this.signIn}>Sign in</button>
            <button className="authButton" onClick={this.signOut}>Sign Out</button>
            {/* <Auth /> */}
            <div id="map"><MapContainer locations={this.state.restaurants} coords={this.state.coordinates} />
            
            </div>
          </div>;

    }
}

ReactDOM.render(<App />, document.getElementById('app'));
