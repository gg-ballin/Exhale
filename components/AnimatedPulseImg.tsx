import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import On_Wallow from '../assets/On_Walow.png';

const AnimatedPulseImg = () => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="pulse"
        useNativeDriver
        delay={1000}
        iterationCount="infinite">
        <Image
          source={On_Wallow}
          resizeMode="contain"
          style={styles.walowImg}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walowImg: {
    width: 45,
    height: 45,
  },
});

export default AnimatedPulseImg;
