// References:  
// https://developers.google.com/maps/documentation/javascript/tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
// Axios:  https://github.com/axios/axios
// https://developer.foursquare.com/docs/api
// https://www.youtube.com/watch?v=dAhMIF0fNpo&t=551s
// https://www.youtube.com/watch?v=Dj5hzKBxCBI
// https://www.youtube.com/watch?v=dAhMIF0fNpo


import React, { Component } from 'react';

import './App.css';
//import addMarker from './addMarker.js';
import Header from './Header.js'
import Footer from './Footer.js'
import SquareAPI from './API_Call.js'
import MapRefactor from './Map.js'

// my favorite microbreweries in Madison WI
const breweryList = [
  {venue_Id: "4d686a320a25b60c55821790", name: "Great Dane Pub and Brewing Company", lat: 43.074376, lng: -89.380065, serveFood: "full menu"}, 
  {venue_Id: "5704352b38fad4ea22a2da45", name: "Rockhound Brewing Company", lat: 43.06241, lng: -89.401158, serveFood: "full menu" }, 
  {venue_Id: "4ac7f435f964a520cbba20e3", name: "Ale Asylum", lat: 43.120465, lng: -89.354151, serveFood: "appetizers, salads, sandwiches & pizza"}, 
  {venue_Id: "41326e00f964a52097151fe3", name: "Capital Brewery", lat: 43.120465, lng: -89.516643, serveFood: "appetizers, salads, sandwiches & pizza"}, 
  {venue_Id: "558b27d3498ecd8a4f3fd6ee", name: "Hop Haus Brewing Company", lat: 42.988042, lng: -89.533156, serveFood: "appetizers & pizza"}, 
  {venue_Id: "4fc813c4e4b0ab3d6544b5ee", name: "One Barrel Brewing", lat: 43.091774, lng: -89.355005, serveFood: "appetizers & pizza"},
  {venue_Id: "50de2528e4b04716420268ff", name: "Karben4 Brewing", lat: 43.126630, lng: -89.326250, serveFood: "full menu"},
  {venue_Id: "4eb077438b813ed007ba567e", name: "Vintage Brewing Co.", lat: 43.050930, lng: -89.475190, serverFood: "full menu"}
  ];
    
class App extends Component {

  state = {
    breweries: breweryList,
    breweryAPIdata: [],
  }

  // get venue data from API 
  //componentDidMount() {
    //this.getBreweryData()
  //}

  // function to call FourSquare to get data 
  getBreweryData = () => {
    // my authentication and base URL for FourSquare Get Details of a Venue API 
    const client_id = "ZWIBO3U1HBUWEJEMMOOGJNRPI1NALRWDIMDNTNPIAKMSUSJO"
    const client_secret = "OYD1TLNRJVVBZTL31KX0TRWG2AINNBJ1GXKNJTXVXCLHKSNF"
    const v = "20180929"
    const baseURL = "https://api.foursquare.com/v2/venues/" 

    // loop through breweries array to get venue_id and call API 
    this.state.breweries.map(brewery => {
      let brewery_venue = brewery.venue_Id
      let endPoint = baseURL + brewery_venue
      let call = endPoint + "?client_id=" + client_id + "&client_secret=" + client_secret + "&v=" + v

      SquareAPI.getVenueDetails(call).then(results => console.log(results))
    })
  }

  render() {
    return (
      <div className='App'>
        <Header/>
        
        <div className="main-content">
          <div className="picklist"></div>  
          <div id="map">
          <MapRefactor map={this.state.map} breweries={this.state.breweries}/>
          </div>
        </div>    

        <Footer/>
      </div>  
    )
  }         
}  

export default App