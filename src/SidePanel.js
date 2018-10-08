 // References
 // Project 6:  input box / filter
 // Forrest video 6:  https://www.youtube.com/watch?v=lDVaZY0aG2w&t=87s
 // MDN .includes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 // MDN input search box: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search

import React, {Component} from 'react'

class SidePanel extends Component {

	// constructor
	constructor() { 
		super();		
		// set initial state of filter string
		this.state = {
			query: "",
		};
	}

	// function to filter markers on user entry in input box
	filterOnUserEntry = event => {
		// setState to filter string
		this.setState({ query: event.target.value });
		// take no action if no user entry 
		if (event.target.value === "") {
			return
		}
		// map over the array of venues to find venue names which match query string
		const markers = this.props.venues.map(venue => {
			const match = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
			// if a query match, id which marker 
			const marker = this.props.breweryMarkers.find(marker => marker.markerId === venue.id);
			// change marker's isOpen attribute based on the query match/not a match
			if(match) {
				marker.isOpen = true;
			}
			else {
				marker.isOpen = false;
			}
			return marker;
		});
		// call this function (in App.js) to update set of markers (changed isOpen attribute)
		this.props.updateSuperState({markers});
	}

	render() {
    	return (
    		<div className="sidepanel">
	          	<input type="search" 
	          	className="search-brewery" 
	          	placeholder="Find a brewery" 
	          	onChange={this.filterOnUserEntry}
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