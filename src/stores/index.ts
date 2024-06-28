import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IS_DEV } from '../utils/constants';

interface appState {
  location: string;
  weatherLoading: boolean;
  forecastLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  weatherData: any;
  setLocation: (value: string) => void;
}

const appStore = (set: (arg0: () => { location: string }) => void) => ({
  location: '',
  weatherLoading: false,
  forecastLoading: false,
  weatherData: null,
  setLocation: (value: string) => {
    set(() => ({
      location: value,
    }));
  },
});

const useAppStore = IS_DEV
  ? create<appState, [['zustand/devtools', never]]>(devtools(appStore))
  : create<appState>(appStore);

export default useAppStore;
