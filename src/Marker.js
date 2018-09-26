// Display Brewery Markers on Map
// references:  
// Lesson 5-7-6
// https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
// https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
// https://developers.google.com/maps/documentation/javascript/markers

import React, {Component} from 'react';

class Marker extends Component {
  render() {
    // need to trigger this to happen each time map reloads
    // add a forEach loop below once get marker showing
    // render icon for each brewery
    // in the loop, call the 2nd API for some sort of data
    return (
      <div className="marker-icon"> 
        {this.props.text}
      </div>
    )
  }
}

export default Marker