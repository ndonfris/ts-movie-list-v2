/**
 * File:        SearchRoute.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {useState} from 'react';
import {Keyboard, View, StyleSheet} from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import axios, {AxiosRequestConfig} from 'axios';
import {createRequest, HitSearchKey, requestHelper, setFirstMovieResults, SimulateSearch} from '../helpers/Functions';
import {Movie, reqBody} from '../helpers/Interfaces';
import serverURL from '../helpers/URL';
import Movies from '../assets/Top250MoviesShort.json';
import colors from '../helpers/Colors';
import { apiKeys } from '../helpers/apiKeys';
import { apiUrls } from '../helpers/apiKeys';

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

    const handleSearch = async (newQuery: string) : Promise<string> => {
        Keyboard.dismiss();
        let strippedQuery = newQuery.trim();
        if (strippedQuery == "") {
            return;
        }
        return strippedQuery;
    }

    /**
     * @async searchQuery - uses the query, changed in the SearchBar component. 
     *
     * @throws {Error} - Typically thrown if server is not connected/running
     * @returns {Promise<void>} - Array of Movies, found from query
     */
    const searchQuery = async () : Promise<Movie[]> => {
        Keyboard.dismiss();
        if (query === "") {
            return;
        }
        let reqData = requestHelper(query);
        try {
            const search_name = query.trim();
            const firstPage = {
                method: "GET",
                url:  apiUrls.searchMovie,
                params: { s: search_name, page: "1", r: "json" },
                headers: apiKeys.searchMovie,
            };
            const secondPage = {
                method: "GET",
                url: apiUrls.searchMovie,
                params: { s: search_name, page: "2", r: "json" },
                headers: apiKeys.searchMovie,
            };
            const result = await axios.request(firstPage as AxiosRequestConfig);
            if (result.data["totalResults"] > 11) {
                const more = await axios.request(secondPage as AxiosRequestConfig);
                let moreArr: Movie[] = more.data["Search"];
                for (var i in moreArr) {
                    let secondPageMovie: Movie = moreArr[i];
                    result.data["Search"].push(secondPageMovie);
                }
            }
            setMovieResults(result.data['Search']);
            console.log(result.data['Search']);
        } catch (e) {
            console.log(e);
            throw new Error(e);
        } finally {
            console.log(reqData)
        } 
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search for a movie..."
                query={query}
                updateQuery={text => setQuery(text)} 
                searchFunction={() => {
                    searchQuery();
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

