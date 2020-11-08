import OrderActionTypes from './orders.types';
import { addOrder } from './orders.utils';

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: addOrder(state.orders, action.payload),
      };
    default:
      return state;
  }
};

export default ordersReducer;
