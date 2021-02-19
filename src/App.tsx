import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {NavigationContainer} from '@react-navigation/native';

import RootProvider from './src/providers';

import AppReducer from './src/reducers';
// import AppNavigator from './src/navigation/AppNavigation';
import RootNavigator from './src/navigation/SwitchNavigator';

const store = createStore(AppReducer);

console.disableYellowBox = true;

const StarterApp: React.FC = () => {
  return (
    <Provider store={store}>
      <RootProvider>
        {/* <NavigationContainer> */}
        {/* <AppNavigator /> */}
        <RootNavigator />
        {/* </NavigationContainer> */}
      </RootProvider>
    </Provider>
  );
};

AppRegistry.registerComponent('StarterApp', () => StarterApp);

export default StarterApp;
