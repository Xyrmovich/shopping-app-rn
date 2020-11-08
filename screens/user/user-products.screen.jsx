import React from 'react';
import { FlatList, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { deleteProduct } from '../../redux/products/products.actions';

import ProductItem from '../../components/shop/product-item.component';

import CustomHeaderButton from '../../components/UI/custom-header-button.component';

import Colors from '../../constants/colors';

const UserProductsScreen = (props) => {
  const { navigation } = props;
  const userProducts = useSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    navigation.navigate('EditProducts', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          imageUrl={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            editProductHandler(item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              editProductHandler(item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => deleteHandler(item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Products',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navigation.navigate('EditProducts');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
