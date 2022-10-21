/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import TimeButton from './components/TimeButton';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [bgColor, setBgColor] = useState(null);
  const [button, setButton] = useState([
    {
      title: '1 min',
      selected: false,
      id: 1,
    },
    {
      title: '2 min',
      selected: false,
      id: 2,
    },
    {
      title: '3 min',
      selected: false,
      id: 3,
    },
  ]);
  const handleButtonClick = (index: number) => {
    const newData = [...button];
    newData[0].selected = false;
    newData[1].selected = false;
    newData[2].selected = false;
    newData[index].selected = !newData[index].selected;
    setButton(newData);
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['#BCBCC7', '#7B66FF']}>
      <SafeAreaView />
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Icon name="chevron-left" color={'#ffffff'} size={25} />
        <View></View>
        <View style={styles.playBtnContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.circle}>
            <Icon name="play" color={'#ffffff'} size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.timeBtns}>
          {button.map(({title, id, selected}, index) => {
            console.log(index);
            console.log('selected: ', selected);
            return (
              <TimeButton
                bgColor={selected ? '#fff' : '#999'}
                title={title}
                key={id}
                onPress={() => handleButtonClick(index)}
              />
            );
          })}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  playBtnContainer: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
  },
});

export default App;
