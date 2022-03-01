import Pagination from './components/Pagination';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Dimensions,
  Animated,
  ImageRequireSource,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  FlatList,
} from 'react-native';
import isURL from 'validator/lib/isURL';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
interface props {
  data: { url: string | ImageRequireSource; title?: string }[];
  autoScroll: boolean;
  autoScrollInterval?: number;
  title?: boolean;
  landscapeImage?: boolean;
  backgroundStyles?: ViewStyle;
  imageWrapperStyles?: ViewStyle;
  pagination?: boolean;
  titleWrapperStyles?: ViewStyle;
  titleStyles?: TextStyle;
  paginationStyles?: {
    dotSize?: number;
    indicatorColor?: string;
    dotColor?: string;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

const Carousel: React.FC<props> = ({
  data,
  landscapeImage,
  pagination = true,
  autoScroll,
  backgroundStyles,
  title,
  imageWrapperStyles,
  titleWrapperStyles,
  titleStyles,
  paginationStyles,
  autoScrollInterval = 5000,
}) => {
  const scrollRef = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState<number>(0);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const myRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const { index } = viewableItems[0];
      setActive(index);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (autoScroll) {
      timer = setInterval(() => {
        myRef.current?.scrollToIndex({
          animated: active === data.length - 1 ? false : true,
          index: active === data.length - 1 ? 0 : active + 1,
        });
      }, autoScrollInterval);
    }
    return () => clearInterval(timer);
  }, [active, autoScroll, data.length, autoScrollInterval]);

  return (
    <View
      style={[
        styles.wrapper,
        backgroundStyles,
      ]}>
      <Animated.FlatList
        data={data}
        ref={myRef}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        initialNumToRender={2}
        snapToInterval={width}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollRef } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollRef.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          const isUrl = isURL(item.url + '');
          const imageSource = isUrl ? { uri: item.url } : item.url;
          return (
            <View style={[styles.singleItem, imageWrapperStyles]}>
              {title && <View style={[styles.titleContainer, titleWrapperStyles]}>
                <Text key={index} style={[styles.title, titleStyles]}>
                  {item.title}
                </Text>
              </View>}
              <View style={[landscapeImage ? styles.horizontalImageContainer : styles.imageContainer]}>
                <Animated.Image
                  source={imageSource}
                  style={[landscapeImage ? styles.horizontalImage : styles.image, { transform: [{ translateX }] }]}
                />
              </View>
            </View>
          );
        }}
      />
      {pagination && (
        <Pagination
          scrollRef={scrollRef}
          data={data}
          paginationStyles={paginationStyles}
        />
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: ITEM_WIDTH,
    position: 'relative',
  },
  singleItem: {
    width: width,
    height: ITEM_HEIGHT,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 14,
  },
  horizontalImageContainer: {
    width: ITEM_HEIGHT - 50,
    height: ITEM_WIDTH,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 14,
  },
  image: {
    width: ITEM_WIDTH * 1.2,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  horizontalImage: {
    width: ITEM_HEIGHT * 1.2,
    height: ITEM_WIDTH,
    resizeMode: 'cover',
  },
  titleContainer: {
    zIndex: 3,
    position: 'absolute',
    right: 15,
    bottom: -7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 21,
    paddingBottom: 10,
    letterSpacing: 2,
  },
});
