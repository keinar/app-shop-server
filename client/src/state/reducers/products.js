import { SET_PRODUCTS, SELECTED_PRODUCT} from '../../constants/actionTypes'

const INIT_STATE = []

const productsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.payload]
    default:
      return state
  }
}

export const selectedProductReducer = (state = {}, {type, payload}) =>{
  switch (type) {
    case SELECTED_PRODUCT:
      return { ...state, ...payload };
      default:
        return state;
    }
  }

export default productsReducer

