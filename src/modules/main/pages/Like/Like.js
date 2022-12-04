import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearLike } from 'modules/main/store/likeSlice'

import { MainLayout } from 'shared'
import { LikeItem } from './components'

import { DislikeIcon, HouseIcon } from 'assets/icons'
import s from './Like.module.scss'

const Like = () => {
  const navigate = useNavigate()

  const likeProducts = useSelector((state) => state.likeReducer)
  const { products } = useSelector((state) => state.mainReducer)
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <div className={s.root}>
        <div className={s.navigate}>
          <button className={s.buttonNavigate} onClick={() => navigate('/home')}>
            <HouseIcon className={s.icon} />
          </button>
          <span>&nbsp;&gt;&nbsp;</span>
          <button className={s.buttonNavigate} onClick={() => navigate('/home')}>
            <h2>Главная</h2>
          </button>
          <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
          <h2>Избранное</h2>
        </div>

        {Object.keys(likeProducts).length > 0 ? (
          <div className={s.clearContainer}>
            <div className={s.clear}>
              <button className={s.buttonDelete} onClick={() => dispatch(clearLike())}>
                <p className={s.titleDelete}>Очистить избранное</p>
                <DislikeIcon className={s.deleteIcon} />
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        {Object.keys(likeProducts).length > 0 ? (
          <div className={s.like}>
            <div className={s.products}>
              {products
                .filter((product) => likeProducts[product.id])
                .map((item, index) => {
                  return (
                    <LikeItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      price={item.price}
                    />
                  )
                })}
            </div>
          </div>
        ) : (
          <>
            <h2 className={s.title}>
              <p>В избранном пока пусто.</p>
              <p>Сохраняйте товары, которые понравились, чтобы долго не искать.</p>
              <p>Вы можете перейти на главную страницу или воспользоваться каталогом товаров.</p>
              <p>
                <button className={s.buttonNavigate} onClick={() => navigate('/home')}>
                  &gt; Вернуться на главную страницу.
                </button>
              </p>
              <p>
                <button className={s.buttonNavigate} onClick={() => navigate('/')}>
                  &gt; Посмотреть каталог товаров.
                </button>
              </p>
              <p>
                <button className={s.buttonNavigate} onClick={() => navigate('/support')}>
                  &gt; Обратиться в службу поддержки.
                </button>
              </p>
            </h2>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default Like
