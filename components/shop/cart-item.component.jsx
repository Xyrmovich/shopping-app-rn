import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DefaultText from '../UI/default-text.component';

const CartItem = (props) => {
  const {
    item: { productTitle: title, quantity, sum: amount },
    onRemove,
    deletable,
  } = props;

  const TouchableComponent =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <DefaultText style={styles.quantity}>{quantity}</DefaultText>
        <DefaultText style={styles.mainText}>{title}</DefaultText>
      </View>
      <View style={styles.itemData}>
        <DefaultText style={styles.mainText}>${amount.toFixed(2)}</DefaultText>
        <View style={styles.deleteButtonContainer}>
          {deletable && (
            <TouchableComponent onPress={onRemove} style={styles.deleteButton}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                size={23}
                color='red'
              />
            </TouchableComponent>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: '2.5%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: '2%',
    borderRadius: 10,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantity: {
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'comic-neue-bold',
    fontSize: 16,
    marginHorizontal: '2.5%',
  },
  deleteButton: {
    //marginHorizontal: '5%',
  },
  deleteButtonContainer: {
    marginLeft: '2.5%',
  },
});

export default CartItem;
