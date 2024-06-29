declare global {
  interface Date {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addDays(days?: number): any;
  }
}

export enum WeatherType {
  WEATHER = 'weather',
  FORECAST = 'forecast',
}
