// Functions for FourSquare API Calls
// Reference: 
// Forrest's helper video:  https://www.youtube.com/watch?v=Dj5hzKBxCBI
// FourSquare Details of a Venue Docs: https://developer.foursquare.com/docs/api/venues/details

class Helper {

    static fourSquareURL(){
        return "https://api.foursquare.com/v2";
    }

    //  creates string with my authentication credentials
    static myAuth(){
        const myKeys = {
            //client_id:"ZWIBO3U1HBUWEJEMMOOGJNRPI1NALRWDIMDNTNPIAKMSUSJO",
            //client_secret: "OYD1TLNRJVVBZTL31KX0TRWG2AINNBJ1GXKNJTXVXCLHKSNF",

            client_id: "JPFAJLT3GCHEWOCLXYNVDL0XXNXQ2525K2KXEBO5IEYB4UOD",
            client_secret: "NBHHGTR40PTJXCPKQ3BAM4R42YWPIWOUMI13K1CJO1S5EYG1",

            v: "20180929"
        };

        return Object.keys(myKeys)
        .map(key => `${key}=${myKeys[key]}`)
        .join("&");
    }

    // creates a string with the specific additions to the baseURL for each API call
    static urlAdds(urlParameters) {
        if(!urlParameters) {
            return " " 
        }
        return Object.keys(urlParameters)
        .map(key => `${key}=${urlParameters[key]}`)
        .join("&");
    }

    static headers() {
    	return {
    		Accept: "application/json"
    	};
    }

    // Fetches data using FourSquare Get Venue Details
    static fetchAPIData(endPoint, method, urlParameters) {
    	let requestData = {
    		method,
    		headers: Helper.headers()
    	};

    	return fetch(
            `${Helper.fourSquareURL()}${endPoint}?${Helper.myAuth()}&${Helper.urlAdds(urlParameters)}`, requestData)
        //return fetch("https://api.foursquare.com/v2/venues/4d686a320a25b60c55821790?client_id=ZWIBO3U1HBUWEJEMMOOGJNRPI1NALRWDIMDNTNPIAKMSUSJO&client_secret=OYD1TLNRJVVBZTL31KX0TRWG2AINNBJ1GXKNJTXVXCLHKSNF&v=20180929", requestData)
            .then(res => res.json());
            //.then(res => res.text()) // convert to plain text -DEBUGGING
            //.then(text => console.log(text)) // console.log - DEBUGGING
    }
}

export default class SquareAPI {
    // function to call FourSquare API Search for Venues
    static search(urlParameters) {
        return Helper.fetchAPIData("/venues/search", "GET", urlParameters);
    }

    // function to call FourSquare API Get Venue Details -- ERROR HERE 
	static getVenueDetails(VENUE_ID) {
		return Helper.fetchAPIData(`/venues/${VENUE_ID}`, "GET");
	}

}