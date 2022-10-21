import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

interface Props {
  onPress: () => void;
  title: string;
  textColor: any;
  textStyle: any;
  bgColor: any;
}
const TimeButton = ({title, bgColor, textStyle, textColor, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.container, {backgroundColor: bgColor}]}>
      <Icon name="clock" color="#fff" size={20} />
      <Text style={[styles.text, textStyle, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f2f2f2',
    // opacity: 0.2,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: 'red',
  },
  text: {
    color: 'green',
  },
  title: {
    paddingLeft: 5,
    color: '#fff',
    // opacity: 1
  },
});
export default TimeButton;
