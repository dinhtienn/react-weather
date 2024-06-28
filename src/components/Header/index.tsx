import { Link } from 'react-router-dom';
import appLogo from '/icon-cloud.svg';
import iconLocation from '../../assets/images/icon-location.svg';
import iconSearch from '../../assets/images/icon-search.svg';
import './header.scss';

export default function Header() {
  return (
    <header className='app-header'>
      <div className='app-header__brand'>
        <Link to='/' className='app-header__brand__logo'>
          <img src={appLogo} className='logo' alt='App logo' />
          <span>Weather App</span>
        </Link>
        <Link to='/history'>History</Link>
      </div>
      <div className='app-header__location'>
        <img
          src={iconLocation}
          className='app-header__location__icon location'
          alt='Location'
        />
        <p className='app-header__location__text'>Singapore, SG</p>
        <img
          src={iconSearch}
          className='app-header__location__icon search'
          alt='Search'
        />
      </div>
    </header>
  );
}
