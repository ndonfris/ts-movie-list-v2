/**
 * File:        EmptyMovieTile.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {useState} from 'react';
import {StyleSheet, Image, View, ViewStyle, Text} from 'react-native';
import {Movie} from '../helpers/Interfaces';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../helpers/Colors';
import LoadingSymbol from './LoadingSymbol';


interface Props {
    movie: Movie;
    shouldShowLoading: boolean | false;
    extraStyle?: {};
}


export default function MovieImage({movie, shouldShowLoading, extraStyle} : Props) {

    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <View>
                {movie.Title == "N/A" 
                    ?
                    <View style={[extraStyle, styles.container]}>
                        <MaterialCommunityIcons name="movie-roll" size={35} color={colors.dullWhite} style={{textAlign: "center"}} />
                        <Text style={styles.titleText}>{movie.Title}</Text>
                        <Text style={styles.yearText}>({movie.Year})</Text>
                    </View>
                    :
                    <Image 
                        style={extraStyle}
                        source={{uri: movie.Poster}}
                        onLoad={() => {setLoaded(true)}}
                    />
                }
                {!loaded && <LoadingSymbol />}
            </View>
        </>

            
        );          

}




const styles = StyleSheet.create({
    container:  {
        opacity: 0.5,
        backgroundColor: colors.barDarker,
    },
    titleText: {
        paddingTop : 5,
        overflow: "hidden",
        maxHeight: 65,
        maxWidth: 114,
        paddingHorizontal: 3,
        color: colors.dullWhite
    },
    yearText: {
        fontSize: 9,
        position: 'absolute',
        bottom: 10,
        color: colors.dullWhite
    },
    centeredItems: {
        alignItems: "center",
        alignSelf: "center", 
        top: '-50%',
    }
})

