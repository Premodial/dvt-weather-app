export const getWeatherBackground = (main: string) => {
    switch (main.toLowerCase()) {
      case 'sunny':
        return {
          image: require('../../Assets/Images/sea_sunny.png'),
          color: '#4a90e2',
          iconPath: require('../../Assets/Icons/clear.png'), 
        };
      case 'cloudy':
        return {
          image: require('../../Assets/Images/sea_cloudy.png'),
          color: '#628594',
          iconPath: require('../../Assets/Icons/partlysunny.png'),
        };
      case 'rainy':
        return {
          image: require('../../Assets/Images/sea_rainy.png'),
          color: '#686868',
          iconPath: require('../../Assets/Icons/rain.png'),
        };
      default:
        return {
          image: require('../../Assets/Images/sea_sunny.png'),
          color: '#4a90e2',
          iconPath: require('../../Assets/Icons/clear.png'),
        };
    }
  };
  