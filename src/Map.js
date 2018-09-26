// Display Map with Google Maps React
//reference:  https://www.npmjs.com/package/google-map-react

import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyC91SKF-vOtspqbdEWrGpWEvYcrv1iQyuU"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map