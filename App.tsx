import React, {useState} from 'react';
import {
  Image,
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
import Icon from 'react-native-vector-icons/Feather';
import TimeButton from './components/TimeButton';
import On_Wallow from './assets/On_Walow.png';
import Off_Wallow from './assets/Off_Walow.png';
import Pulse from './components/Pulse';
import CircularProgress from 'react-native-circular-progress-indicator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [play, setPlay] = useState(false);
  const [pulse, setPulse] = useState([1]);
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
      <View style={styles.container}>
        <Icon name="chevron-left" color={'#ffffff'} size={25} />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Breathe & relax</Text>
        </View>
        <View style={styles.topContainer}>
          <View style={styles.bigCircle}>
            <CircularProgress
              value={60}
              radius={120}
              duration={2000}
              progressValueColor={'#ecf0f1'}
              maxValue={200}
              title={'KM/H'}
              titleColor={'white'}
              titleStyle={{fontWeight: 'bold'}}
            />
            {pulse.map((item, index) =>
              play ? <Pulse repeat={index === 0} /> : <View />,
            )}
            {play ? (
              <Image
                source={On_Wallow}
                resizeMode="contain"
                style={styles.offWallowImg}
              />
            ) : (
              <Image
                source={Off_Wallow}
                resizeMode="contain"
                style={styles.offWallowImg}
              />
            )}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.playBtnContainer}>
            <TouchableOpacity
              onPress={() => setPlay(!play)}
              style={styles.circlePlayBtn}>
              <Icon
                name={play ? 'pause' : 'play'}
                color={'#ffffff'}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeBtns}>
            {button.map(({title, id, selected}, index) => {
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
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  topContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bigCircle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: '#7B66FF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  offWallowImg: {
    width: 45,
    height: 45,
  },
  containerTitle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomContainer: {},
  playBtnContainer: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  circlePlayBtn: {
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
