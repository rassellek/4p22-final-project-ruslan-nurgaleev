import React from 'react'
import s from './Page404.module.scss'

import { useNavigate } from 'react-router-dom'

let Page404Logo = require('../../assets/icons/Page404.png')

const MyComponent = () => {
    const navigate = useNavigate()

  return (
    <div className={s.root}>
      <div className={s.title}>ERROR 404</div>
      <div className={s.subtitle}>This page does not exist</div>
      <img className={s.logo} src={Page404Logo} alt='Page404' />
      <a className={s.home}  onClick={() => navigate('/')}>
        home
      </a>
    </div>
  )
}

export default MyComponent
