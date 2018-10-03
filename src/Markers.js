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
    allBreweryData: []
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

        console.log(breweryData); // this is an object // TESTING - WORKING
        console.log(breweryData.name)  // TESTING 
        console.log(breweryData.location.formattedAddress[0]) // TESTING 
        console.log(breweryData.location.formattedAddress[1]) // TESTING 
        console.log(breweryData.url)  // TESTING 
        console.log(breweryData.contact.formattedPhone)  // TESTING 
      
        // rule #1, don't directly assign value (e.g. no .push or .concat)
        // instead reset state
        // spread operator:  https://medium.com/@thejasonfile/using-the-spread-operator-in-react-setstate-c8a14fc51be1
        this.setState({allBreweryData: [...this.state.allBreweryData, breweryData]})
        console.log(this.allBreweryData) // TESTING 

      }).catch(error => console.log('FourSquare error:', error))
    })
  }

  // loop through my favorite breweries array to display marker for each
  // and add onclick action for each marker
  displayMarkers(breweries) {
    this.props.breweries.map(brewery => {
      var marker = new window.google.maps.Marker ({
        position: {lat: brewery.lat, lng: brewery.lng},
        map: this.props.map,
        title: brewery.name,
        animation: window.google.maps.Animation.DROP,
      })
    
      // dislay on the map
      marker.setMap(this.props.map);
      // set state
      this.setState(marker);

      // event listener for each marker
      marker.addListener('click', function() {
        infowindow.open(this.map, this.marker);
      });

      // create info window content string
      // NEEDS CSS FORMATTING
      var infoContent = '<div id="content">' + 
        '<h4 id="name">{this.breweryData.name}</h4></div>' + 
        //'<h4 id="street address">{this.breweryData.location.formattedAddress[0]})</h4>' + 
        //'<h4 id="city address">{this.breweryData.location.formattedAddress[1]}</h4>' + 
        //'<h4 id="phone">{this.breweryData.contact.formattedPhone}</h4>' + 
        //'<h4 id="url">{this.breweryData.url}</h4>' + 
        '</div>'

      // display info window  -- does this go here or in Map? 
      var infowindow = new window.google.maps.InfoWindow({
        content: infoContent
      });
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