/**
 * File:        MovieTile.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Movie, MovieMoreInfo, reqBody} from '../helpers/Interfaces';
import {failedMovieMoreInfo, requestHelper} from '../helpers/Functions';
import serverURL from '../helpers/URL';
import Popup from './Popup';
import LoadingImage from './LoadingImage';
import MovieImage from './MovieImage';
import colors from '../helpers/Colors';



/* single movie from typically from a movieArray */
interface Props {
    movie: Movie;
    shouldShowLoading ?: boolean;
}

/**
 * A MovieTile, which is a clickable component, which can render more information about the MovieTile
 *
 * @param {Movie} movie - the Movie interface which contains strings that correlate to the necessary details for a movie
 * @returns {JSX.Element} - the tile shown for a Movie, and the set of states that are coupled to rendering more information about a tile. 
 */
const MovieTile = ({movie, shouldShowLoading}: Props) => {
    /* the information retrieved from the api call onClick of MovieTile */
    const [moreInfo, setMoreInfo] = useState<MovieMoreInfo>({} as MovieMoreInfo);

    /* boolean that determines if the moreInfo modal visible */
    const [modalVisible, setModalVisible] = useState(false);

    /**
     * @async Function that is called when a movieTile is selected. 
     *        Returns a unresolved promise. Sets the moreInfo on successful
     *        api call.
     *        
     * @returns {Promise<void>} - instead of returning the objects, it sets them
     *                            and makes use of global variables.
     */
    const ShowMoreInfo = async () : Promise<void> => {
        const reqData = requestHelper(movie.imdbID);
        console.log(reqData);
        if (reqData == {}) {
            console.log("reqData empty");
            return;
        }
        try {
            const response = await fetch(serverURL + '/movie/more_info', reqData);
            const obj = await response.json();
            console.log(obj);
            setMoreInfo(obj);
        } catch (e) {
            setMoreInfo(failedMovieMoreInfo(movie));
            console.log(e);
        }
    }

    return (
        <View style={styles.outer}>
            <Popup moreInfo={moreInfo} modalVisible={modalVisible} updateModal={() => { setModalVisible(!modalVisible) }} />
            <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.2}
                onPress={() => {
                    ShowMoreInfo();
                    setModalVisible(true);
                }}>
                <View style={styles.container}>
                    <MovieImage movie={movie} extraStyle={styles.container} shouldShowLoading={shouldShowLoading}/>
                </View>
            </TouchableOpacity> 
        </View>
    );
}


const styles = StyleSheet.create({
    outer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    container: {
        borderRadius: 10,
        width: 120,
        height: 120,
        alignItems: 'center',
        overflow: 'hidden',
    },
    titleText: {
        textAlign: 'center',
        color: "#fff",
        position: 'absolute',
        bottom: 5,
        fontSize: 10,
        fontWeight: 'bold',
        textShadowColor: "#000",
        textShadowOffset: {
            width: -1,
            height: 1 
        },
        textShadowRadius: 1,
    },
    titleContainer: {
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    }
});

export default MovieTile;
