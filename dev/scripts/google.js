import React from 'react';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            address: '',
            showingInfoWindow: false,
            selectedPlace: {},
            activeMarker: {}
        }
        this.markerClick = this.markerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);

    }
    markerClick(props, marker) {
        console.log(props);
        this.setState({
            showingInfoWindow: true,
            title: props.title,
            activeMarker: marker,
            address: props.address

        })

    }
    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            })
        }
        console.log('hey');
    }
    render(props) {
        return (
            <Map google={this.props.google} zoom={13} centerAroundCurrentLocation={true}>
                {Object.values(this.props.locations).map((location, i) => {
                    return <Marker name={'Toronto'} title={location.name} address={location.address} position={{ lat: location.latitude, lng: location.longitude }} onClick={this.markerClick}
                        name={'Current location'} key={i} />
                })}

                <InfoWindow marker={this.state.activeMarker} onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
                    <div className="results">
                        <h1>{this.state.title}</h1>
                        <h2>{this.state.address}</h2>
                        <button>Save</button>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCNX1tthuQLaX98UVGv2dcbFnpjdhw0TnQ')
})(MapContainer)