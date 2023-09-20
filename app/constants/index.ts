// Constant representing the key used to store user authentication state.
export const user_auth_state = 'user_v2';

export const screens = {
    WEATHER: 'screens/views/weather',
    LOGIN: 'screens/authentication/login',
    DETAILS: 'screens/views/details',
};

// Configuration constants for query behavior:
// - STALE_TIME_MS: The duration (in milliseconds) after which a piece of data becomes stale and potentially needs refetching (5 minutes).
// - RETRY_COUNT: The number of attempts to retry fetching data before throwing an error.
// - CACHE_TIME_MS: The duration (in milliseconds) to cache data before it is garbage collected and removed from cache (24 hours).
const STALE_TIME_MS = 1000 * 60 * 5; 
const RETRY_COUNT = 3;
const CACHE_TIME_MS = 1000 * 60 * 60 * 24; 

// Object consolidating the default configuration for useQuery, incorporating
// the previously defined constants for stale time, retry count, and cache time.
export const queryConfig = {
    staleTime: STALE_TIME_MS,
    retry: RETRY_COUNT,
    cacheTime: CACHE_TIME_MS,
};

export const colorTheme = {
    primary: '#ea7474',  
    secondary: '#4a90e2', 
    
    textPrimary: '#ffffff', 
    textSecondary: '#bdc3c7', 
    card : {
        background: '#444444',
        shadow: '#000000',
    },
};


const KELVIN_TO_CELSIUS = 273.15;

export const weather = {
    KELVIN_TO_CELSIUS,
}

export const CURRENT_WEATHER_LAST_UPDATE = 'CURRENT_WEATHER_LAST_UPDATE';