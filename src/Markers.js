// Display Brewery Markers on Map
// References:  
// Lesson 5-7-6
// https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
// https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
// https://developers.google.com/maps/documentation/javascript/markers

import React, {Component} from 'react';
import SquareAPI from './API_Call.js'

class Markers extends Component {

  state = {
    breweryAPIdata: []
  }

  componentDidMount() {
    this.displayMarkers()
    this.displayInfoWindows()
  }

  // loop through my favorite breweries to display markers
  displayMarkers = () => {
    this.props.breweries.map(brewery => {
      var marker = new window.google.maps.Marker ({
        position: {lat: brewery.lat, lng: brewery.lng},
        map: this.props.map,
        title: brewery.name,
      })
      marker.setMap(this.props.map);
    })
  }

  displayInfoWindows = () => {
    // my authentication and base URL for FourSquare Get Details of a Venue API 
    const client_id = "ZWIBO3U1HBUWEJEMMOOGJNRPI1NALRWDIMDNTNPIAKMSUSJO"
    const client_secret = "OYD1TLNRJVVBZTL31KX0TRWG2AINNBJ1GXKNJTXVXCLHKSNF"
    const v = "20180929"
    const baseURL = "https://api.foursquare.com/v2/venues/" 

    // loop through breweries array to get venue_id and call API 
    this.props.breweries.map(brewery => {
      let brewery_venue = brewery.venue_Id
      let endPoint = baseURL + brewery_venue
      let call = endPoint + "?client_id=" + client_id + "&client_secret=" + client_secret + "&v=" + v

      SquareAPI.getVenueDetails(call).then(results => console.log(results))
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