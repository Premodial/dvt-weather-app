import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { WeatherMarker } from '../../components/molecules';
import { getUserData } from '../../services/firebase/weather/weather';
import { useUserStore } from '../../store/userStore';
import { useLocation } from '../../context/LocationContext';
import { colorTheme } from '../../constants';
import { logErrorToServer } from '../../services/logger/errorReportingApi';

interface MapData {
  id: string;
  placeName: string;
  weather: string;
  latitude: number;
  longitude: number;
  placeId: string;
  feelsLike: number;
}

interface PlaceDetails {
  name: string;
  fullAddress: string;
  numberOfReviews: number;
  website: string;
  phoneNumber: string;
  directions: string;
  restaurantRating: number;
  photos: string[];
  placeTypes: string[];
  placeId?: string; 
}

export default function Map() {
  const { location } = useLocation();
  const { userId } = useUserStore();
  const [mapData, setMapData] = useState<MapData[]>([]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await getUserData(userId);
        const formattedResponse = response.map((data, index) => ({
          id: index.toString(),
          placeName: data.name,
          weather: `${data.current.main.temp}°C`,
          latitude: data.latitude,
          longitude: data.longitude,
          placeId: data.placeId,
          feelsLike: data.current.main.feels_like,
        }));

        setMapData(formattedResponse);
      } catch (error) {
        logErrorToServer(error)
      }
    }

    if (userId) {
      getFavorites();
    }
  }, [userId]);

  if (!location) {
    return (
      <View style={styles.loaderContainer}  testID="loaderContainer">
        <ActivityIndicator size="large" color={colorTheme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        testID="mapView"
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922,
        }}
      >
        {mapData.map((data, index) => (
          <WeatherMarker 
            key={index} 
            coordinate={{latitude: data.latitude, longitude: data.longitude}} 
            weather={data.weather} 
            placeName={data.placeName} 
            placeId={data.placeId} 
            feelsLike={data.feelsLike}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loaderContainer:{
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});
