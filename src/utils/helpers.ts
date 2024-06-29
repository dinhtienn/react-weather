// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processWeather = (weatherData: any) => ({
  cod: weatherData.cod,
  name: `${weatherData.name}, ${weatherData.sys.country}`,
  temp: Math.floor(weatherData.main.temp),
  icon: weatherData.weather[0].icon,
  description: weatherData.weather[0].description,
  humidity: weatherData.main.humidity,
  winds: weatherData.wind.speed,
  visibility: weatherData.visibility / 1000,
});

const listMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDateTime = (date: Date) =>
  `${listMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
