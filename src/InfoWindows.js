// Display Brewery Markers on Map
// References:  
// Lesson 5-7-6
// https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
// https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
// https://developers.google.com/maps/documentation/javascript/markers

import React, {Component} from 'react';
import SquareAPI from './API_Call.js'

class InfoWindow extends Component {
  constructor() {
    super();

    this.state = {
      breweryData: {},
      allBreweryData: [],
    }
  }

  componentDidMount() {
    this.displayInfoWindows()
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

      SquareAPI.getVenueDetails(call).then(results => {
        console.log(results) // TESTING - WORKING 
        const breweryData = results.response.venue;
        console.log(breweryData); // this is an object // TESTING - WORKING 
        return(breweryData)
      })

      let allBreweryData = allBreweryData.push({breweryData}) // Add each new object to array - NOT WORKING :-()
      //console.log(allBreweryData) // TESTING 

    })
    // when done looping, setState so can use to render infoMarkers
    // this.setState(allBreweryData) // NOT WORKING 
  }

  render() {
    return (
      <div className="infoWindow"> 
      </div>
    )  
  }

}

export default InfoWindow