import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { MainLayout } from '../../../../shared'
import api from '../../config/api'

import s from './Product.module.scss'

const Product = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [productInfo, setProductInfo] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    api.fetchProduct(params.productId).then((data) => {
      setProductInfo(data)
      setIsLoading(false)
    })
  }, [params])

  const addToCart = () => {
    console.log(productInfo.id)
  }

  return (
    <MainLayout>
      {' '}
      <div className={s.root}>
        <button onClick={() => navigate('/')}>Назад</button>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : productInfo ? (
          <>
            <h2>{productInfo.title}</h2>
            <img className={s.image} src={productInfo.image} />
            <h1>Price: {productInfo.price}$</h1>
            <h5>{productInfo.description}</h5>
          </>
        ) : (
          'Нет товара'
        )}
        <button onClick={addToCart}>Добавить в корзину</button>
      </div>
    </MainLayout>
  )
}

export default Product
