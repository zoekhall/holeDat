/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TUser } from '../types/user';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Map, About, Feed } from '../assets';

const localMode = localStorage.getItem('mode');
if (localMode === 'dark-mode') {
  //if mode isn't dark mode - set it
  document.body.classList.add('dark-mode');
  localStorage.setItem('mode', 'dark-mode'); //
}

const NavBar = () => {
  const menuItems = [Map, About, Feed];
  const menuPhrasing = ['Map', 'About', 'Feed'];
  const [user, setUser] = useState<TUser | null>(null);
  const [page, setPage] = useState<string>('');
  const [mode, setMode] = useState<any>('');

  const checkUser = () => {
    axios
      .get('/api/user/me')
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(checkUser, []);

  useEffect(() => {
    setMode(localMode);
  }, []);

  const toggleMode = () => {
    if (mode !== 'dark-mode') {
      //if mode isn't dark mode - set it
      document.body.classList.add('dark-mode');
      localStorage.setItem('mode', 'dark-mode'); //
      setMode('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.removeItem('mode'); //if it is equal - remove it
      setMode('');
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <div className='nav-bar'>
      <div className='top-border'></div>
      <nav>
        <div className='top-nav'>
          <div className='nav-bar-left'>
            {user?.id && (
              <Link onClick={() => setPage('')} to={'/User'}>
                <img src={user.photo} alt='me' width={40} style={{ borderRadius: '100px' }} />
              </Link>
            )}
          </div>
          <Link onClick={() => setPage('')} to='/'>
            <div className='top-center'>
              <h1>Hole Dat</h1>
              <img
                src='https://res.cloudinary.com/di6gxsepn/image/upload/v1670816293/ybyqlkegpdct6x5xeauz.svg'
                alt='logo'
                width='50'
              />
            </div>
          </Link>
          <div className='nav-bar-right'>
            {user?.id ? (
              <Link to='/AddPothole' onClick={() => setPage('')}>
                <i className='bi bi-plus-circle'></i>
              </Link>
            ) : (
              <a href='/auth/google/callback'>
                <button>Sign In</button>
              </a>
            )}
          </div>
        </div>
        <div className='navbar'>
          <div id='mode' className='menu-item' onClick={toggleMode}>
            <DarkModeSwitch className='mode' checked={mode} onChange={toggleMode} size={30} />
            <p>Mode</p>
          </div>
          {menuItems.map((item, i) => (
            <Link
              onClick={() => handlePage(menuPhrasing[i])}
              className={`${menuPhrasing[i] === page ? 'on-page' : ''}`}
              key={`${i}-${item}`}
              to={`/${menuPhrasing[i]}`}
            >
              <div className='menu-item'>
                {item}
                <p>{menuPhrasing[i]}</p>
              </div>
            </Link>
          ))}
        </div>
      </nav >
    </div >
  );
};

export default NavBar;
