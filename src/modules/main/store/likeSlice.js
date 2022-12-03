import { createSlice } from '@reduxjs/toolkit'

export const likeSlice = createSlice({
  name: 'like',
  initialState: {},
  reducers: {
    addToLike(state, { payload }) {
      if (state[payload]) {
        state[payload] += 1
      } else {
        state[payload] = 1
      }
    },
    removeFromLike(state, { payload }) {
      if (state[payload]) {
        state[payload] -= 1
      }

      if (state[payload]) {
        return
      }

      delete state[payload]
    },
    clearLike() {
      return {}
    },
    clearLikeProduct(state, { payload }) {
      delete state[payload]
    },
  },
})

export const { addToLike, removeFromLike, clearLike, clearLikeProduct } = likeSlice.actions

export default likeSlice.reducer
