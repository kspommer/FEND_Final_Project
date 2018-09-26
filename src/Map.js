// Display Map with Google Maps React
//reference:  https://www.npmjs.com/package/google-map-react

import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker.js"

class Map extends Component {
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyC91SKF-vOtspqbdEWrGpWEvYcrv1iQyuU"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

        {this.props.breweries.map(brewery => {
          return <Marker 
            lat={brewery.lat}
            lng={brewery.lng}
            text={brewery.name}
            key={brewery.id}
          />     
        })}

        </GoogleMapReact>

      </div>
    );
  }
}

export default Map