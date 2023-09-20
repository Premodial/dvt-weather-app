interface Coord {
    lon: number;
    lat: number;
  }
  
  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }
  
  interface Clouds {
    all: number;
  }
  
  interface Sys {
    country: string;
    sunrise: number;
    sunset: number;
  }
  
  interface WeatherListItem {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
  }
  
  export interface WeatherApiResponse {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

  export interface WeatherListApiResponse {
    list: WeatherListItem[];
  }

  export interface WeatherDataContextProps {
    currentWeather: WeatherApiResponse | null;
    forecastWeather: WeatherListApiResponse | null;
    currentWeatherError: Error | null;
    forecastWeatherError: Error | null;
    isFetchingCurrentWeather: boolean;
    isFetchingForecastWeather: boolean;
  }