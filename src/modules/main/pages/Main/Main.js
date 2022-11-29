import React, { useEffect, useRef, useState } from 'react'
import { MainLayout } from '../../../../shared'

import api from '../../config/api'
import { ProductItem } from './components'

import { SearchIcon, CrossIcon, CategoryIcon } from '../../../../assets/icons'
import mainImage from '../../../../assets/images/Main_1.png'
import s from './Main.module.scss'

//Получение данных из локального json файла
// import { PRODUCTS } from '../../../../_mocks/mocks'

const Main = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [foundProducts, setFoundProducts] = useState([])

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  const [totalProducts, setTotalProducts] = useState([])

  const [filterIsActive, setFilterIsActive] = useState(false)
  const [searchIsActive, setSearchIsActive] = useState(false)

  const searchButtonRef = useRef(null)

  const FilterDisplay = () => {
    setFilterIsActive(true)
  }

  useEffect(() => {
    setIsLoading(true)
    api.fetchProducts().then((data) => {
      setProducts(data)
      setIsLoading(false)
      setFoundProducts(data)
      setTotalProducts(data)
      setCategories(['Выбор категории', ...Array.from(new Set(data.map((item) => item.category)))])
    })
  }, [])

  const onSearch = () => {
    setFoundProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase().trim())
      )
    )
    setSearchIsActive(true)
  }

  const deleteSearch = () => {
    setFoundProducts(products)
    setSearchInput('')
    setSearchIsActive(false)
  }

  const deleteFilter = () => {
    setFilteredProducts(products)
    document.getElementById('select').selectedIndex = 0
    setFilterIsActive(false)
  }

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory))
    } else {
      setFilteredProducts(products)
    }
  }, [selectedCategory, products])

  useEffect(() => {
    console.log('found', foundProducts)
    console.log('filtered', filteredProducts)

    if (filteredProducts.length !== products.length) {
      const totalProducts = foundProducts.filter(
        (product) => filteredProducts.indexOf(product) !== -1
      )
      setTotalProducts(totalProducts)
    } else {
      setTotalProducts(foundProducts)
    }

    console.log(totalProducts)
  }, [foundProducts, filteredProducts])

  return (
    <MainLayout>
      <div className={s.root}>
        <div className={s.navigation}>
          <button className={s.category} onClick={FilterDisplay}>
            <CategoryIcon />
          </button>
          <select
            className={s.select}
            style={{ display: filterIsActive ? 'block' : 'none' }}
            name='select'
            id='select'
            onChange={(event) => {
              setSelectedCategory(event.target.value)
            }}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            style={{ display: filterIsActive ? 'block' : 'none' }}
            className={s.cross}
            id='cross'
            onClick={deleteFilter}
          >
            <CrossIcon />
          </button>
          <input
            className={s.input}
            id='search'
            type='text'
            placeholder='Поиск...'
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                searchButtonRef.current.click()
              }
            }}
          />
          <button
            className={s.cross_search}
            style={{ display: searchIsActive ? 'block' : 'none' }}
            type='reset'
            id='cross_search'
            onClick={deleteSearch}
          >
            <CrossIcon />
          </button>
          <button className={s.button} type={'button'} onClick={onSearch} ref={searchButtonRef}>
            <SearchIcon />
          </button>
        </div>

        <div className={s.heading}>
          <h1>Новые поступления</h1>
          <div className={s.line}></div>
        </div>
        <div className={s.catalog}>
          <div className={s.card}>
            {!isLoading ? (
              totalProducts.length !== 0 ? (
                totalProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                  />
                ))
              ) : (
                <h1>Совпадений не найдено...</h1>
              )
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>

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

export default Main
