// References:  
// https://developers.google.com/maps/documentation/javascript/tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
// https://developer.foursquare.com/docs/api
// https://www.youtube.com/watch?v=dAhMIF0fNpo&t=551s
// https://www.youtube.com/watch?v=Dj5hzKBxCBI
// https://www.youtube.com/watch?v=dAhMIF0fNpo

import React, { Component } from 'react'
import './App.css';
import Header from './Header.js'
import SquareAPI from './API_Call.js'
import Map from './Map.js'
import SidePanel from './SidePanel.js'
import ErrorBoundary from './ErrorBoundary.js'

// NOTE:  Shifted from a predefined llist of sites to with API search for "breweries"
// but here are my favorite microbreweries in Madison WI!
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
      filteredBreweryMarkers: [],
      zoom: 10,
      sidePanelOpen: true,
    };
  }

  componentDidMount() {
  // asynch -- make sure API call is complete before try to render()
    SquareAPI.search({
      near: "Madison, WI", 
      query: "brewery", 
      limit: 4
    //}).then(results => console.log(results)); // TESTING
    }).then(results => {
      const { venues } = results.response;
      const breweryMarkers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng, 
          isOpen: false,  // open or closed
          isVisible: true, // render or not render
          id: venue.id,
          //animation: null,
          clickedMarker: false,
        };
      });
      this.setState({venues});
      this.setState({breweryMarkers});
      // set initial filteredVenues to venues
      this.setState({filteredVenues: venues});
      this.setState({filteredBreweryMarkers: breweryMarkers})

      //console.log(this.state.venues) // TESTING - OK
      //console.log(this.state.breweryMarkers) // TESTING - OK
      //console.log(results); //TESTING 
    })
    // added error handling; console.log any error message
    .catch(error => {
      this.setState({error})
      console.log(this.state.error)
    })
  }

// function to close any open marker(s) and reset animation when click on a marker
  closeOpenMarkers = () => {
    const breweryMarkers = this.state.breweryMarkers.map(marker => {
      marker.isOpen = false; 
      // reset animation for all pins to null 
      //marker.animation = null;
      marker.clickedMarker = false;
      return marker; 
    });
  // reset state of breweryMarkers array to update the attributes
  this.setState({breweryMarkers: Object.assign(breweryMarkers, breweryMarkers)})
  }

  // function to open InfoWindow on sidepanel venue
  openInfoWindowOnVenueClick = (venue) => {
    // close all windows
    this.closeOpenMarkers();
    const markers = this.state.breweryMarkers;
    //console.log(venue) // TESTING 
    //console.log(markers) // TESTING
    //console.log(markers[0].id) // TESTING
    //console.log(venue.venue.id) // TESTING 
    // loop to find the right marker for this venue
    for (var i=0; i<markers.length; i++) {
      if (markers[i].id === venue.venue.id) {
        const marker = markers[i]; 

        // reset attributes on clicked pin
        marker.isOpen = true;
        //marker.animation = google.maps.Animation.BOUNCE;
        // reset state
        this.setState({breweryMarkers: Object.assign(this.state.breweryMarkers, marker)})
        //console.log(this.state.breweryMarkers) // TESTING
        this.openInfoWindowOnClick(marker);
        //console.log(this); // TESTING
      }
    }
  }

  // function to change state of variable on user click of a marker
  openInfoWindowOnClick = (marker) => {
    // find the right venue object (data) for a particular marker using venue.id
    const rightVenue = this.state.venues.find(venue => venue.id === marker.id)
    //console.log(rightVenue) // TESTING 
    // use marker id to get additional location data from FourSquare for that venue
    SquareAPI.getVenueDetails(marker.id).then(results => {
      // merge new data with the right data from first API call 
      const mergedVenueData = Object.assign(rightVenue, results.response.venue);
      this.setState({venues: Object.assign(this.state.venues, mergedVenueData)})
      //console.log(this.state.venues) // TESTING 
    })    
    // added error handling; console.log any error message
    .catch(error => {
      this.setState({error})
      console.log(this.state.error)
    })
  }

  // function to open InfoWindow on click of brewery on sidepanel
  learnMoreOnClick = (marker) => {
    // first close any open markers and reset animation for all markers
    this.closeOpenMarkers()
    // reset attributes on clicked pin
    marker.isOpen = true;
    //marker.animation = google.maps.Animation.BOUNCE;
    marker.clickedMarker = true; 
    // reset state
    this.setState({breweryMarkers: Object.assign(this.state.breweryMarkers, marker)})
    //console.log(this.state.breweryMarkers) // TESTING  
    // call infowindow function 
    this.openInfoWindowOnClick(marker);
  }


  // function to filter markers on user entry in input box
  filterOnUserEntry = event => {
    // setState to user-entered filter string
    const query = event.target.value; 
    this.setState({query})
    console.log({query}) // TESTING 

    const filteredVenues = this.getFilteredVenues(query); 
    this.setState({filteredVenues});

    const filteredBreweryMarkers = this.updateBreweryMarkers(query); 
    this.setState({filteredBreweryMarkers});
  } 

  // this function is used to filter the venue list displayed based on user input
  getFilteredList = (query) => {
    // when user enters input, filter venues array and return reduced array
    const filteredVenues = this.state.venues.filter(venue =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
    //console.log({filteredVenues}) // TESTING 
    return filteredVenues;
  };

  getFilteredVenues = (query) => {
    // take no action if no user entry 
    if (query === "") { 
      const filteredVenues = this.state.venues;
      console.log({filteredVenues}); // TESTING
      this.setState({filteredVenues});
      return filteredVenues;
    }
    // if user enters filter query... 
    else {
      // pass query to function to filter list
      const filteredVenues = this.getFilteredList(query);
      console.log({filteredVenues}); // TESTING 
      this.setState({filteredVenues});
      return filteredVenues;
    }
  }

  updateBreweryMarkers = (query) => {
    // take no action if no user entry 
    if (query === "") { 
      // eslint-disable-next-line
      const breweryMarkers = this.state.breweryMarkers;
      // console.log({breweryMarkers});  // TESTING
    }
    // if user enters filter query, update the isVisible attribute
    else {
      // map over the array of filteredVenues to find venue names which match query string
      const breweryMarkers = this.state.venues.map(venue => {
        const match = venue.name.toLowerCase().includes(query.toLowerCase());
          // if a query match, id which marker 
          const marker = this.state.breweryMarkers.find(marker => marker.id === venue.id);
          // change marker's isVisible attribute based on the query match/not a match
          if (match) {
            marker.isVisible = true;
          }
          else {
            marker.isVisible = false;
          }
          return marker;
      });
      this.setState({breweryMarkers})
      //console.log({breweryMarkers});  // TESTING  
    }
  }

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          
          <Header className="header"/>
          
          <div className="main">
            <SidePanel            
              {...this.state} // passes all state data            
              openInfoWindowOnVenueClick = {this.openInfoWindowOnVenueClick}
              filterOnUserEntry = {this.filterOnUserEntry}/>
            
            <label tabindex="0"className="hidden" aria-label="On next tab, map of Madison Wisconsin with markers for local microbreweries is displayed.">x</label>

            <Map
              {...this.state} // passes all state data
              learnMoreOnClick = {this.learnMoreOnClick}
              filterOnUserEntry = {this.filterOnUserEntry}/>
          </div>
        
        </ErrorBoundary>
      </div>  
    )
  }         
}

export default App