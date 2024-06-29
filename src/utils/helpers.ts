const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processWeather = (weatherData: any) => ({
  cod: Number(weatherData.cod),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processForecast = (forecastData: any) => {
  const timezone = forecastData.city.timezone;
  const today = new Date();
  const todayDateString = `${listMonths[today.getMonth()]} ${today.getDate()}`;
  const offset = new Date().getTimezoneOffset() * 60;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataFormatted = forecastData.list.map((item: any) => {
    const datetime: Date = new Date((item.dt + timezone + offset) * 1000);
    const date = `${listMonths[datetime.getMonth()]} ${datetime.getDate()}`;
    const hours =
      datetime.getHours() > 10
        ? datetime.getHours()
        : `0${datetime.getHours()}`;
    const minutes =
      datetime.getMinutes() > 10
        ? datetime.getMinutes()
        : `0${datetime.getMinutes()}`;
    const time = `${hours}:${minutes}`;

    return {
      time,
      date: date === todayDateString ? 'Today' : date,
      icon: item.weather[0].icon,
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      description: item.weather[0].description,
    };
  });

  return {
    cod: 200,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: groupBy(dataFormatted, (data: any) => data.date),
  };
};

export const formatDateTime = (date: Date) =>
  `${listMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

export const getListDateForecast = () => {
  Date.prototype.addDays = function (days: number) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);

    return date;
  };

  const today = new Date();

  return Array.from(Array(6).keys())
    .map((item: number) => today.addDays(item))
    .map((item: Date, index: number) =>
      index === 0 ? 'Today' : `${listMonths[item.getMonth()]} ${item.getDate()}`
    );
};
