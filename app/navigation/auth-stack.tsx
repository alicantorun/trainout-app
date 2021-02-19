import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { screens } from '../config';

import Welcome from '../screens/welcome';
import Register from '../screens/register';
import Login from '../screens/login';

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name={screens.welcome} component={Welcome} />
      <AuthStack.Screen name={screens.login} component={Login} />
      <AuthStack.Screen name={screens.register} component={Register} />
    </AuthStack.Navigator>
  );
}
