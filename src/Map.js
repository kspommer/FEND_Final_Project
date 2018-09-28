// Display Map with Google Maps React
//reference:  https://www.npmjs.com/package/google-map-react

import React, {Component} from 'react';
import Marker from "./Marker.js"

class Map extends Component {
  render() {
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        {this.props.breweries.map(brewery => {
          return <Marker lat={brewery.lat}
            lng={brewery.lng}
            text={brewery.name}
            key={brewery.id}
          />     
        })}
      </div>
    );
  }
}

export default Map