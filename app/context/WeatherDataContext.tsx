import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from './LocationContext';
import { useQuery } from 'react-query';
import { getCurrentWeather, getForecastWeather } from '../services/weatherAPI/index';
import {WeatherApiResponse, WeatherListApiResponse, WeatherDataContextProps} from '../models/weather'
import { queryConfig } from '../constants';

const WeatherDataContext = createContext<WeatherDataContextProps | undefined>(undefined);

interface WeatherDataProviderProps {
  children: ReactNode;
}

export const WeatherDataProvider: React.FC<WeatherDataProviderProps> = ({ children }) => {
  const { location } = useLocation();
  
  const fetchCurrentWeather = () => getCurrentWeather(location!.coords.latitude, location!.coords.longitude);
  const fetchForecastWeather = () => getForecastWeather(location!.coords.latitude, location!.coords.longitude);

  const currentWeatherQuery = useQuery<WeatherApiResponse, Error>('currentWeather', fetchCurrentWeather, {
    enabled: !!location,
    staleTime: queryConfig.staleTime,
    retry: queryConfig.retry,
    cacheTime: queryConfig.cacheTime,
  });

  const forecastWeatherQuery = useQuery<WeatherListApiResponse, Error>('forecastWeather', fetchForecastWeather, {
    enabled: !!location,
    staleTime: queryConfig.staleTime,
    retry: queryConfig.retry,
    cacheTime: queryConfig.cacheTime,
  });

  useEffect(() => {
    if (location) {
      currentWeatherQuery.refetch();
      forecastWeatherQuery.refetch();
    }
  }, [location]);

  return (
    <WeatherDataContext.Provider value={{ 
      currentWeather: currentWeatherQuery.data, 
      forecastWeather: forecastWeatherQuery.data, 
      currentWeatherError: currentWeatherQuery.error, 
      forecastWeatherError: forecastWeatherQuery.error, 
      isFetchingCurrentWeather: currentWeatherQuery.isFetching, 
      isFetchingForecastWeather: forecastWeatherQuery.isFetching 
    }}>
      {children}
    </WeatherDataContext.Provider>
  );
};

export const useWeatherData = () => {
  const context = useContext(WeatherDataContext);
  if (context === undefined) {
    throw new Error('useWeatherData must be used within a WeatherDataProvider');
  }
  return context;
};
