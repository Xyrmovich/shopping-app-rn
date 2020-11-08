import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  const { children, style } = props;
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.26,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default Card;
