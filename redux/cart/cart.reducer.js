import CartActionTypes from './cart.types';
import OrderActionTypes from '../orders/orders.types';
import ProductActionTypes from '../products/product.types';
import { addProductToCart, removeProductFromCart } from './cart.utils';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      const addedProduct = action.payload;
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: addProductToCart(state.items, addedProduct),
        },
        totalAmount: state.totalAmount + addedProduct.price,
      };

    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: removeProductFromCart(state.items, action.payload),
        totalAmount:
          state.totalAmount - state.items[action.payload].productPrice,
      };

    case OrderActionTypes.ADD_ORDER:
      return initialState;

    case ProductActionTypes.DELETE_PRODUCT:
      if (!state.items[action.payload]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.payload].sum;
      delete updatedItems[action.payload];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
      
    default:
      return state;
  }
};

export default cartReducer;
