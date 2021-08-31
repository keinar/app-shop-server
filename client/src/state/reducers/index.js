import isCartOpenReducer from './isCartOpen'
import productsReducer, { selectedProductReducer } from './products'
import cartReducer from './cart'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  isCartOpen: isCartOpenReducer,
  products: productsReducer,
  cart: cartReducer,
  product: selectedProductReducer
})

export default rootReducer