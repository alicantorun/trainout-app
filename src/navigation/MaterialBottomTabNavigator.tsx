/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MaterialBottomTabNavigationProp,
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
import React, {ReactElement} from 'react';

import {Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type MaterialBottomTabParamList = {
  default: undefined;
};

export type MaterialBottomTabNavigationProps<
  T extends keyof MaterialBottomTabParamList = 'default'
> = MaterialBottomTabNavigationProp<MaterialBottomTabParamList, T>;

// TODO
const Tab = createMaterialBottomTabNavigator<
  MaterialBottomTabParamList | any
>();

const TabBarIcon = (focused: boolean): React.ReactElement => {
  return (
    // <Image
    //   style={{
    //     width: focused ? 24 : 18,
    //     height: focused ? 24 : 18,
    //   }}
    //   source={IC_MASK}
    // />
    null
  );
};

function Navigator(): ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: ({focused}): React.ReactElement => TabBarIcon(focused),
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'HomeScreen',
          tabBarIcon: ({focused}): React.ReactElement => TabBarIcon(focused),
        }}
      />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
      <Tab.Screen name="RegisterScreen" component={RegisterScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default Navigator;
