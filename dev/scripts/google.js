import React from 'react';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            showingInfoWindow: false,
            selectedPlace: {},
            activeMarker: {}
        }
        this.markerClick = this.markerClick.bind(this);

    }
    markerClick(marker) {
        console.log('hey');
        this.setState({
            showingInfoWindow: true,
            title: '',
            activeMarker: marker
        })
    }
    render() {
        return (
            <Map google={this.props.google} zoom={10} initialCenter={{
                lat: 43.6532,
                lng: -79.3831843
            }}>
                {Object.values(this.props.locations).map((location, i) => {
                    return <Marker name={'Toronto'} title={location.name} position={{ lat: location.latitude, lng: location.longitude }} onClick={this.markerClick}
                        name={'Current location'} key={i} />
                })}

                <InfoWindow onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>hey</h1>
                        <button>Save</button>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}