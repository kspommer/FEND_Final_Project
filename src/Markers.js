// Display Brewery Markers on Map
// References:  
// Lesson 5-7-6
// https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
// https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
// https://developers.google.com/maps/documentation/javascript/markers

import React, {Component} from 'react';

class Markers extends Component {

  componentDidMount() {
    this.displayMarkers()
  }

  // loop through my favorite breweries to display markers
  displayMarkers = () => {
    this.props.breweries.map(brewery => {
      var marker = new window.google.maps.Marker ({
        position: {lat: brewery.lat, lng: brewery.lng},
        map: this.props.map,
        title: brewery.name,
        isOpen: "true",
      })
      marker.setMap(this.props.map);
      this.setState(marker)
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