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
    markers: [] // needed?  
  }

  displayWindowOnClick(brewery) {
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
      this.setState(breweryData)

      console.log(breweryData); // this is an object // TESTING - WORKING
      console.log(breweryData.name)  // TESTING 
      console.log(breweryData.location.formattedAddress[0]) // TESTING 
      console.log(breweryData.location.formattedAddress[1]) // TESTING 
      console.log(breweryData.url)  // TESTING 
      console.log(breweryData.contact.formattedPhone)  // TESTING 
      //return(breweryData) ?  I DO NOT THINK IT NEEDS RETURNED AS USED BELOW

    }).catch(error => console.log('FourSquare error:', error))

    // create info window content string
    // NEEDS CSS FORMATTING - MORE WORK
    var infoContent = '<div id="content">' + 
    '<h4 id="name">{this.breweryData.name}</h4></div>' + 
    '<h4 id="street address">{this.breweryData.location.formattedAddress[0]})</h4>' + 
    '<h4 id="city address">{this.breweryData.location.formattedAddress[1]}</h4>' + 
    '<h4 id="phone">{this.breweryData.contact.formattedPhone}</h4>' + 
    '<h4 id="url">{this.breweryData.url}</h4>' + 
    '</div>'

    // Display info window
    var info = new window.google.maps.InfoWindow({
      content: infoContent
      infowindow.open(map, marker)
    });
  }

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });





  componentDidMount() {
    this.displayMarkers(this.props.brewery)
  }

  // loop through my favorite breweries array to display marker for each
  // set onclick action for each marker
  displayMarkers = () => {
    this.props.breweries.map(brewery => {
      var marker = new window.google.maps.Marker ({
        position: {lat: brewery.lat, lng: brewery.lng},
        map: this.props.map,
        title: brewery.name,
        animation: window.google.maps.Animation.DROP,
      })
      // dislay on the mape
      marker.setMap(this.props.map);
      // set state
      this.setState(marker);
      // create onclick
      marker.addListener('click', this.displayWindowOnClick(brewery));
    })
  }  


  render() {
    return (
      <div className="marker-icon"> 
      </div>
    )  
  }


}

export default Markers