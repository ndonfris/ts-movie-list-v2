import React from 'react';
import { Animated, Dimensions, ImageRequireSource, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('screen');

interface props {
    scrollRef: Animated.Value,
    data: { url: string | ImageRequireSource, title?: string }[];
    paginationStyles?: { dotSize?: number, indicatorColor?: string, dotColor?: string, top?: number, bottom?: number, left?: number, right?: number }
}

const Pagination: React.FC<props> = ({ scrollRef, data, paginationStyles: { dotSize, indicatorColor, dotColor, top, bottom, left, right } = {} }) => {
    const DOT_SIZE = dotSize ? dotSize : 15;
    const translateX = scrollRef.interpolate({
        inputRange: [-width, 0, width],
        outputRange: [-DOT_SIZE, 0, DOT_SIZE],
    });

    return (
        <View style={[styles.absoluteWrapper, { bottom: bottom ? bottom : 10, top: top ? top : undefined, left: left ? left : undefined, right: right ? right : undefined }]}>
            <View style={styles.paginationContainer}>
                <Animated.View style={[styles.paginationIndicator, { transform: [{ translateX }], width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2, borderColor: indicatorColor ? indicatorColor : '#ddd' }]} />
                {data.map((_, i) => (
                    <View style={[styles.biggerCircle, { width: DOT_SIZE }]} key={i}>
                        <View key={i} style={{ width: DOT_SIZE * 0.4, height: DOT_SIZE * 0.4, borderRadius: DOT_SIZE * 0.2, backgroundColor: dotColor ? dotColor : '#62a189' }} />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    absoluteWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        marginVertical: 20,
    },
    paginationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative',
        flex: 1,
    },
    paginationIndicator: {
        borderWidth: 1,
        position: 'absolute',
        left: 0,
    },
    biggerCircle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
