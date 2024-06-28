import './search.scss';

export default function Search() {
  return (
    <div className='history-search'>
      <div className='history-search__input'>
        <input type='text' placeholder='Search country or city here...' />
        <button className='btn-primary'>Search</button>
      </div>
      <p className='history-search__error'>Invalid country or city</p>
    </div>
  );
}
