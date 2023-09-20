import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import { useQuery } from 'react-query'; // import useQuery
import { getUserData } from '../../services/firebase/weather/weather';
import { useUserStore } from '../../store/userStore';
import { screens } from '../../constants';
import {PlaceInfo} from '../../models/placeDetails';
import { colorTheme, weather as WEATHER } from '../../constants';
import { logErrorToServer } from '../../services/logger/errorReportingApi';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function Favorites() {
  const router = useRouter();
  const { userId } = useUserStore();
  const [refresh, setRefresh] = useState(0);

  const fetchUserData = async () => {
      try{
        const response = await getUserData(userId);
        return response.map((data, index) => ({
          id: index.toString(),
          placeName: data.name,
          temperature: `${data.current.main.temp}°C`,
          imageUri: data.photo ,
          placeId: data.placeId,
          feelsLike: data.current.main.feels_like,
        }));
      }catch (error) {
        logErrorToServer(error)
      }
  };

  useFocusEffect(
    React.useCallback(() => {
      setRefresh((prev) => prev + 1);
    }, [])
  );

  const { data: favoritesData, error, isLoading } = useQuery<PlaceInfo[], Error>(
    ['favoritesData', userId, refresh], // include refresh here
    fetchUserData, 
    { 
      enabled: !!userId ,
      staleTime: 0,
    }
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator testID="loader" size="large" color={colorTheme.primary} />
      </View>
    );
  }

  if (error) {
    return <View style={styles.container}><Text>Error loading data</Text></View>;
  }

  return (
        <View style={styles.container}>
            <FlatList
              data={favoritesData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={() => router.push({pathname: screens.DETAILS, params: { placeId: item.placeId, temp: item.temperature, feelsLike: Math.round(item.feelsLike - WEATHER.KELVIN_TO_CELSIUS) }})}>
                <View style={styles.card}>
                  <MaterialCommunityIcons name="weather-sunny" size={24} color="gold" /> 
                  <View style={styles.textContainer}>
                    <Text style={styles.placeName}>{item.placeName}</Text>
                    <View style={styles.tempAndViewContainer}>
                      <Text style={styles.temperature}>{item.temperature}</Text>
                      <TouchableOpacity style={styles.viewButton} onPress={() => router.push({pathname: screens.DETAILS, params: { placeId: item.placeId, temp: item.temperature, feelsLike: Math.round(item.feelsLike - WEATHER.KELVIN_TO_CELSIUS) }})}>
                        <Text style={styles.viewButtonText}>View</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>              
              )}
            />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#121212',
  },
  placeName: {
    fontSize: 18,
    color: '#fff',

  },
  temperature: {
    fontSize: 18,
    color: '#fff',
  },
  loaderContainer:{
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#444444',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tempAndViewContainer: {
    alignItems: 'flex-end', // to align temperature and button to the right
  },
  viewButton: {
    marginTop: 5, // to add space between temperature and button
    padding: 5,
    backgroundColor: 'gold',
    borderRadius: 5,
  },
  viewButtonText: {
    color: colorTheme.card.background,
    fontWeight: 'bold',
  },
});
