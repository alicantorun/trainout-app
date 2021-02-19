import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { screens } from '../config';
// import Home from '../screens/home';
// import Register from '../screens/register';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Settings from '../screens/settings';

const MainStack = createStackNavigator();

export default function MainNavigator() {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name={screens.home} component={Home} />
      <MainStack.Screen name={screens.profile} component={Profile} />
      <MainStack.Screen name={screens.settings} component={Settings} />
    </MainStack.Navigator>
  );
}
