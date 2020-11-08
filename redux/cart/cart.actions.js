import CartActionTypes from './cart.types';

export const addToCart = (product) => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productToRemoveId) => {
  return {
    type: CartActionTypes.REMOVE_FROM_CART,
    payload: productToRemoveId,
  };
};
