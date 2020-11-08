import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as CartActions from '../../redux/cart/cart.actions';

import ProductItem from '../../components/shop/product-item.component';
import CustomHeaderButton from '../../components/UI/custom-header-button.component';

import Colors from '../../constants/colors';

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate({
      routeName: 'productDetail',
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  const renderItem = (itemData) => {
    const {
      item: { imageUrl, title, price, id },
    } = itemData;

    return (
      <ProductItem
        imageUrl={imageUrl}
        title={title}
        price={price}
        onSelect={() => {
          selectItemHandler(id, title);
        }}
      >
        <Button
          color={Colors.primary}
          title='View Details'
          onPress={() => {
            selectItemHandler(id, title);
          }}
        />
        <Button
          color={Colors.primary}
          title='To Cart'
          onPress={() => {
            dispatch(CartActions.addToCart(itemData.item));
          }}
        />
      </ProductItem>
    );
  };

  return <FlatList data={products} renderItem={renderItem} />;
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  const { navigation } = navData;
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
