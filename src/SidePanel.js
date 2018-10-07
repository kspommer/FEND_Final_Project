 // References
 // Project 6:  input box / filter
// Forrest video 6:  https://www.youtube.com/watch?v=lDVaZY0aG2w&t=87s

// <p>{venueInfo.location.contact.formattedPhone}</p>

import React, {Component} from 'react'

class SidePanel extends Component {

	render() {
    	return (
    		<div className="sidepanel">
	          	<input
	          		className="search-brewery"
	            	type="text"
	            	placeholder="What brewery?"
	          	/>

	    		<ol className="breweryList">
	    			{this.props.venues && this.props.venues.map(venue  =>
			    		<li className="breweryName" key={venue.id}>{venue.name}</li>
					)}
	    		</ol>	

    		</div>
  		)
	}
}

 export default SidePanel