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
			    		<li 
			    			className="breweryName" 
			    			key={venue.id}
			    			onClick={() => this.props.openInfoWindowOnClick({...venue})}>
			    			<img src={venue.categories[0].icon.prefix + "32"+ venue.categories[0].icon.suffix} alt={venue.categories[0].name}/>
			    			{venue.name}
			    		</li>
					)}
	    		</ol>	

    		</div>
  		)
	}
}

 export default SidePanel