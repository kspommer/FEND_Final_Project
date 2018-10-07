 // References
 // Project 6:  input box / filter
// Forrest video 6:  https://www.youtube.com/watch?v=lDVaZY0aG2w&t=87s

// <p>{venueInfo.location.contact.formattedPhone}</p>

import React, {Component} from 'react'

class SidePanel extends Component {

	render() {
    	return (
    		<div>

	          	<input
	          		className="search-brewery"
	            	type="text"
	            	placeholder="Filter breweries"
	          	/>
  	

	    		<ol className = "breweryList">
	    			<li className = "breweryName">Pommer Pub</li>
	    		</ol>	

    		</div>
  		)
	}
}

 export default SidePanel