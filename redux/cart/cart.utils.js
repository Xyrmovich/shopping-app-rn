import CartItem from '../../models/cart-item';

export const addProductToCart = (items, addedProduct) => {
  const prodPrice = addedProduct.price;
  const prodTitle = addedProduct.title;

  if (items[addedProduct.id]) {
    const updatedCartItem = new CartItem(
      items[addedProduct.id].quantity + 1,
      prodPrice,
      prodTitle,
      items[addedProduct.id].sum + prodPrice
    );

    return updatedCartItem;
  } else {
    const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);

    return newCartItem;
  }
};

export const removeProductFromCart = (items, removedProductId) => {
  if (items[removedProductId]) {
    if (items[removedProductId].quantity > 1) {
      const selectedProduct = items[removedProductId];
      const updatedProduct = new CartItem(
        selectedProduct.quantity - 1,
        selectedProduct.productPrice,
        selectedProduct.productTitle,
        selectedProduct.sum - selectedProduct.productPrice
      );

      return { ...items, [removedProductId]: updatedProduct };
    } else {
      const updatedItems = { ...items };
      delete updatedItems[removedProductId];

      return updatedItems;
    }
  }

  return items;
};
