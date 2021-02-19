/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Animated, Easing, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import {AppIcon, AppStyles} from '../AppStyles';
import {Configuration} from '../Configuration';
import DrawerContainer from '../components/DrawerContainer';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="float"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTintColor: 'red',
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
    </Tab.Navigator>
  );
}

function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Tab"
      drawerContent={() => <DrawerContainer />}>
      <Drawer.Screen name="Home" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      headerMode="float"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerTintColor: 'red',
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTintColor: 'red',
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTintColor: 'red',
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </Stack.Navigator>
  );
}

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginStack"
      headerMode="none"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
    flex: 1,
    fontFamily: AppStyles.fontName.main,
  },
});
