import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import {Icon} from '../../atoms';
import { colorTheme } from '../../../constants';

const ForecastItem = ({  forecastData, path}) => {
  return (
    <View style={styles.forecastRow}>
      <Text style={styles.forecastDayText}>{forecastData.day}</Text>
      <Icon path={path} />
      <Text style={styles.forecastConditionText}>
        {forecastData.main.temp}
        <Text style={styles.degreeSymbol}>°</Text>
      </Text>    
    </View>
  );
};

ForecastItem.propTypes = {
  forecastData: PropTypes.shape({
    day: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  path: PropTypes.number.isRequired,
};

export  {ForecastItem};

const styles = StyleSheet.create({
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  forecastDayText: {
    width: 80,
    textAlign: 'left',
    color: colorTheme.textPrimary,
    fontWeight: '600',
    fontSize: 15,
  },
  forecastConditionText: {
    width: 80,
    textAlign: 'right',
    color: colorTheme.textPrimary,
  },
  degreeSymbol: {
    fontSize: 14, 
    lineHeight: 16, 
    position: 'relative',
    top: -1, 
  },
});