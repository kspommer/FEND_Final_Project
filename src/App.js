// References:  
// https://developers.google.com/maps/documentation/javascript/tutorial


import React, { Component } from 'react';
import './App.css';

import Map from './Map.js';
import Header from './Header.js'
import Footer from './Footer.js'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultCenter: {lat: 43.0731, lng: -89.4012},
      defaultZoom: 10,

      breweries: [
      {venue_id: "4d686a320a25b60c55821790", name: "Great Dane Pub and Brewing Company", lat: 43.074376, lng: -89.380065, serveFood: "full menu"}, 
      {venue_id: "5704352b38fad4ea22a2da45", name: "Rockhound Brewing Company", lat: 43.06241, lng: -89.401158, serveFood: "full menu" }, 
      {venue_id: "4ac7f435f964a520cbba20e3", name: "Ale Asylum", lat: 43.120465, lng: -89.354151, serveFood: "appetizers, salads, sandwiches & pizza"}, 
      {venue_id: "41326e00f964a52097151fe3", name: "Capital Brewery", lat: 43.120465, lng: -89.516643, serveFood: "appetizers, salads, sandwiches & pizza"}, 
      {venue_id: "558b27d3498ecd8a4f3fd6ee", name: "Hop Haus Brewing Company", lat: 42.988042, lng: -89.533156, serveFood: "appetizers & pizza"}, 
      {venue_id: "4fc813c4e4b0ab3d6544b5ee", name: "One Barrel Brewing", lat: 43.091774, lng: -89.355005, serveFood: "appetizers & pizza"},
      {venue_id: "50de2528e4b04716420268ff", name: "Karben4 Brewing", lat: 43.126630, lng: -89.326250, serveFood: "full menu"},
      {venue_id: "4eb077438b813ed007ba567e", name: "Vintage Brewing Co.", lat: 43.050930, lng: -89.475190, serverFood: "full menu"}
      ],
      
      filteredBreweries: [],

      markers: [],
      filteredMarkers: [],

      infoWindow: {}  // for data returned from API call
    }
  }

  // function to call to display the map (which calls the initMap function) 
  componentDidMount() {
    this.displayMap()
  }

  // modified from Google Maps documentation to arrow function
  // https://developers.google.com/maps/documentation/javascript/tutorial
  // need to initialize map
  initMap = () => {
    // need to use window. -global object of your HTML document
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.0731, lng: -89.4012},
      zoom: 10
    })
  }

  displayMap = () => {
    // load the required script
    mapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC91SKF-vOtspqbdEWrGpWEvYcrv1iQyuU&callback=initMap")
    // convert to window option so JavaScript can find initMap
    window.initMap = this.initMap
  }

  // onclick that calls InfoWindow component
  // when API -- did you get or not 
  // setContent --> infowindow.setContent()
  // class="infowindow"

  render() {
    return (
      <div className='App'>
        <header className="header">
          <Header/>
        </header>
        
        <div className="main-content">
          <div className="picklist"></div>  

          <div id="map">
            <Map 
              breweries={this.state.breweries}
              center={this.state.defaultCenter} 
              zoom={this.state.defaultZoom}/> 
          </div>

        </div>    

        <footer>
          <Footer/>
        </footer>

      </div>  
    );
  }
}  

// This function creates script (located in index.html in a JavaScript apps)
// React needs this here to be able to use it
    // </script>
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
      // async defer>
    // </script>

function mapScript(googleMapsURL) { 
  // locate first script tag (index = 0)
  var firstScript = window.document.getElementsByTagName("script")[0]
  // create </script> 
  var newScript = window.document.createElement("script")
  newScript.async = true
  newScript.defer = true
  newScript.src = googleMapsURL
  // insert new script before all other scripts
  // append new script before first script
  // reference:  https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
  // var insertedNode = parentNode.insertBefore(newNode, referenceNode)
  firstScript.parentNode.insertBefore(newScript, firstScript)
}


export default App