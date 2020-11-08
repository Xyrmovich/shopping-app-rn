import { combineReducers } from 'redux';

import productReducer from './products/product.reducer';
import cartReducer from './cart/cart.reducer';
import ordersReducer from './orders/orders.reducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
