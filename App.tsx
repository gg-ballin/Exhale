import React, {useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
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
import Pulse from './components/Pulse';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import Timer from './components/Timer';
import AnimatedPulseImg from './components/AnimatedPulseImg';
import On_Wallow from './assets/On_Walow.png';
import Off_Wallow from './assets/Off_Walow.png';

const data = [
  {
    title: '1 min',
    selected: true,
    timer: 60,
    id: 1,
  },
  {
    title: '2 min',
    selected: false,
    timer: 120,
    id: 2,
  },
  {
    title: '3 min',
    selected: false,
    timer: 180,
    id: 3,
  },
];

const App = () => {
  const [button, setButton] = useState(data);
  const isDarkMode = useColorScheme() === 'dark';
  const [play, setPlay] = useState(false);
  const [pulse, setPulse] = useState([1]);
  const [selectedTime, setSelectedTime] = useState(60);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selected, setSelected] = useState();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
    setSelected(60)
  }, []);

  const handleTimeBtnClick = (index: number) => {
    
    const newData = [...button];
    newData[0].selected = false;
    newData[1].selected = false;
    newData[2].selected = false;
    newData[index].selected = !newData[index].selected;
    setButton(newData);
    setSelected(newData[index].timer)
    console.log('selected: ', selected)
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

        <Animated.View
          style={[
            styles.inExhaleContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Text style={styles.inExhale}>{play ? 'Inhale' : 'Exhale'}</Text>
        </Animated.View>

        <View style={styles.topContainer}>
          <CircularProgressBase
            value={40}
            radius={87}
            activeStrokeColor={'#fff'}
            inActiveStrokeColor={'#fff'}
            duration={2000}
            maxValue={100}>
            <View style={styles.bigCircle}>
              {pulse.map((item, index) =>
                play ? <Pulse repeat={index === 0} /> : <View />,
              )}
              {play ? (
                <AnimatedPulseImg />
              ) : (
                <Image
                  source={Off_Wallow}
                  resizeMode="contain"
                  style={styles.walowImg}
                />
              )}
            </View>
          </CircularProgressBase>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.counter}>
            {play ? (
              <Timer expirationDate={selected} focus={true} loading={false} />
            ) : (
              <View />
            )}
          </View>
          <View style={styles.playBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                setPlay(!play);
              }}
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
                  onPress={() => {
                    // setSelectedTime(button[index].timer);
                    handleTimeBtnClick(index);
                  }}
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
  inExhaleContainer: {
    alignItems: 'center',
  },
  inExhale: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,
  },
  bigCircle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: '#7B66FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walowImg: {
    width: 45,
    height: 45,
  },
  containerTitle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomContainer: {
    height: Dimensions.get('screen').height * 0.25,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  playBtnContainer: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  counter: {
    alignItems: 'center',
    height: 25,
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
