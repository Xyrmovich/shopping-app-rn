import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from 'react-native';

import DefaultText from '../UI/default-text.component';
import Card from '../UI/card.component';

const ProductItem = (props) => {
  const { imageUrl, title, price, onSelect, onAddToCart, children } = props;

  const TouchableComponent =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onSelect}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: imageUrl }} />
            </View>
            <View style={styles.details}>
              <DefaultText style={styles.title}>{title}</DefaultText>
              <DefaultText style={styles.price}>
                ${price.toFixed(2)}
              </DefaultText>
            </View>
            <View style={styles.buttonContainer}>{children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: Dimensions.get('window').height / 2.5,
    margin: '5%',
    overflow: 'hidden',
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    margin: '1%',
    fontFamily: 'comic-neue-bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: '7%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: '2%',
  },
});

export default ProductItem;
