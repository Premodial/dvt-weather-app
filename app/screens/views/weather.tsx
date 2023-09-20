import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, ActivityIndicator, Text, TouchableOpacity, Modal, Button, TextInput, SafeAreaView } from 'react-native';
import { useLocation } from '../../context/LocationContext';
import { useWeatherData } from '../../context/WeatherDataContext';
import { getWeatherBackground } from '../../utils/weatherUtils';
import { useUserStore } from '../../store/userStore';
import { CurrentWeatherStats, ForecastItem, TodayWeather, SearchModal } from '../../components/molecules/index';
import { HeartIcon } from '../../components/atoms/index';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorTheme, CURRENT_WEATHER_LAST_UPDATE } from '../../constants';
import { logErrorToServer } from '../../services/logger/errorReportingApi';
import i18n from '../../i18n';
import { MaterialIcons } from '@expo/vector-icons';

const Home = () => {
  const [assets, setAssets] = useState({
    image: null,
    color: colorTheme.secondary,
    iconPath: null,
  });
  const firstElement = 0;
  const [isConnected, setIsConnected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { location, errorMsg, updateLocation, resetToCurrentLocation } = useLocation();
  const {
    currentWeather,
    forecastWeather,
    currentWeatherError,
    forecastWeatherError,
    isFetchingCurrentWeather,
    isFetchingForecastWeather,
  } = useWeatherData();
  const { userId, isLoggedIn } = useUserStore();
  const [lastUpdate, setLastUpdate] = useState(null);

  const toggleModalVisibility = () => {
    setIsModalVisible(prevState => !prevState);
  };

  useEffect(() => {
    if (currentWeather) {
      const { image, color, iconPath } = getWeatherBackground(currentWeather?.weather[firstElement]?.main);
      setAssets({ image, color, iconPath });
    }
  }, [currentWeather]);

  useEffect(() => {
    const getLastUpdate = async () => {
        try{
            const currentWeatherLastUpdate = await AsyncStorage.getItem(CURRENT_WEATHER_LAST_UPDATE);
            setLastUpdate(currentWeatherLastUpdate ? new Date(JSON.parse(currentWeatherLastUpdate)) : null);
        }
        catch (err) {
          logErrorToServer(err);
        }
    };
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    getLastUpdate();


    return () => {
      unsubscribe();
    };
  }, []);

  if (isFetchingCurrentWeather || isFetchingForecastWeather || !location) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colorTheme.primary}/>
      </View>
    );
  }
  
  if (currentWeatherError || forecastWeatherError || errorMsg) {
    return <Text>Error loading weather data</Text>;
  }

  return (
    <>
      <View style={[styles.container]}>
        <ImageBackground source={assets.image} style={styles.image}>
        <View style={styles.liveContainer}>
            {isConnected ? (
              <Text style={styles.liveText}>{i18n.t('live')}</Text>
            ) : lastUpdate ? (
              <Text style={styles.updateText}>{i18n.t('lastUpdate')}: {lastUpdate.toLocaleTimeString()}</Text>
            ) : null}
            <View style={isConnected ? styles.liveDot : styles.offlineDot} />
          </View>
          <HeartIcon
            userId={userId}
            ForecastWeather={forecastWeather}
            CurrentWeather={currentWeather}
            isLoggedIn={isLoggedIn}
          />
          <View style={styles.weatherContainer}>
            <TodayWeather temp={currentWeather.main.temp} condition={currentWeather?.weather[firstElement]?.main} />
          </View>
        </ImageBackground>
        <View style={[styles.bottomHalf, { backgroundColor: assets.color, }]}>
          <CurrentWeatherStats min={currentWeather.main.temp_min} current={currentWeather.main.temp} max={currentWeather.main.temp_max} />
            <View style={styles.forecastWeatherContainer}>
                {forecastWeather?.list.map((forecastData, index) => {
              const { iconPath } = getWeatherBackground(forecastData?.weather[firstElement]?.main);
                  return <ForecastItem key={index} forecastData={forecastData} path={iconPath} />;
              })}
            </View>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={toggleModalVisibility}>
            <MaterialIcons name="search" size={24} color="white" />
            <Text style={styles.searchButtonText}>{i18n.t('search')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.userLocation} onPress={resetToCurrentLocation}>
            <MaterialIcons name="my-location" size={24} color="white" />
      </TouchableOpacity>
      </View>
      <SearchModal isModalVisible={isModalVisible} toggleModalVisibility={toggleModalVisibility} updateLocation={updateLocation} />
    </>
  );
};

const styles = StyleSheet.create({
  forecastWeatherContainer: {
    paddingTop: 10
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1, 
    width: '100%', 
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  weatherContainer: {
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: colorTheme.secondary,
    paddingTop: 15,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  liveContainer: {
    position: 'absolute',
    top: 10,
    left:10 ,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 10,
    height: 10,
    backgroundColor: '#28A745',
    borderRadius: 5,
    marginLeft: 5,
  },
  offlineDot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginLeft: 5,
  },
  liveText: {
    color: 'white',
    fontWeight: 'bold',
  },
  updateText: {
    color: 'white',
  },
  loaderContainer:{
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444444',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
  },
  searchButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalTextInput: {
    width: '80%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
  },
  userLocation:{
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444444',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
  }
});

export default Home;
