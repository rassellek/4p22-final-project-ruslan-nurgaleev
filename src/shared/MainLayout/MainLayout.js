import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from './components'
import { PhoneIcon, EntryIcon, CartIcon, LikeIcon } from '../../assets/icons'

import './MainLayout.scss'

const MainLayout = (props) => {
  const navigate = useNavigate()

  return (
    <div>
      <header className='root'>
        <section className='section-header-info'>
          <PhoneIcon className='section-header-info-icon__phone' />
          <span className='section-header-info__title'>
            8 (952) 041-13-22 | Работаем 7 дней в неделю | 9:00 — 18:00
          </span>
          <nav className='section-header-info-link'>
            <EntryIcon className='section-header-info-icon__entry' />
            <span className='section-header-info-link__entry' onClick={() => navigate('/entry')}>
              Вход
            </span>
            <span
              className='section-header-info-link__registration'
              onClick={() => navigate('/registration')}
            >
              Регистрация
            </span>
          </nav>
        </section>
        <section className='section-header-navbar'>
          <div className='section-header-navbar__logo'>RASSELL SHOP</div>
          <nav className='section-header-navbar-panel'>
            {/* <div
              className='section-header-navbar-panel__container-input'
              onClick={() => navigate('/')}
            >
              <Input />
            </div> */}
            <div className='section-header-navbar-panel__container' onClick={() => navigate('/')}>
              ГЛАВНАЯ
            </div>
            <div
              className='section-header-navbar-panel__container'
              onClick={() => navigate('/support')}
            >
              ПОДДЕРЖКА
            </div>
            <div
              className='section-header-navbar-panel__container'
              onClick={() => navigate('/like')}
            >
              <LikeIcon onClick={() => navigate('/')} />
            </div>
            <div
              className='section-header-navbar-panel__container'
              onClick={() => navigate('/cart')}
            >
              <CartIcon onClick={() => navigate('/')} />
            </div>
            <div className='section-header-navbar-panel__container theme'></div>
          </nav>
        </section>
      </header>
      <div>{props.children}</div>
    </div>
  )
}

export default MainLayout
