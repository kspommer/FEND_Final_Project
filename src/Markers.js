// Display Brewery Markers on Map
// References:  
// Lesson 5-7-6
// https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
// https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
// https://developers.google.com/maps/documentation/javascript/markers
// https://developers.google.com/maps/documentation/javascript/infowindows

import React, {Component} from 'react';
import SquareAPI from './API_Call.js'
import InfoWindow from 'react'

class Markers extends Component {

  state = {
    allBreweryData: [], 
    markers: []
  }

  componentDidMount() {
    this.getBreweryData(this.props.breweries)
    this.displayMarkers(this.props.breweries)
  }

  getBreweryData(breweries) {
    this.props.breweries.map(brewery => {
      // my authentication and base URL for FourSquare Get Details of a Venue API 
      const client_id = "ZWIBO3U1HBUWEJEMMOOGJNRPI1NALRWDIMDNTNPIAKMSUSJO"
      const client_secret = "OYD1TLNRJVVBZTL31KX0TRWG2AINNBJ1GXKNJTXVXCLHKSNF"
      const v = "20180929"
      const baseURL = "https://api.foursquare.com/v2/venues/"

      // generate URL for API call
      let brewery_venue = brewery.venue_Id
      //let brewery_venue = "4fc813c4e4b0ab3d6544b5ee"
      let endPoint = baseURL + brewery_venue
      let call = endPoint + "?client_id=" + client_id + "&client_secret=" + client_secret + "&v=" + v

      // make API call for data for info window
      SquareAPI.getVenueDetails(call).then(results => {
        const breweryData = results.response.venue; 
        // add data to this brewery object
        const address1 = results.response.venue.location.formattedAddress[0];
        const address2 = results.response.venue.location.formattedAddress[1];
        const url = results.response.venue.url;
        const phone = results.response.venue.contact.formattedPhone;
        console.log(url) // TESTING 
        console.log({brewery}) // TESTING 
      }).catch(error => console.log('FourSquare error:', error))

      // add the four API data fields to each brewery object 





      // set State
      this.setState({breweries})
    })
  }

  // display info window  -- does this go here or in Map? 
  //let largeInfowindow = new window.google.maps.InfoWindow();

  // loop through my favorite breweries array to display marker for each
  // and add onclick action for each marker
  displayMarkers(breweries) {
    this.props.breweries.map(brewery => {
      var marker = new window.google.maps.Marker ({
        position: {lat: brewery.lat, lng: brewery.lng},
        map: this.props.map,
        title: brewery.name,
        animation: window.google.maps.Animation.DROP,
      });
      // dislay marker on the map
      marker.setMap(this.props.map);
      // add marker to and setState of markers array 
      this.setState({markers: [...this.state.markers, marker]})
      // add event listener to each marker
      //marker.addListener('click', function() {
        //populateInfoWindow(this, newInfoWindow);
      //});
    })
      // create info window content string
      // NEEDS CSS FORMATTING
      //var infoContent = '<div id="content">' + 
        //'<h4 id="name">{this.breweryData.name}</h4></div>' + 
        //'<h4 id="street address">{this.breweryData.location.formattedAddress[0]})</h4>' + 
        //'<h4 id="city address">{this.breweryData.location.formattedAddress[1]}</h4>' + 
        //'<h4 id="phone">{this.breweryData.contact.formattedPhone}</h4>' + 
        //'<h4 id="url">{this.breweryData.url}</h4>' + 
        //'</div>'
    //})
  }  


  render() {
    return (
      <div className="marker-icon"> 
      </div>
    )  
  }


}

export default Markers