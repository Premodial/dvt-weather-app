import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { StyledText } from '../../atoms';
import {useRouter } from 'expo-router';
import { screens, colorTheme, weather as WEATHER} from '../../../constants';
import i18n from '../../../i18n';

const WeatherMarker = ({ coordinate, weather, onViewDetails, placeName, placeId, feelsLike }) => {
  const router = useRouter();

  return (
    <Marker coordinate={coordinate}>
    <View style={styles.marker}>
      <StyledText style={styles.markerText}>{weather}</StyledText>
    </View>
    <Callout tooltip>
      <View style={styles.calloutContainer}>
        <StyledText style={styles.calloutTitle}>{placeName}</StyledText>
        <StyledText style={styles.calloutText}>{weather}</StyledText>
        <TouchableOpacity style={styles.viewButton} onPress={()=>router.push({params:{placeId: placeId,
            temp: weather, 
            feelsLike: Math.round(feelsLike - WEATHER.KELVIN_TO_CELSIUS)},
             pathname: screens.DETAILS})} >
          <StyledText style={styles.viewButtonText}>{i18n.t('view')}</StyledText>
        </TouchableOpacity>
      </View>
    </Callout>
  </Marker>
  )
};

WeatherMarker.propTypes = {
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  weather: PropTypes.string.isRequired,
  onViewDetails: PropTypes.func,
  placeName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: colorTheme.primary,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: colorTheme.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  markerText: {
    color: 'white',
  },
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 150,
    borderColor: colorTheme.primary,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65, 
    elevation: 6,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  calloutText: {
    marginBottom: 10,
    color: '#333',
    fontSize: 16,
  },
  viewButton: {
    backgroundColor: colorTheme.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export { WeatherMarker };
