// Display Brewery Markers on Map
// References:  
// Lesson 5-7-6
// https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
// https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
// https://developers.google.com/maps/documentation/javascript/markers
// https://developers.google.com/maps/documentation/javascript/infowindows

import React, {Component} from 'react';
import SquareAPI from './API_Call.js'

class Markers extends Component {

  componentDidMount() {
    this.displayMarkers()
  }

  // loop through my favorite breweries to display marker for each
  displayMarkers = () => {
    this.props.breweries.map(brewery => {
      var marker = new window.google.maps.Marker ({
        position: {lat: brewery.lat, lng: brewery.lng},
        map: this.props.map,
        title: brewery.name,
      })

      marker.setMap(this.props.map);
      this.setState(marker)
    })
  }

  // THIS IS THE FUNCTION I AM NOT SURE WHERE BELONGS...
  // when click on a marker / call API for more data 
  marker.addListener('click', function() {
    getInfoWindowData(brewery)
  }) 

  getInfoWindowData = (brewery) => {
    // my authentication and base URL for FourSquare Get Details of a Venue API 
    const client_id = "ZWIBO3U1HBUWEJEMMOOGJNRPI1NALRWDIMDNTNPIAKMSUSJO"
    const client_secret = "OYD1TLNRJVVBZTL31KX0TRWG2AINNBJ1GXKNJTXVXCLHKSNF"
    const v = "20180929"
    const baseURL = "https://api.foursquare.com/v2/venues/" 

    let brewery_venue = brewery.venue_Id
    //let brewery_venue = "4fc813c4e4b0ab3d6544b5ee"
    let endPoint = baseURL + brewery_venue
    let call = endPoint + "?client_id=" + client_id + "&client_secret=" + client_secret + "&v=" + v

    SquareAPI.getVenueDetails(call).then(results => {
      const breweryData = results.response.venue;
      console.log(breweryData); // this is an object // TESTING - WORKING 
    
      this.setState(breweryData)

      console.log(breweryData.name)  // TESTING 
      console.log(breweryData.location.formattedAddress[0]) // TESTING 
      console.log(breweryData.location.formattedAddress[1]) // TESTING 
      console.log(breweryData.url)  // TESTING 
      console.log(breweryData.contact.formattedPhone)  // TESTING 
      // return(breweryData) ?
    }).catch(error => console.log('FourSquare error:', error))

      // after get data, call the function to display the infowindow
      this.displayInfoWindow(this.brewery, this.breweryData)
  }

  displayInfoWindow(brewery, breweryData) {
    // create infoWindow content string
    // CANNOT FIGURE OUT WHY + DOES NOT WORK IN THIS ???
    var infoContent = '<div id="infoWindowContent"><h1 id="name">{this.breweryData.name}</h1></div>' 
    //+ <h1 id="street address">{this.breweryData.location.formattedAddress[0]})</h1> + 
    //<h1 id="city address">{this.breweryData.location.formattedAddress[1]}</h1> + 
    //<h1 id="phone">{this.breweryData.contact.formattedPhone}</h1>
    //<h1 id="url">{this.breweryData.url}</h1> + 
    //</div>

    // Display infowindow
    var infowindow = new window.google.maps.InfoWindow({
      content: infoContent
    });

  }  

  render() {
    return (
      <div className="marker-icon"> 
      </div>
    )  
  }

}

export default Markers