import React, { useEffect, useState, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as ProductActions from '../../redux/products/products.actions';

import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/custom-header-button.component';

import DefaultText from '../../components/UI/default-text.component';

const EditProductScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const productId = navigation.getParam('productId');
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  );

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        ProductActions.updateProduct(title, description, imageUrl, productId)
      );
    } else {
      dispatch(
        ProductActions.createProduct(title, description, imageUrl, +price)
      );
    }
    navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price, titleIsValid]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const titleChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }

    setTitle(text);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Title</DefaultText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType='default'
          />
          {!titleIsValid && (
            <DefaultText>Please enter a valid title!</DefaultText>
          )}
        </View>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Image URL</DefaultText>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <DefaultText style={styles.label}>Price</DefaultText>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType='decimal-pad'
              autoCapitalize='sentences'
              autoCorrect
              returnKeyType='next'
            />
          </View>
        )}
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Description</DefaultText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submitHandler = navigation.getParam('submit');
  return {
    headerTitle: navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='save'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: '5%',
  },
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: '2%',
    fontFamily: 'comic-neue-bold',
  },
  input: {
    paddingHorizontal: '1.5%',
    paddingVertical: '3%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
