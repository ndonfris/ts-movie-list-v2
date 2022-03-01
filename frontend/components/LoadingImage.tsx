/** 
 * File:        MovieTile.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {Component, useEffect, useRef} from 'react';
import {Animated, Easing, Image, View, ViewStyle, Text} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../helpers/Colors";
import {Movie} from '../helpers/Interfaces';
import MovieImage from './MovieImage';
import {getRandomNumber} from '../helpers/Functions';



interface Props {
    movie: Movie;
    imageStyle?: {};
    loadStyle?: {};
}


export default class LoadingImage extends Component<Props> {

    /* field of the imageUrl (useful for the Props) */
    imageUrl: string;

    /* states for <LoadingImage /> */
    state = {
        hasImage: true,
        imageLoaded: false,
        spinValue : new Animated.Value(0),
        showSpin: false,
    }

    constructor(props : Props) {
        super(props);
        this.imageUrl = props.movie.Poster;
    }


    /**
     * starts a load animation loop
     *
     * @returns {void} 
     */
    private beginLoad() {
        this.setState({
            imageLoaded: false,
            showSpin: true,
        });
        Animated.loop(
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: getRandomNumber(1000, 3000),
                easing: Easing.linear,
                useNativeDriver: true
            }
        )).start();
    }

    /**
     * setter for showSpin state
     *
     * @returns {void}
     */
    private hideSpin() {
        this.setState({showSpin: false});
        this.setState({imageLoaded: true});
    }


    render() {
        return (
            <>
                <FadeInView>
                    {this.imageUrl != "N/A" 
                        ? <MovieImage 
                            style={this.props.imageStyle}
                            source = {{uri: this.imageUrl}}
                            onLoadStart = {() => this.beginLoad()}
                            onLoadEnd = {() => {
                                    this.hideSpin();
                            }}/>
                {this.state.showSpin && 
                    <View style={centeredItem}>
                        <Animated.View style={{
                                transform: [{
                                    rotate:this.state.spinValue.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg']
                                })}]
                        }}>
                            <MaterialCommunityIcons
                                name="movie-roll"
                                size={35}
                                color={this.state.imageLoaded ? "transparent" : colors.dullWhite}
                                style={{
                                    textAlign: "center",
                                    opacity: this.state.imageLoaded || !this.state.showSpin ? 0.0 : 0.2
                                }}
                            />
                        </Animated.View>
                    </View>
                }
            </>
        );
    }
}

/* centers view for loading symbol */
const centeredItem: ViewStyle = {
    alignItems: "center",
    alignSelf: "center", 
    top: '-65%',
};

