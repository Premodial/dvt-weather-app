import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {addFavorite} from '../../../services/firebase/weather/weather';
import { useRouter } from 'expo-router';
import { screens } from '../../../constants';
import {getPlaceDetails} from '../../../services/googlePlacesAPI';
import {colorTheme} from '../../../constants';
import {Favorite} from '../../../models/favorite'
import { logErrorToServer } from '../../../services/logger/errorReportingApi';

const HeartIcon = ({userId, ForecastWeather, CurrentWeather, isLoggedIn}) => {
  const router = useRouter();
  const handleFavorite = async () => {
      if(!isLoggedIn){
        router.push(screens.LOGIN);
        return;
      }else{
        try {
          const placeDetails = await getPlaceDetails(CurrentWeather.coord.lat , CurrentWeather.coord.lon);

          if ('error' in placeDetails) {
            console.error('Error fetching place details:', placeDetails.error);
            return;
          }
          
          const photo = placeDetails?.photos[0] || '';
          const userFavorite: Favorite = {
            userId: userId,
            latitude: CurrentWeather.coord.lat,
            longitude: CurrentWeather.coord.lon,
            forecast: ForecastWeather,
            current: CurrentWeather,
            photo,
            placeId: placeDetails.placeId,
            date: new Date().toISOString(), 
            name: placeDetails.name,
          };          
          const response = await addFavorite(userFavorite);
        } catch (error) {
          logErrorToServer(error);
        }
      }
  }

  return (
    <TouchableOpacity onPress={()=>handleFavorite()} style={styles.container}>
      <Ionicons name="heart" size={40} color={colorTheme.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10, 
    right: 10 
  },
});


export  {HeartIcon};
