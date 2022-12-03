import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart, clearProduct, removeFromCart } from 'modules/main/store/cartSlice'

import {
  PlusBlackIcon,
  MinusBlackIcon,
  DeleteIcon,
} from 'assets/icons'
import s from './CartItem.module.scss'

const CartItem = (props) => {
  const { id, title, image, price } = props


  const products = useSelector((state) => state.cartReducer)
  const dispatch = useDispatch()

  const onBuyClick = (event) => {
    event.stopPropagation()
    dispatch(addToCart(id))
  }

  const onDeleteClick = (event) => {
    event.stopPropagation()
    dispatch(removeFromCart(id))
  }

  const onClearClick = (event) => {
    event.stopPropagation()
    dispatch(clearProduct(id))
  }

  const calc = (a, b) => {
    return Math.floor(a * b * 100) / 100
  }

  return (
    <div className={s.root}>
      <div className={s.containerDelete}>
        <button className={s.buttonDelete} onClick={onClearClick}>
          <DeleteIcon className={s.deleteIcon} />
          <p className={s.titleDelete}>Удалить из корзины</p>
        </button>
      </div>

      <div className={s.containerImage}>
        <img src={image} />
      </div>

      <div className={s.title}>{title}</div>

      <div className={s.containerButton}>
        <button className={s.buttonCounter} onClick={onDeleteClick}>
          <MinusBlackIcon className={s.counterIcon} />
        </button>

        <div className={s.counter}>{products[id]}</div>

        <button className={s.buttonCounter} onClick={onBuyClick}>
          <PlusBlackIcon className={s.counterIcon} />
        </button>
      </div>

      <div className={s.price}>{calc(Object.values({ price }), products[id])}$</div>
    </div>
  )
}

export default CartItem
