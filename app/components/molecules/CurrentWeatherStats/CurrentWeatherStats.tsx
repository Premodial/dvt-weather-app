import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../../../i18n'; 

interface IWeatherStats {
  min: number;
  current: number;
  max: number;
}

const CurrentWeatherStats: React.FC<IWeatherStats> = ({ min, current, max }) => (
  <View style={styles.weatherStatsContainer}>
    {[
      { label: i18n.t('min'), value: min },
      { label: i18n.t('current'), value: current },
      { label: i18n.t('max'), value: max },
    ].map(({ label, value }) => (
      <View key={label} style={styles.weatherStat}>   
        <Text style={styles.temperatureText}>{value}
          <Text style={styles.degreeSymbol}>°</Text>
        </Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    ))}
    <View style={styles.horizontalLine} />
  </View>
);

export  {CurrentWeatherStats};


const styles = StyleSheet.create({
  weatherStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  weatherStat: {
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
  labelText: {
    fontSize: 14,
    color: 'white',
  },
  horizontalLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'white',
  },
  degreeSymbol: {
    fontSize: 14, 
    lineHeight: 16, 
    position: 'relative',
    top: -1, 
  },
});


