import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import i18n from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_STORAGE_KEY = 'USER_LOCATION_DATA';

interface LocationContextProps {
  location: Location.LocationObject;
  errorMsg: string;
  updateLocation: (
    lat: number, 
    lon: number, 
    altitude?: number | null, 
    accuracy?: number | null, 
    altitudeAccuracy?: number | null, 
    heading?: number | null, 
    speed?: number | null
  ) => Promise<void>;
  resetToCurrentLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

interface LocationProviderProps {
  children: React.ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const PERMISSION_STATUS =  'granted';

  const updateLocation = async (
    lat: number, 
    lon: number, 
    altitude?: number | null, 
    accuracy?: number | null, 
    altitudeAccuracy?: number | null, 
    heading?: number | null, 
    speed?: number | null
  ) => {
    // Update the location state with the new coordinates
    setLocation({
      coords: {
        latitude: lat,
        longitude: lon,
        altitude,
        accuracy,
        altitudeAccuracy,
        heading,
        speed,
      },
      timestamp: Date.now(),
    });
  };
  
  const resetToCurrentLocation = async () => {
    try {
      const cachedLocationData = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
      if (cachedLocationData) {
        setLocation(JSON.parse(cachedLocationData));
      } else {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(currentLocation));
      }
    } catch (error) {
      setErrorMsg(i18n.t('locationFetchError'));
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== PERMISSION_STATUS) {
        setErrorMsg(i18n.t('locationPermissionDenied'));
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
      setLocation(location);
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location, errorMsg, updateLocation, resetToCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};


