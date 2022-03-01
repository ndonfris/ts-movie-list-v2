/**
 * File:        SearchRoute.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {useState} from 'react';
import {Keyboard, View, StyleSheet} from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import {createRequest, HitSearchKey, requestHelper, setFirstMovieResults, SimulateSearch} from '../helpers/Functions';
import {Movie, reqBody} from '../helpers/Interfaces';
import serverURL from '../helpers/URL';
import Movies from '../assets/Top250MoviesShort.json';
import colors from '../helpers/Colors';

/*
 * Creates the SearchRoute page. Imports the static file Top250Movies.json, which 
 * is just used for pre-query info.
 *
 * @returns {JSX.Element} Search Page rendered by clicking on the bottom bar.
 */
export default function SearchRoute() {
    /* the text that is inputed to the SearchBar component */
    const [query, setQuery] = useState('');

    /* the list of movies currently rendered on screen as results */
    const [movieResults, setMovieResults] = useState<Movie[]>(setFirstMovieResults(Movies));

    const handleSearch = async () : Promise<Movie[]> => {
        Keyboard.dismiss();
        let strippedQuery = query.trim();
        if (strippedQuery == "") {
            return;
        }
        HitSearchKey();
        SimulateSearch();
        searchQuery(strippedQuery);
        return movieResults;
    }

    /**
     * @async searchQuery - uses the query, changed in the SearchBar component. 
     *
     * @throws {Error} - Typically thrown if server is not connected/running
     * @returns {Promise<void>} - Array of Movies, found from query
     */
    const searchQuery = async (strippedQuery: string) => {
        let bodyData: reqBody<string> = { "title": strippedQuery };
        let reqData = requestHelper(JSON.stringify(bodyData));
        try {
            const response = await fetch(serverURL+"/search/title", reqData);
            const body = await response.json();
            console.log(body.Search);
            setMovieResults(body.Search);
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search for a movie..."
                query={query}
                updateQuery={text => setQuery(text)} 
                searchFunction={() => {
                    handleSearch();
                }}
            />
            <View style={styles.results}>
                <MovieList movieArray={movieResults} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    results: {
        paddingTop: 0,
        height: '82%',
    }

});

