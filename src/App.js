// References:  
// https://developers.google.com/maps/documentation/javascript/tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
// https://developer.foursquare.com/docs/api
// https://www.youtube.com/watch?v=dAhMIF0fNpo&t=551s
// https://www.youtube.com/watch?v=Dj5hzKBxCBI
// https://www.youtube.com/watch?v=dAhMIF0fNpo


import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import Footer from './Footer.js'
import SquareAPI from './API_Call.js'
import Map from './Map.js'

// NOTE:  Shifted from a predefined llist of sites to with API search for "breweries"
// my favorite microbreweries in Madison WI
//const breweryList = [
  //{venue_Id: "4d686a320a25b60c55821790", name: "Great Dane Pub and Brewing Company", lat: 43.074376, lng: -89.380065, serveFood: "full menu"}, 
  //{venue_Id: "5704352b38fad4ea22a2da45", name: "Rockhound Brewing Company", lat: 43.06241, lng: -89.401158, serveFood: "full menu" }, 
  //{venue_Id: "4ac7f435f964a520cbba20e3", name: "Ale Asylum", lat: 43.120465, lng: -89.354151, serveFood: "appetizers, salads, sandwiches & pizza"}, 
  //{venue_Id: "41326e00f964a52097151fe3", name: "Capital Brewery", lat: 43.120465, lng: -89.516643, serveFood: "appetizers, salads, sandwiches & pizza"}, 
  //{venue_Id: "558b27d3498ecd8a4f3fd6ee", name: "Hop Haus Brewing Company", lat: 42.988042, lng: -89.533156, serveFood: "appetizers & pizza"}, 
  //{venue_Id: "4fc813c4e4b0ab3d6544b5ee", name: "One Barrel Brewing", lat: 43.091774, lng: -89.355005, serveFood: "appetizers & pizza"},
  //{venue_Id: "50de2528e4b04716420268ff", name: "Karben4 Brewing", lat: 43.126630, lng: -89.326250, serveFood: "full menu"},
  //{venue_Id: "4eb077438b813ed007ba567e", name: "Vintage Brewing Co.", lat: 43.050930, lng: -89.475190, serverFood: "full menu"}
//];

class App extends Component {

  constructor() {
    super(); 

    // set initial state
    this.state = {
      venues: [],
      breweryMarkers: [],
      zoom: 10
    };
  }

  // function to close any open marker(s) when click on a marker
  closeOpenMarkers = () => {
    const breweryMarkers = this.state.breweryMarkers.map(marker => {
      marker.isOpen = false; 
      return marker; 
    });
  // reset state of breweryMarkers array to update the isOpen variables
  this.setState({breweryMarkers: Object.assign(breweryMarkers, breweryMarkers)})
  }

  // function to change state of variable on user click of a marker
  learnMoreOnClick = (marker) => {
    // first close any open markers
    this.closeOpenMarkers()
    // change set of variable 
    marker.isOpen = true; 
    // reset state
    // learning resource for .assign
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    this.setState({breweryMarkers: Object.assign(this.state.breweryMarkers, marker)})
    // find the object (data) for a particular marker using venue.id
    const rightVenue = this.state.venues.find(venue => venue.id === marker.markerId)
    //console.log(rightVenue) // TESTING 

    // use markerId to get additional location data from FourSquare for that venue
    SquareAPI.getVenueDetails(marker.markerId).then(results => {
      // merge new data with data from first API call 
      const mergedVenueData = Object.assign(results.response.venue, rightVenue);
      console.log(mergedVenueData) // TESTING 
    })
  }

  // asynch -- make sure that call is complete before try tto render()
  componentDidMount() {
    SquareAPI.search({
      near: "Madison, WI", 
      query: "brewery", 
      limit: 2
    //}).then(results => console.log(results));
    }).then(results => {
      const { venues } = results.response;
      //const { center } = results.response.geocode.feature.geometry;
      const breweryMarkers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng, 
          isOpen: false,  // open or closed
          isVisible: true, // render or not render
          markerId: venue.id
        };
      }); 
      this.setState({ venues, breweryMarkers });
      console.log(results); 
    });
  }

  render() {
    return (
      <div className='App'>
        <Header/>
        
        <div className="main-content">
          <div className="picklist"></div>  
          <div id="map">
            <Map {...this.state} learnMoreOnClick = {this.learnMoreOnClick}/>
          </div>
        </div>    

        <Footer/>
      </div>  
    )
  }         
}  

export default App