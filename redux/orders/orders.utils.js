import Order from '../../models/order';

export const addOrder = (orders, orderToAdd) => {
  const newOrder = new Order(
    new Date().toString(),
    orderToAdd.items,
    orderToAdd.amount,
    new Date()
  );

  return orders.concat(newOrder);
};
