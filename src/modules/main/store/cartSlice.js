import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart(state, { payload }) {
      if (state[payload]) {
        state[payload] += 1
      } else {
        state[payload] = 1
      }
    },
    removeFromCart(state, { payload }) {
      if (state[payload]) {
        state[payload] -= 1
      }

      if (state[payload]) {
        return
      }

      delete state[payload]
    },
    clearCart() {
      return {}
    },

    clearProduct(state, { payload }) {
      delete state[payload]
    },
  },
})

export const { addToCart, removeFromCart, clearCart, clearProduct } = cartSlice.actions

export default cartSlice.reducer
