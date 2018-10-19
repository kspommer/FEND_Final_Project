// Component to address when Map API is non-op
//Reference 
// https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries

import React, {Component} from 'react'

class ErrorBoundary extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      errorMsg: null,
    };
  }

  componentDidCatch(error, info) {
    // reset the state when an error
    this.setState(
      { hasError: true, 
        errorMsg: info }
    );
  }

  render() {
    if (this.state.hasError) {
      // Render alternative UI
      return <h1>Unable to communicate with Google Maps API. Please check your internet connection and refresh your browser</h1>;
    }
    return this.props.children;
  }

}

export default ErrorBoundary; 