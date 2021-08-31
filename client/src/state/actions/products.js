import { SET_PRODUCTS,SELECTED_PRODUCT } from '../../constants/actionTypes'

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  }
}

export const selectedProduct = (product) => {
  return { 
      type: SELECTED_PRODUCT,
      payload: product,
  };
};

export { setProducts }
