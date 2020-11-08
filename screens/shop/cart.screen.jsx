import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as CartActions from '../../redux/cart/cart.actions';
import * as OrderActions from '../../redux/orders/orders.actions';

import DefaultText from '../../components/UI/default-text.component';
import CartItem from '../../components/shop/cart-item.component';
import Card from '../../components/UI/card.component';

import Colors from '../../constants/colors';

const CartScreen = (props) => {
  const dispatch = useDispatch();

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <DefaultText style={styles.summaryText}>
          Total:{' '}
          <DefaultText style={styles.amount}>
            ${Math.abs(cartTotalAmount.toFixed(2))}
          </DefaultText>
        </DefaultText>
        <Button
          color={Colors.accent}
          title='Order Now'
          disabled={cartItems.length === 0 ? true : false}
          onPress={() => {
            dispatch(OrderActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            item={itemData.item}
            onRemove={() => {
              dispatch(CartActions.removeFromCart(itemData.item.productId));
            }}
            deletable
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: '5%',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5%',
    padding: '2.5%',
  },
  summaryText: {
    fontFamily: 'comic-neue-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
