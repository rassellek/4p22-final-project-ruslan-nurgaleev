import axios from 'axios'

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products')
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const fetchProduct = async (productId) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const api = { fetchProducts, fetchProduct }

export default api
