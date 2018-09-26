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
      {id: 1, name: "Great Dane Pub and Brewing Company", lat: 43.074376, lng: -89.380065}, 
      {id: 2, name: "Rockhound Brewing Company", lat: 43.06241, lng: -89.401158}, 
      {id: 3, name: "Ale Asylum", lat: 43.120465, lng: -89.354151}, 
      {id: 4, name: "Capital Brewery", lat: 43.120465, lng: -89.516643}, 
      {id: 5, name: "Hop Haus Brewing Company", lat: 42.988042, lng: -89.533156}, 
      {id: 6, name: "One Barrel Brewing", lat: 43.091774, lng: -89.355005},
      ],
      
      filteredBreweries: [],

      markers: [],
      filteredMarkers: [],

      infoWindow: {}  // 
    }
  }

  // onclick that calls InfoWindow component
  // when API -- did you get or not 
  // setContent --> infowindow.setContent()
  // class="infowindow"


  render() {
    return (
      <div className="App"> 
        <header className="App-header">
          <Header/>
        </header>
        
        <div className="main-content">
          <div className="picklist"></div>  

          <div className="map">
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

export default App