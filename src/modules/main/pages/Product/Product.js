import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { MainLayout } from '../../../../shared'
import { addToCart, removeFromCart } from 'modules/main/store/cartSlice'
import { setIsLoading } from 'modules/main/store/mainSlice'
import api from '../../config/api'

import s from './Product.module.scss'
import { HouseIcon, CartIcon, LikeIcon, PlusBlackIcon, MinusBlackIcon } from 'assets/icons'

const Product = () => {
  const [productInfo, setProductInfo] = useState(null)
  const params = useParams()

  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.mainReducer)
  const products = useSelector((state) => state.cartReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsLoading(true))
    api.fetchProduct(params.productId).then((data) => {
      setProductInfo(data)
      dispatch(setIsLoading(false))
    })
  }, [params])

  const onBuyClick = (event) => {
    event.stopPropagation()
    console.log(params.productId)
    dispatch(addToCart(params.productId))
  }

  const onDeleteClick = (event) => {
    event.stopPropagation()
    dispatch(removeFromCart(params.productId))
  }

  return (
    <MainLayout>
      <div className={s.root}>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : productInfo ? (
          <>
            <div className={s.navigate}>
              <button className={s.buttonNavigate} onClick={() => navigate('/')}>
                <HouseIcon className={s.icon} />
              </button>
              <span>&nbsp;&gt;&nbsp;</span>
              <button className={s.buttonNavigate} onClick={() => navigate('/')}>
                <h2>Главная</h2>
              </button>
              <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
              <button className={s.buttonNavigate} onClick={() => navigate('/')}>
                <h2>Каталог</h2>
              </button>
              <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
              <h2>{productInfo.category}</h2>
              <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
              <h2>{productInfo.title}</h2>
            </div>

            <h2 className={s.title}>{productInfo.title}</h2>

            <div className={s.product}>
              <img className={s.image} src={productInfo.image} />

              <div className={s.info}>
                <div className={s.id}>
                  <h2>Артикул:&nbsp;&nbsp;</h2>
                  <h3>{productInfo.id}</h3>
                </div>
                <div className={s.description}>
                  <h2>
                    Описание:&nbsp;&nbsp; <h3>{productInfo.description}</h3>
                  </h2>
                </div>
                <div className={s.price}>
                  <h2>Цена:&nbsp;&nbsp;</h2>
                  <h3>{productInfo.price} $</h3>
                </div>

                <div className={s.containerButton}>
                  {!products[params.productId] && (
                    <button className={s.buttonCart} onClick={onBuyClick}>
                      Добавить в козину <CartIcon className={s.cartIcon} />
                    </button>
                  )}
                  {products[params.productId] && (
                    <>
                      <button className={s.buttonCounter} onClick={onDeleteClick}>
                        <MinusBlackIcon className={s.counterIcon} />
                      </button>
                      <div className={s.counter}>{products[params.productId]}</div>
                      <button className={s.buttonCounter} onClick={onBuyClick}>
                        <PlusBlackIcon className={s.counterIcon} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={s.navigate}>
              <button className={s.buttonNavigate} onClick={() => navigate('/')}>
                <HouseIcon className={s.icon} />
              </button>
              <span>&nbsp;&gt;&nbsp;</span>
              <button className={s.buttonNavigate} onClick={() => navigate('/')}>
                <h2>Главная</h2>
              </button>
              <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
              <button className={s.buttonNavigate} onClick={() => navigate('/')}>
                <h2>Каталог</h2>
              </button>
            </div>

            <h2 className={s.title}>
              <p>К сожалению, этого товара нет в наличии.</p>
              <p>Вы можете перейти на главную страницу или воспользоваться каталогом товаров.</p>
              <p>Если эта ошибка будет повторяться, обратитесь, пожалуйста, в службу поддержки.</p>
              <p>
                <button className={s.buttonNavigate} onClick={() => navigate('/')}>
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

export default Product
