import OrderActionTypes from './orders.types';

export const addOrder = (cartItems, totalAmount) => ({
  type: OrderActionTypes.ADD_ORDER,
  payload: {
    items: cartItems,
    amount: totalAmount,
  },
});
