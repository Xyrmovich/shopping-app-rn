import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as CartActions from '../../redux/cart/cart.actions';

import DefaultText from '../../components/UI/default-text.component';

import Colors from '../../constants/colors';

const ProductDetailScreen = (props) => {
  const { navigation } = props;
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const { price, imageUrl, description } = selectedProduct;

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.buttonContainer}>
        <Button color={Colors.primary} title='Add To Cart' onPress={() => {
          dispatch(CartActions.addToCart(selectedProduct));
        }} />
      </View>
      <View style={styles.textContainer}>
        <DefaultText style={styles.price}>${price.toFixed(2)}</DefaultText>
        <DefaultText style={styles.description}>{description}</DefaultText>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('window').height / 2.5,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: '2%',
    fontFamily: 'comic-neue-bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: '5%',
  },
  buttonContainer: {
    marginVertical: '3.5%',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
