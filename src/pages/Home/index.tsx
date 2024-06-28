import Weather from './components/Weather';
import Forecast from './components/Forecast';

export default function Home() {
  return (
    <main className='page'>
      <div className='page__content'>
        <Weather />
        <p>5-day Forecast (3 Hours)</p>
        <Forecast />
      </div>
    </main>
  );
}
