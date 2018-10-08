// Display Map 
// https://tomchentw.github.io/react-google-maps
// https://www.youtube.com/watch?v=Q0vzqlnWWZw&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=3

import React, {Component} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap 
      defaultZoom={12} 
      zoom={props.zoom}
      defaultCenter={{lat: 43.0731, lng: -89.4012}}
      //center={props.center}
      >

      {props.breweryMarkers && props.breweryMarkers.filter(marker => marker.isVisible).map((marker, idx) => {

        const venueInfo = props.venues.find(venue => (venue.id === marker.markerId))

        return (
          <Marker 
            key={idx} 
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.learnMoreOnClick(marker)}
          >
            {marker.isOpen && (
              <InfoWindow>
                <React.Fragment> 
                  <p>{venueInfo.name}</p>
                  <p>{venueInfo.location.formattedAddress[0]}</p>
                  <p>{venueInfo.location.formattedAddress[1]}</p>
                  <a href={venueInfo.url}>{venueInfo.url}</a>
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

  render() {
    return (
      <MyMapComponent
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