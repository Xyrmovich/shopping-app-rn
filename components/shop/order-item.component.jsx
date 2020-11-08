import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import DefaultText from '../UI/default-text.component';
import Card from '../UI/card.component';
import CartItem from './cart-item.component';

import Colors from '../../constants/colors';

const OrderItem = (props) => {
  const { amount, date, onDetail, items } = props;

  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <DefaultText style={styles.totalAmount}>
          ${amount.toFixed(2)}
        </DefaultText>
        <DefaultText style={styles.date}>{date}</DefaultText>
      </View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        color={Colors.primary}
        onPress={() =>
          setShowDetails((prevState) => setShowDetails(!prevState))
        }
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((cartItem) => (
            <CartItem key={cartItem.productId} item={cartItem} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: '5%',
    padding: '2.5%',
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '3%',
  },
  totalAmount: {
    fontFamily: 'comic-neue-bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;
