import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearCart } from 'modules/main/store/cartSlice'

import { MainLayout } from 'shared'
import { CartItem } from './components'

import { BuyIcon, DeleteIcon, HouseIcon } from 'assets/icons'
import s from './Cart.module.scss'

const Cart = () => {
  const navigate = useNavigate()

  const [orderIsValid, setOrderIsValid] = useState(false)
  const [cartIsCleared, setCartIsCleared] = useState(false)

  const cartProducts = useSelector((state) => state.cartReducer)
  const { products } = useSelector((state) => state.mainReducer)
  const dispatch = useDispatch()

  const placeAnOrder = () => {
    products
      .filter((product) => cartProducts[product.id])
      .forEach((item, index) => {
        console.log(`Заказан товар №${index + 1}:`)
        console.log(item)
        console.log(`Количество товара №${index + 1}:`)
        console.log(cartProducts[item.id])
        console.log(`---------------------------`)
      })
    console.log(`Итоговая сумма: `)
    const price = products
      .filter((product) => cartProducts[product.id])
      .reduce((acc, product) => {
        acc += product.price * cartProducts[product.id]
        return acc
      }, 0)

    console.log(`${price} $`)
    console.log(`---------------------------`)

    setOrderIsValid(true)
    dispatch(clearCart())
    setCartIsCleared(true)
  }

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
          <h2>Корзина</h2>
        </div>

        {cartIsCleared || Object.keys(cartProducts).length > 0 ? (
          !orderIsValid ? (
            <div className={s.cart}>
              <div className={s.products}>
                {products
                  .filter((product) => cartProducts[product.id])
                  .map((item, index) => {
                    return (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                      />
                    )
                  })}
              </div>

              <div className={s.order}>
                <div className={s.id}>
                  <h2>Детали заказа:</h2>
                </div>
                <div className={s.description}>
                  <h2>Товаров:</h2>
                  <h3>
                    {' '}
                    {Object.values(cartProducts).reduce((acc, item) => {
                      acc += item
                      return acc
                    }, 0)}
                  </h3>
                </div>
                <div className={s.price}>
                  <h2>Итого:</h2>
                  <h3>
                    {products
                      .filter((product) => cartProducts[product.id])
                      .reduce((acc, product) => {
                        acc += product.price * cartProducts[product.id]
                        return Math.floor(acc * 100) / 100
                      }, 0)}{' '}
                    $
                  </h3>
                </div>
                <div className={s.buy}>
                  <button className={s.buttonBuy} onClick={() => placeAnOrder()}>
                    <p className={s.titleBuy}>Оформить заказ</p>
                    <BuyIcon className={s.buyIcon} />
                  </button>
                </div>
                <div className={s.clear}>
                  <button className={s.buttonDelete} onClick={() => dispatch(clearCart())}>
                    <p className={s.titleDelete}>Очистить корзину</p>
                    <DeleteIcon className={s.deleteIcon} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h2 className={s.title}>
                <p>Ваш заказ успешно оформлен!</p>
                <p>Мы свяжемся с вами в ближайшее время.</p>
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
          )
        ) : (
          <>
            <h2 className={s.title}>
              <p>К сожалению, корзина пуста.</p>
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

export default Cart
