import { combineReducers, configureStore } from '@reduxjs/toolkit'
import mainReducer from 'modules/main/store/mainSlice'
import cartReducer from 'modules/main/store/cartSlice'
import likeReducer from 'modules/main/store/likeSlice'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'products',
  storage,
}

const rootReducer = combineReducers({
  mainReducer,
  cartReducer,
  likeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store)

window.store = store
