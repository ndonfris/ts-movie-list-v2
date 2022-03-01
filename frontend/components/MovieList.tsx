/**
 * File:        MovieList.tsx
 * Author:      Nick Donfris
 * Created:     01/25/22
 */
import React, {useState} from 'react';
import {StyleSheet, View, FlatList, ListRenderItem} from 'react-native';
import MovieTile from './MovieTile';
import {Movie} from '../helpers/Interfaces';

/* Array of Movies from Backend */
interface Props {
    movieArray?: Movie[];
}

/**
 * Renders the MovieList, of MovieTiles.
 *
 * @param {Movie[]} movieArray - the Array of movies found from api backend
 *
 * @returns {JSX.Element} - a list of <MovieTiles/>
 */
const MovieList = ({movieArray}: Props) => {

    const renderItem: ListRenderItem<Movie> = ({item}) => {
        return (
            <MovieTile movie={item} shouldShowLoading={true} /> 
        );           
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.items}
                data={movieArray}
                renderItem={renderItem}
                keyExtractor={(item) => item.imdbID}
                numColumns={3}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    items: {}
});

export default MovieList;

