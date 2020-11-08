import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';

import ProductOverviewScreen from '../screens/shop/product-overview.screen';
import ProductDetailScreen from '../screens/shop/product-detail.screen';
import CartScreen from '../screens/shop/cart.screen';
import OrdersScreen from '../screens/shop/orders.screen';
import UserProductsScreen from '../screens/user/user-products.screen';
import EditProductsScreen from '../screens/user/edit-product.screen';

import Colors from '../constants/colors';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'comic-neue-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'comic-neue',
  },
};

const productNavigator = createStackNavigator(
  {
    productsOverview: {
      screen: ProductOverviewScreen,
    },
    productDetail: {
      screen: ProductDetailScreen,
    },
    Cart: {
      screen: CartScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const ordersNavigator = createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const adminNavigator = createStackNavigator(
  {
    UserProducts: {
      screen: UserProductsScreen,
    },
    EditProducts: {
      screen: EditProductsScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const shopNavigator = createDrawerNavigator(
  {
    Products: productNavigator,
    Orders: ordersNavigator,
    Admin: adminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(shopNavigator);
