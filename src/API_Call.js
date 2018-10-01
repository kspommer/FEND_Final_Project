// Functions for FourSquare API Calls
// Reference: 
// Forrest's helpfer video:  https://www.youtube.com/watch?v=Dj5hzKBxCBI
// FourSwuare Details of a Venue Docs: https://developer.foursquare.com/docs/api/venues/details

class APIHelper {
    // what does this do?  (NEED TO ASK FORREST)
    static header() {
    	return {
    		Accept: "application/json"
    	};
    }

    // Fetches data using FourSquare Get Venue Details
    static detailsFetch(endpoint, method) {
    	let requestData = {
    		method,
    		header: APIHelper.header()
    	};
    	return fetch(endpoint,
    		requestData
    	)
    	.then(response => response.json())
    }
}

export default class SquareAPI {
	static getVenueDetails(APIURL) {
		return APIHelper.detailsFetch(APIURL, "GET")
	}
}