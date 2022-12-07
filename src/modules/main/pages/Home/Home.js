import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MainLayout } from '../../../../shared'

import mainImage from '../../../../assets/images/Main_1.png'
import leftImage from '../../../../assets/images/Main_3.png'
import centerImage from '../../../../assets/images/Main_4.jpg'
import rightImage from '../../../../assets/images/Main_5.png'
import s from './Home.module.scss'

const Home = () => {
  const navigate = useNavigate()

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

        <div className={s.info}>
          <div className={s.containerInfo}>
            <div className={s.title}>Новый сезон - новый гардероб!</div>
            <div className={s.description}>
              Внешний вид - визитная карточка человека. Именно с неё берёт своё начало развитие
              нашего бренда. Ведь как жители Уфы мы особое внимание уделяем функциональным
              материалам и силуэтам.
            </div>
            <div className={s.description}>
              Познакомьтесь с новыми моделями наступающего сезона на нашем сайте.
            </div>
            <button className={s.button} onClick={() => navigate('/')}>
              Навстречу новому!
            </button>
          </div>
          <div className={s.containerImage}>
            <img className={s.leftImage} src={leftImage} />
            <img className={s.centerImage} src={centerImage} />
            <img className={s.rightImage} src={rightImage} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
