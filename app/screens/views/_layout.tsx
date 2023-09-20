import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../store/userStore';
import { useRouter } from 'expo-router';
import { screens, colorTheme } from '../../constants';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocationProvider } from '../../context/LocationContext';
import { WeatherDataProvider } from '../../context/WeatherDataContext';
import I18n from '../../i18n'; 

const queryClient = new QueryClient();

const RootLayout: React.FC = () => {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <WeatherDataProvider>
          <Tabs
            screenOptions={({ route }) => ({
              headerShown: true,
              headerTitle: I18n.t(route.name),
              tabBarShowLabel: true,
              tabBarActiveTintColor: colorTheme.primary,
              tabBarStyle: {
                backgroundColor: '#333333', 
              },
              tabBarLabelStyle: {
                fontSize: 12,
              },
              tabBarIconStyle: {
                marginTop: 10,
              },
              headerStyle: {
                backgroundColor: '#333333',
              },
              headerTitleStyle: {
                color: 'white',
                fontSize: 20,
              },
            })}
          >
            <Tabs.Screen
              name="weather"
              options={{
                title: I18n.t('weather'),
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="cloud-outline" color={color} size={size * 1.5} />
                ),
                tabBarLabel: I18n.t('weather'),
              }}
            />
            <Tabs.Screen
              name="favorites"
              options={{
                title: I18n.t('favorites'),
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="star-outline" color={color} size={size * 1.5} />
                ),
                tabBarLabel: I18n.t('favorites'),
                headerTitle: I18n.t('favorites'),
              }}
              listeners={{
                tabPress: (e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    router.push(screens.LOGIN);
                  }
                },
              }}
            />
            <Tabs.Screen
              name="map"
              options={{
                title: I18n.t('map'),
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="map-outline" color={color} size={size * 1.5} />
                ),
                tabBarLabel: I18n.t('map'),
              }}
              listeners={{
                tabPress: (e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    router.push(screens.LOGIN);
                  }
                },
              }}
            />
         <Tabs.Screen
            name="details"
            options={{
              title: I18n.t('details'),
              tabBarLabel: I18n.t('details'),
              tabBarItemStyle: {
                display: 'none',
              },
              headerLeft: () => (
                <Ionicons 
                  name="arrow-back" 
                  size={25} 
                  color="#fff" 
                  style={{ marginLeft: 15 }} 
                  onPress={() => router.back()} 
                />
              ),
            }}
          />
          </Tabs>
        </WeatherDataProvider>
      </LocationProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;

