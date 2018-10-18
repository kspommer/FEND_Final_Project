// References
 // Project 6:  input box / filter
 // Forrest video 6:  https://www.youtube.com/watch?v=lDVaZY0aG2w&t=87s
 // MDN .includes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 // MDN input search box: https:git//developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search

import React, {Component} from 'react'

class SidePanel extends Component {

	// when props change, get the new data and trigger render update
	componentWillReceiveProps = (props) => {
		this.props = props
	}

	render() {
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
			    			onClick={() => this.props.openInfoWindowOnVenueClick({venue})}>
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