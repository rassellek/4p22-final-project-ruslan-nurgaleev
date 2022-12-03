import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { addToCart, removeFromCart } from 'modules/main/store/cartSlice'

import s from './ProductItem.module.scss'
import { CartIcon, LikeIcon, PlusBlackIcon, MinusBlackIcon } from 'assets/icons'
import { addToLike, removeFromLike } from 'modules/main/store/likeSlice'

const ProductItem = (props) => {
  const { id, image, title, price } = props
  const navigate = useNavigate()

  const products = useSelector((state) => state.cartReducer)
  const likes = useSelector((state) => state.likeReducer)

  const dispatch = useDispatch()

  const onBuyClick = (event) => {
    event.stopPropagation()
    console.log(id)
    dispatch(addToCart(id))
  }

  const onDeleteClick = (event) => {
    event.stopPropagation()
    dispatch(removeFromCart(id))
  }

    const onLikeClick = (event) => {
      event.stopPropagation()
      console.log(id)
      dispatch(addToLike(id))
    }

    const onDislikeClick = (event) => {
      event.stopPropagation()
      dispatch(removeFromLike(id))
    }


  return (
    <div className={s.root} onClick={() => navigate(`/products/${id}`)}>
      <div className={s.container}>
        <div className={s.containerImage}>
          <img className={s.image} src={image} />
        </div>
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.prise}>{price} $</div>
      <div className={s.containerButton}>
        <div className={s.containerButtonLike}>
          {!likes[id] && (
            <button className={s.buttonLike} onClick={onLikeClick}>
              <LikeIcon className={s.likeIcon} />
            </button>
          )}
          {likes[id] && (
            <button className={s.buttonDislike} onClick={onDislikeClick}>
              <LikeIcon className={s.dislikeIcon} />
            </button>
          )}
        </div>
        <div className={s.containerButtonCart}>
          {!products[id] && (
            <button className={s.buttonCart} onClick={onBuyClick}>
              <CartIcon className={s.cartIcon} />
            </button>
          )}
          {products[id] && (
            <>
              <button className={s.buttonCounter} onClick={onDeleteClick}>
                <MinusBlackIcon className={s.counterIcon} />
              </button>
              <div className={s.counter}>{products[id]}</div>
              <button className={s.buttonCounter} onClick={onBuyClick}>
                <PlusBlackIcon className={s.counterIcon} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductItem
