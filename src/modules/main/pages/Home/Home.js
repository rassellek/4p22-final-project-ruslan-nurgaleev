import React from 'react'

import { MainLayout } from '../../../../shared'

import mainImage from '../../../../assets/images/Main_1.png'
import s from './Home.module.scss'

const Home = () => {
  return (
    <MainLayout>
      <div className={s.root}>
        <div className={s.main}>
          <img className={s.image} src={mainImage} />
          <div className={s.container}>
            <div className={s.logo}>RASSELL SHOP</div>
            <div className={s.line}></div>
            <div className={s.city}>UFA</div>
          </div>
          <div className={s.description}>
            Мы открылись и Нам «Есть чем удивить»! Мы действительно долго старались и Вы можете сами
            убедиться в этом! Новое оформление, постоянно растущий ассортимент и новые низкие цены!
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
