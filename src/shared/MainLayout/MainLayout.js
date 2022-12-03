import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PhoneIcon, EntryIcon, CartIcon, LikeIcon } from '../../assets/icons'

import './MainLayout.scss'

const MainLayout = (props) => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cartReducer)
  const like = useSelector((state) => state.likeReducer)

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
            <div
              className='section-header-navbar-panel__container'
              onClick={() => navigate('/home')}
            >
              ГЛАВНАЯ
            </div>
            <div
              className='section-header-navbar-panel__container theme'
              onClick={() => navigate('/')}
            >
              КАТАЛОГ
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
              <LikeIcon className='section-header-navbar-panel__container_icon-like' />
              {Object.keys(like).length > 0 ? (
                <div className='section-header-navbar-panel__container_counter'>
                  {Object.values(like).reduce((acc, item) => {
                    acc += item
                    return acc
                  }, 0)}
                </div>
              ) : (
                ''
              )}
            </div>
            <div
              className='section-header-navbar-panel__container'
              onClick={() => navigate('/cart')}
            >
              <CartIcon className='section-header-navbar-panel__container_icon-cart' />
              {Object.keys(cart).length > 0 ? (
                <div className='section-header-navbar-panel__container_counter'>
                  {Object.values(cart).reduce((acc, item) => {
                    acc += item
                    return acc
                  }, 0)}
                </div>
              ) : (
                ''
              )}
            </div>
          </nav>
        </section>
      </header>
      <div className='body'>{props.children}</div>
      <footer className='footer'>
        <p>© This page is not intended for commercial use.</p>
      </footer>
    </div>
  )
}

export default MainLayout
