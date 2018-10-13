 // References
 // Project 6:  input box / filter
 // Forrest video 6:  https://www.youtube.com/watch?v=lDVaZY0aG2w&t=87s
 // MDN .includes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 // MDN input search box: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search

import React, {Component} from 'react'

class SidePanel extends Component {

	//setFilteredVenues() {
		//const filteredVenues = this.props.venues; 
		//console.log({filteredVenues});
	//}

	//componentWillMount() {
		//console.log(this.props.venues)
		//const filteredVenues = this.props.venues; 
		//console.log({filteredVenues});
	//}

	// this function is used to filter the venue list displayed based on user input
	//getFilteredList = (query) => {
		// when user enters input, filter venues array and return reduced array
		//const filteredVenues = this.props.venues.filter(venue =>
			//venue.name.toLowerCase().includes(query.toLowerCase()),
		//);
		//console.log({filteredVenues}) // TESTING 
		//return filteredVenues;
	//};		

	// function to filter markers on user entry in input box
	//filterOnUserEntry = event => {
		// setState to user-entered filter string
		//const query = event.target.value; 
		//this.setState({query})
		//console.log({query}) // TESTING - WORKS

		// take no action if no user entry 
		//if (query === "") {
			//const filteredVenues = this.props.venues;
			//console.log({filteredVenues}); 	
			return
		//}

		// if user enters filter query... 
		//else {
			// pass query to function to filter list
			//const filteredVenues = this.getFilteredList(query);
			//console.log({filteredVenues}) // TESTING 
			//this.setState({filteredVenues})

			// map over the array of venues to find venue names which match query string
			//const markers = this.props.venues.map(venue => {
				//const match = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
				// if a query match, id which marker 
				//const marker = this.props.breweryMarkers.find(marker => marker.markerId === venue.id);
				// change marker's isOpen attribute based on the query match/not a match
				//if(match) {
					//marker.isOpen = true;
				//}
				//else {
					//marker.isOpen = false;
				//}
				//return marker;
			//});
		// call this function (in App.js) to update set of markers (changed isOpen attribute)
		//this.props.updateSuperState({markers});
		//}
	//}

	// when props change, get the new data and trigger render update
	componentWillReceiveProps = (props) => {
		this.props = props
	}

	render() {

		//const list = this.getFilteredList(this.state.query); 
    	return (
    		<div className="sidepanel">
	          	<input type="search" 
	          	className="search-brewery" 
	          	placeholder="Find a brewery" 
	          	onChange={this.props.filterOnUserEntry}
	          	/>
	    		<ol className="breweryList">
	    			{this.props.filteredVenues && this.props.filteredVenues.map(venue  =>
			    		<li 
			    			className="breweryName" 
			    			key={venue.id}
			    			onClick={() => this.props.openInfoWindowOnClick({venue})}>
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