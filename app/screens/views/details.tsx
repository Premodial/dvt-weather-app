import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getPlaceDetail } from '../../services/googlePlacesAPI/index';
import { useLocalSearchParams } from 'expo-router';
import { Linking } from 'react-native';
import { colorTheme } from '../../constants';
import { FontAwesome } from '@expo/vector-icons';
import { logErrorToServer } from '../../services/logger/errorReportingApi';

export default function PlaceDetailsScreen() {
  const { placeId, temp, feelsLike} = useLocalSearchParams();
  const [placeData, setPlaceData] = useState<any>(null);

  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await getPlaceDetail(placeId.toString());
        setPlaceData(response);
      } catch (error) {
        logErrorToServer(error);
      }
    };

    getPlace();
  }, []);

  if (!placeData) {
    return ( 
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colorTheme.primary} />
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.weatherBanner}>
        <View style={styles.column}>
        <Text style={styles.placeTitle}>{placeData.name}</Text>
          <Text style={styles.temperatureText}>{temp}</Text>
          <Text style={styles.feelLikeText}>Feels like {feelsLike}°C</Text>
        </View>
    
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.placeName}>{placeData.name}</Text>
        <Text style={styles.placeDetails}>{placeData.fullAddress}</Text>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.iconCard,
          !placeData.directions && styles.iconCardDisabled,
        ]}
        onPress={() => Linking.openURL(placeData.directions)}
        disabled={!placeData.directions}
      >
        <FontAwesome name="map-marker" size={24} color={!placeData.directions ? "gray" : "white"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconCard,
          placeData.phoneNumber === 'N/A' && styles.iconCardDisabled,
        ]}
        onPress={() => Linking.openURL(`tel:${placeData.phoneNumber}`)}
        disabled={placeData.phoneNumber === 'N/A'}
      >
        <FontAwesome name="phone" size={24} color={placeData.phoneNumber === 'N/A' ? "gray" : "white"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconCard,
          placeData.website === 'N/A' && styles.iconCardDisabled,
        ]}
        onPress={() => Linking.openURL(placeData.website)}
        disabled={placeData.website === 'N/A'}
      >
        <FontAwesome name="globe" size={24} color={placeData.website === 'N/A' ? "gray" : "white"} />
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 10,
    margin: 16,
  },
  placeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colorTheme.card.background,
  },
  placeDetails: {
    fontSize: 16,
    color: colorTheme.card.background,
  },
  loaderContainer:{
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  weatherBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorTheme.card.background,
    padding: 16,
    height: 200,
    margin: 16,
    borderRadius: 15, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0, 
      height: 2, 
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
  },
  temperatureText: {
    fontSize: 70,
    fontWeight: '700',
    color: 'white',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feelLikeText: {
    fontSize: 16,
    color: colorTheme.textPrimary,
    paddingRight: 40,
  },
  placeTitle: {
    fontSize: 22,
    color: colorTheme.textPrimary,
    fontWeight: 'bold',
    paddingRight: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconCard: {
    width: 60,
    height: 60,
    backgroundColor: colorTheme.card.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colorTheme.textPrimary,
  },
  iconCardDisabled: {
    backgroundColor:colorTheme.textPrimary,
    borderColor: '#ccc',
  },
});
