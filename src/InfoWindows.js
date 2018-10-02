// Display Brewery Markers on Map
// References:  
// Lesson 5-7-6
// https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
// https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
// https://developers.google.com/maps/documentation/javascript/markers

import React, {Component} from 'react';
import SquareAPI from './API_Call.js'

class InfoWindowData extends Component {
  constructor() {
    super();

    this.state = {
      breweryData: {},
    }
  }

  componentDidMount() {
    this.getInfoWindowData()
  }

  //displayInfoWindow = () => {
    //getData()
    //console.log({breweryData})
  //}

  getInfoWindowData = () => {
    // my authentication and base URL for FourSquare Get Details of a Venue API 
    const client_id = "ZWIBO3U1HBUWEJEMMOOGJNRPI1NALRWDIMDNTNPIAKMSUSJO"
    const client_secret = "OYD1TLNRJVVBZTL31KX0TRWG2AINNBJ1GXKNJTXVXCLHKSNF"
    const v = "20180929"
    const baseURL = "https://api.foursquare.com/v2/venues/" 

    //let brewery_venue = brewery.venue_Id
    let brewery_venue = "4fc813c4e4b0ab3d6544b5ee"
    let endPoint = baseURL + brewery_venue
    let call = endPoint + "?client_id=" + client_id + "&client_secret=" + client_secret + "&v=" + v

    SquareAPI.getVenueDetails(call).then(results => {
      //console.log(results) // TESTING - WORKING 
      const breweryData = results.response.venue;
      console.log(breweryData); // this is an object // TESTING - WORKING 

      this.setState(breweryData)

      console.log(breweryData.name)
      console.log(breweryData.location.formattedAddress[0])
      console.log(breweryData.location.formattedAddress[1])
      console.log(breweryData.url)
      console.log(breweryData.contact.formattedPhone)

      return(breweryData)

    })
  }

  render() {
    return (
      <div className="infoWindow"> 
      </div>
    )  
  }

}

export default InfoWindowData