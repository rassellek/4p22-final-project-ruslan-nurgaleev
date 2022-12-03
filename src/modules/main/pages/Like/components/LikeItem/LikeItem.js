import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart, clearProduct, removeFromCart } from 'modules/main/store/cartSlice'
import { clearLike, clearLikeProduct } from 'modules/main/store/likeSlice'

import {
  CartIcon,
  LikeIcon,
  PlusBlackIcon,
  MinusBlackIcon,
  DeleteIcon,
  DislikeIcon,
} from 'assets/icons'
import s from './LikeItem.module.scss'

const LikeItem = (props) => {
  const { id, title, image, price, description } = props

  const navigate = useNavigate()

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

    const onClearLikeClick = (event) => {
      event.stopPropagation()
      dispatch(clearLikeProduct(id))
    }

  const calc = (a, b) => {
    return Math.floor(a * b * 100) / 100
  }

  return (
    <div className={s.root}>
      <div className={s.containerDelete}>
        <button className={s.buttonDelete} onClick={onClearLikeClick}>
          <DislikeIcon className={s.deleteIcon} />
          <p className={s.titleDelete}>Удалить из избранного</p>
        </button>
      </div>

      <div className={s.containerImage}>
        <img src={image} />
      </div>

      <div className={s.info}>
        <div className={s.title}>{title}</div>
        <div className={s.description}>{description}</div>
      </div>

      <div className={s.containerButton}>
        {!products[id] && (
          <>
            <div className={s.price}>{price} $</div>
            <div className={s.containerAdd}>
              <button className={s.buttonAdd} onClick={onBuyClick}>
                <CartIcon className={s.addIcon} />
                <p className={s.titleAdd}>Добавить в корзину</p>
              </button>
            </div>
          </>
        )}

        {products[id] && (
          <>
            <div className={s.containerBig}>
              <div className={s.price}>{calc(Object.values({ price }), products[id])}$</div>
              
              <div className={s.containerCounter}>
                <button className={s.buttonCounter} onClick={onDeleteClick}>
                  <MinusBlackIcon className={s.counterIcon} />
                </button>
                <div className={s.counter}>{products[id]}</div>
                <button className={s.buttonCounter} onClick={onBuyClick}>
                  <PlusBlackIcon className={s.counterIcon} />
                </button>
              </div>

              <div className={s.containerDelete}>
                <button className={s.buttonDelete} onClick={onClearClick}>
                  <DeleteIcon className={s.deleteIcon} />
                  <p className={s.titleDelete}>Удалить из корзины</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LikeItem
