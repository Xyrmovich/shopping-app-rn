import ProductActionTypes from './product.types';

export const deleteProduct = (productId) => ({
  type: ProductActionTypes.DELETE_PRODUCT,
  payload: productId,
});

export const createProduct = (title, description, imageUrl, price) => ({
  type: ProductActionTypes.CREATE_PRODUCT,
  payload: {
    title,
    description,
    imageUrl,
    price,
  },
});

export const updateProduct = (title, description, imageUrl, id) => ({
  type: ProductActionTypes.UPDATE_PRODUCT,
  payload: {
    updatedProduct: {
      title,
      description,
      imageUrl,
    },
    id,
  },
});
