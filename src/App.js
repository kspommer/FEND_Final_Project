import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import Header from './Header.js'
import Footer from './Footer.js'
import Marker from './Marker.js'

class App extends Component {
  state = {
    defaultCenter: {lat: 43.0731, lng: -89.4012},
    defaultZoom: 11
  };

  render() {
    return (
      <div className="App"> 
        <header className="App-header">
          <Header/>
        </header>
        
        <div className="main-content">
          <div className="picklist"></div>  

          <div className="map">
            <Map center={this.state.defaultCenter} zoom={this.state.defaultZoom}/>   

            
          </div>
        </div>    

        <footer>
          <Footer/>
        </footer>

      </div>  
    );
  }
}

export default App