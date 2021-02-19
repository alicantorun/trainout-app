/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {ReactElement} from 'react';

// import {IC_MASK} from '../../utils/Icons';
import {Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type BottomTabParamList = {
  default: undefined;
};

export type BottomTabNavigationProps<
  T extends keyof BottomTabParamList = 'default'
> = BottomTabNavigationProp<BottomTabParamList, T>;

const Tab = createBottomTabNavigator<BottomTabParamList | any>();

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

function MaterialBottomTabNavigator(): ReactElement {
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

export default MaterialBottomTabNavigator;
