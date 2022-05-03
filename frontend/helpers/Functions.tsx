/**
 * File:        Functions.tsx
 * Author:      Nick Donfris
 * Created:     02/06/22
 * Description: This file exports functions used throughout the entire 
 * frontend of this application. These functions are typically used to
 * help simplify the readability of the components in the application. 
 * Building the json needed to send a request to  the backend, and defining
 * what a default state should contain for an Interface, are some examples
 * of what I decided to include here.
 */

import {PostRequest, Movie, MovieMoreInfo, StreamWebsite, addRequestBody, reqBody, Rating} from './Interfaces';
import MovieTileObj from './MovieTileObj';

/**
 * requestHelper(bodyString) - this function is similiar to createRequest. However, instead
 *                             of passing in the entire Interface of options, only the string 
 *                             used in the body (as a value for the key "title"), is
 *                             passed in. 
 *
 * @param {string} bodyString - the string of the post request to call to the backend.
 * @returns {RequestInit} - defines a request to send to a backend URI,
 *                          with this request having the request method, headers, mode
 *                          defined. Also sets the body set to the key "title"
 */
export function requestHelper(bodyData:string): RequestInit {
    console.log("requestHelper got:\n" + bodyData);
    return {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"title": bodyData}),
    };
}

/**
 * createRequest(PostRequest) - Returns part of a Request with all of the 
 *                              fields defined in the parameter passed in.
 *
 * @param {PostRequest} request - interface containing a method, more, headers,
 *
 * @returns {RequestInit} - the Request to send the back (without the URI),
 *                          with the fields set to their defined values in the
 *                          request parameter 
 */
export function createRequest(request: PostRequest): RequestInit {
    return {
        method: request.method,
        mode: request.mode,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"title": request.body})
    }
}

/**
 * createRequestBody(PostRequest) - Returns part of a Request with all of the 
 *                                  fields pre-defined and the body matching the
 *                                  key value pair.
 *
 * @param {string} keyString -  the key for the bodyString
 * @param {string} valueString -  the value for the bodyString
 * @returns {RequestInit} - defines a request to send to a backend URI,
 *                          with this request having the request method, headers, mode
 *                          defined. Also sets the body set to the key "title"
 */
export function createRequestBody(keyString: string, valueString: string): RequestInit {
    return {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"Genre": valueString}),
    }
}


/**
 * This function is called when a movie is expected to show more info, but 
 * the call to the backend failed. 
 *
 * @param {Movie} found - the Movie interface that was found from the search screen
 *                        
 * @returns {MovieMoreInfo} - A object, with all availible fields from the Movie
 *                            inserted to the MovieMoreInfo interface.
 */
export function failedMovieMoreInfo(found: Movie) : MovieMoreInfo{
    return {
        Title: found.Title,
        Year: found.Year,
        Rated: "N/a",
        Released: found.Year,
        Runtime: "N/a",
        Genre: "N/a",
        Director: "N/a",
        Writer: "N/a",
        Actors: "N/a",
        Plot: "Oops, it looks like there was an error retrieving more info about the " + found.Type + ", " + found.Title + ".",
        Language: "N/a",
        Country: "N/a",
        Awards: "N/a",
        Poster: found.Poster,
        Ratings: [{Source: "N/a", Value: "N/a"}, {Source: "N/a", Value: "N/a"}],
        Metascore: "N/a",
        imdbRating: "N/a",
        imdbVotes: "N/a",
        imdbID: found.imdbID,
        Type: found.Type,
        DVD: "N/a",
        BoxOffice: "N/a",
        Production: "N/a",
        Website: "N/a",
        Response: "N/a"
    };
}



export function getRandomNumber(min: number, max: number){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

/**
 * noStreamingSites(imdbID) - defines a default behavior for the streaming sites
 *                            of a movie when no results are found.
 *
 * @param {string} imdbID - the string of the imdbID field from a Movie interface
 * 
 * @returns {StreamWebsite[]} - an array of 1 StreamingWebsite, with only only the 
 *                              id, name, display_name, and county.number fields set
 */
export function noStreamingSites(imdbID : string): StreamWebsite[] {
    return [{
        id: imdbID,
        icon: "",
        name: "Not Found",
        url: "",
        display_name: "n/a",
        country: [
            {
                itemNumber: 0,
                location: "",
            },
        ],
    }]
}

export function HitSearchKey() {
    return [] as Movie[];

}

export function SimulateSearch() : Movie[] {
    var amount = getRandomNumber(1, 5);
    var movies: Movie[] = [];
    for (let i = 0; i < amount; i++) {
        movies.push({} as Movie);
        
    }
    return movies;
}

export function getBadRatings() : Rating[] {
    return [{Source: "N/a", Value: "N/a"}];
}


export function setFirstMovieResults(movieArray : Movie[]) : Movie[] {
    let rand = getRandomNumber(0, 4);
    var start = rand * 50;
    var end = start + 50;

    const newArr = movieArray.slice(start, end);
    var shuffled = newArr
        .map(value => ({value, sort: Math.random}))
        .sort( () => Math.random() - 0.5) 
        .map(({value}) => value)
    return shuffled;
}

