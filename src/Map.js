// Display Map with Google Maps React
//reference:  https://www.npmjs.com/package/google-map-react

import React, {Component} from 'react';
import Markers from './Markers.js'

class MapRefactor extends Component {

  componentDidMount() {
    this.displayMap()
  }

  mapScript(googleMapsURL) { 
    var firstScript = window.document.getElementsByTagName("script")[0]
    var newScript = window.document.createElement("script")
    newScript.async = true
    newScript.defer = true
    newScript.src = googleMapsURL
    firstScript.parentNode.insertBefore(newScript, firstScript)
  }  

  displayMap = () => {
      // loads the required script
    this.mapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC91SKF-vOtspqbdEWrGpWEvYcrv1iQyuU&callback=initMap")
      // need to convert to window so JavaScript can find initMap
    window.initMap = this.initMap
  }

  // Modified function from Google Maps documentation to arrow function
  // https://developers.google.com/maps/documentation/javascript/tutorial
  // need to initialize map
  initMap = () => {
    // need to use window (global object of the HTML document)
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.0731, lng: -89.4012}, // Madison, WI
      zoom: 10,
    })
    this.setState(map) // I set map state here, so use this.state.map below instead of this.props.map
  }

  render() {
    return (
      <div style={{ height: '80vh', width: '100%'}}>
        <Markers map={this.state.map} breweries={this.props.breweries}/>
      </div>
    );
  }
}

export default MapRefactor 