import React, { useEffect, useRef, useState } from 'react'

import api from '../../../../modules/main/config/api'

import { SearchIcon } from '../../../../assets/icons'
import s from './Input.module.scss'

const Input = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [foundProducts, setFoundProducts] = useState([])

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  const [totalProducts, setTotalProducts] = useState([])
  const [isDirty, setIsDirty] = useState(false)

  const searchButtonRef = useRef(null)

   useEffect(() => {
     setIsLoading(true)
     api.fetchProducts().then((data) => {
       setProducts(data)
       setIsLoading(false)

       setCategories(['', ...Array.from(new Set(data.map((item) => item.category)))])
     })
   }, [])

   const onSearch = () => {
     setFoundProducts(
       products.filter((product) =>
         product.title.toLowerCase().includes(searchInput.toLowerCase().trim())
       )
     )
   }

   useEffect(() => {
     if (selectedCategory) {
       setFilteredProducts(products.filter((product) => product.category === selectedCategory))
     }
   }, [selectedCategory, products])

   useEffect(() => {
     console.log('found', foundProducts)
     console.log('filtered', filteredProducts)

     const totalProducts = foundProducts.filter(
       (product) => filteredProducts.indexOf(product) !== -1
     )
     console.log(totalProducts)
     setTotalProducts(totalProducts)
   }, [foundProducts, filteredProducts])
  
  return (
    <div className={s.root}>
      <select
        name='select'
        onChange={(event) => {
          setSelectedCategory(event.target.value)
          if (!isDirty) {
            setIsDirty(true)
          }
        }}
      >
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        className={s.input}
        type='text'
        placeholder='Поиск...'
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value)
          if (!isDirty) {
            setIsDirty(true)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            searchButtonRef.current.click()
          }
        }}
      />
      <button className={s.button} type={'button'} onClick={onSearch} ref={searchButtonRef}>
        <SearchIcon />
      </button>
    </div>
  )
}

export default Input
