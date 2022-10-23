import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Timer: React.FC<{
  expirationDate: number;
  focus: boolean;
  loading: boolean;
}> = ({expirationDate, focus, loading}) => {
  const [inactive, setIncative] = useState(false);
  const [timerCount, setTimer] = useState<number>(0);
  useEffect(() => {
    setTimer((prev: number) => expirationDate);
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);
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
