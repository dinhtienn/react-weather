import { useEffect } from 'react';
import Header from './components/Header';
import useAppStore from './stores';
import { Outlet } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { LIST_HISTORY_STORAGE_KEY } from './utils/constants';

function App() {
  const { setLocation, setHistory, history, location } = useAppStore();

  useEffect(() => {
    const historyStorage = secureLocalStorage.getItem(LIST_HISTORY_STORAGE_KEY);
    if (historyStorage) {
      setHistory(historyStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (history.length && !location) {
      setLocation(history[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
