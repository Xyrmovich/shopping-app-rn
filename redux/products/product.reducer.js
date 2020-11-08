import ProductActionTypes from './product.types';
import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.payload
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.payload
        ),
      };
    case ProductActionTypes.CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case ProductActionTypes.UPDATE_PRODUCT:
      const prodIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );
      const updatedProduct = new Product(
        action.payload.id,
        state.userProducts[prodIndex].ownerId,
        action.payload.updatedProduct.title,
        action.payload.updatedProduct.imageUrl,
        action.payload.updatedProduct.description,
        state.userProducts[prodIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[prodIndex] = updatedProduct;

      const availableProductsIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductsIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: [...updatedAvailableProducts],
        userProducts: [...updatedUserProducts],
      };
    default:
      return state;
  }
};

export default productReducer;
