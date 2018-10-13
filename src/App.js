// References:  
// https://developers.google.com/maps/documentation/javascript/tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
// https://developer.foursquare.com/docs/api
// https://www.youtube.com/watch?v=dAhMIF0fNpo&t=551s
// https://www.youtube.com/watch?v=Dj5hzKBxCBI
// https://www.youtube.com/watch?v=dAhMIF0fNpo


import React, { Component } from 'react';
import './App.css';
//import Header from './Header.js'
//import Footer from './Footer.js'
import SquareAPI from './API_Call.js'
import Map from './Map.js'
import SidePanel from './SidePanel.js'


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
      query: "", 
      filteredVenues: [],
      breweryMarkers: [],
      zoom: 10,
    };
  }

  // this function is used to filter the venue list displayed based on user input
  getFilteredList = (query) => {
    // when user enters input, filter venues array and return reduced array
    const filteredVenues = this.state.venues.filter(venue =>
      venue.name.toLowerCase().includes(query.toLowerCase()),
    );
    console.log({filteredVenues}) // TESTING 
    return filteredVenues;
  };


  // function to filter markers on user entry in input box
  filterOnUserEntry = event => {
    // setState to user-entered filter string
    const query = event.target.value; 
    this.setState({query})
    console.log({query}) // TESTING 

    // take no action if no user entry 
    if (query === "") { 
      const filteredVenues = this.state.venues;
      console.log({filteredVenues}) // TESTING 
      this.setState({filteredVenues});
      return filteredVenues;
    }

    // if user enters filter query... 
    else {
      // pass query to function to filter list
      const filteredVenues = this.getFilteredList(query);
      console.log({filteredVenues}) // TESTING 
      this.setState({filteredVenues})

      // map over the array of filteredVenues to find venue names which match query string
      const markers = this.state.filteredVenues.map(venue => {
        const match = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
        // if a query match, id which marker 
        const marker = this.state.breweryMarkers.find(marker => marker.markerId === venue.id);
        // change marker's isOpen attribute based on the query match/not a match
        if(match) {
          marker.isOpen = true;
        }
        else {
          marker.isOpen = false;
        }
        return marker;
      });
    // reset the state of the markers
    this.setState({markers});
    }
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
    // find the right object (data) for a particular marker using venue.id
    const rightVenue = this.state.venues.find(venue => venue.id === marker.markerId)
    //console.log(rightVenue) // TESTING 
    // use markerId to get additional location data from FourSquare for that venue
    SquareAPI.getVenueDetails(marker.markerId).then(results => {
      // merge new data with the right data from first API call 
      const mergedVenueData = Object.assign(rightVenue, results.response.venue);
      //console.log(mergedVenueData) // TESTING 
      this.setState({venues: Object.assign(this.state.venues, mergedVenueData)})
      console.log(this.state.venues) // TESTING 
    })
  }

  // function to open InfoWindow on click of brewery on sidepanel
  openInfoWindowOnClick = (venue) => {
    const marker = this.state.breweryMarkers.find(marker => marker.markerId === venue.id);
    this.learnMoreOnClick(marker);
    // console.log(venue) // TESTING 
  }

  componentDidMount() {
  // asynch -- make sure that call is complete before try to render()
    SquareAPI.search({
      near: "Madison, WI", 
      query: "brewery", 
      limit: 10
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

          <div className="main-content">

            <SidePanel 
              {...this.state} /// passes all state data
              className="picklist"               
              openInfoWindowOnClick = {this.openInfoWindowOnClick}
              filterOnUserEntry = {this.filterOnUserEntry}/>

            <Map 
              {...this.state} // passes all state data
              learnMoreOnClick = {this.learnMoreOnClick}
              filterOnUserEntry = {this.filterOnUserEntry}/>

          </div>

      </div>  
    )
  }         
}  

export default App