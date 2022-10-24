import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Timer: React.FC<{
  expirationDate: number;
  focus: boolean;
  loading: boolean;
  onTimerFinish: any;
  isPlaying: any;
}> = ({expirationDate, focus, loading, onTimerFinish, isPlaying}) => {
  const [inactive, setIncative] = useState(false);
  const [timerCount, setTimer] = useState<number>(1);

  useEffect(() => {
    setTimer((prev: number) => expirationDate);
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [loading]);
  if (timerCount === 0 && isPlaying) {
    setTimeout(() => {
      onTimerFinish();
    }, 1000);
  }
  console.log('timer: ', timerCount)
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>
        {moment.utc(timerCount * 1000).format('mm:ss')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    borderRadius: 7,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Timer;
