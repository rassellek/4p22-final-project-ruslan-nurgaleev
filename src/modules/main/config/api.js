import axios from 'axios'

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products')
    // const response = await axios.get('https://api.npoint.io/e119a8f7b513e5c0de85')

    return response.data
  } catch (e) {
    console.log(e)
  }
}

const fetchProduct = async (productId) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
    // const response = await axios.get(`https://api.npoint.io/e119a8f7b513e5c0de85/${productId - 1}`)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const api = { fetchProducts, fetchProduct }

export default api
