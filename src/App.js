import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'


class App extends Component {
  state = {
    defaultCenter: {lat: 43.0731, lng: -89.4012},
    defaultZoom: 11
  };

  render() {
    return (
      <div className="App"> 
        <header>
          <h2>Madison Microbreweries</h2>
          <h5>Because we all need a drink to celebrate finishing this class, right?</h5>
        </header>
        <Map center={this.state.defaultCenter} zoom={this.state.defaultZoom}/>
      </div>  
    );
  }
}

export default App