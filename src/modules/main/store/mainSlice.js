import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  isLoading: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload
    },
  },
})

export const {
  setProducts,
  setIsLoading,
} = mainSlice.actions

export default mainSlice.reducer
