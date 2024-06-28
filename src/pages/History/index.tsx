import Search from './components/Search';
import HistoryList from './components/HistoryList';

export default function History() {
  return (
    <main className='page'>
      <div className='page__content'>
        <Search />
        <HistoryList />
      </div>
    </main>
  );
}
