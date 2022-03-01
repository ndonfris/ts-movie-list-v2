/** 
 * File:        MovieTile.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {Component, useEffect, useRef} from 'react';
import {Animated, Easing, View, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../helpers/Colors";
import {getRandomNumber} from '../helpers/Functions';


export default function LoadingImage () { 

    const spinValue = new Animated.Value(0);

    Animated.loop(Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: getRandomNumber(1000, 3000),
            easing: Easing.linear,
            useNativeDriver: true
        }
    )).start();

    return (
        <View style={styles.centered}>
            <Animated.View style={{
                transform: [{
                    rotate: spinValue.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '360deg']
                    })}]
            }}>
                <MaterialCommunityIcons
                    name="movie-roll"
                    size={35}
                    color={colors.dullWhite}
                    style={{
                        textAlign: "center",
                        opacity: 0.2
                    }}
                    />
            </Animated.View>
        </View>
    );
}

/* centers view for loading symbol */
const styles = StyleSheet.create({
    centered: {
        alignItems: "center",
        alignSelf: "center", 
        top: '-50%',
    }
});

