import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import DefaultText from '../../components/UI/default-text.component';
import OrderItem from '../../components/shop/order-item.component';

import CustomHeaderButton from '../../components/UI/custom-header-button.component';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          items={item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  const { navigation } = navData;
  return {
    headerTitle: 'Your Orders',
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

export default OrdersScreen;
