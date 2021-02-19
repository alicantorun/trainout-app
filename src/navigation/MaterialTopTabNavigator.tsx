import {
  MaterialTopTabNavigationProp,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import React, {ReactElement} from 'react';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type MaterialTopTabParamList = {
  default: undefined;
};

export type MaterialTopTabNavigationProps<
  T extends keyof MaterialTopTabParamList = 'default'
> = MaterialTopTabNavigationProp<MaterialTopTabParamList, T>;

// TODO
const Tab = createMaterialTopTabNavigator<
  MaterialTopTabNavigationProps | any
>();

function SwitchNavigator(): ReactElement {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 12},
        style: {backgroundColor: 'blue'},
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
      <Tab.Screen name="RegisterScreen" component={RegisterScreen} />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{tabBarLabel: 'Custrom4'}}
      />
    </Tab.Navigator>
  );
}

export default SwitchNavigator;
