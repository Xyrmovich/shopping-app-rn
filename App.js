import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { store } from './redux/store';

import ShopNavigator from './navigation/shop.navigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'comic-neue': require('./assets/fonts/ComicNeue-Regular.ttf'),
    'comic-neue-bold': require('./assets/fonts/ComicNeue-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
