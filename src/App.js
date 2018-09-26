import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import Header from './Header.js'
import Footer from './Footer.js'

class App extends Component {
  state = {
    defaultCenter: {lat: 43.0731, lng: -89.4012},
    defaultZoom: 11
  };

  render() {
    return (
      <div className="App"> 
        <header>
          <Header/>
        </header>
          
        <Map center={this.state.defaultCenter} zoom={this.state.defaultZoom}/>





        <footer>
          <Footer/>
        </footer>
      </div>  
    );
  }
}

export default App