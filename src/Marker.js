// Display Brewery Markers on Map
// references:  
// Lesson 5-7-6
// https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
// https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
// https://developers.google.com/maps/documentation/javascript/markers

import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

class Marker extends Component {
  render() {
    // List of Madison area microbreweries
    breweries = [
    {id: 1, name: "Great Dane Pub and Brewing Company", lat: 43.074376, lng: -89.380065}, 
    {id: 2, name: "Rockhound Brewing Company", lat: 43.06241, lng: -89.401158}, 
    {id: 3, name: "Ale Asylum", lat: 43.120465, lng: -89.354151}, 
    {id: 4, name: "Capital Brewery", lat: 43.120465, lng: -89.516643}, 
    {id: 5, name: "Hop Haus Brewing Company", lat: 42.988042, lng: -89.533156}, 
    {id: 6, name: "One Barrel Brewing", lat: 43.091774, lng: -89.355005},
    ]

    // need to trigger this to happen each time map reloads
    // add a forEach loop below once get marker showing
    // render icon for each brewery
    // in the loop, call the 2nd API for some sort of data
    return (
      <div className="marker-icon"> 
        var marker = new google.maps.Marker({
          map: {this.props.map}, 
          position: {lat: 43.074376, lng: -89.380065},
          animation: google.maps.Animation.DROP,
          title: 'Great Dane'
        });
      </div>
    );
  }
}

export default Marker