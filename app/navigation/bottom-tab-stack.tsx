import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BottomTab } from '../components';
import { screens } from '../config';
import AppStack from './app-stack';

const BottomTabStack = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <BottomTabStack.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <BottomTabStack.Screen name={screens.appStack} component={AppStack} />
    </BottomTabStack.Navigator>
  );
}
