import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {DegreeSymbol} from '../../atoms';
interface TodayWeatherProps {
  condition: string;
  temp: number;
}

const TodayWeather: React.FC<TodayWeatherProps> = ({ condition, temp }) => {

  return (
    <View style={styles.todayWeatherContainer}>
      <View style={styles.temperatureContainer}>
        <Text style={styles.weatherCondition}>{temp}</Text>
        <DegreeSymbol />
      </View>
      <Text style={styles.degreeText}>{condition.toLocaleUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todayWeatherContainer: {
    alignItems: 'center',
    paddingBottom: 60
  },
  degreeText: {
    fontSize: 40,
    color: 'white',
  },
  weatherCondition: {
    fontSize: 65,
    color: 'white',
    fontWeight: '600',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export  {TodayWeather};

