import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Extrapolate,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const Pulse = ({delay = 0, repeat}) => {
  const animation = useSharedValue(0);
  useEffect(() => {
    animation.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.linear,
        }),
        repeat ? -1 : 1,
        false,
      ),
    );
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [0.6, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacity,
      transform: [{scale: animation.value}],
    };
  });
  return <Animated.View style={[styles.circle, animatedStyles]} />;
};

const styles = StyleSheet.create({
  circle: {
    width: 300,
    borderRadius: 150,
    height: 300,
    position: 'absolute',
    borderColor: '#7B66FF',
    borderWidth: 4,
    backgroundColor: '#7B66FF',
    zIndex: 0,
  },
});
export default Pulse;
