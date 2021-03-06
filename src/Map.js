// Display Map 
// https://tomchentw.github.io/react-google-maps
// https://www.youtube.com/watch?v=Q0vzqlnWWZw&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=3
// marker animations:   https://developers.google.com/maps/documentation/javascript/examples/marker-animations
//<a href={venueInfo.url}>{venueInfo.url}</a>

import React, {Component} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
//import beerIcon from './beer-1538754_640.png' // need to size the icon

// tried to use a custom beer image for marker pin
//var icons = { 
  //beerIcon: './beer-1538754_640.png'
//}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
      <GoogleMap 
        className="map"
        defaultZoom={12} 
        zoom={props.zoom}
        defaultCenter={{lat: 43.0731, lng: -89.4012}}
        defaultOptions={{
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: true,
          rotateControl: false,
          fullscreenControl: false
        }}>

      {props.breweryMarkers && props.breweryMarkers.filter(marker => marker.isVisible).map((marker, idx) => {
        const venueInfo = props.filteredVenues.find(venue => (venue.id === marker.id))
        return (
          <Marker
            key={idx} 
            id="markerPin"
            //icon={beerIcon}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.learnMoreOnClick(marker)}      
            animation={marker.clickedMarker === true ? 1 : null}
            //linkName={venueInfo.url} === null ? '' : 'Website'}
          >
            {marker.isOpen && (
              <InfoWindow>
                <React.Fragment> 
                  <div className="info-window">
                    <p className="info-title">{venueInfo.name}</p>
                    <p className="info-subtext">{venueInfo.location.formattedAddress[0]}</p>
                    <p className="info-subtext">{venueInfo.location.formattedAddress[1]}</p>
                  </div>
                </React.Fragment>
              </InfoWindow>
            )}
          </Marker>
        )  
      })}  
      </GoogleMap>
  ))  
);

class Map extends Component {

  // when props change, get the new data and trigger render update
  componentWillReceiveProps = (props) => {
    this.props = props
  }

  render() {
    return (
      <MyMapComponent 
        className="map"
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%`}}/>}
        mapElement={<div style={{ height: `100%` }} />}
      />

    )
  }
}


export default Map 